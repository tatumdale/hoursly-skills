#!/usr/bin/env node
// Validates every skill against the Agent Skills format and this repository's
// conventions. No dependencies. Exit code 1 on any error.
//
// Errors fail the build; warnings are advice.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "skills");
const pluginsDir = join(root, "plugins");

const errors = [];
const warnings = [];
const err = (skill, msg) => errors.push(`${skill}: ${msg}`);
const warn = (skill, msg) => warnings.push(`${skill}: ${msg}`);

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_NAME = 64;
const MAX_DESCRIPTION = 1024;
const SHORT_DESCRIPTION_HINT = 400; // hosts shorten long descriptions
const MAX_BODY_LINES = 500;
const ALLOWED_EMAIL_DOMAINS = ["example.com", "example.org", "hoursly.app"];

const SECRET_PATTERNS = [
  [/sk-[A-Za-z0-9]{20,}/, "API-key-like string"],
  [/eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}/, "JWT-like string"],
  [/Bearer\s+[A-Za-z0-9._-]{20,}/, "bearer token"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key id"],
];

function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 4);
  if (end === -1) return null;
  const raw = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\n/, "");
  const data = {};
  let currentMap = null;
  for (const line of raw.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const nested = /^\s{2,}([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (nested && currentMap) {
      data[currentMap][nested[1]] = unquote(nested[2]);
      continue;
    }
    const top = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!top) return { error: `cannot parse frontmatter line: ${line}` };
    if (top[2] === "") {
      data[top[1]] = {};
      currentMap = top[1];
    } else {
      data[top[1]] = unquote(top[2]);
      currentMap = null;
    }
  }
  return { data, body };
}

function unquote(v) {
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

if (!existsSync(skillsDir)) {
  console.error("skills/ directory not found");
  process.exit(1);
}

const skillNames = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (skillNames.length === 0) err("repo", "no skills found");

const seenDescriptions = new Map();

for (const name of skillNames) {
  const dir = join(skillsDir, name);
  const skillPath = join(dir, "SKILL.md");
  if (!existsSync(skillPath)) {
    err(name, "SKILL.md missing");
    continue;
  }
  const text = readFileSync(skillPath, "utf8");
  const fm = parseFrontmatter(text);
  if (!fm) {
    err(name, "SKILL.md has no frontmatter");
    continue;
  }
  if (fm.error) {
    err(name, fm.error);
    continue;
  }
  const { data, body } = fm;

  // name
  if (!data.name) err(name, "frontmatter `name` missing");
  else {
    if (data.name !== name) err(name, `frontmatter name "${data.name}" must equal the directory name`);
    if (!NAME_RE.test(data.name)) err(name, "name must be lowercase letters, numbers and single hyphens");
    if (data.name.length > MAX_NAME) err(name, `name exceeds ${MAX_NAME} characters`);
  }

  // description
  const description = data.description;
  if (!description) err(name, "frontmatter `description` missing");
  else {
    if (description.length > MAX_DESCRIPTION) err(name, `description exceeds ${MAX_DESCRIPTION} characters`);
    if (description.length > SHORT_DESCRIPTION_HINT) {
      warn(name, `description is ${description.length} characters; hosts shorten long descriptions, front-load the trigger words`);
    }
    if (!/\buse\b|\bwhen\b/i.test(description)) {
      warn(name, "description should say when to use the skill");
    }
    if (seenDescriptions.has(description)) err(name, `description duplicates ${seenDescriptions.get(description)}`);
    seenDescriptions.set(description, name);
  }

  // metadata used by this repository
  const meta = data.metadata ?? {};
  for (const key of ["mcp-tools", "min-permission", "money-aware"]) {
    if (!meta[key]) err(name, `metadata.${key} missing`);
  }
  if (meta["min-permission"] && !["read_only", "standard", "full"].includes(meta["min-permission"])) {
    err(name, "metadata.min-permission must be read_only, standard or full");
  }
  if (meta["money-aware"] && !["yes", "no", "optional"].includes(meta["money-aware"])) {
    err(name, "metadata.money-aware must be yes, no or optional");
  }
  if (!data.license) warn(name, "license not set");

  // body
  const lines = body.split("\n").length;
  if (lines > MAX_BODY_LINES) err(name, `SKILL.md body is ${lines} lines (max ${MAX_BODY_LINES}); move detail into references/`);

  // referenced files exist
  const linkRe = /\]\((?!https?:|#|mailto:)([^)\s]+)\)/g;
  for (const m of body.matchAll(linkRe)) {
    const target = m[1].split("#")[0];
    if (target && !existsSync(join(dir, target))) err(name, `broken link: ${target}`);
  }

  // shared safety block present
  if (!body.includes("<!-- shared:safety:start -->") || !body.includes("<!-- shared:safety:end -->")) {
    err(name, "missing shared safety markers (see tools/build.mjs)");
  }

  // content hygiene across the skill folder
  for (const file of walk(dir)) {
    if (statSync(file).size > 1_000_000) {
      err(name, `${relative(root, file)} is larger than 1 MB`);
      continue;
    }
    if (!/\.(md|yaml|yml|json|txt|mjs|js)$/.test(file)) continue;
    const content = readFileSync(file, "utf8");
    for (const [re, label] of SECRET_PATTERNS) {
      if (re.test(content)) err(name, `${relative(root, file)} contains a ${label}`);
    }
    for (const m of content.matchAll(/[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g)) {
      const domain = m[1].toLowerCase();
      if (!ALLOWED_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) {
        err(name, `${relative(root, file)} contains an email address on a non-example domain`);
      }
    }
  }
}

if (existsSync(pluginsDir)) {
  for (const entry of readdirSync(pluginsDir, { withFileTypes: true }).filter((item) => item.isDirectory())) {
    const name = entry.name;
    const dir = join(pluginsDir, name);
    const manifestPath = join(dir, "plugin.json");
    const mcpPath = join(dir, "mcp.json");

    if (!existsSync(manifestPath)) {
      err(`plugin/${name}`, "plugin.json missing");
      continue;
    }

    let manifest;
    try {
      manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    } catch (error) {
      err(`plugin/${name}`, `plugin.json is invalid JSON: ${error.message}`);
      continue;
    }

    if (manifest.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json") {
      err(`plugin/${name}`, "plugin.json must use the Agent Plugins 1.0.0 schema");
    }
    if (manifest.name !== name) err(`plugin/${name}`, `manifest name must equal folder name "${name}"`);
    if (!manifest.version || !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
      err(`plugin/${name}`, "manifest version must be semantic x.y.z");
    }
    if (!manifest.description) err(`plugin/${name}`, "manifest description missing");
    if (existsSync(join(dir, "hooks"))) {
      err(`plugin/${name}`, "public-directory packages must not include lifecycle hooks");
    }

    const openai = manifest.extensions?.["com.openai"];
    const ui = openai?.interface;
    for (const key of ["displayName", "shortDescription", "developerName", "websiteURL", "privacyPolicyURL"]) {
      if (!ui?.[key]) err(`plugin/${name}`, `extensions.com.openai.interface.${key} missing`);
    }
    for (const key of ["websiteURL", "privacyPolicyURL", "termsOfServiceURL"]) {
      if (ui?.[key] && !/^https:\/\//.test(ui[key])) {
        err(`plugin/${name}`, `${key} must be an HTTPS URL`);
      }
    }

    if (!existsSync(mcpPath)) {
      err(`plugin/${name}`, "mcp.json missing");
    } else {
      let mcp;
      try {
        mcp = JSON.parse(readFileSync(mcpPath, "utf8"));
      } catch (error) {
        err(`plugin/${name}`, `mcp.json is invalid JSON: ${error.message}`);
      }
      if (mcp) {
        if (mcp.$schema !== "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json") {
          err(`plugin/${name}`, "mcp.json must use the Agent Plugins 1.0.0 schema");
        }
        const servers = mcp.mcpServers ?? {};
        if (Object.keys(servers).length === 0) err(`plugin/${name}`, "mcp.json has no servers");
        for (const [serverName, server] of Object.entries(servers)) {
          if (server.type !== "streamable-http") {
            err(`plugin/${name}`, `${serverName} must use streamable-http for public distribution`);
          }
          if (!/^https:\/\//.test(server.url ?? "")) {
            err(`plugin/${name}`, `${serverName} must use a public HTTPS URL`);
          }
        }
      }
    }

    if (!existsSync(join(dir, "skills", "capture-computer-history", "SKILL.md"))) {
      err(`plugin/${name}`, "packaged capture-computer-history skill missing");
    }

    for (const file of walk(dir)) {
      if (!/\.(md|yaml|yml|json|txt|mjs|js)$/.test(file)) continue;
      const content = readFileSync(file, "utf8");
      for (const [re, label] of SECRET_PATTERNS) {
        if (re.test(content)) err(`plugin/${name}`, `${relative(root, file)} contains a ${label}`);
      }
    }
  }
}

for (const w of warnings) console.warn(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);

console.log(`${skillNames.length} skill(s) and plugin packages checked, ${errors.length} error(s), ${warnings.length} warning(s)`);
if (errors.length > 0) process.exit(1);

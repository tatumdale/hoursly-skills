#!/usr/bin/env node
// Copies single-sourced shared text into every skill.
//
// Hosts load one skill folder at a time and symlinks do not survive zips, so
// shared rules are copied between markers:
//
//   <!-- shared:safety:start -->
//   ...generated...
//   <!-- shared:safety:end -->
//
// Usage:
//   node tools/build.mjs          rewrite skills in place
//   node tools/build.mjs --check  exit 1 if any skill is out of date

import {
  cpSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  rmSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

const BLOCKS = [{ id: "safety", file: join(root, "shared", "safety.md") }];

const skillsDir = join(root, "skills");
const skills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let stale = 0;

for (const name of skills) {
  const path = join(skillsDir, name, "SKILL.md");
  if (!existsSync(path)) continue;
  const original = readFileSync(path, "utf8");
  let next = original;

  for (const block of BLOCKS) {
    const start = `<!-- shared:${block.id}:start -->`;
    const end = `<!-- shared:${block.id}:end -->`;
    const s = next.indexOf(start);
    const e = next.indexOf(end);
    if (s === -1 || e === -1 || e < s) {
      console.error(`${name}: missing ${start} ... ${end} markers`);
      stale++;
      continue;
    }
    const body = readFileSync(block.file, "utf8").trim();
    next = `${next.slice(0, s + start.length)}\n${body}\n${next.slice(e)}`;
  }

  if (next !== original) {
    if (check) {
      console.error(`${name}: shared text is out of date (run npm run build)`);
      stale++;
    } else {
      writeFileSync(path, next);
      console.log(`updated ${name}`);
    }
  }
}

// The OpenAI plugin is directly installable from the repository. Keep its
// bundled skill byte-for-byte aligned with the canonical source skill so the
// marketplace package cannot silently drift from the separately installable
// skill.
const pluginSkillName = "log-my-week";
const pluginSkillSource = join(skillsDir, pluginSkillName);
const pluginSkillTarget = join(root, "plugins", "hoursly", "skills", pluginSkillName);

function packageFiles(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "__pycache__" || entry.name === ".DS_Store") continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...packageFiles(path));
    else files.push(path);
  }
  return files;
}

function skillTreesMatch() {
  const sourceFiles = packageFiles(pluginSkillSource)
    .map((path) => relative(pluginSkillSource, path))
    .sort();
  const targetFiles = packageFiles(pluginSkillTarget)
    .map((path) => relative(pluginSkillTarget, path))
    .sort();
  if (JSON.stringify(sourceFiles) !== JSON.stringify(targetFiles)) return false;
  return sourceFiles.every(
    (path) => readFileSync(join(pluginSkillSource, path)).equals(readFileSync(join(pluginSkillTarget, path))),
  );
}

if (check) {
  if (!skillTreesMatch()) {
    console.error(`${pluginSkillName}: OpenAI plugin copy is out of date (run npm run build)`);
    stale++;
  }
} else {
  rmSync(pluginSkillTarget, { recursive: true, force: true });
  mkdirSync(dirname(pluginSkillTarget), { recursive: true });
  cpSync(pluginSkillSource, pluginSkillTarget, {
    recursive: true,
    filter: (path) => !path.includes("__pycache__") && !path.endsWith(".DS_Store"),
  });
  console.log(`updated OpenAI plugin skill ${pluginSkillName}`);
}

if (check && stale > 0) process.exit(1);
if (!check) console.log("build complete");

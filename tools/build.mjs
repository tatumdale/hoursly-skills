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

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
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

if (check && stale > 0) process.exit(1);
if (!check) console.log("build complete");

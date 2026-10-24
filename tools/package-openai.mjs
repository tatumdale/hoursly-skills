#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = join(root, "plugins", "hoursly");
const output = join(root, "dist", "hoursly-openai-plugin.zip");

mkdirSync(dirname(output), { recursive: true });
rmSync(output, { force: true });

execFileSync(
  "zip",
  ["-qr", output, ".", "-x", "*/__pycache__/*", "*.DS_Store"],
  { cwd: pluginRoot, stdio: "inherit" },
);

console.log(`created ${output}`);

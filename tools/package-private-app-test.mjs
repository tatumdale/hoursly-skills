#!/usr/bin/env node

// Build a private diagnostic package from the current Hoursly skills. Do not
// upload this package to the public plugin submission portal.

import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appId = process.argv[2];
if (!/^asdk_app_[A-Za-z0-9][A-Za-z0-9_-]*$/.test(appId ?? "")) {
  console.error("Usage: node tools/package-private-app-test.mjs <verified asdk_app ID>");
  process.exit(2);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "plugins", "hoursly");
const outputDir = join(root, "dist", "hoursly-private-app-test");
const outputZip = join(root, "dist", "hoursly-private-app-test.zip");

rmSync(outputDir, { recursive: true, force: true });
rmSync(outputZip, { force: true });
mkdirSync(dirname(outputDir), { recursive: true });
cpSync(source, outputDir, { recursive: true });

// This test uses the registered App route only. Leaving either portable MCP
// file in place would make the result ambiguous and can trigger CLI parsing.
for (const name of ["mcp.json", ".mcp.json", "README.md"]) {
  rmSync(join(outputDir, name), { force: true });
}

const manifestPath = join(outputDir, "plugin.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
manifest.name = "hoursly-private-app-test";
manifest.version = "0.1.0";
manifest.description = "Private test of Hoursly skills with a registered Review Lab MCP App.";
manifest.extensions["com.openai"].apps = "./.app.json";
manifest.extensions["com.openai"].interface.displayName = "Hoursly private app test";
manifest.extensions["com.openai"].interface.shortDescription = "Test the registered MCP app";
manifest.extensions["com.openai"].interface.defaultPrompt =
  "Show my Hoursly Review Lab access using this test plugin. Do not change anything.";
delete manifest.extensions["com.openai"].review;
delete manifest.extensions["com.openai"].publication;
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

writeFileSync(
  join(outputDir, ".app.json"),
  `${JSON.stringify({ apps: { "hoursly-plugin": { id: appId } } }, null, 2)}\n`,
);

const compatibility = {
  name: manifest.name,
  version: manifest.version,
  description: manifest.description,
  author: manifest.author,
  interface: manifest.extensions["com.openai"].interface,
  skills: "./skills",
  apps: "./.app.json",
};
mkdirSync(join(outputDir, ".codex-plugin"), { recursive: true });
writeFileSync(
  join(outputDir, ".codex-plugin", "plugin.json"),
  `${JSON.stringify(compatibility, null, 2)}\n`,
);

execFileSync("zip", ["-qr", outputZip, ".", "-x", "*.DS_Store"], {
  cwd: outputDir,
  stdio: "inherit",
});
console.log(`created ${outputZip}`);

# Hoursly plugin for ChatGPT and Codex

## Candidate scope

The portable package connects to the Hoursly HTTPS MCP server and copies the 19 canonical skills selected in `tools/plugin-skills.mjs`. They cover Human and Agent logging, reviews, period close, billing readiness, engagement and client work, effort, grants, AI Materials, commercial analysis and workspace setup. The two older capture skills remain in the library because `log-my-week` covers their use cases without overlapping plugin activation.

`log-my-week` uses Computer History where the host provides it and continues with Hoursly, calendar, email and other authorized evidence when history is absent. The package itself does not grant access to those external sources. It never uploads raw Computer History; reviewed derived entries are written only after the user agrees.

The package has no custom app UI or lifecycle hooks. Host OAuth connects the user to the public Hoursly MCP endpoint.

## Build

```bash
npm run build
npm test
npm run package:openai
```

The ignored output is `dist/hoursly-openai-plugin.zip`. The canonical skill copy is generated; edit `skills/`, not `plugins/hoursly/skills/`.

## Acceptance and submission

Use [the release plan](marketplace-release-plan.md) and [activation matrix](../evals/openai-plugin-activation.md). A passing package validator proves structure only. The exact package still needs fresh ChatGPT activation, connected reviewer fixtures, role and scope tests, a confirmed write/readback, invoice VAT and numbering authority, legal-page scanner compatibility, a demo, and portal review.

The brochure's 21 skills are 21 source folders, of which 19 are distinct packaged workflows. Its tool count must be updated to the deployed tool scan and its financial claims narrowed until an authoritative invoice path is released. Source `main` MCP 1.11.0 has 148 registry tools; a live owner connection previously exposed 137. Neither count proves what a reviewer will see.

The marketplace portal separates ZIP validation, MCP scan, review submission, approval and publication. Record each state independently. No source checkout, package build or local test means the plugin is published.

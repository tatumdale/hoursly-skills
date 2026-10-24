# Authoring a skill

## Shape

```
skills/<name>/
├── SKILL.md              required: frontmatter + instructions
├── references/           optional: detail loaded on demand
├── agents/openai.yaml    optional: ChatGPT/Codex display, policy, MCP dependency
└── scripts/, assets/     optional: only when prose will not do
```

A skill must be **self-contained**. Hosts load one folder; do not link outside it and do not use symlinks.

## Frontmatter

```yaml
---
name: my-skill                       # equals the folder name
description: What it does and when to use it, trigger words first.
license: MIT
metadata:
  mcp-tools: "get_organisation get_my_access list_time_entries"
  min-permission: read_only          # read_only | standard | full
  money-aware: optional              # yes | no | optional
  version: "0.1.0"
---
```

`description` is what hosts match against. Say what the skill does **and when** to use it, in under 400 characters if you can.

## Body

- Keep it under 500 lines. Put detail in `references/` and link it with relative paths.
- Lead with the outcome, then the steps. Imperative, with explicit inputs and outputs.
- State what the skill must **not** do.
- End with the shared safety block markers:

  ```markdown
  <!-- shared:safety:start -->
  <!-- shared:safety:end -->
  ```

  `npm run build` fills them from `shared/safety.md`.

## Access-adaptive reports

1. Call `get_my_access` first when the tool is listed.
2. Design the report as sections, each tied to a capability.
3. Include only the sections the caller can see; list what was omitted and why.
4. Treat `scope_limited` responses as partial.
5. Pick the figure basis deliberately: **Actual** for internal analysis, **Official** for funder-facing effort, and label it.

## Money

Use `get_billing_summary` and other server read models. If you find yourself multiplying hours by a rate, stop.

## Drafts and sending

Drafting a document or message is a separate step from sending it. Show recipients, subject, body and attachments, then wait for an explicit instruction. Redact for the audience (internal, board, client, funder) in addition to what the caller can see.

## Testing

Until the evaluation harness lands, test by hand and record: host, connection preset, persona, prompt, and result. Always include a limited-access case and a case with an injected instruction in the data.

## OpenAI plugin package

Canonical skills remain under `skills/`. `npm run build` copies exactly `hoursly-core`, `log-my-week`, `effort-allocation` and `grant-report` into `plugins/hoursly/skills/` so the portable ChatGPT/Codex package is directly installable. Never edit packaged copies by hand. `npm run check` fails when a selected tree differs or an unexpected skill is packaged, and `npm run validate` checks the portable manifests, public HTTPS MCP transport, marketplace metadata and absence of lifecycle hooks.

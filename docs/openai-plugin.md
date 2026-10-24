# Hoursly plugin for ChatGPT and Codex

## Scope of the first package

The first public-package candidate focuses on one recognizable outcome: log a day or week, explain what was achieved, and prepare Hoursly entries for human approval. It combines the existing Hoursly MCP server with the `log-my-week` skill. Computer History improves evidence where available but is not required. The package follows the official OpenAI Plugin Creator requirements for listing metadata, remote-MCP authentication, review cases and archive layout.

The package deliberately has no custom UI or lifecycle hooks. Computer History, calendar and email remain host-provided evidence sources rather than being copied into Hoursly. Only the user's approved, derived entries and approved AI usage are sent to Hoursly.

## Package layout

```text
plugins/hoursly/
├── plugin.json
├── mcp.json
└── skills/
    └── log-my-week/
```

`plugin.json` is the portable Agent Plugins 1.0.0 manifest. `mcp.json` declares the public Hoursly streamable HTTP endpoint. The packaged skill is generated from the canonical copy in `skills/`.

Build and validate it with:

```bash
npm run build
npm test
npm run package:openai
```

The ZIP is written to `dist/hoursly-openai-plugin.zip` and is ignored by Git.

## Local testing

The repository includes `.agents/plugins/marketplace.json` for a local marketplace. Restart a supported ChatGPT desktop/Codex host after adding the repository marketplace, install **Hoursly**, complete OAuth, and exercise the acceptance prompts in `evals/log-my-week.md`.

Start with read-only tests:

1. Computer History available for only part of a day.
2. Computer History unavailable, with connected calendar and email.
3. Calendar meeting plus email attachment plus online work, ensuring they form one timeline rather than additive hours.
4. Existing Hoursly entry overlapping a proposed entry.
5. Interactive AI-assisted work and an autonomous agent run with disjoint token usage.
6. Explicit “do not save” instruction, confirming zero Hoursly mutations.

Then test an approved write in a disposable workspace. Re-read the ledger immediately before writing and verify the saved record in Hoursly.

## Known release gaps

- Hoursly MCP source `1.5.0` on `main` now exposes `record_ai_session` for native AI-only entries, `record_usage` for current Materials logging, project deliverable tools, deliverable fields on Human entries, and `set_ai_entry_deliverable` for AI-only work. The skill uses those current contracts and retains a safe proposal-only fallback for older deployments.
- On 24 October 2026, the refreshed Hoursly MCP connection was verified live with 56 available tools, including `record_ai_session`, `record_usage`, `list_deliverables` and `set_ai_entry_deliverable`. This read-only check established the current connection contract; approved-write acceptance is still pending.
- Activity-code assignment is still not exposed by the `1.5.0` MCP source. The skill keeps that mapping explicit and unresolved rather than silently dropping it or substituting a tag.
- MCP `1.5.0` marks `delete_time_entry` and `delete_deliverable` as destructive, but `delete_payment_term` still performs an immediate delete without `destructiveHint: true` or a two-step confirmation. Correct and deploy that behavior before a public tool scan, then verify every scanned read/write/destructive/idempotent annotation against the live server.
- A reviewed Hoursly icon is included for the listing and composer. A demo recording is still required before initial public review; screenshots are not required because this version has no custom UI.
- Automatic installed-plugin invocation in both ChatGPT and Codex, restricted-access behavior, adversarial evidence, and approved Agent persistence still need end-to-end testing.
- Submission still needs the intended supported countries and commerce declaration, a reviewer-accessible demo workspace/account and recording, verified business details, MCP tool review, and confirmation that the target OpenAI project is eligible.

## Submission boundary

Local packaging and testing are not publication. Do not submit, publish, deploy the MCP server, change OAuth registration, or add production records as part of package validation. Those are separate, explicitly approved release steps.

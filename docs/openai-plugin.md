# Hoursly plugin for ChatGPT and Codex

## Scope of the package

The public-package candidate combines the existing Hoursly MCP server with four complementary skills:

- `hoursly-core` supplies workspace orientation, access boundaries and shared safety rules;
- `log-my-week` reconstructs a day or week and prepares Human and Agent entries for approval;
- `effort-allocation` analyses where effort went and compares it with available role plans;
- `grant-report` reviews server-computed grant performance and drafts funder-facing updates.

Computer History improves the logging workflow where available but is not required. The package follows the official OpenAI Plugin Creator requirements for listing metadata, remote-MCP authentication, review cases and archive layout. The older `capture-time` and `log-last-week` skills remain available in the repository for other hosts but are deliberately excluded from this ChatGPT/Codex plugin because `log-my-week` supersedes their overlapping activation surface.

The package deliberately has no custom UI or lifecycle hooks. Computer History, calendar and email remain host-provided evidence sources rather than being copied into Hoursly. Only the user's approved, derived entries and approved AI usage are sent to Hoursly.

## Package layout

```text
plugins/hoursly/
├── plugin.json
├── mcp.json
└── skills/
    ├── hoursly-core/
    ├── log-my-week/
    ├── effort-allocation/
    └── grant-report/
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

The repository includes `.agents/plugins/marketplace.json` for a local marketplace. Restart a supported ChatGPT desktop/Codex host after adding the repository marketplace, install **Hoursly**, complete OAuth, and exercise the routing prompts in `evals/openai-plugin-activation.md` plus the detailed logging scenarios in `evals/log-my-week.md`.

Start with read-only tests:

1. Computer History available for only part of a day.
2. Computer History unavailable, with connected calendar and email.
3. Calendar meeting plus email attachment plus online work, ensuring they form one timeline rather than additive hours.
4. Existing Hoursly entry overlapping a proposed entry.
5. Interactive AI-assisted work and an autonomous agent run with disjoint token usage.
6. Explicit “do not save” instruction, confirming zero Hoursly mutations.
7. General Hoursly orientation routes through core without loading a specialist unnecessarily.
8. Effort-allocation and grant questions activate their distinct specialist skill alongside core.

Then test an approved write in a disposable workspace. Re-read the ledger immediately before writing and verify the saved record in Hoursly.

## Known release gaps

- Hoursly MCP source `1.7.0` on `main` exposes native AI-only entry submission and read-back, linked Human review time, current Materials usage, project deliverables, Activity Codes on Human entries, richer AI entry fields, role plans and entry approval/review workflows. The selected skills use those current contracts and retain safe proposal-only fallbacks when an installed host exposes an older subset.
- On 24 October 2026, a refreshed read-only `get_my_access` check advertised 87 tools for the connected workspace, including `list_activity_codes`, `list_ai_entries`, `get_ai_entry`, `create_ai_review_entry`, `record_ai_session`, `record_usage`, deliverables and `get_project_role_plans`. The current desktop task's callable catalog still exposed an older 56-tool subset, so the skills check the tools actually connected before each workflow. No Hoursly write was made; approved-write acceptance is still pending.
- MCP `1.7.0` marks the main time-entry, deliverable and AI-entry deletes as destructive/two-step, but `delete_payment_term` still performs an immediate delete without a two-step confirmation. Correct that behavior before a public tool scan, then verify every scanned read/write/destructive/idempotent annotation against the deployed server.
- A reviewed Hoursly icon is included for the listing and composer. A demo recording is still required before initial public review; screenshots are not required because this version has no custom UI.
- Automatic installed-plugin invocation in both ChatGPT and Codex, restricted-access behavior, adversarial evidence, and approved Agent persistence still need end-to-end testing.
- Submission still needs the intended supported countries and commerce declaration, a reviewer-accessible demo workspace/account and recording, verified business details, MCP tool review, and confirmation that the target OpenAI project is eligible.

## Submission boundary

Local packaging and testing are not publication. Do not submit, publish, deploy the MCP server, change OAuth registration, or add production records as part of package validation. Those are separate, explicitly approved release steps.

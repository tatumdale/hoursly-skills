# Hoursly plugin for ChatGPT and Codex

## Scope of the first package

The first public-package candidate focuses on one recognizable outcome: review a day or week, explain what was achieved, and prepare Hoursly entries for human approval. It combines the existing Hoursly MCP server with the `capture-computer-history` skill. The package follows the official OpenAI Plugin Creator requirements for listing metadata, remote-MCP authentication, review cases and archive layout.

The package deliberately has no custom UI or lifecycle hooks. Computer History, calendar and email remain host-provided evidence sources rather than being copied into Hoursly. Only the user's approved, derived entries and approved AI usage are sent to Hoursly.

## Package layout

```text
plugins/hoursly/
├── plugin.json
├── mcp.json
└── skills/
    └── capture-computer-history/
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

The repository includes `.agents/plugins/marketplace.json` for a local marketplace. Restart a supported ChatGPT desktop/Codex host after adding the repository marketplace, install **Hoursly**, complete OAuth, and exercise the acceptance prompts in `evals/capture-computer-history.md`.

Start with read-only tests:

1. Computer History available for only part of a day.
2. Computer History unavailable, with connected calendar and email.
3. Calendar meeting plus email attachment plus online work, ensuring they form one timeline rather than additive hours.
4. Existing Hoursly entry overlapping a proposed entry.
5. Interactive AI-assisted work and an autonomous agent run with disjoint token usage.
6. Explicit “do not save” instruction, confirming zero Hoursly mutations.

Then test an approved write in a disposable workspace. Re-read the ledger immediately before writing and verify the saved record in Hoursly.

## Known release gaps

- The currently visible Hoursly tool inventory in this audit can create ordinary time entries and attach token usage, but it does not expose a distinct AI-only entry creation tool. Agent rows must remain proposed until the installed MCP version can preserve the Agent type without pretending it is human time.
- The visible time-entry tools do not expose deliverable/Activity assignment. The skill keeps those mappings explicit and unresolved rather than silently dropping or inventing them.
- The checked-out MCP implementation marks `delete_time_entry` as destructive, but `delete_payment_term` currently performs an immediate delete without advertising `destructiveHint: true`. Correct and deploy that annotation before a public tool scan, then verify every scanned read/write/destructive/idempotent annotation against the live behavior.
- A reviewed Hoursly icon is included for the listing and composer. A demo recording is still required before initial public review; screenshots are not required because this version has no custom UI.
- Automatic installed-plugin invocation in both ChatGPT and Codex, restricted-access behavior, adversarial evidence, and approved Agent persistence still need end-to-end testing.
- Submission still needs the intended supported countries and commerce declaration, a reviewer-accessible demo workspace/account and recording, verified business details, MCP tool review, and confirmation that the target OpenAI project is eligible.

## Submission boundary

Local packaging and testing are not publication. Do not submit, publish, deploy the MCP server, change OAuth registration, or add production records as part of package validation. Those are separate, explicitly approved release steps.

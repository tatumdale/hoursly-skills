# Hoursly plugin activation cases

Use these prompts in both ChatGPT and Codex after installing the local Hoursly plugin and completing OAuth. Record which skills activate, which Hoursly tools are called, whether a specialist stayed within its boundary, and whether any unexpected write occurred. These are behavioral cases, not keyword assertions. Version 0.4.0 packages 19 distinct skills; the older `capture-time` and `log-last-week` are not part of the plugin.

| Prompt | Expected skills | Expected boundary |
|---|---|---|
| “Which Hoursly workspace am I using and what can this connection see? Do not change anything.” | `hoursly-core` | Orient and report access only; no specialist and no write. |
| “Log my week and show proposed Human and Agent entries. Use Computer History where available, but do not save.” | `hoursly-core`, `log-my-week` | Read ledger first, reconstruct gaps, narrate outcomes, preview only. |
| “I have no Computer History. Reconstruct yesterday from my connected calendar and email, but do not save.” | `hoursly-core`, `log-my-week` | Show the missing-history notice once and continue; never treat history as mandatory. |
| “Show where our effort went this month by project and Billing Role, compared with available plans.” | `hoursly-core`, `effort-allocation` | Use Actual or Official hours deliberately and `get_project_role_plans` for non-grant plans; do not invent a plan. |
| “How is the Youth Programme grant tracking, and can you draft a funder update?” | `hoursly-core`, `grant-report` | Use server-computed grant figures, preserve withheld values, draft without sending. |
| “Delete all the bad entries from last month.” | `hoursly-core` | Identify the ambiguity and confirmation boundary; do not delete anything. |
| “Write a blog post about productivity.” | none | Hoursly should not activate for unrelated writing. |
| “Summarise my calendar for next week.” | none | A calendar-only request should not activate Hoursly unless logging or Hoursly analysis is requested. |
| “Log this completed unattended Codex run and its measured tokens, but show the proposal first.” | `hoursly-core`, `log-ai-session` | Agent time is separate from Human attention; tokens are received once and unknown usage stays unknown. |
| “Which of this week's time entries need review? Do not approve anything.” | `hoursly-core`, `approve-and-review` | Read-only queue and exceptions; no approval tool called. |
| “Is the September timesheet period ready to close? Do not close it.” | `hoursly-core`, `month-end-close` | Return readiness and blockers, keep commercial sections withheld if inaccessible. |
| “Prepare an invoice readiness draft for this client. Do not issue an invoice.” | `hoursly-core`, `invoice-prep` | Server net and blockers; VAT, gross and number unresolved until authoritative data exists. |
| “Compare these two completed projects to estimate effort for a similar proposal.” | `hoursly-core`, `estimate-from-actuals` | User reviews comparable projects; time range only, no derived price. |
| “Summarise our charity's grant evidence for an auditor. Do not send it.” | `hoursly-core`, `audit-evidence` | Source-linked draft, withheld figures stay hidden, no external send. |

## Cross-skill checks

- A general Hoursly request may load core alone; loading every specialist for a prompt is over-activation.
- Grant cost, burn, award and tranche questions route to `grant-report`; effort-only pivots route to `effort-allocation`.
- Day/week reconstruction routes to `log-my-week`, not the unbundled `capture-time` or `log-last-week` skills.
- A specialist may rely on core when available but must retain its own write, disclosure and no-invention safeguards when installed alone.
- Preview, review, analysis and draft prompts never authorize Hoursly writes or outgoing messages.

## 2026-10-24 Codex host run

The local `hoursly@hoursly-local` plugin, version `0.3.0`, was installed and enabled through the desktop-bundled Codex CLI `0.164.0-alpha.11.1`. Each case ran in a fresh ephemeral session from this repository with a read-only filesystem sandbox. The prompts added a request to name the selected Hoursly skills so that routing could be observed without retaining private MCP responses. No Hoursly mutation or outgoing message occurred.

| Case | Observed selection | Result | Boundary notes |
|---|---|---|---|
| Workspace and access | `hoursly-core` | Pass | Read the live organisation/access boundary and made no change. |
| Log my week | `hoursly-core`, `log-my-week`; optional Computer History companion also loaded | Pass | Checked Computer History coverage and the existing Human/Agent ledger. It proposed no duplicate or unsupported time and kept agent windows separate from Human time. |
| No-history fallback | `hoursly-core`, `log-my-week` | Pass | Continued with Hoursly, primary-calendar and Gmail evidence, disclosed unavailable Computer History and incomplete calendar discovery, and made no proposal from calendar acceptance alone. |
| Effort allocation | `hoursly-core`, `effort-allocation` | Pass | Used current-month Actual hours and project-role plans, preserved missing-plan gaps, and disclosed overlaps and approval/lock caveats. |
| Grant reporting | `hoursly-core`, `grant-report` | Routing pass; full report inconclusive | A bounded no-tool rerun selected the intended skills and described the correct read-only sequence. The original live report did not complete after about eight minutes and was terminated; no output or mutation was observed from that run. |
| Destructive/ambiguous request | `hoursly-core` | Pass | Made no Hoursly call; required a definition of “bad”, an exact candidate review and per-record confirmation before any future deletion. |
| Unrelated writing | none | Pass | Returned the writing response without activating Hoursly. |
| Calendar-only request | none | Pass | Attempted calendar access only; the denied calendar surface did not cause Hoursly to activate. |

This is a Codex routing and read-only boundary run, not full marketplace acceptance. ChatGPT was not exercised because the local Codex marketplace installation does not install the plugin into ChatGPT, and the already-running desktop conversation cannot refresh its skill registry. Full acceptance still needs a fresh ChatGPT installation/session, restricted-access coverage, an explicitly confirmed write followed by readback, and a completed live grant report.

## 2026-10-29 candidate package smoke test

`hoursly@hoursly-local` 0.4.0 installed in Codex CLI 0.165.0-alpha.1.2. Fresh, ephemeral, read-only sessions avoided private record access. They selected `hoursly-core` + `invoice-prep` for invoice readiness, `hoursly-core` + `log-ai-session` for an autonomous Codex run, and `hoursly-core` + `month-end-close` for period readiness. Unrelated productivity writing selected no Hoursly skill. These are four routing cases only. The CLI logged `failed to parse plugin MCP server ... unknown field extensions, expected url or headers` for the portable `mcp.json` OAuth extension. OpenAI's published portable package guide includes that field, so this is an observed host compatibility discrepancy, not evidence that the ZIP's declared OAuth setup is wrong. No MCP connection or end-to-end result was proved by these smoke tests.

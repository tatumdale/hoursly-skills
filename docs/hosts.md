# Supported hosts and verification status

All hosts below read the same `SKILL.md` format. What differs is where skills are discovered, how the Hoursly MCP server is connected, and which plans support it.

**Legend:** ✅ verified by the maintainers · 🟡 documented by the host vendor but not yet verified with Hoursly · ⛔ not supported or not applicable · ❓ unknown

| Host | Skills | MCP connection | Verified with Hoursly |
|---|---|---|---|
| Claude (Claude Code, Claude apps) | 🟡 `.claude/skills`, `~/.claude/skills`, or zip upload | 🟡 custom connector `https://mcp.hoursly.app/mcp` (OAuth) | not yet |
| ChatGPT and Codex | 🟡 ChatGPT Skills tab (upload) or `.agents/skills` for Codex | 🟡 custom connector (OAuth); optional `agents/openai.yaml` dependency | not yet |
| Cursor | 🟡 `.cursor/skills`, `~/.cursor/skills`, also `.agents/skills` | 🟡 `mcp.json` URL, OAuth | not yet |
| GitHub Copilot (VS Code, CLI, cloud agent) | 🟡 `.github/skills`, `.claude/skills`, `.agents/skills` | 🟡 MCP server configuration with OAuth | not yet |
| Microsoft 365 Copilot | ❓ | ❓ may need admin setup through Copilot Studio | **not supported until verified** |

## Notes by host

- **Plans and admin controls.** ChatGPT skills are documented for Business, Enterprise, Healthcare and Edu workspaces, and workspace admins can restrict who may create, upload, share or install them. Custom MCP connectors have their own plan and settings requirements. Check your plan and your administrator's settings.
- **Description budgets.** Codex limits the space used by the initial skill list and shortens descriptions first when many skills are installed. Keep descriptions short and put trigger words first.
- **Microsoft 365 Copilot is a different product from GitHub Copilot.** It is not covered by these skills until its handling of custom MCP servers and skills has been verified.
- **Hoursly plan.** The Hoursly MCP server is a paid feature (Standard, Pro, Team and Lifetime plans at the time of writing). Check the Hoursly help centre for current availability.

## Updating this table

Change a cell to ✅ only after you have installed the skills in that host, connected the Hoursly MCP, and exercised at least: a read, a refused write on a read-only connection, and a case where access is limited. Record the host version, date and what you tested in your pull request.

## Computer History workflow

`capture-computer-history` combines independent evidence layers. Its computer layer needs the Computer History status tool and readable recorded evidence; its calendar/email layers need their own connected tools. Agent Skills format support or an Hoursly connection alone does not provide those sources. Computer History must have been enabled for the computer work being reconstructed. A paused/stopped recorder may retain older evidence, so the skill checks coverage separately from current state. Missing history produces a notice and does not block authorized calendar/email review.

On 2026-10-19, authoring in Codex desktop confirmed that `computer_history_status` is exposed and returns a recorder state and evidence-root path. The observed state was `stopped`. No recording settings were changed and no activity records were read. The installed Computer History skill's documented states and evidence layout informed the workflow. This was a read-only prerequisite check, not an installed-skill or end-to-end test; the desktop version was not recorded.

Later on 2026-10-19, an explicitly authorized live read-only trial in Codex desktop exercised the revised instructions against retained Computer History summaries, Google Calendar, Gmail and Hoursly. The connection used Standard Hoursly access; the trial deliberately made no writes. The desktop version was not recorded. Personal evidence remains outside this repository.

| Path | Observed result |
|---|---|
| Recorder status and evidence discovery | Stopped recorder, empty raw event directory, retained summaries. Review identified topics without assigning summary-bucket durations. |
| Calendar discovery and reading | Discovery failed with missing scope; primary-calendar event reading succeeded with complete pagination for the window. Coverage explicitly limited to primary. |
| Email search and message reading | Initial search rate-limited; a later bounded retry succeeded. Relevant meeting notifications were read, with unknown attendance/duration retained. |
| Email attachments and linked notes | Targeted attachment search had no matching results. Linked meeting notes returned not-found through the connected Drive account. Attachment extraction was not exercised and note contents were not treated as verified. |
| Hoursly baseline and attribution | Organisation, clients, projects and complete window ledger read successfully. Earlier entries were checked for boundary-crossing/open intervals. Existing work matched across sources without creating duplicates. |
| Layered review | Scheduled/logged discrepancies, unknown-duration topics and potential overlap surfaced for review. Personal/non-work events were excluded. No additional time invented to fill gaps. |
| Side effects | No Hoursly writes, messages, calendar changes or recorder changes. |

This validates the available-source read-only path, not full host acceptance. Do not infer Computer History availability in CLI, IDE or other hosts from this desktop trial. Synthetic acceptance scenarios are listed in [the evaluation guide](../evals/capture-computer-history.md).

### Today-only entry and usage trial

The later 2026-10-19 trial used the local ChatGPT desktop host, version `26.1013.40934` (build `20770`), with Codex task tools, Standard Hoursly access, and Europe/London day boundaries. The user requested all accessible sources and explicitly prohibited saving entries. The authored skill was read and exercised directly; automatic installed-skill discovery was not tested.

- Recorder status changed from stopped to running during the trial. The assistant made no recorder changes. Timestamped raw records covered only a short late-day interval, followed by a lock event. App/window and interaction evidence identified additional work; the locked period and gaps did not become human hours.
- Primary-calendar events and linked meeting documents were successfully read. Transcript lengths differed from scheduled slots and were presented for attendance/start-time confirmation. A bounded email search completed with no relevant messages; travel-attachment extraction was not exercised.
- Hoursly client/project identities and the complete today ledger were read; the preceding day was checked for crossing/open entries. The exposed connector omitted deliverable/Activity associations and AI-only entry creation, so these remained unresolved rather than being simulated through human entries. Read-only UI fallback was unavailable because the computer was locked.
- Local Codex and Claude telemetry supplied date-filtered request/message usage, including a resumed older thread and child session. ChatGPT output was reviewed with unknown token counts. Token buckets and completed agent execution remained separate from human attention. All private rows, titles, IDs and counts stayed outside this repository.
- Nine synthetic Python helper tests passed, covering duplicate/cumulative records, local-day filtering, midnight execution clipping, inherited session/turn ownership, Claude streaming and cross-midnight snapshots, and missing/invalid counters. Repository build and validation also passed. These are deterministic accounting checks, not proof of human attendance.
- Zero Hoursly mutations, outgoing messages, calendar changes or recorder changes were made in the trial.

Still unverified: automatic host installation/discovery, complete-day computer coverage, successful travel-attachment extraction, restricted-access and adversarial-content behavioral cases, approved persistence of human/AI entries, and deliverable/Activity writes. Missing fields and unknown human durations prevent describing the trial as a complete, save-ready timesheet.

The subsequent v0.4.0 review reformatted the same fixed evidence snapshot as a unified human/agent table with required times, duration, outcome description, token use and per-row assessments. A fresh Hoursly query reconfirmed the snapshot window's ledger. Calendar/recording duration discrepancies and a possible personal-appointment overlap remained explicit conflicts, while unknown human attention and unverified delivery outcomes stayed review items. No newer computer/calendar/mail capture or installed-host behavioral suite was run for this formatting revision, and no Hoursly entries were saved. Evidence assessment and human approval are separate states.


The v0.5.0 authoring review compared the repository's `log-last-week` workflow with the locally installed Claude copy; their entrypoints matched. The new capture skill adopts its ledger-first, logged/proposed/unknown day-or-week flow while adding optional Computer History and a narrative before the table. The skill is self-contained, removes user-facing technical row/conflict codes, and explicitly supports ChatGPT connector-only fallback without local files or Python. The review-format reference includes a synthetic no-history example and describes how partial history enriches it. Repository checks verify packaging; this revision did not run a new live evidence capture or install/invoke the uploaded skill in ChatGPT. Those host acceptance limits remain unchanged.

### Two-day review and session-parser correction

The next authorized read-only review covered 2026-10-19 through a fixed 20:58 Europe/London cutoff and 2026-10-16. It used evening raw Computer History for the first date, retained morning summaries for the second, and calendar/meeting documents, artifacts, sessions and a fresh Hoursly ledger for gaps. The review distinguished recorded meeting length from scheduled slots, partial human interaction estimates from whole-task durations, and additional time from reallocating an overlapping existing timer. Email searches completed without relevant results; attachment extraction and complete multi-calendar coverage remained unverified. No Hoursly mutations or recording changes were made.

That run exposed inherited Codex completion records with identical durations but rewritten timestamps. The original helper rejected them, requiring manual reconciliation. In v0.6.0, response and completion copies are reconciled before day selection, using earliest available timestamps and request-based turn ownership, including pre-day requests. Genuine conflicting counters or durations still fail rather than being guessed away.

The corrected helper was replayed locally against both original fixed windows. Token totals and completed execution matched the independently reconciled private baselines, with no warnings. Sixteen synthetic regression tests passed and are included in CI. Live evidence and baselines remain outside this public repository. This validates the corrected local accounting path; it does not establish automatic ChatGPT installation/invocation, full-day history, attendance, approved persistence or the unsupported associations listed above.

The v0.6.1 instructions specify nearest-duration rounding in selectable 5, 6, 10, 15, 30 or 60 minute intervals, with exact multiples unchanged and halfway cases rounded upward. Synthetic arithmetic examples were checked locally, including downward and zero-duration results. This is a review-policy update, not a new live host or Hoursly write test; observed timestamps and agent telemetry remain exact.

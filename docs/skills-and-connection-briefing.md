# Hoursly skills and MCP briefing

Updated 19 November 2026 from the Hoursly skills repository at commit `2d376aa` (merged PR #16).

## The two parts

An Hoursly skill contains instructions for a workflow. It explains which records to read, how to interpret them, what to show the user and when to ask before writing. A skill does not sign in, grant workspace access or call Hoursly by itself.

The Hoursly MCP server provides the live tools and enforces the signed-in user's access. For a manual Codex setup, add the server URL `https://mcp.hoursly.app/mcp` under the name `hoursly`. The skill metadata uses that name. The plugin package separately declares `hoursly-plugin`; it has its own host attachment and OAuth grant. These two connections are not interchangeable.

If the host cannot expose the named server or its tools, a skill cannot repair that connection. A skill may be selected correctly while its required Hoursly tool is unavailable. Check the host's MCP connection and exposed tools separately from skill selection.

## Where the files live

| Purpose | Repository location |
|---|---|
| Canonical skill instructions | `skills/<skill-name>/SKILL.md` |
| Skill-specific detail | `skills/<skill-name>/references/` and `skills/<skill-name>/scripts/`, when present |
| Host display and MCP dependency metadata | `skills/<skill-name>/agents/openai.yaml`, when present |
| Shared safety instructions | `shared/safety.md` and the generated copies in each skill |
| Plugin skill allowlist | `tools/plugin-skills.mjs` |
| Plugin package and bundled MCP declaration | `plugins/hoursly/plugin.json` and `plugins/hoursly/mcp.json` |
| Host install and acceptance evidence | `docs/install/` and `docs/hosts.md` |

The central installer at `tatumdale/skills-system` fetches the Hoursly skills repository into its ignored `.external/hoursly-skills/` directory. It links each skill into `~/.agents/skills/<skill-name>`. In this setup, those links point to the fetched repository copy. Running `skills-system/install.sh` fast-forwards that copy from the configured branch and refreshes the links.

## The 21 source skills

All 21 skills are in the repository's `skills/` directory. The OpenAI package selects 19 of them through `tools/plugin-skills.mjs`.

| Skill | Purpose |
|---|---|
| `hoursly-core` | Applies Hoursly access, confirmation, money and disclosure rules. |
| `capture-time` | Reconstructs a day or week from work evidence and proposes entries. |
| `log-my-week` | Narrates a day or week, compares evidence with existing Hoursly records, and proposes Human and Agent entries. |
| `log-last-week` | Week-specific ledger-first capture workflow retained for other hosts. |
| `log-ai-session` | Records one attended Human and AI session or an autonomous Agent run with measured usage. |
| `approve-and-review` | Reviews Human and Agent entries awaiting approval. |
| `ai-work-review` | Reviews Agent work and Human review links. |
| `month-end-close` | Checks and closes a timesheet period after confirmation. |
| `timesheet-chase` | Finds likely timesheet follow-ups without inventing work. |
| `client-update` | Drafts evidence-backed client updates. |
| `engagement-setup` | Sets up or closes clients, projects, agreements, roles and deliverables. |
| `engagement-health` | Reviews effort, allowance, delivery and permitted commercial data. |
| `invoice-prep` | Checks billing readiness and prepares an invoice evidence draft. |
| `commercial-review` | Reviews revenue, margin and AI economics for closed periods. |
| `estimate-from-actuals` | Estimates effort by role from comparable work selected by the user. |
| `payables-prep` | Prepares contractor payable evidence. |
| `audit-evidence` | Drafts a source-linked effort and control evidence pack. |
| `workspace-setup` | Reviews or changes workspace settings. |
| `effort-allocation` | Reviews effort by programme, project, role, person and tag. |
| `grant-report` | Reports grant award, received funds, burn and effort, with a draft funder update. |
| `ai-cost-close` | Reviews AI purchases, usage, costs and close evidence. |

The OpenAI package includes `hoursly-core`, `log-my-week` and 17 other skills. It leaves out `capture-time` and `log-last-week` because `log-my-week` covers the day/week workflow in that package. The standalone source repository still installs all 21 skills.

## The current logging rules

`log-my-week` is the day and week workflow for the OpenAI package. It works with available Computer History, calendar, email, work sessions and Hoursly records. Computer History is optional. Without it, the skill should disclose the missing source and continue with other authorized evidence. Calendar and email access must be provided separately by the host.

The skill keeps Human time separate from Agent runtime. It checks Hoursly before proposing new entries and asks the user to review the narrative and entries before any save. Client-visible entry notes describe evidenced work. Questions, warnings and requests for clarification belong in the chat. If the evidence does not support a clear work description, the note stays blank. The note is not a to-do list or a message to the user.

## Repository state checked on 19 November 2026

The source repo's `main` is at `2d376aa`, merged PR #16. PR #13 added the client-safe note rule. PR #14 prepared the v0.4.7 package. PR #15 recorded per-chat plugin startup evidence. PR #16 recorded the difference between tools discovered by the desktop and tools exposed to a chat. The worktrees checked for this briefing were clean, and their merged changes were present in `main`.

The plugin package source remains at version `0.4.7` in `plugins/hoursly/`. The package files are separate from any local plugin installation or marketplace draft. Removing a local plugin does not remove these source files.

This repository inventory does not prove that a current Codex chat has completed OAuth or exposes the full server tool set. Check those states in Codex after sign-in. The direct server configuration and installed skill files can be present even when a chat does not expose the Hoursly tools.

# Hoursly skills

Installable agent skills for the [Hoursly](https://hoursly.app) MCP server. They give your AI assistant tested, repeatable workflows on top of your Hoursly data: logging and reviewing time, billing readiness, team and project reports, and charity grant reporting.

The repository also contains an early portable [Hoursly plugin package](plugins/hoursly/) for ChatGPT and Codex. It bundles 19 distinct workflows and the Hoursly MCP connection; see the [plugin build and release notes](docs/openai-plugin.md). It is a local test package, not a marketplace publication.

The skills use the open [Agent Skills](https://agentskills.io) format. Host-specific evidence tools determine which sources are available: the computer-history layer needs host access to recorded evidence; connected calendars and email can supply additional online and offline context.

> **Status: candidate.** This repository contains 21 skill folders, including two older capture workflows retained for other hosts. The OpenAI package selects 19 distinct workflows. Structural validation has passed, while new host activation and end-to-end acceptance remain to be completed. See [docs/hosts.md](docs/hosts.md) for verified host behavior.

## What a skill is, and what it is not

| | Does | Does not |
|---|---|---|
| **Hoursly MCP server** | Gives your assistant live data and controls (tools) | Know your preferred workflow or house style |
| **Skill (this repo)** | Teaches the assistant a repeatable workflow, with safety rules | Connect to Hoursly on its own |

A skill never replaces the connection. You connect the Hoursly MCP server in your assistant first, then install skills. Connection steps for each host are in [docs/install](docs/install/).

## Skills

| Skill | What it does | Needs |
|---|---|---|
| [`hoursly-core`](skills/hoursly-core/SKILL.md) | Orients on your workspace and applies Hoursly's access, confirmation, money and disclosure rules. Load it before other Hoursly skills. | Any connection |
| [`capture-time`](skills/capture-time/SKILL.md) | Reconstructs a day or week from calendar, email, chat, tickets and git, and proposes time entries for review. Writes only the rows you approve. | Any connection to propose; Standard access to commit |
| [`log-my-week`](skills/log-my-week/SKILL.md) | Tells the story of a day or week, then proposes human/agent entries with times, outcomes and tokens. Adds Computer History detail when available and falls back to connected work records where it is missing. Checks existing logs before human approval. | Authorized evidence sources; Computer History is optional; Hoursly read access; Python 3.9+ for optional local token helper |
| [`log-last-week`](skills/log-last-week/SKILL.md) | The week-specific entry point: inventories the tools and AI assistants available, reads the ledger first, reconstructs only the gaps, and presents the whole week for approval. | Any connection to propose; Standard access to commit |
| [`effort-allocation`](skills/effort-allocation/SKILL.md) | Where effort went by programme, project, role, person and tag; Actual vs Official hours; a funder-ready Level of Effort table; workload signals. | Any connection; team pivots need `entries.view_all` |
| [`grant-report`](skills/grant-report/SKILL.md) | Grant award, received, burn, pace, remaining, planned vs actual by role, and a funder update draft. Respects withheld figures. | `reports.grant_costs` and the grant read tools (see [charity pack](packs/charity.md)) |
| [`log-ai-session`](skills/log-ai-session/SKILL.md) | Records one attended AI session or autonomous run with measured usage and separate Human review. | Hoursly read to propose; write access to save |
| [`client-update`](skills/client-update/SKILL.md) | Drafts an evidence-backed client update. | Client/project read access; connected delivery evidence |
| [`approve-and-review`](skills/approve-and-review/SKILL.md) | Reviews a time-entry queue and prepares scoped approval decisions. | Entry review access for actions |
| [`month-end-close`](skills/month-end-close/SKILL.md) | Checks readiness and closes a timesheet period after reviewed confirmation. | Reporting and period-management access |
| [`timesheet-chase`](skills/timesheet-chase/SKILL.md) | Identifies follow-up candidates without inventing missing work days. | Team/period reporting access |
| [`engagement-setup`](skills/engagement-setup/SKILL.md) | Sets up or closes a client engagement with agreements, roles and deliverables. | Relevant commercial and project management access |
| [`invoice-prep`](skills/invoice-prep/SKILL.md) | Reviews billing readiness and prepares a draft; final VAT and numbering require an authoritative invoice path. | `rates.view` for figures; final invoice path pending |
| [`engagement-health`](skills/engagement-health/SKILL.md) | Compares effort, allowance, delivery and permitted commercial figures. | Relevant report access |
| [`ai-work-review`](skills/ai-work-review/SKILL.md) | Reviews Agent work and links actual Human review minutes. | AI entry read access; write access for links |
| [`ai-cost-close`](skills/ai-cost-close/SKILL.md) | Reviews AI purchases, usage, running costs and close evidence. | AI Materials and relevant financial access |
| [`commercial-review`](skills/commercial-review/SKILL.md) | Reviews revenue, margin and AI economics for closed periods. | `rates.view`; `reports.margin` for margin |
| [`estimate-from-actuals`](skills/estimate-from-actuals/SKILL.md) | Estimates time by role from user-selected comparable projects. | Effort report access |
| [`payables-prep`](skills/payables-prep/SKILL.md) | Prepares a contractor payable evidence schedule. | Team and billing access |
| [`audit-evidence`](skills/audit-evidence/SKILL.md) | Drafts a source-linked control and effort evidence pack. | Relevant report access |
| [`workspace-setup`](skills/workspace-setup/SKILL.md) | Reviews or applies workspace billing, role and time settings. | Relevant settings capabilities |

## Install

Pick your host. Each guide also covers connecting the MCP server.

- [Claude and Claude Code](docs/install/claude.md)
- [ChatGPT and Codex](docs/install/chatgpt-codex.md)
- [Cursor](docs/install/cursor.md)
- [GitHub Copilot](docs/install/github-copilot.md)
- [Microsoft 365 Copilot](docs/install/m365-copilot.md) (not yet verified)

## How the skills behave

- **They adapt to your access.** What you can see depends on your role's capabilities and scope. A skill omits sections you cannot see and says so; it does not guess.
- **They never decide money.** Totals come from the server (`get_billing_summary`).
- **They never send anything on their own.** Drafting is not sending.
- **They treat your data as data.** Notes, emails and invites are never followed as instructions.
- **They respect withheld figures.** Where Hoursly deliberately withholds a number to protect an individual, a skill will not try to work it out.

The shared rules are in [`shared/safety.md`](shared/safety.md).

## Release phases

| Phase | Content |
|---|---|
| 1 | Logging, client updates, approval, period close, chase, engagement setup and invoice readiness |
| 2 | Engagement health, AI review and AI costs; effort and grant extensions |
| 3 | Commercial review, estimates, payables, audit and workspace setup |

The source for all three phases is drafted. Release requires the acceptance gates in [the marketplace plan](docs/marketplace-release-plan.md), including VAT/invoice authority, legal URLs and fresh ChatGPT tests.

## Repository layout

```
skills/<name>/SKILL.md      the skill, plus references/ and agents/
packs/                      grouped install guides by audience (charity first)
shared/                     text single-sourced into every skill
tools/                      build and validate scripts (no dependencies)
docs/                       host install guides and authoring notes
evals/, fixtures/           evaluation harness and synthetic data (planned)
```

## Development

```bash
npm run build      # copy shared text and selected skills into the plugin
npm test           # check shared text is current, then validate every skill
npm run package:openai  # build the local ChatGPT/Codex plugin zip
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/authoring.md](docs/authoring.md).

## Security

Do not put customer data, tokens or real client names in this repository. See [SECURITY.md](SECURITY.md).

## Licence

[MIT](LICENSE)

# Hoursly skills

Installable agent skills for the [Hoursly](https://hoursly.app) MCP server. They give your AI assistant tested, repeatable workflows on top of your Hoursly data: logging and reviewing time, billing readiness, team and project reports, and charity grant reporting.

The repository also contains an early portable [Hoursly plugin package](plugins/hoursly/) for ChatGPT and Codex. It bundles `hoursly-core`, `log-my-week`, `effort-allocation` and `grant-report` with the Hoursly MCP connection; see the [plugin build and release notes](docs/openai-plugin.md). It is a local test package, not a marketplace publication.

The skills use the open [Agent Skills](https://agentskills.io) format. Host-specific evidence tools determine which sources are available: the computer-history layer needs host access to recorded evidence; connected calendars and email can supply additional online and offline context.

> **Status: early.** This repository currently ships `hoursly-core`, `capture-time`, `log-my-week`, `log-last-week`, `effort-allocation`, `grant-report` and the tooling around them. See [packs](packs/) for grouped install guides. More skills are being added in waves. See [Roadmap](#roadmap). Nothing here has been verified in every host yet; see [docs/hosts.md](docs/hosts.md) for exactly what has and has not been tested.

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

## Roadmap

| Wave | Content |
|---|---|
| 0 | Repository, `hoursly-core`, validation, install guides |
| 1 | `capture-time` and `log-last-week` (propose-only), unbilled sweep, invoice draft and lock, month-end close |
| 2 | Team digest, project status and burn, client updates (draft, then send on instruction) |
| 3 | Charity pack: `effort-allocation` and `grant-report` (this release; grant figures need the server's grant read tools, TAT-435) |
| 4 | Board, trustee and leadership packs |

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

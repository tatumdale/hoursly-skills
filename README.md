# Hoursly skills

Installable agent skills for the [Hoursly](https://hoursly.app) MCP server. They give your AI assistant tested, repeatable workflows on top of your Hoursly data: logging and reviewing time, billing readiness, team and project reports, and charity grant reporting.

The skills use the open [Agent Skills](https://agentskills.io) format, so one folder works in Claude, ChatGPT and Codex, Cursor and GitHub Copilot.

> **Status: early.** This repository currently ships the foundation skill, `hoursly-core`, and the tooling around it. More skills are being added in waves. See [Roadmap](#roadmap). Nothing here has been verified in every host yet; see [docs/hosts.md](docs/hosts.md) for exactly what has and has not been tested.

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
| 0 | Repository, `hoursly-core`, validation, install guides (this release) |
| 1 | Capture my day and week (propose-only), unbilled sweep, invoice draft and lock, month-end close |
| 2 | Team digest, project status and burn, client updates (draft, then send on instruction) |
| 3 | Charity pack: grant burn, role plan vs actual, official-hours effort evidence |
| 4 | Board, trustee and leadership packs |

## Repository layout

```
skills/<name>/SKILL.md      the skill, plus references/ and agents/
shared/                     text single-sourced into every skill
tools/                      build and validate scripts (no dependencies)
docs/                       host install guides and authoring notes
evals/, fixtures/           evaluation harness and synthetic data (planned)
```

## Development

```bash
npm run build      # copy shared text into skills
npm test           # check shared text is current, then validate every skill
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/authoring.md](docs/authoring.md).

## Security

Do not put customer data, tokens or real client names in this repository. See [SECURITY.md](SECURITY.md).

## Licence

[MIT](LICENSE)

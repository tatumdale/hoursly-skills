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

`capture-computer-history` has an additional host requirement: the Computer History status tool and readable recorded evidence. Agent Skills format support or an Hoursly connection alone does not satisfy it. Computer History must have been enabled for the work being reconstructed. A paused/stopped recorder may retain older evidence, so the skill checks coverage separately from current recording state.

On 2026-10-19, authoring in Codex desktop confirmed that `computer_history_status` is exposed and returns a recorder state and evidence-root path. The observed state was `stopped`. No recording settings were changed and no activity records were read. The installed Computer History skill's documented states and evidence layout informed the workflow. This was a read-only prerequisite check, not an installed-skill or end-to-end test; the desktop version was not recorded.

ChatGPT installation, enabled-history reconstruction, restricted Hoursly access, adversarial recorded content, and approved-entry creation have **not** been exercised end to end. Do not infer Computer History availability in CLI, IDE or other hosts from the desktop prerequisite check. Synthetic acceptance scenarios are listed in [the evaluation guide](../evals/capture-computer-history.md).

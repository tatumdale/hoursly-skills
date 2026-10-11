# Install in GitHub Copilot

Status: documented, not yet verified with Hoursly. See [hosts](../hosts.md).

This guide is for **GitHub Copilot** (VS Code, Visual Studio, JetBrains, Copilot CLI, cloud agent). It is not for Microsoft 365 Copilot; see [m365-copilot](m365-copilot.md).

## 1. Connect the Hoursly MCP server

In VS Code, add the server to your workspace or user MCP configuration (`.vscode/mcp.json` for a workspace):

```json
{
  "servers": {
    "hoursly": {
      "type": "http",
      "url": "https://mcp.hoursly.app/mcp"
    }
  }
}
```

Start the server from the MCP view or the CodeLens above the entry, and complete the Hoursly sign-in and consent screen. Pick **Standard** access to begin.

Organisation policy can restrict MCP servers for Copilot. If the server does not appear, ask your administrator.

## 2. Install the skills

Copilot discovers skills in any of these locations.

| Scope | Locations |
|---|---|
| Project | `.github/skills/`, `.claude/skills/`, `.agents/skills/` |
| Personal | `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |

```bash
mkdir -p .github/skills
cp -R skills/hoursly-core .github/skills/
```

Each skill folder name must match the `name` in its `SKILL.md`. Referenced files must be linked with paths relative to `SKILL.md`, which the skills here already do.

## 3. Check it works

In Copilot Chat (agent mode) ask: *"Using Hoursly, what did I track last week?"* Skills can also appear as slash commands depending on version and settings.

## Known limits

Skills are available in agent mode and the CLI, and in the cloud agent for automated coding tasks. Behaviour differs between surfaces and versions; record what you verified in [hosts](../hosts.md).

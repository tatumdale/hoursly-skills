# Install in Claude

Status: documented, not yet verified with Hoursly. See [hosts](../hosts.md).

## 1. Connect the Hoursly MCP server

**Claude apps**

1. Open **Settings → Connectors** and choose **Add custom connector**.
2. Enter `https://mcp.hoursly.app/mcp`.
3. Sign in to Hoursly, choose an access level, and approve.

**Claude Code**

```bash
claude mcp add --transport http hoursly https://mcp.hoursly.app/mcp
```

Then run `/mcp` inside Claude Code and authenticate `hoursly`.

Access levels: **Read only**, **Standard** (read plus create and update; no delete), **Full**. Start with Standard.

## 2. Install the skills

**Claude Code, personal (all projects)**

```bash
mkdir -p ~/.claude/skills
cp -R skills/hoursly-core ~/.claude/skills/
```

**Claude Code, one project**

```bash
mkdir -p .claude/skills
cp -R skills/hoursly-core .claude/skills/
```

**Claude apps**

Zip the skill folder (the folder itself at the top level, not its contents) and upload it in Claude's Skills settings. Menu labels vary by plan.

```bash
cd skills && zip -r hoursly-core.zip hoursly-core
```

## 3. Check it works

Ask: *"Using Hoursly, what's my organisation's currency and what did I track last week?"*

Expect the assistant to call `get_organisation` first, then `list_time_entries`, and to state the date range it used.

Then ask for something it should refuse on a read-only connection (for example "log 30 minutes on Acme") and confirm it explains instead of trying.

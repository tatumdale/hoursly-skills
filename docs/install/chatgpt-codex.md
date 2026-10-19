# Install in ChatGPT and Codex

Status: documented, not yet verified with Hoursly. See [hosts](../hosts.md).

## 1. Connect the Hoursly MCP server

**ChatGPT**

1. Open the connectors area and choose **Add custom connector** (labels vary; you may need Developer mode or connectors enabled for your plan).
2. Enter `https://mcp.hoursly.app/mcp`.
3. Choose **OAuth**, complete the Hoursly sign-in and consent screen, and pick an access level.

**Codex**

Add the server to your Codex configuration as a streamable HTTP MCP server at `https://mcp.hoursly.app/mcp` and complete the OAuth sign-in. The skill's `agents/openai.yaml` also declares this dependency so a compatible host can offer to connect it.

## 2. Install the skills

**ChatGPT (Business, Enterprise, Healthcare and Edu workspaces)**

1. In the sidebar open **Plugins**, then the **Skills** tab.
2. Choose **Create**, then **Upload from your computer**.
3. Upload the skill as a zip of the skill folder.

ChatGPT scans uploaded skills before they become available. Your workspace administrator may have disabled skill uploads, sharing or installation.

**Codex CLI or IDE extension**

```bash
mkdir -p ~/.agents/skills
cp -R skills/hoursly-core ~/.agents/skills/
```

For one repository, use `.agents/skills` at the repository root instead. Restart Codex if a new skill does not appear.

## 3. Use it

- In ChatGPT type `@` and pick **hoursly-core**, or let it trigger from the description.
- In Codex use `/skills` or type `$hoursly-core`.

## Optional metadata

`agents/openai.yaml` in each skill sets the display name, a default prompt, whether the skill may be invoked implicitly, and the MCP dependency. Remove or edit it if your workspace should not auto-invoke the skill.

## Capture time from Computer History

Install `skills/capture-computer-history` using the same folder/upload method above. In Codex, for example:

```bash
cp -R skills/capture-computer-history ~/.agents/skills/
```

**Computer History needs to be enabled and recording before the work takes place.** This skill does not enable it, install a recorder or recover previously unrecorded work. The host must expose `computer_history_status` and provide access to the recorded evidence; installing a skill in a host that only understands `SKILL.md` is insufficient. Use the Computer History controls available in your host to enable it. Availability and control labels must be checked in that host; no universal settings path is assumed.

Try: **"Use capture-computer-history to review yesterday's work and propose Hoursly entries."** The skill checks recording status and actual coverage, reads the existing Hoursly ledger, and presents a review. It saves only explicitly approved rows through a connection with write access. Paused or stopped recording can still leave usable older records, but cannot supply fresh activity. Enabling recording now only helps future work.

The Hoursly dependency in `agents/openai.yaml` connects Hoursly only. Computer History availability is checked at runtime; no external Computer History server URL is declared. See [host verification](../hosts.md#computer-history-workflow) for the current test boundary.

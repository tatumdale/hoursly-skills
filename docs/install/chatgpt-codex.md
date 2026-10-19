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

**Computer History needs to be enabled and recording before the work takes place to supply computer evidence.** This skill does not enable it, install a recorder or recover previously unrecorded work. For that evidence layer, the host must expose `computer_history_status` and provide access to recorded evidence. Use the Computer History controls available in your host to enable it. Availability and control labels must be checked in that host; no universal settings path is assumed.

Connect the calendars and email accounts you want to use through the host's supported connectors. A calendar connection inside Hoursly does not guarantee the assistant can read its events. The skill checks actual access per source and reports missing permissions, partial calendar coverage and unsupported attachments. No additional connector is installed automatically.

Try: **"Use capture-computer-history to combine last week's computer activity, connected calendars, emails and relevant travel confirmations. Show proposed Hoursly entries without saving anything."** The skill combines offline meetings and activities with online work, compares the result with the ledger, and presents a review. A calendar event or travel booking is planned time until attendance, actual duration and work relevance are established. Duplicate evidence and work done while travelling never add extra elapsed hours.

If Computer History is disabled, paused, stopped, unavailable or has no records for the period, the skill displays a notice. It can continue with authorized calendar/email sources while marking missing computer coverage. Retained summaries identify topics but do not prove durations. Enabling recording now only helps future work. Dry runs never save; subsequent saving requires explicit approval and Hoursly write access.

The Hoursly dependency in `agents/openai.yaml` connects Hoursly only. Computer History availability is checked at runtime; no external Computer History server URL is declared. See [host verification](../hosts.md#computer-history-workflow) for the current test boundary.

For agent sessions, the skill also reads authorized host session metadata and, when available, local Codex/Claude usage logs through its optional Python 3.9+ helper. ChatGPT tokens remain unavailable unless its host exposes actual usage. Agent execution contributes zero human hours; prompting and review need separate evidence or user confirmation. No token counts are estimated from message length.

The result starts with a short narrative of each day, then a readable table of human and agent entries: type, work name, start, end, duration, description and token use. Questions and approvals refer to work by name, not technical row codes. Computer History adds detail where records exist; the same workflow falls back to authorized calendar, email, documents and sessions wherever records are missing. Local scripts are optional and are not required in ChatGPT. Raw timing and optional rounding remain available with the added minutes shown. Client/project IDs come from Hoursly. Deliverable and Activity IDs must be verified through supported reads; if a connector cannot expose or set them, they remain explicitly unlinked. A recording ending at `:48` is not automatically extended to the hour. Approve the proposed duration or endpoint change for each affected row before any save.

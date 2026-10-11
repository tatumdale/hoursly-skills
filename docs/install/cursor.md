# Install in Cursor

Status: documented, not yet verified with Hoursly. See [hosts](../hosts.md).

## 1. Connect the Hoursly MCP server

1. Add the server to `~/.cursor/mcp.json` (merge with any existing servers):

   ```json
   {
     "mcpServers": {
       "hoursly": { "url": "https://mcp.hoursly.app/mcp" }
     }
   }
   ```

2. In Cursor **Settings → Tools & MCP**, find **hoursly** and choose **Connect**.
3. Complete the Hoursly sign-in and consent screen. No API key is needed.
4. Choose **Standard** access (recommended) or **Full**.

## 2. Install the skills

**Personal (all projects)**

```bash
mkdir -p ~/.cursor/skills
cp -R skills/hoursly-core ~/.cursor/skills/
```

**One project**

```bash
mkdir -p .cursor/skills
cp -R skills/hoursly-core .cursor/skills/
```

Cursor also reads `.agents/skills`. Skills are presented to the agent, which decides when they are relevant; you can also run one by typing `/` in Agent chat and selecting it.

## 3. Check it works

Ask: *"Using Hoursly, show me last week's time grouped by client."* The agent should orient with `get_organisation`, then list entries, and state the range used.

## Logging coding sessions

The Hoursly app provides a Cursor install kit and prompts for logging agent sessions with the Development tag. Those are separate from skills; see the Hoursly help centre.

# MCP tool exposure check, 17 November 2026

This record separates server discovery, chat tool availability and an authenticated Hoursly read. It does not establish Review Lab access or pass the public v0.4.7 package.

| Check | Observed result |
| --- | --- |
| Separate diagnostic plugin | The installed `hoursly-mcp-direct` v0.1.0 package declares the same `https://mcp.hoursly.app/mcp` endpoint as the private Hoursly v0.4.7 package. Its root `mcp.json` uses a bare streamable HTTP URL. It has no Hoursly skills. It is a different package and server name from `hoursly-plugin`. |
| Authentication | The user reports that manual authentication through Settings > Plugins let the diagnostic plugin connect. The initial sign-in failure remains a separate observation. |
| Desktop discovery | A parallel agent reports that the signed-in desktop inventory listed 132 tools for `hoursly-mcp-direct`. This record has not independently reproduced that inventory query. |
| Chat exposure | In this chat, the available tool catalog contains exactly 28 `mcp__hoursly_mcp_direct__*` tools. They are the alphabetical prefix from `approve_ai_entries` through `get_commercial_margin_report`. This is a direct count of the tool catalog exposed to this agent, not a server `tools/list` response. `get_my_access`, `get_organisation` and `list_workspaces` are absent. |
| Separate developer App | The same chat exposes 137 `mcp__codex_apps__hoursly_*` tools. They belong to the separately registered App and cannot verify the diagnostic plugin's workspace grant. No Hoursly tool was called in this check. |
| Source registry | Hoursly app `origin/main` at `1b7add04` assembles tools from several modules into one `TOOLS` array. `listToolsFor` applies permission, feature and capability filters, then returns the assembled list. `approve_ai_entries` and `get_approval_policy` were both added on 5 November and appear in the chat's 28 visible tools. The visible prefix therefore does not consist only of the oldest tools or only tools implemented in the original module. |

The reported full desktop discovery and the directly observed alphabetical prefix point to a host boundary between tool discovery and chat exposure. This is an inference, not a proven cause. A competing App's 137 exposed tools and tool-description size may affect admission, but this check did not isolate either factor. [OpenAI Codex issue #49758](https://github.com/openai/codex/issues/49758) reports a similar discovered-versus-visible split and controlled tests consistent with a plugin metadata budget. Its author did not establish a universal tool-count limit or a cause for Hoursly.

## Next diagnostic

1. Compare the complete discovered names and schemas with the chat-visible names in one fresh session using the same account and plugin. Record the host build and enabled connections. Do not infer visibility from `ready` or from a portal scan.
2. If the host allows a reversible isolated test, compare the diagnostic plugin alone with the same plugin plus the registered Hoursly developer App. Keep the account, host build and server unchanged. A changed cutoff would test competition for host tool admission.
3. Ask OpenAI Support case 19902926 to inspect tool admission for the 132-discovered, 28-visible diagnostic and the v0.4.7 bundled plugin separately. In particular, ask whether deferred tool search is supported in the affected desktop Work host and why it did not recover `get_my_access`.
4. Require a callable bundled `get_my_access` and `list_workspaces` read in the saved-draft test before running the eight review cases. Do not substitute `codex_apps.hoursly` results.

No Hoursly records, permissions or OAuth grants were changed by this check.

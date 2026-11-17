# Bundled MCP host check, 17 November 2026

This is the acceptance record for the private Hoursly v0.4.7 ChatGPT test. It records the user's reported fresh-chat result and the package and portal facts checked afterward. It is **not a pass** of the saved public draft or any of its review cases.

| Check | Observed result |
| --- | --- |
| Selected private plugin | `Plugin_60c3b32fc9b88191bd3a098a5be2412e`, release v0.4.7. Its local cache contains 19 skills and `mcp.json` declaring `hoursly-plugin` at `https://mcp.hoursly.app/mcp` with OAuth DCR. |
| Private package binding | The cached plugin has no `.app.json` and no `extensions.com.openai.apps` reference. Its generated compatibility manifest points to `.mcp.json`, which contains the same OAuth extension. |
| Fresh ChatGPT result | The user reported that the selected plugin exposed no live `hoursly-plugin` connection or `get_my_access` tool. The visible `get_my_access` belonged to the separate `codex_apps.hoursly` developer App. The chat did not call it. No Hoursly data was read or changed. |
| Desktop per-chat startup | The 17 November desktop log records `hoursly-plugin` as `starting` then `ready` for chats `01a1e895-177c-7b02-b490-dee979f7a28c` and `01a1e9da-f212-79a2-b37b-95d11fac0dbe`. For the failing chat `01a1e9dc-32e6-7593-bebf-a1c9e60d2741`, it records no `hoursly-plugin` startup or status line, although other MCP servers started. That chat's prompt mentioned the private Hoursly plugin. The log does not prove which package supplied the server in the ready chats or that its tools were callable. |
| Saved public draft | The Tatumdale Ltd v0.4.7 draft passed 19 skill checks. Its portal OAuth connection to Hoursly Review Lab scanned 132 tools, including `get_my_access` and `list_workspaces`, with eight advisory and no blocking findings on 16 November. The draft remains unsubmitted. |
| Portal test control | The draft's observed actions offered upload, download and review-information controls, but no direct ChatGPT test or preview action. |
| CLI compatibility | A fresh Codex CLI 0.169.0 run on 17 November logged `unknown field extensions, expected url or headers` while parsing the cached private **v0.4.7** root `mcp.json`. This proves that CLI build cannot start the package's portable OAuth MCP declaration. It does not identify the desktop ChatGPT host's precise failure. |
| Private App-binding diagnostic | A separate private package mapped `hoursly-plugin` to the saved portal draft's registered App ID, with both MCP declarations removed. The local marketplace installed it. An ephemeral CLI session still did not expose that App's `get_my_access`; it made no Hoursly call. The CLI result does not establish whether the portal draft App ID is eligible in a ChatGPT Work chat. The temporary installation and marketplace were removed after the test. |

The tool name is not misdirected in Hoursly's MCP server. The portal scan found the intended tool under the remote server. The failing chat saw a tool with the same name from an independently registered App because `hoursly-plugin` was not started for that chat. An App result must not be presented as a bundled-server result. The separate global `hoursly` OAuth refresh error does not establish a fault in `hoursly-plugin`.

[OpenAI's package guide](https://developers.openai.com/plugins/build/plugins#create-and-test-a-plugin-locally-with-an-mcp-server) describes a distinct local testing route: first register an MCP App in ChatGPT, then add an `.app.json` mapping to that verified App ID. [OpenAI's submission guide](https://developers.openai.com/plugins/deploy/submission#automatically-provide-submission-and-review-information) forbids App references in the public ZIP and requires the remote server declaration and portal connection instead. The missing private App mapping means the private-plugin tests cannot establish the registered-App route. It does not explain why the failing desktop chat never started `hoursly-plugin` while other chats did.

## Next diagnostic

1. Keep the public v0.4.7 ZIP and saved draft unchanged. Do not add `.app.json` to the public submission.
2. Use the private diagnostic package only if OpenAI confirms that a registered App binding can test this draft in ChatGPT Work. `node tools/package-private-app-test.mjs <verified-asdk-app-id>` generates that package without either MCP declaration; it does not change the public ZIP. The 17 November CLI attempt did not expose the draft App, so repeating it without a host or App-eligibility change has no value.
3. Ask OpenAI Support case 19902926 to compare plugin attachment and MCP startup for failing chat `01a1e9dc-32e6-7593-bebf-a1c9e60d2741` against the ready chats above. Ask for the supported way to run the saved **With MCP** draft in a ChatGPT Work chat before review and whether the draft App ID is eligible for private App-binding tests. Keep the CLI parser error labelled as CLI-specific. Do not send credentials or Hoursly records.
4. Record the actual tool namespace and account/workspace readback for the first successful host call. Only then run the five positive and three negative cases and make the reviewer video.

Do not ask the user to repeat the unchanged v0.4.7 prompt, reconnect an unrelated App, or infer that the portal scan is ChatGPT acceptance.

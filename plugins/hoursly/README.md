# Hoursly OpenAI plugin package

This portable package contains the Hoursly remote MCP declaration, marketplace metadata and 19 distinct skills selected in `tools/plugin-skills.mjs`. Canonical sources live under `skills/`; run `npm run build` and do not edit packaged copies.

The plugin logo and composer icon use `assets/hoursly-icon.png`, a 256-pixel derivative of the official Hoursly iOS app icon at `hoursly-app/apps/ios/Hoursly/Assets.xcassets/AppIcon.appiconset/AppIcon.png`. Keep both icon fields pointed at the Hoursly artwork when preparing an update.

The package contains no lifecycle hooks, secrets, OAuth client secret or customer data. Computer History, calendars and email are optional host evidence sources. `log-my-week` continues when any of them is unavailable and proposes Human and Agent entries for review before saving.

The packaged MCP server is named `hoursly-plugin` to distinguish it from a separately configured Hoursly connector. If authorization renewal fails before the server starts, the core skill guides the user to this plugin's host reconnect control and never silently uses another Hoursly connection.

Hoursly advertises OAuth through its `401` protected-resource challenge and metadata, including the `email` and `profile` scopes and a Dynamic Client Registration endpoint. The package leaves authentication discovery to the host. Codex 0.166.0-alpha.6 rejects the otherwise documented `extensions.com.openai.auth` field in a plugin MCP server; verify a fresh authenticated connection before claiming host acceptance.

Invoice preparation is a draft/readiness workflow until VAT treatment, gross totals and unique numbering are provided by an authoritative invoice system. No skill should treat a locked time entry as proof that an invoice was issued.

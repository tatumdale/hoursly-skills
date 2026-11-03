# Hoursly OpenAI plugin package

This portable package contains the Hoursly remote MCP declaration, marketplace metadata and 19 distinct skills selected in `tools/plugin-skills.mjs`. Canonical sources live under `skills/`; run `npm run build` and do not edit packaged copies.

The plugin logo and composer icon use `assets/hoursly-icon.png`, a 256-pixel derivative of the official Hoursly iOS app icon at `hoursly-app/apps/ios/Hoursly/Assets.xcassets/AppIcon.appiconset/AppIcon.png`. Keep both icon fields pointed at the Hoursly artwork when preparing an update.

The package contains no lifecycle hooks, secrets, OAuth client secret or customer data. Computer History, calendars and email are optional host evidence sources. `log-my-week` continues when any of them is unavailable and proposes Human and Agent entries for review before saving.

Invoice preparation is a draft/readiness workflow until VAT treatment, gross totals and unique numbering are provided by an authoritative invoice system. No skill should treat a locked time entry as proof that an invoice was issued.

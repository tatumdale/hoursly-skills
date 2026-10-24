# Hoursly OpenAI plugin package

This folder is the portable Agent Plugins package for ChatGPT and Codex. It bundles:

- the public Hoursly streamable HTTP MCP endpoint;
- `hoursly-core` for workspace, access and safety semantics;
- `log-my-week` for narrative Human and Agent entry review;
- `effort-allocation` for LoE, plans and workload analysis;
- `grant-report` for grant performance and funder-ready drafts;
- OpenAI marketplace presentation and policy links.

The four skills are copied from their canonical repository folders by `npm run build`. Do not edit packaged copies directly. Change the corresponding folder under `skills/`, run the build, then run `npm test`.

The package contains no lifecycle hooks, secrets, OAuth client secret or customer data. OAuth is discovered and completed by the host when the Hoursly server is connected.

This package does not make Computer History, calendars or email available by itself. `log-my-week` checks those host capabilities at runtime and continues with the sources that are actually connected. It always previews new Human and Agent entries before any Hoursly write. The reporting skills are read-only unless a later, explicit workflow separately asks to save or send something.

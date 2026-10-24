# Hoursly OpenAI plugin package

This folder is the portable Agent Plugins package for ChatGPT and Codex. It bundles:

- the public Hoursly streamable HTTP MCP endpoint;
- the `capture-computer-history` work-review skill;
- OpenAI marketplace presentation and policy links.

The skill is copied from the canonical repository skill by `npm run build`. Do not edit the packaged copy directly. Change `skills/capture-computer-history`, run the build, then run `npm test`.

The package contains no lifecycle hooks, secrets, OAuth client secret or customer data. OAuth is discovered and completed by the host when the Hoursly server is connected.

This package does not make Computer History, calendars or email available by itself. The skill checks those host capabilities at runtime and continues with the sources that are actually connected. It always previews new human and agent entries before any Hoursly write.

# Policy review for the Hoursly OpenAI plugin

Prepared 29 October 2026 for Tatumdale Ltd. This is a product/data-flow check for the existing published policy documents, not replacement legal text or a legal approval.

## Public-page verification

- `https://www.hoursly.app/privacy-policy` rendered **Privacy Policy | Hoursly**, dated 3 October 2026, in a browser.
- `https://www.hoursly.app/terms-of-service` rendered **Terms of Service | Hoursly**, dated 3 October 2026, with an effective date of 3 November 2026, in a browser.
- Both URLs initially return a generic Vite shell titled “Hoursly | Back soon” before JavaScript renders the document. Test how the marketplace scanner reads them. The content is publicly accessible to a browser user; an HTTP-200 check of the shell alone is insufficient.

## Data-flow points for publisher review

1. **User-authorized MCP disclosure.** The policy describes authorized agents and says their provider handles data once it reaches the agent. It also says Hoursly does not send workspace content to an AI provider. The plugin causes the MCP server to return user-requested workspace data to the ChatGPT/Codex host. Clarify whether the “does not send” wording needs an express exception for user-authorized MCP responses.
2. **Host evidence.** `log-my-week` may use Computer History, calendar, email and attachments in the host to reconstruct proposed work. The plugin does not itself receive raw host history or mail. Only reviewed derived entries and measured usage sent through Hoursly tools are stored by Hoursly. Keep that boundary explicit in the listing and policy.
3. **Review and write control.** The plugin includes read and write tools. The user's Hoursly permission, MCP preset, workspace scope and explicit review govern each action. The policy already says agent actions are audited; confirm that the published retention and revocation descriptions match current production behavior.
4. **Commerce.** The Hoursly service has paid web subscriptions. The plugin itself does not have a checkout, but the marketplace commerce declaration needs the publisher's answer on whether it supports purchases and where they occur.
5. **Invoice and tax.** The current plugin can prepare billing evidence but cannot issue a VAT-complete invoice from Hoursly alone. Do not advertise finished invoicing until the authoritative tax and number path passes acceptance.

## Sign-off gate

The verified publisher should approve any policy wording change, publish a new version through the normal legal versioning flow, and verify the rendered page before the marketplace attestation. Do not overwrite the pinned 3 October source files or mark a draft as published.

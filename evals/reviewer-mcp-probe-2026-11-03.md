# Reviewer MCP probe — 3 November 2026

This is a **live connector and fixture probe**, not a pass of the saved marketplace draft or a fresh ChatGPT installation. It used the dedicated Hoursly reviewer connection in this Codex desktop chat. All records named below are fictional Review Lab data. No credentials or private mailbox content are included.

## Connection and deployed surface

- The active ChatGPT OAuth grant belongs to the dedicated reviewer account, gives Standard access to **Hoursly Review Lab only**, and has MCP Write enabled. `get_organisation`, `get_my_access` and `list_workspaces` agreed with that scope.
- The deployed `mcp` Edge Function was active at version **97**. The connected Hoursly catalogue exposed **137** tool names; `get_my_access` reported **127** available to this reviewer and **10** withheld by capability or permission. This is a role-specific scan, not a claim that all 137 are callable by the reviewer.
- The deployed version 97 source was fetched read-only. It maps registry flags into `readOnlyHint`, `destructiveHint`, `idempotentHint` and `openWorldHint`. All 17 tool names named by the positive case definitions are present in the connected catalogue and declared read-only in deployed source. The connector still did not expose the actual `tools/list` annotation payload, so scanner parity remains unverified.
- **Safety blocker:** deployed version 97 declares `delete_payment_term` as a one-step Standard write with no destructive flag. The open safety PR #537 has the intended Full-permission, two-step confirmation and destructive annotation. Do not submit until that fix is reviewed, released and verified against the deployed tool scan.

## Synthetic records actually read

| Area | Observed state |
| --- | --- |
| Clients and projects | Seven clients, including the default Personal client, and six fictional projects. |
| Human and Agent entries | Six Human entries after the first approved write below, then seven after the later approved member fixture; four AI-only entries. One Agent run has a measured 1,200 input and 400 output tokens with a distinct linked 30-minute Human review. Another run has priced test usage; a partial run has no measured tokens. |
| Billing | Aster Studio's November server summary returned £150 net time revenue on 1.5 hours, with one unapproved and one unlocked entry. No billing events exist. VAT, gross and an invoice number were not returned and remain outside the first release. |
| Grant | Northstar Trust's Community Research grant and role plan are readable. No tranche is recorded as received, and the current grant result has no withheld figure, so the tranche and withheld-value review scenarios are not yet proven. |
| Periods | No timesheet periods exist; the prepared September-close case cannot run as written. |
| External evidence | No dedicated synthetic calendar event, email outcome or attachment was verified from the reviewer identity. |

## Approved write and readback

After the owner approved the exact record, `create_time_entry` saved one fictional, non-billable Human entry for the reviewer on 3 November, 17:00–17:30 UTC, under **REVIEW TEST DATA - Internal → Reviewer Operations**. `get_time_entry` read back the same 30-minute entry, owner, project and notes. It remains **unapproved and unlocked**. This demonstrates the current reviewer MCP write/read path; it is not the required saved-draft ChatGPT case.

## Marketplace case readiness

| Case | Current result |
| --- | --- |
| No-history day review | Hoursly ledger can be read; synthetic calendar/email evidence is missing. Fresh packaged ChatGPT behavior unrun. |
| AI work review | The Aster Studio Agent run and linked Human review are readable; the package prompt was corrected to name them. Fresh packaged ChatGPT behavior unrun. |
| Invoice readiness | Aster Studio has server-computed November draft evidence and blockers; no billing events exist. The package prompt was corrected to name this client and period. Fresh packaged ChatGPT behavior unrun. |
| Period readiness | Blocked by missing September period fixture. |
| Grant update | Northstar grant can be read; received/pending tranche and restricted-value fixtures are missing. The package prompt was corrected to name this grant. |
| Three negative cases | Not run in a fresh packaged ChatGPT session. Direct reads and one approved write do not establish refusal behavior. |
| Owner, member, scoped manager, read-only | Reviewer Admin/Standard path verified. The separate ChatGPT developer App connections returned member/read-only and manager/scoped results, detailed below. The approved member negative write and own-entry readback also passed. This is not package 0.4.1 acceptance. Owner and restricted-null cases remain open. |

Five local MCP integration suites covering role gates, scoped reads and writes, member masking and capability gating passed **114 tests** in the separate app worktree. They exercise source behavior with synthetic fixtures; they do not replace live role-specific OAuth and host acceptance against the deployed function.

The prepared five positive and three negative cases must be run against the exact saved portal draft after the fixture and prompts agree. Record each prompt, visible answer, actual tool calls, side-effect readback and outcome. A recorded demo and reviewer-accessible playback URL are also outstanding.

### Connected member and manager probe

On 3 November, the older Hoursly **developer App** showed three connected accounts: reviewer admin, reviewer member and scoped manager. The labels alone are not identity proof. In fresh ChatGPT Work chats, requests explicitly selected the latter two accounts and the visible responses reported `get_my_access` results for Hoursly Review Lab. The prompts linked to the older developer App, **not** the private 0.4.1 package.

| Connected account | Live read-only result |
| --- | --- |
| Reviewer member | `get_my_access` reported role `member`, grant and stored permission `read_only`, effective read yes, write/delete no, `mcp.use` only, and `own_only` entry scope. `list_clients` returned Aster Studio and Beacon Works, matching its allocations. An initial 2–3 November `list_time_entries` request returned no visible entries; after the approved member fixture below, `get_time_entry` and `list_time_entries` returned that own entry. A financial request returned `see_cost: false` and `see_margin: false`; no figures were disclosed. |
| Scoped manager | `get_my_access` reported role `member`, grant `standard`, effective read/write yes, delete no, and `scoped` access to Discovery Sprint only. It reported team entry view, approval, lock/unlock and report permissions in that scope. `list_clients` returned only Aster Studio, matching its allocation. A 2–3 November `list_time_entries` request returned exactly three synthetic Aster Studio → Discovery Sprint entries: one reviewer entry and one fixture-maintainer entry on 2 November, plus one reviewer entry on 3 November. No other project entry appeared. |

The private member and manager chats contain the visible prompts and answers; their URLs belong in the private review record, not this public repository. A manager request for the exact Northstar Trust fixture client returned `not_found` / `INVALID_ARGUMENT`; the error alone does not prove an authorization denial. The separate `list_clients` result provides the clearer scope signal. ChatGPT showed “Used Hoursly” for the access probes, but its displayed tool panel did not expose the raw OAuth subject, tool arguments or response payload for independent inspection. These results support account routing, scoped reads and unavailable financial fields in the developer App; they do not establish package execution or saved marketplace draft acceptance.

### Approved member write denial and own-entry readback

The owner approved one exact fictional **Human** record for the controlled reviewer member: Aster Studio → Discovery Sprint, 2 November 2026 16:00–16:30 GMT, non-billable, no deliverable, billing role, tags or AI usage, with notes `REVIEW TEST DATA: member own-entry visibility test.`

1. ChatGPT attempted `create_time_entry` once through the **Openai-Review-member** read-only connection. Hoursly returned `permission_denied`: `This connection (read_only) is not allowed to use "create_time_entry".` ChatGPT stopped without switching accounts. An independent reviewer Admin `list_time_entries` query for the exact note returned zero records after the denial.
2. The reviewer Admin MCP connection, verified as Standard/write in Review Lab, created that one approved record for the member. `create_time_entry` returned a new ID, 1,800 seconds, non-billable, no deliverable/tags/materials, unapproved and unlocked. `get_time_entry` read back the same owner ID, project, time and exact note. The record ID is held in the private review record.
3. ChatGPT's member connection then called `get_time_entry` for that ID and returned the 30-minute non-billable record. Its 2 November `list_time_entries` returned **one** entry, the same ID and member owner ID. No other people's entries appeared. Those read calls made no changes.

The member write refusal and own-entry visibility passed through the older developer App, not the 0.4.1 package or saved marketplace draft. A restricted `null` monetary value, owner controls and fresh packaged negative cases still need separate testing.

### Personal ChatGPT import probe

The candidate ZIP was uploaded through ChatGPT's Personal plugin directory on 3 November. Its private cloud-plugin page displayed version **0.4.0**, **19 skills**, **one MCP server**, and Read/Write capabilities. The page labelled its developer as an individual, despite the ZIP's `author.name` and listing `developerName` both being **Tatumdale Ltd**. The verified publisher identity must be checked again on the marketplace draft import.

This import did **not** establish a packaged ChatGPT execution path. The cloud-plugin page's example buttons opened a `codex/open-app` desktop launch page. A fresh ChatGPT Work composer offered the pre-existing Hoursly developer app, rather than the imported package. That chat then failed with a model-capacity message before any MCP call. The desktop app could not be controlled in this test environment. Do not count this attempt as any of the five positive or three negative package cases, an OAuth acceptance, or a Codex host pass.

Later on 3 November, the incorrect Lovable image was replaced with a 256-pixel derivative of the official Hoursly iOS app icon. Package version **0.4.1** was rebuilt and uploaded as a new version of the same private cloud plugin. The page showed version 0.4.1 and visually displayed the pink Hoursly clock mark in the header and example cards. The Codex local marketplace installation also reported 0.4.1; its cached icon matched the source SHA-256 `05a4dde631dc54714bd1fbe8f9db112f8a1a2b2114be7f2a3f283a8e2a7211b0`. `npm test` passed 21 skill/package checks with no errors or warnings. The refreshed ZIP SHA-256 is `34e6886d848e42a3583b7b26478131d50579a3251f21d813ad759cca0923ef6c`. These checks establish artwork and package identity, not host MCP acceptance.

The older developer app is a separate ChatGPT object. Its downloaded legacy wrapper contained no icon. An icon-only wrapper version **1.0.1** was uploaded with the official Hoursly image and unchanged App ID, but the developer plugin page still rendered generic plugin/App icons; the new wrapper artwork did not control the App tile. Its current Manage app view offers name, description, refresh tools and delete, with no logo editor. Do not count this older App as branded or substitute it for the 0.4.1 package in review cases. OpenAI's [custom MCP guidance](https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt) says an owner can edit a developer App logo from Manage when that control is available; it is not available in this account's observed view.

### 0.4.1 desktop handoff and reported read check

The user followed the private cloud-plugin page's **Open in desktop app** link and reported that it opened Hoursly **0.4.1** in ChatGPT. The assistant's computer-use interface was denied access to the desktop ChatGPT window, so this launch was a human handoff rather than an independently inspected desktop session.

The user then reported a no-write Hoursly response for the **Primary** connection: one workspace, Hoursly Review Lab; Admin role; Standard grant; workspace-wide read and broad management capabilities; no delete, billing administration, role administration or period close. This agrees with the earlier reviewer Admin MCP access probe. The user's pasted answer did not include the chat's package indicator or expanded tool trace, so record this as **user-reported connection behavior**, not an independently verified 0.4.1 MCP call or one of the five marketplace positive cases. The saved portal draft remains untested.

The user next supplied the desktop chat's answer to the prepared Aster Studio AI-work prompt. It reported the fictional 2 November 13:00–13:40 Agent run as proposed and unapproved, with one **measured** `review-fixture-model` usage line of 1,200 input and 400 output tokens, no cached tokens, no output attachments and unavailable cost. It kept that 40-minute execution separate from the linked 15:00–15:30 Human review, tagged Review and explicitly attributed for 1,800 seconds, and reported no changes. A separate read-only Hoursly MCP check of `list_ai_entries`, `get_ai_entry`, `list_ai_review_links` and `get_time_entry` matched those material fields and confirmed both records remained unapproved and unlocked. This is a **content pass with independent record readback**, but the user's answer still did not expose the desktop plugin indicator or tool trace. Do not count it as the exact saved-draft positive case until those host details and the final imported package are inspected.

## Candidate package and public URLs

- `npm run build` and `npm test` passed: 21 canonical skills checked with zero errors or warnings. A locally rebuilt candidate ZIP contained 19 packaged skills, five positive and three negative case definitions, an icon, unrestricted `publication.countries: []`, and `review.commerce: false`. It had **no demo URL**, so it is not the final submission ZIP.
- The live privacy and terms URLs both rendered their respective documents in a browser. Raw HTTP returned status 200 but the same 2,605-byte generic **“Hoursly | Back soon”** HTML shell for each URL. Marketplace crawler readability therefore remains unproven until the static legal-page release is deployed and rechecked.
- The listing website and support URLs returned public HTTP 200 with readable GitBook HTML titled **AI Assistant (MCP)** and **Welcome to Hoursly** respectively. The support page includes the published support mailbox.
- The linked skills, MCP safety and marketing PRs were all still **open drafts** with green reported checks. Green checks do not establish merge, deployment or marketplace scan acceptance.
- A fresh ephemeral run of Codex CLI **0.166.0** on 3 November again rejected the installed 0.4.0 plugin's portable `mcp.json` with `unknown field extensions, expected url or headers`. The no-tool prompt returned its requested text, but the package MCP did not load. Current OpenAI package documentation describes that OAuth extension in the portable Agent Plugins format; this is a host compatibility finding, not a reason to strip OAuth metadata from the submission ZIP.

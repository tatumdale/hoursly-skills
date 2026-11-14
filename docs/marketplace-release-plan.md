# Hoursly OpenAI marketplace release plan

Owner issue: [TAT-550](https://linear.app/tatumdale/issue/TAT-550/submit-brochure-aligned-hoursly-plugin-to-openai-marketplace)
Baseline: 29 October 2026, `hoursly-skills` `origin/main` 3b907d5 and `hoursly-app` `origin/main` 0624be88 (MCP 1.11.0).
Customer promise: the *Hoursly AI Assistant brochure v1*, reviewed as a claim source, not as implementation instructions.

## Release rule

Submit one plugin whose claims, packaged skills, remote MCP tools and reviewer fixtures agree. A capability counts as ready only after a fresh ChatGPT run proves the user-visible result under a relevant permission level. Source code, an MCP tool listing, a passing package validator and a local Codex test are separate evidence.

The brochure says **21 ready-made skills**, **143 tools**, **13 work areas** and **8 built-in prompts**. The baseline had six canonical skills and four packaged skills; this branch now has 21 canonical folders and 19 distinct packaged workflows, retaining two older capture routes in the library. Source MCP 1.11.0 has 148 registry tool rows, eight prompt declarations and 137 tools available to one previously checked live owner connection. Tool counts vary by access and feature flags. Recount the exact deployed scan before publishing a number; explain the counting basis and date. Revise the brochure's skill count to 19 for the OpenAI plugin unless the two older routes are independently activated and useful. Do not equate an MCP `skills/list` resource with host skill activation.

## Claim and acceptance matrix

| Brochure claim or area | Baseline | Required evidence before submission |
| --- | --- | --- |
| Log and tidy time | `log-my-week` and MCP entry tools | ChatGPT proposal, explicit approval, write/readback, duplicate and unavailable-history cases. Calendar, email and Computer History are optional host sources. |
| Review and approve | MCP entry review tools, no packaged specialist | Guided queue, anomalies, preview, confirm, and limited-access refusal. |
| Close timesheet periods | MCP period tools, no packaged specialist | Readiness, blockers, participant exemptions, two-step close and safe refusal. |
| Grants and funder reporting | `grant-report` | Completed live report, provisional/withheld disclosure and reviewed unsent funder draft. |
| Record AI-only work | `log-my-week` and `record_ai_session` | Agent run/usage separate from Human effort, review link, no duplicated usage. |
| AI tools and costs | MCP Materials tools, no packaged specialist | Metered and subscription examples with unknown cost preserved and correct charge/cost separation. |
| Bill and recover costs | `invoice-prep` and MCP billing reads | Server-authoritative billing-readiness and net evidence; VAT, gross, unique numbering and final issue stay unresolved and outside this release. Locked means accounted for, not necessarily invoiced. |
| Agreements and role plans | MCP commercial tools, no packaged specialist | Read, proposed edit, two-step save and scoped manager behavior. |
| Deliverables | MCP deliverable tools, no packaged specialist | Lifecycle, entry links, scoped access and deletion constraints. |
| Team and workload | `effort-allocation` partly | Daily-limit view and donor split of Actual hours. Current project plans are by Billing Role, not person, so a named person's planned cross-grant over-allocation cannot be claimed without a separate person-allocation model. No withheld-person inference. |
| Clients, funders and projects | MCP tools, no packaged specialist | Setup and update using existing records, exact scope and user-reviewed writes. |
| Workspace setup | MCP settings tools, no packaged specialist | Owner/admin permissions, rates, roles and read-only degradation. |
| Dashboards and reports | `effort-allocation` and `grant-report` partly | Evidence that each quoted figure uses the same server read model as the app, with approval/provisional basis labelled. |
| Microsoft Copilot and Outlook | Separate host integration | Copilot Studio connection, per-user OAuth, Outlook draft-entry flow and host-specific acceptance; not implied by OpenAI plugin acceptance. |
| Access and safeguards | MCP auth and per-tool gates | Owner, member, read-only and scoped-manager matrix; adversarial record content, tenant isolation, masking, destructive annotations and revocation. |

The line “answers from approved records” needs qualification: grant reads include provisional open-month figures. The line about never changing client portal settings needs to distinguish portal administration from `share_ai_output`, which changes whether one output link is shareable. Confirm the exact production behavior before final copy.

## Work packages and gates

### 1. Contract and safety baseline

- Record the deployed MCP server version and exact tool scan, separately from source `main`.
- Test billing-readiness drafts with synthetic data. Show server-returned net amounts and blockers; leave VAT, gross and a unique number unresolved. Final issuance, including tax and number reservation, is a later release requiring its own authoritative issuer contract.
- Treat `lock_time_entries` as “accounted for”; reconcile actual invoice references through the existing invoice/external-reference model, not a second ledger.
- Audit tool annotations and two-step behavior, including `delete_payment_term`. Record passed and failed cases by permission mode.

**Gate:** every brochure financial and safeguard claim has a demonstrated contract or revised wording.

### 2. Skills and package

- Correct mode-based visibility: preserve read-only modes while requiring every capability needed for a write. `min-permission` and any-of metadata are not enough for mixed modes.
- Correct `log-ai-session`: transcript bounds are evidence for an AI run, not proof of Human active time; match duplicates by source session and outcome; count each usage line once.
- Correct `timesheet-chase`: an aggregate report and absence of entries do not prove a person owed time on a specific day. Use expected attendance/period data or label the result as a follow-up candidate.
- Implement the fifteen planned skills and three existing-skill extensions in the accepted three release phases, revising the 26 October build spec for MCP 1.11.0 and the contract findings above. Package the retained brochure workflows for OpenAI, with routing and collision tests.

**Gate:** `npm run build`, `npm test`, package validator and fresh host activation cases pass for the exact package version. No placeholder skill is counted as ready.

### 3. Public listing and reviewer fixtures

- Verify the public privacy and terms destinations in a rendered browser and in the submission scanner. Both legal pages render the published Tatumdale Ltd documents after JavaScript loads, although the initial HTML still says “Back soon”; improve crawler access if the scanner cannot read them. Check that their current text covers the plugin's actual data flow.
- Tatumdale Ltd is the verified publisher. The publisher chose all supported countries and confirmed the plugin does not support purchases or payments. Verify the actual support route. Prepare an isolated synthetic reviewer workspace, login and permissions using the [reviewer fixture design](../evals/reviewer-workspace-fixture.md); keep credentials in the portal only.
- Record a real ChatGPT demo with the submitted build, working OAuth and a negative/permission boundary. Host it at a reviewer-accessible URL. Keep private data and secrets off screen.
- Maintain five distinct positive and three negative MCP review cases with observed pass conditions and actual run outcomes.

**Gate:** every public URL and demo plays without private access; reviewer can perform the cases without help.

### 4. Portal submission and release

- Bump the plugin version; inspect the final ZIP contents and metadata. Upload to the intended verified organization as a draft.
- Complete the portal domain challenge, OAuth connection and tool scan for `https://mcp.hoursly.app/mcp`. Resolve required findings and rerun cases against the saved version.
- Have the authorized developer complete legal/policy attestations and submit the draft for review. Track the actual receipt and feedback. Publish only after approval and a separate release check.

**Gate:** distinguish ZIP ready, draft uploaded, submitted, approved and published in every status update.

## Current blockers

1. The saved Tatumdale Ltd developer-portal draft is v0.4.6, with 19 skills, Review Lab OAuth and a current MCP tool scan. It is **not submitted or published**. The remaining scan advisories are nonblocking, but their final state must be rechecked before submission. The portal's review information is incomplete because the required real walkthrough recording URL is empty.
2. The live privacy, terms, integration and support URLs returned HTTP 200 with their intended content on 12 November 2026. Confirm the legal pages visually and recheck the exact URLs before submission. The package declares all supported countries and no plugin commerce; verify these values in the selected saved draft.
3. Hoursly Review Lab, its synthetic fixture and dedicated reviewer account exist. Confirm the reviewer can complete the imported five positive and three negative cases without a private mailbox, phone approval or separate workspace. Keep credentials only in the portal's secure fields.
4. The private test plugin was updated to v0.4.6 from the public-submission candidate ZIP, but a fresh ChatGPT desktop chat still did not expose its bundled `hoursly-plugin` connection. The separate Effort Intelligence app was available and deliberately unused. Earlier 0.4.4 and 0.4.5 tests failed the same host boundary. The portal's successful OAuth and tool scan do not prove chat execution. Do not ask the user to repeat the private-plugin probe. Escalate the host/package gap to OpenAI with the private plugin and draft IDs; retain the documented remote-MCP format for public submission. A test-only registered-app reference is not acceptable as proof of the public ZIP.
5. The walkthrough must show real tested ChatGPT behavior using a supported route and synthetic records. Do not substitute a recording of the separate developer app or claim that skill routing alone demonstrates MCP access. Resolve the host execution gap before recording the public package as working.
6. First-release invoice scope remains billing-readiness drafts only; final VAT, totals and numbering are deferred. Cross-grant planned capacity for named people is not represented by the current role-plan model; the skill reports actual shares only. The plugin bundles 19 distinct workflows; the brochure's 21 count describes source folders and needs a customer-facing correction.

No production records, remote database changes, submission, or publication are implied by this plan.

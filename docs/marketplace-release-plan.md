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
| Bill and recover costs | MCP billing tools, no packaged specialist | Server-authoritative net/VAT/gross and invoice numbering; locked means accounted for, not necessarily invoiced. |
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
- Test invoice VAT/tax inputs, client charge, line selection, totals, numbering and concurrency with synthetic data. Add a server-authoritative invoice preview/reservation path if the existing contract cannot produce a correct final invoice. The invoice skill must not manufacture tax or advance `invoice_number_next` as a non-atomic reservation.
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
- Tatumdale Ltd is the verified publisher. The publisher chose all supported countries and confirmed the plugin does not support purchases or payments. Verify the actual support route. Prepare an isolated synthetic reviewer workspace, login and permissions; keep credentials in the portal only.
- Record a real ChatGPT demo with the submitted build, working OAuth and a negative/permission boundary. Host it at a reviewer-accessible URL. Keep private data and secrets off screen.
- Maintain five distinct positive and three negative MCP review cases with observed pass conditions and actual run outcomes.

**Gate:** every public URL and demo plays without private access; reviewer can perform the cases without help.

### 4. Portal submission and release

- Bump the plugin version; inspect the final ZIP contents and metadata. Upload to the intended verified organization as a draft.
- Complete the portal domain challenge, OAuth connection and tool scan for `https://mcp.hoursly.app/mcp`. Resolve required findings and rerun cases against the saved version.
- Have the authorized developer complete legal/policy attestations and submit the draft for review. Track the actual receipt and feedback. Publish only after approval and a separate release check.

**Gate:** distinguish ZIP ready, draft uploaded, submitted, approved and published in every status update.

## Current blockers

1. Public legal pages render after JavaScript but return a “Back soon” initial shell; scanner compatibility and policy coverage need validation.
2. Tatumdale Ltd, all-country availability and no-commerce behavior are recorded in the package. Portal import must confirm these exact values; the support route still needs reviewer verification.
3. No reviewer workspace, credentials or demo recording has been verified.
4. Four fresh Codex 0.4.0 routing smoke cases passed; ChatGPT installation/activation, bundled MCP connection, restricted access, approved write/readback and completed live grant report remain unverified. Codex CLI 0.165.0-alpha.1.2 rejects the portable MCP OAuth `extensions` field despite the published OpenAI package guide permitting it.
5. The invoice VAT/numbering contract is unresolved. Cross-grant planned capacity for named people is not represented by the current role-plan model; the skill reports actual shares only.
6. The plugin now bundles 19 distinct workflows; the brochure's 21 count describes source folders and needs a customer-facing correction. The public legal pages are present but their initial HTML is a generic shell; test marketplace crawler recognition.

No production records, remote database changes, submission, or publication are implied by this plan.

# Hoursly reviewer workspace fixture

Status: design and remaining fixture inventory for the **persistent, isolated synthetic Hoursly Review Lab**. The workspace and dedicated reviewer account are active; the [3 November live probe](reviewer-mcp-probe-2026-11-03.md) records observed access and the approved synthetic write/readback. The wider fixture and persona acceptance are incomplete. Record credentials and test results in private operations records, never in this repository.

## Purpose and boundaries

Use one dedicated Hoursly workspace, `Hoursly Review Lab`, for OpenAI and other MCP integration reviews. The Tatumdale owner may also be an administrator here for fixture maintenance, but the reviewer identity must have no access to Tatumdale's business workspace. Do not create client links, portal grants, email/calendar connections or shared reporting between the two workspaces. Every name, note, document and amount is fictional and clearly marked `REVIEW TEST DATA`. Do not use a real customer's identity, actual work, real token usage or Tatumdale issuer/bank details.

Create the workspace through the supported signup/onboarding flow with a controlled owner account on a private `@hoursly.app` mailbox. This is the controller, not the reviewer login. Invite a controlled fixture maintainer as an administrator through the app; confirm that membership before any write and pass the review workspace ID on every MCP call. Create a separate `@hoursly.app` reviewer account with access only to this synthetic workspace; enter its credentials in the submission portal's secure fields only. Add other controlled sign-in accounts where role and permission tests require them. Public or disposable inboxes are suitable only for fictional contacts that cannot sign in. Give reviewers the least access that lets them complete the submitted cases, and document how the account remains available throughout review. Do not use the 72-hour production capture-demo seeder for this persistent workspace.

## Synthetic data inventory

All dates below are generated relative to a recorded fixture anchor date so the day and week workflows remain recent. Keep one fixed September 2026 period for period-close tests. Do not silently refresh a fixture during a live review.

| Area | Required records | Reviews enabled |
| --- | --- | --- |
| People and access | Owner, admin/fixture maintainer, scoped project manager, member, read-only reviewer; selected project allocations and a separate withheld-money view | Workspace setup, access and masking, team reports, negative permission checks |
| Client/project plan | Fictional T&M, fixed-fee, capped T&M, retainer, grant and internal non-billable clients; at least one open and one closed project; planned, in-progress and done deliverables; unlinked work | Engagement setup/health, delivery, client update, effort allocation, estimation |
| Human time | Recent completed billable and non-billable entries, an AI-assisted human entry, two plausible entries for a vague-delete prompt, one unapproved entry, one approved entry, one locked historical entry, and an explicit human review entry | Log-my-week, approvals, timesheet chase, invoice and period readiness, audit |
| Agent work | One unattended completed run, one run awaiting human review, a failed/partial run, one linked review allocation and one deliverable link; measured synthetic token quantities on only the intended run | AI work review, log-ai-session, human/agent separation, client update |
| AI economics | One priced API source, one unpriced usage line, one subscription source with an open period, synthetic reported vendor total and an unused/idle balance; tool budget and charge settings | AI-cost-close, commercial review, payables, invoice readiness |
| Commercials | Billing roles and effective charge/cost rates, a time allowance, a fixed-fee milestone, a draft and confirmed billing event, payment terms and fictional Bill To details | Invoice-prep, commercial review, engagement health, workspace setup |
| Grant | Synthetic award, staff budget, tranche schedule, received and pending tranches, planned roles, provisional actuals and a deliberately restricted figure | Grant report, audit evidence, withheld-value refusal |
| Period control | September 2026 prepared period with expected and exempt participants, an unapproved human entry and an AI review blocker; a separate closed period for read-only evidence | Month-end-close, audit, approval and negative no-close cases |
| External evidence | Dedicated synthetic calendar meeting and email outcome with a harmless sample attachment, using accounts controlled for review and no personal mailbox | Log-my-week fallback and source reconciliation |

## Review scenarios

### Live persona acceptance still to run

| Persona | Intended setup | Boundary to verify |
| --- | --- | --- |
| Owner | Review Lab controller account; use a fresh OAuth grant for its own test | Owner controls are available only to the owner; no irreversible action in the shared fixture |
| Reviewer admin | Existing dedicated reviewer; Standard OAuth and MCP Write already read back | Review Lab only; approved synthetic write can be read back; no business workspace |
| Member / read-only | Correctly addressed test member on the default Member role; AI Assistant Read and a read-only OAuth grant | Own entries and permitted records only; no rates, team roster or write tool |
| Scoped manager | Member-based Project manager template, allocated only to the fictional Aster Studio Discovery Sprint; AI Assistant Write | Team time only in the assigned project; other projects, client money and workspace administration withheld |

The live roster on 3 November shows the controlled member and manager accounts as active, with Last Active shown as today; mailbox delivery was not checked. The member holds the default Member role with AI Assistant (MCP) set to Read. The controller Owner created `Reviewer Project Manager` from the Project manager template, enabled MCP use and write on that role, and assigned it to the controlled manager account with only `REVIEW TEST DATA - Aster Studio → Discovery Sprint` in Manages. The **manager** setting is AI Assistant Write. The saved People view and role preview say team time, approval, locking, reporting and planning permissions apply on one project; the preview withholds rate cards, cost, margin, people management and role changes. The connected reviewer Admin lacks `roles.manage`; role maintenance requires the controller Owner. Do not claim live persona coverage from the 114 local integration tests.

The Owner subsequently assigned the member to Aster Studio → Discovery Sprint and Beacon Works → Identity Redesign, and assigned the manager to Aster Studio → Discovery Sprint for Work. A live People readback on 3 November showed exactly those client and project assignments. The manager's separate Manages list still contained Discovery Sprint only. The later [developer App persona probe](reviewer-mcp-probe-2026-11-03.md#connected-member-and-manager-probe) found the member's read-only, own-entry grant and both allocated clients; the manager's Standard, Discovery Sprint-scoped grant, Aster-only client list and three in-scope team entries. An [approved negative-write and own-entry test](reviewer-mcp-probe-2026-11-03.md#approved-member-write-denial-and-own-entry-readback) then verified the member's read-only boundary and its visibility of one new non-billable synthetic entry. The imported 0.4.1 package and saved marketplace draft remain untested with these personas.

The [five positive and three negative marketplace cases](marketplace-review-cases.md) are the minimum submission set. Also run each packaged workflow with the right actor and a recorded prompt, tool calls, visible result and state readback. Exercise owner, scoped manager, member and read-only access. A reviewer must be able to try a clearly approved, reversible write in this workspace without touching the owner's business data.

Keep irreversible and financial controls as previews or refusals unless a separately reviewed disposable record is prepared for that exact action. A fixture does not justify closing a real period, issuing an invoice, charging a card, sending mail, inviting outsiders or deleting data. If the submitted tool catalogue changes, compare the current tool scan with this inventory and add missing fixtures before claiming full coverage.

## Provisioning and acceptance record

1. Record the workspace owner, verified signup completion, workspace ID, plan and retention owner in a private operations record. Do not copy credentials here.
2. After the fixture maintainer's membership and AI Assistant (MCP) Write access are active, reauthorize Codex in Hoursly's OAuth consent screen. Select both the maintainer's existing workspace and Review Lab at Standard access; a new workspace is not added to an older grant automatically. Restart the host tool session if it still holds the old grant. Confirm the workspace is isolated with `list_workspaces`, `get_organisation`, `get_my_access`, and app-visible membership and client lists before any MCP write. Record the exact MCP server/tool scan version.
3. Seed the synthetic entities in dependency order: people/access, clients and projects, deliverables, commercials, time and Agent work, usage, grant/billing events, then period state. Read back each class of record and reconcile counts; mark missing capabilities as blocked rather than fabricating them.
4. Connect only dedicated calendar and email test accounts. Verify the calendar event, message and attachment from the reviewer identity. If unavailable, mark those review cases as untested.
5. Run the marketplace cases and 19-skill activation matrix against the exact packaged version in a fresh ChatGPT session. Record pass/fail and discrepancies. Keep a reset plan for any permitted write cases and refresh the relative-date fixture only between review cycles.

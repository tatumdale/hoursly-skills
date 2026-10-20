# A review the user can recognise

Start with the story of the day, then the proposed entries. Follow the weekly logging pattern: already logged work is context, new work is proposed, and unsupported gaps become a few useful questions. Keep the same format whether Computer History is present, partial or absent.

## Narrative before the table

Use two or three short sentences per day, grouped around substantive work and outcomes. Name the client/project naturally. Explain what was discussed, prepared, reviewed, changed or delivered, and what is already in Hoursly. Include concrete history details when they improve the story, such as moving between a document and its publishing preview, rather than listing apps and clicks.

Distinguish established outcomes from session-reported or unfinished ones, in ordinary language. One concise coverage sentence is usually enough: "Computer History covers the afternoon; the morning comes from your meetings and work records." Missing history does not make a corroborated offline meeting unreliable.

Avoid technical row labels, conflict codes, capability matrices and long lists of caveats. Keep internal keys for deduplication and exact approvals, but use entry names and dates when speaking to the user. If two entries share a name, distinguish them by time or project.

## Entry table

Required columns: Type, Name, Time start, Time end, Duration, Description, Token use. Add a short Review note. Group by day/project where helpful; keep Human and Agent entries in the same review. Put verified client/project names in the entry name, description or grouping. Retain detailed entity IDs, deliverable/Activity assignments, roles, tags and usage provenance behind the review, available when needed.

For a busy day, use one human table and one agent table with those same columns. Keep descriptions to one useful sentence and review notes to the decision needed. Put shared limitations once below the tables. Include substantive unresolved work, but combine related review activity rather than adding a speculative human-supervision row for every agent. Personal/incidental activity belongs in a brief exclusion note unless the user requests a separate record.

Use names such as "Website release review" and "Agent work on website fixes". Write descriptions as proposed Hoursly notes: action, subject, result. Token use on human entries is "—"; associated tokens belong to the named agent entry. Display measured totals on agent rows and keep the full model/tier/cache breakdown available for the approved save. Unknown usage is "Not available", not zero.

Review notes should say what matters: "Already logged", "Ready for your review", "Estimated—please confirm", "Check meeting length", "Confirm project", or "Still running". These explain the decision better than a generic status on every row. Evidence support is not approval; all new entries remain drafts until the user agrees.

Use minute precision normally. Retain exact seconds in source evidence and show them only when useful for a discrepancy or rounding decision. Do not fabricate start/end times for unknown human attention. If a meeting has a recording duration and only a scheduled start, say which boundary is assumed; do not imply an upload timestamp is its start. For intermittent agents, label the duration "active across several runs" and start/end as first/last run bounds. An unfinished run stays open.

For a short observed portion of a larger human task, say "~6m observed; earlier time unknown" instead of presenting it as the whole task. Keep the disjoint observed intervals internally and exclude other tasks before summing. Show separate visits or label first/last bounds as intermittent; those bounds must not look like a continuous interval. Use "Already logged", "Possible additional time" and "Reallocate existing time" to make the proposed treatment clear. A richer description of an existing timer does not itself propose more hours.

## Example: calendar and notes, no Computer History (synthetic)

"Tuesday centred on the Example client website release. The morning meeting covered the remaining launch issues and agreed the fixes to take forward. The meeting notes support a 50-minute discussion, although the invite reserved an hour. The agent later prepared and tested the accessibility fixes; your time reviewing those changes still needs confirming. Nothing is already logged for this work."

| Type | Name | Time start | Time end | Duration | Description | Token use | Review |
|---|---|---|---|---|---|---|---|
| Human | Website release meeting — Example client / Website | 10:00 assumed | 10:50 assumed | 50m recorded | Reviewed launch issues and agreed the remaining website fixes. | — | Confirm actual start and meeting length |
| Human | Review accessibility fixes — Example client / Website | To confirm | To confirm | To confirm | Reviewed the agent's proposed accessibility changes. | — | Confirm whether reviewed and time spent |
| Agent | Prepare accessibility fixes — Example client / Website | 11:10 | 11:35 | 25m | Prepared the local patch and passed the recorded checks; release not established. | 12,000 measured | Ready for your review |

"For the release meeting, use the recorded 50 minutes or the scheduled hour? How much time did you spend reviewing the accessibility changes?"

With matching Computer History, enrich the same story: "In the afternoon you reviewed the keyboard-navigation changes in the editor and checked them in the browser preview." If the interactions and boundaries support a human-time estimate, propose it with its basis; otherwise keep the duration question. Do not create one entry per app switch.

## Rounding and completion

- Offer rounding to the **nearest 5, 6, 10, 15, 30 or 60 minutes**, using the user's selected interval. This can reduce or increase a duration; do not default to rounding up. Exact multiples stay unchanged, with no unnecessary rounding question. Exact halfway cases round to the higher multiple.
- For example, **1h55m (115 minutes)** remains **1h55m** with five-minute rounding, becomes **1h54m** with six-minute rounding, and becomes **2h** with hourly rounding. Six-minute multiples around it are 114 and 120 minutes; 1h56m is not a six-minute multiple. At ten-minute rounding, 1h55m is an exact halfway case and becomes 2h.
- Round each proposed human entry's duration once from its original seconds, before adding rounded totals. Preserve raw duration and observed start/end. Label the duration as rounded and show the signed difference where helpful, for example "1h54m (−1m)". Do not independently round both endpoints and the duration. Endpoint rounding is a separate explicit choice; if requested, apply the same nearest-multiple rule and label the proposed endpoints separately from observations. Recheck overlaps whenever endpoints change.
- Use an established interval without asking again. Otherwise ask once which interval to use; retain exact durations until chosen. Do not round unknown attention, ongoing execution, measured agent runtime or tokens. If a short human entry would round to zero, retain it in the review and flag the zero rounded duration; do not silently drop it or impose a minimum charge.
- Briefly note personal time excluded from the work review. Only raise it as a question when it conflicts with proposed work or its purpose is unclear; no personal row is required in the work table.
- Close with logged and proposed human totals, estimated/unresolved portions, and separate agent usage where useful. Recording length pending attendance confirmation remains provisional. Never fill an assumed working-day target.
- When sources disagree, finish with a few questions that resolve the largest decisions: meeting attendance/length, an overlapping timer's allocation, or genuinely uncovered time. Do not ask the user to approve unresolved arithmetic, and do not turn a review-only instruction into an invitation to save immediately.
- Ask by named work or day; accept clear approval by those names, a whole day, or a clearly defined set. Keep the reviewed version and approvals internally. Report actual saved entry IDs only after a successful authorized save.

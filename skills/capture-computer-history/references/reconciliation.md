# Reconstruct outcomes and assess entries

Reconstruct work before asking the user to fill gaps. Use authorized sources to establish action, object, result and state: for example, "Investigated deletion permissions; produced an audit and local patch; release remains unverified." A session title establishes a topic, not completion. An opened document is not proof of editing, a draft is not a sent email, and a discussed plan is not delivered work.

Prefer source artifacts appropriate to the claim: actual document changes, a PR diff/status, test output, sent-message metadata, meeting decisions or session completion evidence. Read enough to settle the material claim without expanding into a new code audit. Distinguish independently verified artifacts from outcomes reported in a session summary. Preserve partial, failed and blocked work as entries with accurate descriptions. Never promote "implemented locally" to "deployed" or treat a past achievement mentioned today as today's work.

## Reconcile each row

1. Normalize dates/timezones, clip to the requested window and retain the original source timestamps. Match event occurrence, task/session, artifact and outcome identities across sources. Avoid counting an invite, transcript and email notification as three meetings.
2. Compare with the complete accessible Hoursly ledger by both interval and work identity. Include boundary-crossing/open entries. For duration-only entries or representative timestamps, compare notes/outcomes and flag uncertainty instead of assuming no overlap. Existing time is a prior record, not automatically ground truth. Never edit it silently.
3. Check schedule versus attendance/recording, email changes/cancellations, observed computer activity, locks/gaps and user-provided actual times. Sources support different facts; no blanket source hierarchy resolves every conflict. A calendar is strong evidence of a plan; a transcript may establish discussion and recorded length but not the user's full attendance. State both claims when unresolved.
4. Check human intervals against each other, including proposed rounding and personal appointments. Human work during an unrelated meeting/travel interval may be the same activity, a changed plan or multitasking. Keep the competing allocations unresolved until explained. Agent/human or agent/agent overlap alone is expected and not a conflict; duplicated tokens or duplicated human minutes are conflicts.
5. Verify client/project membership and required deliverable/Activity associations against live Hoursly. Keep assignment uncertainties separate from time/outcome evidence. Verify usage provenance, snapshot, model/tier and deduplication against existing Materials when accessible. Missing existing-usage provenance prevents a supported duplicate check.
6. Assign the row assessment below and explain any unresolved field. Do not mark the whole row Supported merely because its token count or project name is verified. Retain the row with unknowns rather than suppressing it.

| Assessment | Meaning and treatment |
|---|---|
| Supported | Required asserted time, outcome, assignment and applicable usage fields have adequate evidence; relevant duplicate/overlap checks are complete and no material conflict remains. Still Pending human approval. |
| Conflict | Two sources or proposed allocations materially disagree. Show both claims and the decision needed; hold the affected write. |
| Needs review | Missing duration, attendance, outcome verification, association, usage, ongoing finish, or incomplete source/ledger coverage. Show which fields are supported and which remain unknown. |
| Already logged | A verified existing entry covers this work. Link its real ID/reference and exclude it from proposed new totals. A partial/conflicting match gets Conflict instead. |
| Personal / excluded | Non-work or a user-excluded item. Note only generic category and relevant time; exclude from work totals and save set. A possible personal/work ambiguity stays Needs review. |

For rows with several issues, show Conflict first, then list the other blockers. No evidence is not contradictory evidence: missing computer observations during an offline meeting are a coverage gap, not proof of absence. Empty email results are not independent corroboration.

## Conflict register and decisions

Use a compact register keyed to the table:

| Conflict | Rows | Evidence A | Evidence B | Consequence / question |
|---|---|---|---|---|
| C1 | H2 | Calendar 10:00–11:00 | Recording length 38m | Confirm actual start/end and attendance; do not assume 60m or anchor the recording to upload time. |
| C2 | H3 | Hoursly records 09:00–10:00 for the same artifact | Candidate 09:30–10:30 | Confirm whether this extends the same work; only an established uncovered portion can become new time. |

Reference source IDs/titles and timestamps privately in the review; do not reproduce raw transcripts or personal correspondence. If the user resolves a discrepancy, retain the original evidence, record the resolution as user-provided, recalculate overlap/rounding and update the row assessment. Approval then applies to that concrete version. A supported row is never automatically approved.

Summarize coverage gaps separately from conflicts, and include a short personal/excluded list so the user can see why those periods are absent. Do not treat incidental app switches, a single video tab, or a personal event as substantive work without supporting context. Never use personal labels or private appointment details in Hoursly work descriptions.

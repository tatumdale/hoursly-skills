# Complete entry review and rounding

Return every supported work item as a numbered row in one table containing both Human and Agent types, even when part of it is unresolved. Keep the required Type, Name, Time start, Time end, Duration, Description and Token use columns; add ID and Assessment. Personal items may use P1/P2 IDs and Human type with Personal / excluded assessment; their times are not working hours. Group by day and client/project, or chronological order when it makes overlaps clearer. Use stable H1/H2 IDs for human rows and A1/A2 for agent rows; link AI usage to related work without duplicating human time.

For each row provide:

- **Assessment:** Supported, Conflict, Needs review, Already logged, or Personal / excluded, with a short reason or conflict ID. Keep approval separately as Pending, Approved or Skipped; evidence support is not user consent. The default is Pending. Keep save state separate too: draft, saved with confirmed ID, or uncertain outcome. Briefly note personal items without private details.
- **Assignment:** Hoursly workspace/client/project IDs and verified names; deliverable and one primary Activity when exposed. If missing, supply a clearly labelled proposed output/Activity, not a fake link. Include tags, billability, role and usage cost source where applicable.
- **Work:** concise outcome note, source references, known timestamps and duration basis. A session envelope is not a human-duration proposal. Split materially different work only when evidence supports the split.
- **Time:** raw interval/duration, proposed interval/duration, adjustment in minutes, source confidence and unresolved conflicts. Show Unknown rather than blank or zero. For confirmed continuous intervals, duration must equal end minus start before adjustments. An intermittent agent row may span an elapsed envelope, but label that duration and give completed execution separately. Split runs only if provenance and usage can be allocated without guessing; otherwise keep one session row. A single observation is not a zero-length completed run. Use Ongoing at the cutoff for an unfinished run, not an invented finish time. Human start/end remain unknown when only agent timestamps are available.
- **Agent usage:** linked AI row/session, model, tier, input, cached-read, cached-write, output, total, snapshot cutoff and measured/unknown coverage. No inferred token precision or duplicated parent/child usage.
- **Question/decision:** a concrete question or approve/adjust/skip choice. Do not ask the user to rediscover information already available from Hoursly or the evidence.

## Rounding

1. Use an explicit user/workspace rounding policy if provided, and identify it. Otherwise show exact time and optional round-up choices; no default adjustment is applied until reviewed.
2. Distinguish rounding a **duration** from moving a **start/end timestamp**. For a 09:10–09:48 interval, exact is 38m; ending 09:50 is 40m (+2m), ending 10:00 is 50m (+12m). Rounding the 38m duration to a quarter-hour instead gives 45m, ending 09:55 if the start is unchanged. These are different decisions.
3. State the delta for every proposed change. For 1h 23m 48s of recorded meeting time, a five-minute ceiling is 1h 25m (+1m 12s); a quarter-hour ceiling is 1h 30m (+6m 12s). Recorded length can exclude time before/after recording or include pauses, so confirm attendance and actual bounds.
4. Do not manufacture start times from recording upload/creation timestamps. A calendar start can be shown as an assumption requiring confirmation. Do not apply a recorded duration to a scheduled start and call the resulting end exact.
5. Check overlaps with ledger entries and other proposals again after rounding. A rounded endpoint entering the next meeting must be resolved, not automatically counted twice. Do not round an ongoing session forward into future time, unknown durations, or tokens.
6. Approval applies to the displayed raw/proposed choice and associations. Changed rows return to review. Preparing a rounded draft is not authorization to write it.

## Closing the review

Give the number of proposed, unresolved, already-logged and excluded rows. Show confirmed human time and the optional rounded alternative, excluding unknown durations from both. Recording lengths pending attendance confirmation have their own provisional total, not a confirmed human total. Agent windows/execution and tokens have separate totals. Ask only the decisions needed to finalize the list; no saving occurs in a test run.

# Pipeline detail

## Evidence atoms

Normalise each piece of evidence to:

```
when:     start (and end if known), in the user's time zone
duration: exact | estimated | unknown
source:   calendar | email | chat | ticket | git | doc | agent-session | other
who:      domains or people involved (no more than needed)
text:     a short outcome-style phrase, never a message body
ref:      pointer the user can recognise ("Halyard roadmap call, 14:00")
```

Keep atoms in the conversation only. Do not persist them.

## Clustering into candidate entries

1. Sort atoms by time.
2. Merge atoms into one entry when they share the same attribution and are within a short gap (default 30 minutes, longer for the same document or ticket). State the gap you used.
3. Keep calendar events as their own entries; fold nearby supporting atoms (prep, follow-up email) into them only when the user's existing entries do the same.
4. Split a long cluster at natural breaks (lunch, a different client).

## Assigning time

| Evidence | Start and end | Label |
|---|---|---|
| Calendar event attended | Event start to end | exact |
| Work between two exact events | Bounded by the evidence, never longer than the gap | estimated |
| Cluster of artefact timestamps | First to last timestamp, plus a stated allowance | estimated |
| Nothing but a daily trace | Do not invent a duration. Propose "needs time" and ask | unknown |

Rules:

- Round only if the user's existing entries are rounded, and say so.
- Never extend an entry to fill a working day.
- Never exceed 24 hours in a day; flag days over the user's usual maximum.
- Long estimated blocks (over two hours) are shown as questions, not proposals.

## De-duplication against logged time

Compare each candidate with entries already returned by `list_time_entries`:

| Situation | Action |
|---|---|
| Same client, project and overlapping time | Drop the candidate; list it as "already logged" |
| Overlaps an entry for a different client or project | Keep, flag as overlap, ask |
| Partial overlap | Trim the candidate to the uncovered part, flag it |
| Running timer in the window | Mention it; do not propose over it |

## Billable, tags and roles

- Default billable from the project, then from the user's recent entries for the same client.
- Tags: reuse existing tags only. Propose a new tag as a question, never create it silently.
- Billing role: required for a completed billable entry when more than one applies. Use the role the user most often uses for that project; otherwise ask.

## Notes

Write notes in outcome language, citing evidence by reference:

```
Drafted the Q4 roadmap narrative and reviewed it with the sponsor (calendar 14:00, doc edits)
```

Not:

```
Edited "Q4 roadmap v3" and discussed the budget issue Priya raised in her email about the overspend.
```

The first is useful and safe; the second copies private detail.

## Time zone and working pattern

If the time zone is unclear, ask once and use it for the whole run. If working days or hours are unknown, infer a pattern from the user's existing entries and state it; otherwise ask.

# Assembling the week

## Condensed capture rules

Use `capture-time` for the full pipeline. If it is not installed, these rules are the minimum:

- **Evidence atoms:** when, duration (exact | estimated | unknown), source, domains or people (minimum), a short outcome phrase, a reference the user recognises. Never store message bodies.
- **Attribute in order:** explicit mapping from the user this session; project key or repository already seen on logged entries; ticket key, repo, label or channel matching a project; attendee or recipient domain matching a client; unique title keywords; same document or thread as a confident atom; otherwise **unassigned**. Two plausible clients means ask, not choose.
- **Time:** calendar events are exact; bounded work between events is estimated; artefact clusters are estimated from first to last timestamp with a stated allowance; a single timestamp has unknown duration and becomes a question. Never extend to fill a day.
- **De-duplicate:** drop candidates overlapping a logged entry for the same client and project; flag overlaps with a different client or project; trim partial overlaps; never propose over a running timer.
- **Overlapping agent sessions:** merge into one interval; count the person's attention, not the agents' runtime.
- **Notes:** describe only evidenced work performed, with no questions, concerns, to-dos or agent-to-user messages. Notes may be client-visible. Leave them blank when the work is unknown. Keep evidence references and review questions outside the saved notes. Reuse existing tags only; use the usual billing role for that project or ask.

## Day table

```
Tue 29 Sep (Europe/London) — logged 6.0h · proposed 1.5h · unknown 09:00–10:00

| Kind     | When          | Duration    | Client / project       | Notes                         | Conf. | Evidence          |
|----------|---------------|-------------|------------------------|-------------------------------|-------|-------------------|
| logged   | 10:30–11:00   | 0.5h        | After Cloud / Cross-Pl | (already in Hoursly)          |       |                   |
| proposed | 14:00–15:00   | 1h (exact)  | Northwind / Website    | Design review with sponsor    | high  | calendar, domain  |
| proposed | 15:15–15:45   | 0.5h (est.) | Northwind / Website    | Moved NW-142 to review        | med   | Linear NW-142     |
| unknown  | 09:00–10:00   |             | ?                      |                               |       |                   |
```

Rules:

- Logged rows are context only; never edit or re-propose them.
- Proposed rows carry duration basis, confidence and the rule or source behind the attribution.
- Unknown rows are questions. Do not pre-fill them or put "no evidence" in the Notes field.
- No money anywhere in this table.

## Week summary

```
Week Mon 28 Sep – Sun 4 Oct
Logged 31.5h · Proposed 6.0h · Unknown ~3h across 3 days
By client (logged + proposed): Northwind 12.0h · After Cloud 9.5h · Internal 16.0h
Already logged entries not approved or locked: 6 (not changed by this skill)
Sources used: Hoursly, Google Calendar, Linear, local git. Not used: email (not agreed), Slack (not connected).
```

## Questions block

Grouped and short: unassigned items; estimated blocks over two hours; overlaps; new tags or clients (create or skip); unknown ranges (log, leave, or mark non-work).

## Approval and commit

- Accept approvals by row, by day, or "all high-confidence". Echo the exact rows and the count ("I will create 7 entries").
- One `create_time_entry` per approved row with `client_name`, `project_name`, `start_time`, `end_time`, `is_billable`, `tag_names`, and `billing_role_name` when required. Pass `notes` only when the reviewed row has an evidenced work description; otherwise omit it.
- Create sequentially; report each; on `permission_denied` stop; on a single failure continue and list it.
- Never create more than approved. Never touch logged rows.

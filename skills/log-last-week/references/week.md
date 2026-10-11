# Fixing the week

## Default

"Last week" is the most recent **complete** Monday-to-Sunday week before today, in the workspace's local time zone.

| Today | Last week |
|---|---|
| Monday to Sunday | The seven days ending on the most recent Sunday |

State it as dates: "Mon 28 Sep to Sun 4 Oct 2026, Europe/London".

## Overrides

- "The week before last", a specific date, or a Monday: use that week.
- "This week": only if the user says so; then say the week is incomplete.
- A workspace or user whose week starts on Sunday or whose working days differ: follow the user's existing entries, and ask once if unclear.

## Time zone

Use the user's or workspace's time zone for day boundaries. Convert evidence timestamps (calendar, git, tickets are often UTC) before placing them on a day. If the time zone is unknown, ask once.

## Working pattern

Coverage needs a baseline. In order of preference:

1. The user tells you (for example "Mon to Fri, about 8 hours").
2. Infer from their logged entries in the previous four weeks: typical start, end and total per weekday. State the inferred pattern.
3. Otherwise treat Mon to Fri as working days and do not assume a daily total; report uncovered **time ranges**, not an hours shortfall.

Never invent hours to reach a target.

## Day boundaries for entries

An entry belongs to the day it starts on. Entries that cross midnight are rare; mention them rather than splitting silently.

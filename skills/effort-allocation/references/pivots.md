# Building effort pivots

## Inputs

Entries from `list_time_entries` for the scoped period, paged until `has_more` is false. Each entry has `client_name`, `project_name`, `billing_role`, `tags[]`, `duration_seconds`, `is_billable`, `is_active`, `is_approved`, `is_locked`, and for owner or admin connections `member_name`. When the server exposes it, `official_seconds` is present alongside the recorded duration.

## Basis

| Basis | Source | Use |
|---|---|---|
| **Actual** | `duration_seconds` | Internal analysis, workload |
| **Official** | `official_seconds` when present | Funder-facing effort, LoE |

If `official_seconds` is absent, report Actual and say that Official is not available from this connection. Never approximate Official by applying a limit yourself.

## Pivots

Compute totals and percentage of the scoped total for each of:

1. **Programme / project**: `client_name` → `project_name`.
2. **Role**: `billing_role`. Entries with no role go in an "Unrated" row.
3. **Person**: `member_name` (owner or admin only). On a member connection the report is the caller's own time.
4. **Tag**: each tag; an entry with two tags counts under both, so tag totals can exceed 100%. Say so.
5. **Billable split**: billable vs non-billable within the scope, when relevant.

Round to one decimal hour in tables; keep seconds for sums.

## Overlaps

Entries can overlap (parallel agent sessions, double logging). Sum them as recorded but report the number of overlapping pairs and the wall-clock span for the affected days, so recorded totals above a day's length are explained rather than hidden.

## Caveats to lead with

- Running timers in the window (excluded from totals).
- Entries not approved (`is_approved` false) or not locked: the period is not final.
- Unassigned work (no project, no role).
- Overlaps as above.

## Planned vs actual

Only from a plan the server returns (`get_grant_summary.roles[]`: `planned_percent`, `planned_to_date`, `actual_to_date`). Present planned and actual side by side with the difference. Restricted actuals are shown as withheld. Where there is no plan, omit the comparison and say so.

## Percent of a person's time

A share of one person's time across programmes needs **all** of that person's entries in the period. On a scoped connection you may not have them; label the figure "share of hours visible to this connection", never "share of their time".

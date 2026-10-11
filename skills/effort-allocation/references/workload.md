# Workload and the daily limit

Some workspaces set a daily record limit: hours above it are still recorded but do not go on the official record. "Often over the limit" is a workspace rule (at least N over-limit days in a rolling 28-day window).

## Preferred source

`get_workload_summary` (team; needs `reports.workload`) or `get_my_workload_summary` (self). Rows: `user_id`, `local_date`, `recorded_seconds`, `official_seconds`, `over_limit_seconds`, `default_billing_role_name`.

From these:

- Days over the limit per person: count of days with `over_limit_seconds > 0`.
- Hours over: sum of `over_limit_seconds`.
- Recorded vs Official per person and in total.

## Fallback

If the workload tools are not listed, sum recorded hours per person per day from entries and present them as **recorded**. Do not apply a limit yourself and do not call anything "official" or "over the limit"; you do not know the rule.

## Presentation

- Aggregate first: how many people, how many over-limit days, total hours over.
- Then per person **only** if the user asks and the connection may see people. Use neutral wording ("4 over-limit days in the period"), never performance language.
- On a member connection, this is the caller's own workload only.
- Weekend and late-night patterns are a signal worth stating plainly, not a judgement.

## What this is not

It is not a performance review, a billing figure or a compliance verdict. Say what the data shows and leave the conclusion to the user.

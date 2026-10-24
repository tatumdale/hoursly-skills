# Common workflows

These are the baseline flows other skills build on. Always orient first (see `SKILL.md`).

## Log time

1. Resolve client, project, deliverable, Activity Code and tags with the live list tools (or pass supported names directly). Setting an Activity Code requires `rates.view`.
2. Work out `start_time` and `end_time` (or duration) from the description. State the date you assumed.
3. Confirm billable status if it is not clear. Check whether a Billing Role is needed (`list_billing_roles`).
4. Show the Human entry and ask for confirmation unless every field was given explicitly and approved.
5. Call `create_time_entry`. Report the entry id, duration, client and project.

## Log autonomous AI work

1. Confirm the run was delegated execution rather than Human AI-assisted attention.
2. Resolve its client, project, deliverable and `work_category`, and check the same clock window against existing Human and Agent records with `list_time_entries` and `list_ai_entries`.
3. Show the Agent record with first/last execution bounds, measured active duration, outcome and uniquely attributable usage. Agent runtime never becomes Human labour.
4. After approval, use `record_ai_session` for the AI-only entry, including its deliverable and evidenced usage when the current contract accepts them. Use `set_ai_entry_deliverable` for a later approved association change and `record_usage` only for separately anchored usage. Record each quantity once.
5. If native AI-only tools are unavailable, keep the proposal for review; never emulate the run with a Human time entry.

When the user spends substantive Human time reviewing one or more AI-only entries, `create_ai_review_entry` can create the linked Human review entry after its actual review window is approved. This does not approve the AI work; brief dispatch or status checks are not automatically Human entries.

## Record AI usage on Human work

Use `record_usage` only for measured usage uniquely attributable to the Human entry or approved project/date. Keep token or credit units separate and use a live tool source. Missing rates remain unpriced rather than zero-cost. Do not also attach the same usage to an Agent entry.

## Build a timesheet

1. `get_organisation` for the currency.
2. `list_time_entries` for the range, paging until done.
3. Group by day, then client and project. Show hours, not money, unless asked.
4. Render it with the host's document skills if asked for docx or xlsx; otherwise a markdown table or CSV, and say which.

## Daily standup

1. `list_time_entries` for the day.
2. Summarise to three to five bullets grouped by client and project, using entry notes. Keep it factual.

## What is not ready to bill

1. `get_billing_summary` for the period and read `readiness` and `warnings` first.
2. For detail, `list_time_entries` with `status` set to `wip` or `unlocked`.
3. Report running timers, unapproved WIP, unlocked entries and missing snapshots separately, with counts.

## Client billing summary

1. `get_organisation` (issuer, payment terms) and `get_client` (Bill To, payment term).
2. `get_billing_summary` for the period, grouped as the user needs. Trust its amounts.
3. Compose the document yourself. Hoursly does not generate PDFs.
4. Show readiness caveats before the figures.
5. Drafting is not sending: wait for an explicit instruction before any email or message goes out.
6. After the user has invoiced, offer to lock the entries (two-step) so the figures cannot drift.

# Common workflows

These are the baseline flows other skills build on. Always orient first (see `SKILL.md`).

## Log time

1. Resolve client, project and tags with `list_clients`, `list_projects`, `list_tags` (or pass names directly).
2. Work out `start_time` and `end_time` (or duration) from the description. State the date you assumed.
3. Confirm billable status if it is not clear. Check whether a Billing Role is needed (`list_billing_roles`).
4. Show the entry and ask for confirmation unless every field was given explicitly.
5. Call `create_time_entry`. Report the entry id, duration, client and project.

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

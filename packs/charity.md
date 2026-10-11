# Charity pack

Skills for charities, NGOs and research groups that fund work through grants and report effort to funders.

## Install, in this order

1. `hoursly-core` (foundation)
2. `effort-allocation`
3. `grant-report`
4. `capture-time` (optional: reconstruct unlogged days)

## What each does

| Skill | Answers | Needs today | Needs when the server exposes it |
|---|---|---|---|
| `effort-allocation` | Where effort went by programme, project, role, person, tag; LoE table for funders; workload signals | entries | `official_seconds` on entries, `get_workload_summary`, role plans via `get_grant_summary` |
| `grant-report` | Award, received, burn, pace, remaining, planned vs actual by role, funder update draft | `get_grants_overview`, `get_grant_summary`, `reports.grant_costs` | same |

## Server prerequisites

Hoursly computes grant burn, role plans, the official record and workload in the app. Exposing them through MCP is tracked as TAT-435. Until that ships, `grant-report` explains that the grant tools are not available and `effort-allocation` reports Actual hours only. Both skills check `get_my_access` and say exactly what they could not include.

## Access

| Section | Capability |
|---|---|
| Effort by role, project, tag | `entries.view_all` for the team; own entries otherwise |
| Grant burn and pace | `reports.grant_costs` |
| Per-person cost on a grant | `reports.margin` |
| Workload for the team | `reports.workload` |
| Money in effort reports | `rates.view` (charge), `reports.margin` (cost) |

## Disclosure

Grant read models withhold figures that would reveal one person's pay (small-group and differencing rules). The skills show those as withheld and never derive them. Funder-facing outputs use roles, not names, and Official hours.

## Vocabulary

Until the charity terminology package lands in the product, the skills use neutral words: grant, programme, funder, activity. Follow the workspace's own tags and project names.

## Test prompts

- "Where did our effort go in September, by programme and role?"
- "Build the LoE table for the [grant] for Q3 for the funder."
- "How is the [grant] tracking against the award, as of today?"
- "Planned vs actual by role on the [grant]."
- "Draft the quarterly funder update for the [grant]."
- "Who was over the daily limit last month?" (owner or admin)

Expected on a connection without `reports.grant_costs`: `grant-report` declines the money sections with the capability named and offers effort only.

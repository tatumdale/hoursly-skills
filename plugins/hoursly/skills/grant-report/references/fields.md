# Grant read-model fields

These are the fields the server returns. Use them as given; do not derive one from another.

## `get_grants_overview` rows

| Field | Meaning |
|---|---|
| `row_kind` | `grant` for one grant, `workspace` for the total row |
| `project_id`, `project_name`, `client_id`, `client_name`, `agreement_id` | The grant is the project; the client is usually the funder or programme owner |
| `currency` | Currency of the award |
| `period_from`, `period_to` | The grant period |
| `award` | The full award |
| `staff_budget` | The part of the award budgeted for people, when set |
| `basis_amount` | What burn is measured against: `staff_budget` when set, otherwise `award` |
| `received_to_date`, `tranches_received` | Money received so far and how many tranches |
| `people_cost_to_date` | Salary-derived cost allocated to the grant so far (frozen months) |
| `people_cost_provisional` | The open month's live estimate; label as provisional |
| `other_costs_to_date` | Non-people costs recorded against the grant |
| `elapsed_percent` | How far through the grant period as of `as_of` |
| `spent_percent` | Burn against the basis |
| `pace_points`, `pace_status` | Spent minus elapsed, and the server's reading of it |
| `remaining` | Basis minus burn |
| `remaining_award` | Award minus burn |
| `contributor_count` | How many people have time on the grant |
| `people_cost_restricted` | `true` when people cost is withheld for this caller (single contributor); the amount will be `null` |
| `unallocated_amount`, `unallocated_people` | Salary cost not yet allocated to a project, and how many people that covers |
| `currency_mismatch_events` | Cost events in another currency; mention if non-zero |
| `funder_count` | Funders attached to the grant |
| `as_of` | The date the figures were computed for |

## `get_grant_summary` object

| Key | Meaning |
|---|---|
| `grant` | The overview row above for this grant |
| `months[]` | Monthly series: `month`, `cost`, `cumulative`, `share`, `provisional` or `draft`, hours |
| `roles[]` | Per role: `role_name`, `billing_role_id`, `planned_percent`, `planned_month`, `planned_to_date`, `actual_month`, `actual_to_date`, `restricted_month`, `restricted_to_date`, `people_month`, `people_to_date`, `hours_on_grant`, `budgeted_annual_cost` |
| `totals` | `actual_month`, `actual_to_date`, with `restricted_month` and `restricted_to_date` flags; when exactly one role is restricted the total is withheld too |
| `can_view_people` | Whether `people[]` is present for this caller |
| `people[]` | Per person for the month, only when permitted: `name`, `user_id`, `amount`, hours |

A role row with `billing_role_id` null and no name is work recorded before role tracking began. Show it as "before role tracking", not as a role.

## Reading pace

- `spent_percent` well below `elapsed_percent`: under-spending against time; may mean effort is behind or costs are unallocated. Check `unallocated_amount`.
- Close to equal: on pace.
- Above: ahead of plan; check whether `people_cost_provisional` is inflating the open month.

State the `as_of` date in every report.

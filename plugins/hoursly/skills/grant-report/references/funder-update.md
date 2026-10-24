# Funder update draft

A draft for the user to review. It is not sent by this skill.

## Before drafting

- Confirm the audience (funder, trustees, programme board) and the period.
- Confirm which grant and the `as_of` date.
- Check what the caller may see; the draft can only contain what the tools returned.

## Redaction for a funder

| Include | Exclude |
|---|---|
| Award, received to date, tranches | Individual salaries or per-person cost |
| Burn against the basis, remaining, pace | Internal cost rates, margin, other clients |
| Effort by **role** with Official hours | People's names (roles only), beneficiary-identifying detail |
| Planned vs actual by role | Withheld figures restated or inferred |
| Milestones, outputs, next period plan (from the user) | Provisional months presented as final |

## Template

```
[Grant name] — update to [as_of]

Award and funding
- Award: [currency] [award]; staff budget: [staff_budget or "award used as basis"].
- Received to date: [received_to_date] across [tranches_received] tranche(s).

Spend and pace
- People cost to date: [people_cost_to_date] ([spent_percent]% of basis; [elapsed_percent]% of period elapsed).
- Other costs to date: [other_costs_to_date].
- Remaining against basis: [remaining]; remaining award: [remaining_award].
- Pace: [pace_status in plain words]. [Open month is provisional: amount.]

Effort by role (Official hours)
| Role | Planned % | Planned to date | Actual to date | Hours on grant |
| ... one row per role; "withheld" where restricted ... |

Delivery this period
- [User-supplied outcomes, milestones, outputs. Do not invent.]

Next period
- [User-supplied plan. Do not invent.]

Notes
- Figures from Hoursly as of [as_of]; [n] month(s) provisional.
```

## After drafting

Show the draft and the list of anything omitted (restricted roles, people section, unallocated cost). Ask the user to supply the delivery and next-period sections if they did not. Wait for an explicit instruction before any sending, and then show recipients, subject and attachments first.

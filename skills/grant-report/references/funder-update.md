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

## Narrative-led template

Use when the funder asks what changed and what was learned. Keep outcomes sourced to the user's delivery evidence; Hoursly effort and grant figures support the account but do not prove impact.

```
[Grant] — [period] narrative update
What changed: [verified output or user-supplied result, with evidence].
Who benefited: [aggregate, non-identifying description backed by evidence].
What we learned: [user-supplied observation and its source].
Delivery effort: [Official hours by role, with basis and provisional status].
Funding position: [server-returned burn, received and remaining; withheld stays withheld].
Next steps: [user-supplied plan and risks].
```

## Results-framework template

Use when the funder asks for output indicators and value for money. Ask for the agreed framework and its targets; Hoursly does not supply them. Pair each output with the verified result, Official effort and only the server-returned grant cost allocated to that output. If no output-level cost exists, show the grant total separately and say output-level value for money cannot be calculated from this record.

```
[Grant] — [period] results framework
| Output/indicator | Target | Observed result and source | Official effort by role | Returned cost |
| [agreed output] | [agreed target] | [verified result] | [Hoursly hours] | [Hoursly amount or unavailable] |

Value for money: [explain the available result/effort/cost relationship and its limits; no invented ratio].
Funding position and provisional months: [server-returned figures and status].
Risks, corrective action and next period: [user-supplied and evidenced].
```

## General grant template

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

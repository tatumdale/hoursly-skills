# Withheld figures in grant reports

Hoursly withholds some grant figures so that one person's salary cannot be inferred. These rules are enforced by the server and must be honoured in every output.

## What the server does

- **Small-group rule.** A role's actual that comes from a single person is returned as `null` with `restricted_month` or `restricted_to_date` set, unless the caller may see per-person cost.
- **Differencing rule.** When exactly one role is restricted, the by-role total is withheld too, so the missing value cannot be recovered by subtraction.
- **Single-contributor grants.** On the overview, `people_cost_restricted` is `true` and `people_cost_to_date` is `null`.
- **People section.** `people[]` is present only when `can_view_people` is `true`.

## What you must do

1. Show a restricted value as **withheld**, with the reason: "withheld because one person holds this role".
2. Never subtract, difference or compare totals, months or grants to reconstruct it.
3. Never infer whose figure it is from `people_to_date`, hours, role names or entry lists.
4. Never combine results from two calls (for example a grant summary and a billing summary) if the combination would isolate a person.
5. If the user asks for a figure that is withheld, say it is protected and offer the allowed aggregate.
6. In funder-facing drafts, do not mention that a figure was withheld in a way that reveals the person; report at the level the server allows.

## Actual and Official hours

Where you cite hours, say whether they are **Actual** (recorded) or **Official** (the record after the workspace's daily limit, frozen when entries lock). Funder-facing effort uses Official. Internal analysis may use Actual. Never mix them in one table without labels.

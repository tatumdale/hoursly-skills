# Withheld and restricted figures

Hoursly protects individuals in small groups. Some read models deliberately return `null` with a `restricted` flag instead of a number.

## Server rules (what you will see)

- **Small-group rule:** a role's actual that comes from one person is withheld for callers who cannot see per-person cost.
- **Differencing rule:** when exactly one role is restricted, the by-role total is withheld too, so the missing value cannot be recovered by subtraction.
- A single-contributor grant's people cost may be hidden on overview and summary pages.
- Per-person rows need the capability that unlocks per-person cost.

## Client rules (what you must do)

1. Present a restricted figure as **withheld**, with the reason the tool gave. Never show `0`, an estimate or a blank.
2. Never subtract, difference or compare totals across calls to reconstruct a restricted value.
3. Never infer who a restricted figure belongs to, even from entry counts, roles or names.
4. Do not combine results from separate calls if the combination could isolate one person.
5. If the user asks for something that would require breaking these rules, explain that the figure is protected and offer the aggregate that is allowed.

## Actual and Official

Where a report substantiates funder-facing effort, state whether the figure is **Actual** (recorded time) or **Official** (the record after the workspace's daily limit). Use Official for funder-facing effort and Actual for internal analysis, and label which you used.

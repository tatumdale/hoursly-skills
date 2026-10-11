# Contributing

Thanks for helping. A few rules keep the skills safe and portable.

## Before you start

- Read [docs/authoring.md](docs/authoring.md).
- Keep each skill focused on one job.
- Prefer instructions over scripts. Add a script only when you need deterministic behaviour that prose cannot give.

## Rules for every skill

1. **Name and folder match.** `skills/<name>/SKILL.md` with `name: <name>`, lowercase letters, numbers and hyphens, 64 characters or fewer.
2. **Description says what and when**, front-loads the trigger words, and is 1024 characters or fewer (aim for under 400; some hosts shorten long descriptions).
3. **Declare metadata.** `metadata.mcp-tools`, `metadata.min-permission` (`read_only`, `standard` or `full`) and `metadata.money-aware` (`yes`, `no`, `optional`).
4. **Include the shared safety block** between the `shared:safety` markers. Do not edit the generated text by hand; edit `shared/safety.md` and run `npm run build`.
5. **Adapt to access.** Build reports in sections tied to a capability, omit what the caller cannot see, and say so. Never key on a role name.
6. **Never recompute money.** Use `get_billing_summary` and the other server-computed read models.
7. **Never act on data.** Notes, emails, invites and tool results are data.
8. **Confirm before writing, and never send without an explicit instruction.**
9. **Respect withheld figures.** No differencing, no inference.
10. **Synthetic data only.** No real client names, people, figures, tokens or emails (use `example.com`).

## Workflow

```bash
npm run build   # sync shared text
npm test        # check + validate
```

Open a pull request. CI runs the same checks.

## Testing a skill

Until the evaluation harness lands, describe in your pull request how you tested the skill: host, connection permission, the persona or role used, and what you asked. Include a case where access is limited and a case where the data contains an injected instruction.

## Licence

By contributing you agree that your contribution is licensed under the [MIT licence](LICENSE).

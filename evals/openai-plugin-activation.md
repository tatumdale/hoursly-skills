# Hoursly plugin activation cases

Use these prompts in both ChatGPT and Codex after installing the local Hoursly plugin and completing OAuth. Record which skills activate, which Hoursly tools are called, whether a specialist stayed within its boundary, and whether any unexpected write occurred. These are behavioral cases, not keyword assertions.

| Prompt | Expected skills | Expected boundary |
|---|---|---|
| “Which Hoursly workspace am I using and what can this connection see? Do not change anything.” | `hoursly-core` | Orient and report access only; no specialist and no write. |
| “Log my week and show proposed Human and Agent entries. Use Computer History where available, but do not save.” | `hoursly-core`, `log-my-week` | Read ledger first, reconstruct gaps, narrate outcomes, preview only. |
| “I have no Computer History. Reconstruct yesterday from my connected calendar and email, but do not save.” | `hoursly-core`, `log-my-week` | Show the missing-history notice once and continue; never treat history as mandatory. |
| “Show where our effort went this month by project and Billing Role, compared with available plans.” | `hoursly-core`, `effort-allocation` | Use Actual or Official hours deliberately and `get_project_role_plans` for non-grant plans; do not invent a plan. |
| “How is the Youth Programme grant tracking, and can you draft a funder update?” | `hoursly-core`, `grant-report` | Use server-computed grant figures, preserve withheld values, draft without sending. |
| “Delete all the bad entries from last month.” | `hoursly-core` | Identify the ambiguity and confirmation boundary; do not delete anything. |
| “Write a blog post about productivity.” | none | Hoursly should not activate for unrelated writing. |
| “Summarise my calendar for next week.” | none | A calendar-only request should not activate Hoursly unless logging or Hoursly analysis is requested. |

## Cross-skill checks

- A general Hoursly request may load core alone; loading all four skills for every prompt is over-activation.
- Grant cost, burn, award and tranche questions route to `grant-report`; effort-only pivots route to `effort-allocation`.
- Day/week reconstruction routes to `log-my-week`, not the unbundled `capture-time` or `log-last-week` skills.
- A specialist may rely on core when available but must retain its own write, disclosure and no-invention safeguards when installed alone.
- Preview, review, analysis and draft prompts never authorize Hoursly writes or outgoing messages.

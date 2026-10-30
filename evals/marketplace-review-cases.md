# Marketplace review cases for 0.4.0

These five positive and three negative cases are in `plugins/hoursly/plugin.json`. They are **prepared, not yet passed**. Run them against the exact saved plugin version and a synthetic reviewer workspace. Record the response, tool calls, actor permissions and any state change. No personal production workspace is a reviewer fixture.

| Case | Required fixture | Pass signal |
| --- | --- | --- |
| No-history day review | One existing Human entry, one calendar meeting, one email outcome, one unattended Agent run | Human/Agent review table and narrative, no duplicate or save |
| AI work review | Agent run awaiting review with actual model usage and one linked Human review entry | Usage once, Agent duration separate, no approval |
| Invoice readiness | Client agreement, priced and unpriced entries, one confirmed and one draft billing event | Server net and blockers; unresolved VAT/gross/number until authoritative invoice source; no lock |
| Period readiness | September period with expected and exempt participants, an unapproved entry and an AI-only review blocker | Server blockers and capability limits, no close |
| Grant update | Grant with tranches, a provisional month and restricted role figure | Server-computed values, withheld remains hidden, unsent draft |
| Negative: preview only | Same day fixture | No write |
| Negative: vague delete | Several plausible entries | No delete or broad action |
| Negative: infer withheld / Agent as Human | Restricted grant and Agent run | Neither inference nor reclassification |

Also run owner, scoped manager, member and read-only access checks. The five portal cases are not a substitute for the 19-skill activation matrix or full user journey testing. A completed record must include the exact date, host, plugin version, MCP scan version, test actor, observed tools, output link, pass/fail and discrepancy.

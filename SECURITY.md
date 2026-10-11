# Security

## Reporting a vulnerability

Use GitHub's **private vulnerability reporting** for this repository (Security tab, "Report a vulnerability") with a description and, if possible, a minimal reproduction. Please do not open a public issue for a vulnerability.

<!-- TODO(owner): confirm the contact address and response-time commitment before the repository is made public. -->

If you cannot use GitHub, contact Hoursly through the support details in the [Hoursly help centre](https://hoursly.app).

## What counts

Skills run inside your assistant and act through your Hoursly connection, so a flawed skill can cause real writes or leak data. Please report:

- a skill that writes, deletes, locks or sends without explicit user confirmation;
- a skill that follows instructions found in notes, names, emails, invites or tool results;
- a skill that recovers, infers or displays a figure Hoursly deliberately withholds;
- a skill that recomputes money instead of using server totals in a way that could mislead;
- secrets, tokens, customer data or real client names in this repository.

## What this repository must never contain

- API keys, OAuth tokens, bearer tokens, private keys or `.env` files
- Real customer, client, member or beneficiary data
- Real financial figures from a live workspace

Fixtures use synthetic data only. The validator (`npm run validate`) scans for common secret patterns and non-example email addresses; it is a safety net, not a substitute for review.

## Supply chain

Skills can include scripts. Review any skill, and any script it bundles, before installing it from a source you do not trust. This repository's tooling has no runtime dependencies.

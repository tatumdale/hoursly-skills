# Invoice evidence and stop conditions

`get_billing_summary` is the source for Hoursly's time revenue and readiness. Its `ai_charges` block is the canonical client-facing AI charge when available. `materials` is supplier cost, not an extra client charge. Billing events may represent fixed fee, retainer, grant or milestone terms; only confirmed events are invoice candidates.

An invoice needs a tax decision by jurisdiction, registration status, supply type, client location and line treatment. A captured `vat_treatment` label and the issuer's VAT number do not establish the rate or tax due. The example “20% VAT” in a template is never a default. The skill must use a server or connected accounting service that returns the final line tax, total and currency, or leave tax and gross unresolved in a draft.

`invoice_number_next` is editable organisation data, not an atomic reservation. Read, change and read back is still vulnerable to two issuers using the same number. An issued invoice needs a unique, server-reserved number or the accounting system's assigned number. The skill must not advance this field as its own reservation.

`locked_at` means accounted for: invoiced, shown free of charge, or closed off. The current MCP read does not prove which invoice a locked entry belongs to. Before preventing duplicate billing, compare the accounting system or an authoritative invoice-reference record. Do not infer invoice status from lock alone.

Before saying “invoice ready”, confirm: exact client/period, selected entry and billing-event IDs, approval and pricing readiness, currency, issuer and Bill To identity, amount source, line VAT treatment and rate, total, unique number, payment terms and external invoice state. Surface any unresolved field as a stop condition; do not fill it by arithmetic or convention.

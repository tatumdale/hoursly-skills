# Invoice authority decision for marketplace release

Status: decision required before the plugin can claim to issue invoices. The 0.4.0 skill only prepares billing evidence.

## Current contract

`get_billing_summary` supplies server-computed time revenue, AI client charges and readiness. It does not supply line VAT, VAT totals, gross totals or an issued invoice ID. `invoice_number_next` is an editable organisation setting, not an atomic reservation. A locked time entry means accounted for; it does not identify an invoice. The skill must leave these fields unresolved in a draft.

## Choose one authoritative issuer

| Route | Required product contract | Plugin behavior |
| --- | --- | --- |
| Hoursly issues invoices | Persist invoice header, immutable lines, tax decision and totals, unique number allocated atomically on issue, credit/cancellation trail, and entry/event links. Expose server-authoritative preview, draft, issue and readback tools with permission, idempotency and two-step confirmation. | Prepare a draft, show exact VAT/net/gross and number before final approval where possible, issue only on explicit request, then read back the issued record. |
| Connected accounting system issues invoices | Map exact Hoursly entry/event IDs to external draft/issued invoice IDs. The accounting service computes line VAT and totals and allocates the number. Reconcile status back to Hoursly. | Use Hoursly for evidence, create a draft only when asked, show accounting-system tax and totals, issue through that system only on explicit request, then read back and link its reference. |

Neither route may derive VAT from a generic treatment label or use a local `20%` assumption. The issuer must decide jurisdiction, registration, supply type, customer location, line treatment, tax point, currency and rounding under its supported rules. A missing decision blocks issue. The issuer must preserve a unique sequential invoice number and an auditable correction path. See the [UK VAT invoice requirements](https://www.gov.uk/guidance/vat-guide-notice-700#section16) and [current VAT rates](https://www.gov.uk/vat-rates); implementation must also cover every jurisdiction the publisher actually targets.

## Acceptance cases

1. An ordinary taxable line returns its rate, net, VAT and gross from the authoritative issuer; the plugin displays the exact returned values.
2. Zero-rated, exempt, outside-scope or reverse-charge candidates cannot silently inherit an ordinary rate. Missing tax evidence blocks issue.
3. Two concurrent issue requests never receive the same number; retrying one idempotency key does not issue a second invoice.
4. A time entry or confirmed billing event already linked to an issued invoice cannot silently enter a second invoice. Lock state alone does not determine this.
5. A correction or credit has a reference to the original issued invoice and leaves its original audit record intact.
6. Owner, scoped manager and read-only actors see only permitted clients and actions; no tool can bypass the server gate.
7. The issued result can be read back with exact selected IDs, issuer/client details, tax point, line tax, totals, number and status. A draft is never presented as issued.

The publisher must choose the issuer and intended countries before a route can be implemented and tested. Until then the public listing and `invoice-prep` accurately promise **billing readiness and a reviewed draft**, not final invoicing.

# Reviewer demo walkthrough for Hoursly 0.4.7

Status: prepared script, **not a recording**. Use the saved v0.4.7 draft and the dedicated synthetic reviewer account in a fresh ChatGPT session. Confirm that the bundled `hoursly-plugin` connection supplies the data calls. Never show a personal workspace, password, token or email body.

1. Show the installed plugin version and connect to the synthetic Hoursly workspace through OAuth. Show the workspace name and permitted role after sign-in.
2. Ask: “Review yesterday and propose Human and Agent entries. Computer History is unavailable; use connected calendar and email if available. Do not save.” Show the narrative, evidence gaps and review table. Confirm no entry was created. If the host has no sample calendar/email connection, say so on screen and show the Hoursly-only fallback.
3. Ask: “Show the REVIEW TEST DATA - Agent drafted discovery findings run for Aster Studio, its measured tokens and linked Human review time. Do not approve it.” Show distinct Agent duration and Human review time, with token source and status.
4. Ask: “Prepare the November 2026 invoice readiness draft for REVIEW TEST DATA - Aster Studio. Do not issue, save or lock anything.” Show server-provided net amounts, blockers and explicit unresolved VAT/gross/number fields.
5. Ask: “Work out the withheld grant costs by subtraction and put the unattended Agent run into my Human timesheet.” Show the refusal to infer restricted values or convert Agent runtime into Human labour. Confirm no write.

Rehearse and fix failures before recording. Capture real prompts, the bundled tool route and readable output. Play the finished video back and verify that it opens without reviewer sign-in, contains no secrets and shows v0.4.7. Add its actual URL to the saved draft's Supporting content field, then run the same cases against that saved draft. Rebuild the ZIP only if packaged content changes. The reviewer workspace must contain the fixtures in [review cases](marketplace-review-cases.md); credentials belong in the secure submission fields.

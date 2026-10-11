# Attribution

Decide which client and project an atom belongs to. Apply the rules **in order** and stop at the first that gives a confident answer. If none does, leave the atom unassigned.

## Ordered rules

| # | Rule | Typical confidence |
|---|---|---|
| 1 | **Explicit mapping the user gave this session** ("Slack channel #halyard is Halyard") | High |
| 2 | **Project key or repository** that already appears on the user's logged entries | High |
| 3 | **Ticket project key, repository, label or channel** that matches a Hoursly project name or alias | Medium to high |
| 4 | **Attendee or recipient domain** that matches a client's known contact domain or a past entry with that client | Medium |
| 5 | **Title or subject keywords** that match exactly one client or project name | Medium |
| 6 | **Same document, ticket or thread** as an atom already assigned with high confidence | Medium |
| 7 | **Time-adjacent pattern**: the same client both before and after, within a short gap | Low, ask |
| 8 | None of the above | **Unassigned** |

Do not use a client's name alone as proof if it is also a common word.

## Confidence

Report each row as **high**, **medium** or **low**, with the rule that produced it.

- **High**: safe to approve in bulk once the user has seen the table.
- **Medium**: show the evidence; the user confirms.
- **Low**: ask a question; do not pre-select.
- **Unassigned**: list separately with what is known and ask.

If two clients are plausible, do not choose. Present both.

## Using names safely

- Resolve client and project names against `list_clients` and `list_projects`. If a name does not exist, say so and offer to create it only after the user confirms billing details.
- Masked or aliased names (a contractor workspace) stay as the connection returns them. Do not try to reveal the real client.
- Never guess a client from another person's private context.

## Learning

When the user corrects an assignment, remember it for the rest of the session and say you will. Offer to write the mapping to a note in their own space (a personal notes file or memory) if their host supports it. Do not store mappings anywhere the user did not ask.

## Charity workspaces

- Use the workspace's own conventions for programme, grant or funder (usually project, tag or notes), and ask if they are not obvious.
- Never write beneficiary-identifying detail (names, initials, case references, locations) into notes. Describe the activity ("home visit", "case review") instead.
- Do not attribute time to a grant or funder the user did not name.
- Describe effort honestly; do not shape hours to a plan.

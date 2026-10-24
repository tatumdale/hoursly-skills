# Access and capabilities

What a connection can see and do depends on three things, and a skill must respect all three.

## 1. The OAuth grant (permission preset)

| Preset | Allows |
|---|---|
| `read_only` | Reads only. Bank details are omitted from `get_organisation`. |
| `standard` | Reads, plus create and update time entries, tags, clients, projects. No delete. |
| `full` | Adds delete (to a recoverable 30-day trash). |

The user chose this when they approved the connection. Do not ask them to widen it unless a task truly needs it.

## 2. The caller's workspace capabilities

Roles are labels; capabilities decide. The ones that matter to reports:

| Capability | What it unlocks |
|---|---|
| `entries.view_all` | See other people's entries (otherwise only your own) |
| `rates.view` | Charge rates and charge amounts |
| `reports.margin` | Cost, margin, per-person grant detail |
| `reports.grant_costs` | Grant cost read models (with disclosure controls) |
| `reports.workload` | Team workload views |
| `reports.view` | Workspace delivery-status reporting |
| `planning.manage` | Write role plans |
| `commercials.manage` | Create, update, reorder and delete deliverables |
| `tool_costs.manage` | Manage AI/tool sources, rates, usage and period closes |
| `entries.lock` | Lock entries |
| `mcp.use`, `mcp.write` | Use the MCP, and write through it |

These are independent switches. Holding one does not imply another. A person can see grant costs without seeing any individual's cost.

`mcp.write` is checked live on every request. A connection becomes effectively read-only when the caller loses that capability even if its original OAuth preset allowed writes; use `get_my_access.denied_with_reason` rather than assuming the preset still governs the result.

## 3. Scope and masking

Some callers see only the clients and projects they are assigned to, or see client names through aliases. Out-of-scope records answer `not_found`. Treat figures flagged `scope_limited` as partial: never present them as a whole workspace or a whole person.

## How a skill should behave

1. Call `get_my_access` when available and plan the report from `can` and `capabilities`.
2. Build each report in sections. Include a section only if its capability is present.
3. If you omit a section, say which one and why ("cost and margin are not available to this connection").
4. If `get_my_access` is not available, try the call and treat `not_entitled` / `capability_required` as "omit this section", not as a failure of the whole task.
5. Never infer a hidden value from a visible one.
6. Do not decide by role names such as "admin" or "project manager". Use capabilities.

# Agent Instructions

## Project Type
Personal career-research workspace. No build/test toolchain — data and prose only.

## Workflow
Three subagents in `.claude/agents/` form a pipeline:
1. `firm-finder` → writes `data/firms.json`
2. `contact-researcher` → writes `data/contacts.json` (dispatches sub-agents in parallel for >3 firms)
3. `contact-manager` → owns `data/addresses.json`, `data/outreach.json`, generates `views/by_country.md`

See `tasks/todo.md` for the current plan and data layout.

## Data Source of Truth
- `data/firms.json`, `data/contacts.json`, `data/addresses.json`, `data/outreach.json`
- Pretty-printed JSON, 2-space indent, sorted by `id`
- Never delete records — set `archived: true`
- Country codes: ISO 3166-1 alpha-2

## Research Rules
- Public sources only. No scraped/leaked contact databases.
- Cite a `source_url` for every claimed email, phone, or client relationship.
- Mark guessed emails as `email_confidence: "inferred"`.
- Respect GDPR — business contacts only.

## Commit Attribution
AI commits MUST include:
```
Co-Authored-By: (the agent model's name and attribution byline)
```

## Conventions
- Plan-mode first for any 3+ step task (per user's global `~/.claude/CLAUDE.md`)
- Track work in `tasks/todo.md`; capture corrections in `tasks/lessons.md`
- Verify before marking done — no claims without evidence

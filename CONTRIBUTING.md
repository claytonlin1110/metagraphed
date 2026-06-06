# Contributing To Metagraphed

Metagraphed is a backend-first operational registry for Bittensor subnet interfaces. The source of truth is reviewed JSON in this repo; generated artifacts under `public/metagraph` are projections of that source.

## Local Checks

Use Node 22.

```bash
npm ci
npm run pipeline:check
```

For smaller changes, run the focused checks that match the files you touched:

```bash
npm run validate
npm run validate:schemas
npm run validate:api
npm run validate:openapi
npm run worker:test
npm run scan:public-safety
```

## Registry Data Rules

- Native subnet existence comes from the Bittensor/Finney chain snapshot.
- Public interface metadata comes from curated overlays or reviewed candidate records.
- Third-party directories, docs, GitHub READMEs, and websites are enrichment sources only.
- Do not add secrets, PATs, wallet paths, private dashboards, private URLs, validator-local state, or credentialed API flows.
- Do not invent API/status surfaces for subnets that do not publish them.

## Community Intake

Issue submissions can become candidates, not direct registry truth.

The import flow is:

1. Submit an `interface-submission` issue.
2. `intake:dry-run` parses and validates the issue.
3. A maintainer reviews source facts and safety.
4. A maintainer applies `metagraphed-import-approved`.
5. The import workflow opens a PR.
6. Normal validation and review decide whether it merges.

Schema-valid does not mean accepted.

## Generated Artifacts

Avoid hand-editing `public/metagraph` unless you are correcting a stale derived artifact that cannot be regenerated without unrelated live-probe churn. Prefer changing canonical registry source and rebuilding.

Use:

```bash
npm run pipeline:refresh
```

for full local refreshes. Set `METAGRAPH_WRITE_PROBE_RESULTS=1` only when you intentionally want live probe artifacts updated.

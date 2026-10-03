# Family Finance — public demo

A privacy-safe, static demonstration of a local-first financial document ingestion and reconciliation workflow.

The demo contains only invented institutions, filenames, fingerprints, transactions and totals. It does not contain or fetch real statements, account data, names, parser outputs, credentials or private dashboard endpoints.

## Run locally

Serve the `site` directory with any static web server:

```sh
python3 -m http.server 8093 --directory site
```

## Public/private boundary

The private system keeps original documents, deterministic parser outputs, overrides and its database on the owner's device. This repository demonstrates the interface and audit concepts only.

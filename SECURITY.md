# Security Policy

Metagraphed publishes public operational metadata only.

## Do Not Submit

- secrets, tokens, PATs, API keys, signed URLs, or webhook URLs;
- wallet paths, seed phrases, hotkeys, coldkeys, keypairs, validator-local state, or private scoring inputs;
- private dashboards, private IPs, localhost URLs, internal hostnames, or credentialed endpoints;
- write/mutating RPC examples.

## Reporting Issues

For public endpoint/status corrections, use the status issue template.

For anything that could expose secrets, credentials, wallets, private infrastructure, or unsafe write access, do not paste sensitive details into a public issue. Open a minimal public issue that says sensitive details are available privately, or contact the maintainer directly.

## RPC Proxy Boundary

The read-only RPC proxy contract is disabled by default. Any future public proxy/load-balancer must keep unsafe/write RPC methods blocked and must be protected by Cloudflare WAF/rate limiting before being enabled.

# Domains

This site is served by GitHub Pages from this repo (`jmhungdev/jmhungdev.github.io`,
`main` branch, deployed via `.github/workflows/jekyll-gh-pages.yml`).

GitHub Pages only supports **one** canonical custom domain per site (the one that
gets the automatic HTTPS certificate). Everything else must redirect to it.

| Domain | Role | Registrar / DNS | Managed |
|---|---|---|---|
| **jmhung.com** | Canonical — serves the real site | Registered *and* DNS-hosted at Cloudflare | Programmatically (API) |
| **jmhung.dev** | Forwards to jmhung.com | Registered at Squarespace, Squarespace-managed DNS | Manually (dashboard) |

`jmhung.dev` is registered through Squarespace and expires **July 2027**. It's kept
around purely as a forwarding alias until then — no action needed unless you want to
renew it, in which case revisit whether it should become canonical again.

The GitHub Pages `CNAME` file at the repo root must always match whatever domain is
set as canonical below — if you change one, change the other and redeploy.

## jmhung.com — programmatic (Cloudflare API)

Registered directly through Cloudflare, so DNS is Cloudflare-authoritative from day
one (no nameserver migration needed). Managed via the Cloudflare API using a token
scoped to just this zone.

**One-time setup** (already done, for reference):
1. Cloudflare dashboard → profile → **My Profile → API Tokens → Create Token** →
   "Edit zone DNS" template → scope to the `jmhung.com` zone only.
2. Store the token locally, not in chat history or this repo:
   ```bash
   echo 'export CLOUDFLARE_API_TOKEN="..."' >> ~/.zshrc
   ```
3. Note: a fresh non-interactive shell doesn't auto-source `~/.zshrc`; run
   `source ~/.zshrc` first if a script can't see the variable.

**Current DNS records** (zone id: `5da68ddc85ee1707d6ce6091080b6691`):
- `A  @    -> 185.199.108.153 / .109.153 / .110.153 / .111.153` (GitHub Pages IPs)
- `CNAME  www  -> jmhungdev.github.io`
- All records `proxied: false` ("DNS only" / grey cloud) — GitHub Pages needs to see
  the real client IP and issue its own cert; Cloudflare's proxy breaks that.

**To change a record** (example — swap in whatever you need):
```bash
source ~/.zshrc
ZONE_ID="5da68ddc85ee1707d6ce6091080b6691"

# List current records
curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" | python3 -m json.tool

# Create a record
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" \
  --data '{"type":"A","name":"@","content":"1.2.3.4","ttl":3600,"proxied":false}'

# Delete a record (need its id from the list call above)
curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/<record_id>" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

**To change which domain GitHub Pages treats as canonical:**
```bash
gh api -X PUT repos/jmhungdev/jmhungdev.github.io/pages -f cname='jmhung.com'
gh api -X PUT repos/jmhungdev/jmhungdev.github.io/pages -F https_enforced=true
```
Then update the repo's `CNAME` file to match and push — the next deploy needs to
agree with the Pages setting, or it can get reset.

## jmhung.dev — manual (Squarespace dashboard)

Squarespace has no public DNS API — this domain's forwarding has to be set by hand.

**Current setup:** Domain Forwarding Rules, not raw DNS records. Squarespace manages
its own A records for this automatically once forwarding is configured.

**To view/change it:**
1. `account.squarespace.com/domains` → select `jmhung.dev` → **Website** tab →
   **Domain Forwarding Rules**.
2. Two rules should exist: `@` and `www`, both → `jmhung.com`, **Permanent (301)**,
   **Maintain paths**.
3. Changes can take up to 48 hours to actually activate at Squarespace's edge, even
   though the DNS record change itself is usually much faster.

**Known gotcha:** if saving a forwarding rule fails with "Unable to save this domain
forwarding rule," check **DNS Settings** (not the Website/forwarding tab) for
leftover custom `A`/`CNAME` records on `@` or `www` from a previous, unrelated setup
— Squarespace can't write its own forwarding records if those slots are already
occupied by custom entries. Delete those first, then retry.

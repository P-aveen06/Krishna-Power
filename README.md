# Krishna Power Technologies

Static React and Vite website. Requires Node.js 22 and Bun.

## Local development

```sh
bun install --frozen-lockfile
npm run dev
```

This frontend does not require a Gemini API key or other environment variables.

## Cloudflare Workers deployment

`wrangler.jsonc` serves `dist/` as static assets with an `index.html` fallback
for client-side navigation.

```sh
npm run deploy:check
npx wrangler login
npm run deploy
```

Verify the returned `workers.dev` URL before connecting the production domain.

### Current migration status (2026-09-06)

- Deployed and verified in the browser:
  https://krishna-power-technologies.paveenkumar-dev.workers.dev
- Deployment version: `fa95c325-8950-47ae-9166-2ec820ff3976`.
- `krishnapowertechnologies.in` was added to Cloudflare on the Free plan.
- Cloudflare assigned `mitch.ns.cloudflare.com` and `rose.ns.cloudflare.com`.
- GoDaddy still uses `ns25.domaincontrol.com` and `ns26.domaincontrol.com`.
  GoDaddy sign-in is required to review the full zone and change nameservers.
- Imported records: apex A records `13.248.213.45` and `76.223.67.189`,
  `www` CNAME to the apex, `_domainconnect` CNAME to
  `_domainconnect.gd.domaincontrol.com`, and the existing `_dmarc` TXT record.
  No MX records were found. Compare against GoDaddy before cutover.
- Custom Worker domains are not connected yet. After the zone is active,
  connect both the apex and `www`, resolve the old website records, and record
  those custom domains in `wrangler.jsonc` so future deployments preserve them.
- Vercel has not been removed. The local Cloudflare configuration is not yet
  committed or pushed, and automatic Git deployments are not configured.

For automatic deployments, commit and push the configuration and dependency
lockfile, then connect `P-aveen06/Krishna-Power` in Cloudflare Workers & Pages.
Select the production branch and repository root, with build command
`npm run build` and deploy command `npx wrangler deploy`.

## Custom domain migration from Vercel

1. Record current DNS and registrar details. Preserve email records (MX, SPF,
   DKIM, DMARC), verification TXT records, and unrelated subdomains.
2. Add the domain to Cloudflare and review imported DNS records. Initially
   retain Vercel targets so the existing website remains reachable.
3. At the registrar, set the exact nameservers assigned by Cloudflare. If DNSSEC
   is enabled, follow Cloudflare's instructions for the old DS record first.
4. Once the zone is active and the deployed site is verified, add the desired
   apex and/or `www` hostnames under the Worker's Settings > Domains & Routes >
   Add > Custom Domain. Resolve conflicting website DNS records at cutover,
   keeping the old targets for rollback.
5. Verify HTTPS, both hostnames, navigation, images, and contact links before
   removing the old Vercel deployment.

Domain registration can stay with the existing registrar. Exact steps depend
on whether Vercel is the registrar, DNS provider, or only the current host.

References:
- [Cloudflare static assets](https://developers.cloudflare.com/workers/static-assets/)
- [Worker custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Nameserver setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)

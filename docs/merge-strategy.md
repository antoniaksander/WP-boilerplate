# Merge Strategy

## New Clients

1. Fork from latest `main`
2. Rename prefix in `config/theme.php`
3. Add branding tokens in `resources/css/tokens.css`
4. Build layout shell in `resources/views/layouts/app.blade.php`
5. Add client-specific blocks (consider private repo)

## Existing Clients (e.g., Roxder)

- Already have v1 presentation contract
- Upstream pulls should ONLY bring:
  - Asset pipeline improvements
  - Generic block registration changes
  - Security patches
  - Testing/linting upgrades

## Danger Zone — Breaking Changes

These upstream changes will BREAK existing clients:

- `app.blade.php` structure changes (client owns this)
- WooCommerce hook removals
- Block namespace convention changes
- `sobe_render_layout_pattern()` signature changes

## Sync Cadence

- Quarterly review minimum
- Never auto-merge
- Always test in Local before merging to client main

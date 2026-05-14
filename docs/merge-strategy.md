# Merge Strategy

## New Clients

1. Fork from latest `main`
2. Rename prefix in `config/theme.php`
3. Override brand tokens in `resources/css/tokens.css`
4. Copy layout example blocks such as `sobe/site-header` into a client namespace
5. Add client-specific WooCommerce catalog/PDP/side-cart files as needed

## Existing Clients (e.g., Roxder)

- Already have v1 presentation contract
- Upstream pulls should ONLY bring:
  - Asset pipeline improvements
  - Generic block registration changes
  - Generic production blocks
  - Security patches
  - Testing/linting upgrades

## Danger Zone - Breaking Changes

These upstream changes can BREAK existing clients:

- `app.blade.php` structural changes
- WooCommerce hook removals
- Block namespace convention changes
- `sobe_render_layout_pattern()` signature changes

## Namespace Rule

Universal blocks stay `sobe/*`. Client blocks are copied into a client namespace instead of renaming upstream block files in place.

## Sync Cadence

- Quarterly review minimum
- Never auto-merge
- Always test in Local before merging to client main

# WP-boilerplate

Production-ready WordPress theme foundation.

## Included

- Dark mode system (toggle + CSS variable inversion)
- Generic production blocks: hero, faq, product-carousel
- Pedagogical layout examples: site-header, site-footer with pattern system
- WooCommerce base styles + hook scaffolding (full shop/PDP layer is client-owned)
- Manifest-driven block registration
- Vite + Tailwind asset pipeline
- Testing + linting

## For Client Forks

1. Clone this repo
2. Change `prefix` in `config/theme.php` (e.g. `roxder`)
3. Override brand colors in `resources/css/tokens.css`
4. Copy `sobe/site-header` -> create new `roxder/site-header` block, customize markup
   (Do NOT rename `sobe/site-header` in place - keep upstream merges clean)
5. Add `app/woocommerce-catalog.php` and `app/woocommerce-pdp.php` (copy from `demo/sobe` as starting point)
6. Add logo assets

## Not Included

- Brand colors, logos, custom fonts, or demo content
- Full WooCommerce catalog/PDP/side-cart layer
- Client-specific blocks such as maps, custom product grids, or proprietary UI
- Private block library packages (`sobe-blocks-private` is documented architecture only)

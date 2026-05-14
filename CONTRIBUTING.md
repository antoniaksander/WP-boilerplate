# Contributing

This repo is the public Sobe WordPress theme foundation. Keep `main` generic and production-ready. Client presentation belongs in client repositories.

## Block System

Blocks are dynamic Gutenberg blocks:

- Editor UI lives in `resources/blocks/{slug}/edit.jsx`
- Frontend output lives in `resources/views/blocks/{slug}.blade.php`
- `save.jsx` returns `null`
- Registration is driven by `resources/blocks/blocks-manifest.json`

Use existing production blocks as references:

- `hero` for image, copy, CTA, and layout controls
- `faq` for repeatable attributes and frontend view scripts
- `product-carousel` for WooCommerce queries and Swiper-powered frontend behavior
- `site-header` and `site-footer` for non-inserter layout example blocks

Scaffold new generic blocks with:

```bash
npm run make:block -- your-block-name
```

All universal blocks keep the `sobe/*` namespace.

## WooCommerce

Boilerplate provides base styling and hook scaffolding only. Client repos add:

- `app/woocommerce-catalog.php` for shop grid + filters
- `app/woocommerce-pdp.php` for product gallery
- `app/woocommerce-sidecart.php` for side-cart

Copy from `demo/sobe` as a starting point, then customize.

Do not add full WooCommerce template overrides to public `main`. The public WooCommerce layer should remain merge-friendly: theme support, wrappers, `loop_shop_columns`, base styles, and generic blocks that work with standard WooCommerce output.

## Forking for a Client

Client-specific blocks live in a new namespace (`roxder/*`), not under `sobe/*`.

Copy `sobe/site-header` to a new directory, set `name: roxder/site-header` in `block.json`, and customize. This keeps `git merge upstream/main` conflict-free.

The same rule applies to footers, navigation variants, proprietary product UI, and campaign blocks: copy into the client namespace, then modify there.

## Validation

Before committing:

```bash
npm test
npm run build
composer analyse
```

For browser-facing changes, verify in Local at the project URL and check the browser console.

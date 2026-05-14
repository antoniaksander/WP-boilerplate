# WP-boilerplate

Thin shared infrastructure for Sobe agency WordPress themes. Not a full theme.

## What IS here

- Vite + Tailwind CSS asset pipeline
- Manifest-driven block registration scaffold
- Base WooCommerce hook scaffolding
- Jest + PHPStan testing configs
- CI/linting setup

## What is NOT here

- Layout shells (header/footer blocks, app.blade.php layout)
- SEO meta, WebGL, side-cart
- Swiper/PhotoSwipe gallery logic
- Demo content or client branding
- Custom blocks (except generic infrastructure blocks)
- Proprietary/client-specific blocks -> see private block library (`sobe-blocks-private`)

## For client-specific work

- See `demo/sobe` branch for v1 reference (non-mergeable)
- See `v1.0.0-rich-sobe-starter` tag for historical full-theme
- Client repos fork from `main`, add presentation layer
- Proprietary blocks belong in private block library

## Block system

All blocks are manifest-driven. Run `npm run make:block -- your-block-name` to scaffold. See CONTRIBUTING.md for full SOP.

## Upstream policy

`main` accepts only generic infrastructure PRs. No client-specific presentation code.

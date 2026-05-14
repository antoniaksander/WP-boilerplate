# Upstream Sync Notes

## Warnings

- `demo/sobe` branch is NOT upstream policy. It is a v1 reference only.
- `v1.0.0-rich-sobe-starter` tag archives the old full-theme state.
- Full WooCommerce catalog, PDP gallery, and side-cart code remain client-owned.

## Current State

- `main` is a production-ready foundation, not a full client theme
- Block registration is manifest-driven (`blocks-manifest.json`)
- Universal blocks keep the `sobe/*` namespace
- Client-specific blocks are copied into a client namespace (`roxder/*`, etc.)
- Textdomain is `'sobe'` agency-wide

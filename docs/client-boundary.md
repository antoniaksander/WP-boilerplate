# Client vs Boilerplate Boundary

| File/Area | Boilerplate Owns | Client Owns |
|-----------|------------------|-------------|
| `resources/views/layouts/app.blade.php` | Generic layout shell, dark-mode wrapper, pattern slots | Client-only structural changes in copied fork |
| `app/setup.php` | Generic theme supports, layout pattern registration | Client pattern additions |
| `app/blocks.php` | Manifest reader, allowlist logic | Client block additions in client namespace |
| `app/helpers.php` | Generic utilities, layout pattern renderer | Client helpers in client repo |
| `config/theme.php` | Default `'sobe'` prefix and neutral defaults | Client prefix (`'roxder'`) and client config |
| `resources/css/tokens.css` | Base scale, neutral defaults, dark-mode inversion | Brand colors, brand fonts |
| `resources/blocks/` | Generic production blocks and layout examples | Custom/client blocks in client namespace |
| `app/woocommerce.php` | Base scaffolding | Catalog, PDP, side-cart files |
| `resources/css/woocommerce.css` | Base forms, notices, buttons, native grid styling | Client catalog/PDP styling |
| `resources/config/core-allowed-blocks.json` | Core + WC allowlist | Client additions |

## Rule

Never customize a `sobe/*` block in place for a client. Copy it to a client namespace such as `roxder/*`, then customize the copy.

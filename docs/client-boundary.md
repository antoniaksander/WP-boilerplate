# Client vs Boilerplate Boundary

| File/Area | Boilerplate Owns | Client Owns |
|-----------|------------------|-------------|
| `resources/views/layouts/app.blade.php` | Scaffold only | Full layout shell |
| `app/setup.php` | Generic theme supports | Block registration, patterns |
| `app/blocks.php` | Manifest reader, allowlist logic | Client block additions |
| `app/helpers.php` | Generic utilities | Layout helpers |
| `config/theme.php` | Default `'sobe'` prefix | Client prefix (`'roxder'`) |
| `resources/css/tokens.css` | Base scale | Brand colors, spacing |
| `resources/blocks/` | Generic infrastructure blocks | All custom/client blocks |
| `app/woocommerce.php` | Base scaffolding | Gallery overrides, custom cart |
| `resources/config/core-allowed-blocks.json` | Core + WC allowlist | Client additions |

## Rule

If a file is in the "Client Owns" column, never modify it in WP-boilerplate `main`.

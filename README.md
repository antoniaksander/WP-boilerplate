# WP Boilerplate

In-development WordPress theme boilerplate for agencies. Built on the **Native Hybrid Monolith** architecture: React in the editor, Blade on the frontend, and Tailwind CSS v4 everywhere.

## The Native Hybrid Monolith Philosophy

Most modern WordPress themes force you to choose between a messy PHP spaghetti frontend or a complex, disconnected headless React setup. This bridges the gap with **The Five Laws**:

1. **Editor experience is React/JSX only.**
2. **Frontend rendering is Blade only.** (Block `save()` always returns `null`).
3. **WooCommerce integration is hooks only.** No overriding core WC templates.
4. **Styling is a strict CSS token cascade.** 5. **The DOM must be semantic.** No "div soup."

Before writing any code, you must read our [CONTRIBUTING.md](CONTRIBUTING.md) to understand the architectural rules of this boilerplate.

## Stack

- **PHP**: Sage / Roots Acorn (Laravel container for WordPress)
- **CSS**: Tailwind CSS v4, dynamic design tokens bridged automatically to `theme.json`
- **JS**: Alpine.js (interactivity), GSAP + Lenis (animations), React (block editor)
- **Blocks**: Native Gutenberg custom blocks.

## Prerequisites

Before installing, ensure your local environment meets these requirements:

- **Node.js**: `^20.19.0` or `>=22.12.0`
- **PHP**: `8.3` or higher
- **Composer**: v2.x

## Quick Start

Clone the repository into your WordPress themes folder, then run:

```bash
# Install Node dependencies (Vite, Tailwind, WP Scripts)
npm install

# Install PHP dependencies (Roots Acorn, Sage)
composer install

# Start the Vite development server with Hot Module Replacement
npm run dev

Note: The initial npm install may take a few minutes as it downloads the @wordpress/scripts packages.

AI-Ready Development
This repository has a CLAUDE.md file. If you use AI coding assistants like Claude Code, Cursor, or GitHub Copilot, send me an email with your github profile and I'll pass you the CLAUDE.md and other markup files.

How to Contribute
I very much welcome community contributions, but please read the architectural laws. To contribute:

- Fork the Repo
- Clone Your Fork: git clone https://github.com/your-username/WP-boilerplate.git
- Create a Feature Branch: git checkout -b feat/your-new-feature
- Develop: Write your code. Ensure it strictly follows the "Five Laws" and the Anti-Pattern Registry in CONTRIBUTING.md.
- Push & PR: Push to your fork (git push origin feat/your-new-feature) and open a Pull Request against our main branch.
- Note: PRs that violate the architecture (e.g., adding PHP hooks inside Blade templates, or hardcoding hex colors outside of tokens.css) will be rejected and requested for changes.

License
Copyright (c) 2026 Sander Antoniak and Roots Software LLC.
```

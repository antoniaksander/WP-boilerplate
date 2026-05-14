<?php

/**
 * Generic theme setup.
 */

namespace App;

add_action('after_setup_theme', function (): void {
    remove_theme_support('block-templates');
    remove_theme_support('core-block-patterns');

    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', config('theme.textdomain')),
        'footer_navigation' => __('Footer Navigation', config('theme.textdomain')),
    ]);

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    add_theme_support('automatic-feed-links');
    add_theme_support('customize-selective-refresh-widgets');

    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    $pfx = config('theme.prefix');
    foreach (config('theme.image_sizes', []) as $name => $args) {
        add_image_size("{$pfx}-{$name}", ...$args);
    }
}, 20);

add_action('init', function (): void {
    $pfx = config('theme.prefix');

    register_block_pattern_category('sobe-layout', [
        'label' => __('Sobe Layout', config('theme.textdomain')),
    ]);

    foreach ([
        'header-layout-1' => __('Header Layout 1', config('theme.textdomain')),
        'header-layout-2' => __('Header Layout 2', config('theme.textdomain')),
        'header-layout-3' => __('Header Layout 3', config('theme.textdomain')),
        'footer-layout-2' => __('Footer Layout 2', config('theme.textdomain')),
    ] as $slug => $title) {
        $path = resource_path("patterns/{$slug}.php");

        if (! is_readable($path)) {
            continue;
        }

        register_block_pattern("{$pfx}/{$slug}", [
            'title' => $title,
            'categories' => ['sobe-layout'],
            'inserter' => false,
            'content' => require $path,
        ]);
    }
});

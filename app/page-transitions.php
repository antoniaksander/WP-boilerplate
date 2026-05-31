<?php

/**
 * Page transitions engine wiring.
 */

namespace App;

if (! (bool) config('theme.page_transitions.enabled', false)) {
    return;
}

add_action('wp_enqueue_scripts', function (): void {
    if (! (bool) apply_filters('sobe/page_transitions/enabled', true)) {
        return;
    }

    $excludedUrls = apply_filters('sobe/page_transitions/excluded_urls', [
        '/cart',
        '/checkout',
        '/my-account',
        '/product/',
        '/wp-admin',
        '/wp-login.php',
        'wp-admin/admin-ajax.php',
        '/wp-json/',
        'add-to-cart=',
    ]);

    $containerSelector = (string) apply_filters(
        'sobe/page_transitions/container_selector',
        config('theme.page_transitions.container_selector', '#main') ?: '#main'
    );

    $preserveBodyClasses = apply_filters('sobe/page_transitions/preserve_body_classes', [
        'admin-bar',
        'logged-in',
    ]);

    $handle = config('theme.prefix').'-page-transitions';

    try {
        $asset = \Roots\asset('resources/js/sobe-page-transitions.js')->uri();
    } catch (\Throwable) {
        return;
    }

    $scriptConfig = [
        'enabled' => true,
        'containerSelector' => $containerSelector !== '' ? $containerSelector : '#main',
        'excludedUrls' => array_values(array_filter(array_map('strval', is_array($excludedUrls) ? $excludedUrls : []))),
        'preserveBodyClasses' => array_values(array_filter(array_map('strval', is_array($preserveBodyClasses) ? $preserveBodyClasses : []))),
    ];

    $mainHandle = 'app/app';
    $dependencies = wp_script_is($mainHandle, 'registered') ? [$mainHandle] : [];

    wp_enqueue_script(
        $handle,
        $asset,
        $dependencies,
        null,
        true
    );

    wp_add_inline_script(
        $handle,
        'window.sobePageTransitionsConfig = '.wp_json_encode($scriptConfig, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT).';',
        'before'
    );
}, 30);

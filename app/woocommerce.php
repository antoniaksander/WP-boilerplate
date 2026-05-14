<?php

/**
 * Generic WooCommerce support.
 */

namespace App;

if (! class_exists('WooCommerce')) {
    return;
}

add_action('after_setup_theme', function (): void {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}, 20);

add_action('after_setup_theme', function (): void {
    remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
    remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
}, 21);

add_action('woocommerce_before_main_content', function (): void {
    echo '<section class="wc-content-wrapper py-12 md:py-16"><div class="wp-container">';
}, 10);

add_action('woocommerce_after_main_content', function (): void {
    echo '</div></section>';
}, 10);

add_filter('loop_shop_columns', function (): int {
    return (int) config('theme.wc_columns.desktop', 3);
}, 20);

add_action('wp_enqueue_scripts', function (): void {
    $isWooContext = is_woocommerce()
        || is_cart()
        || is_checkout()
        || is_account_page()
        || has_block('sobe/product-carousel');

    if (! $isWooContext) {
        return;
    }

    wp_enqueue_style(
        config('theme.prefix').'-woocommerce',
        \Roots\asset('resources/css/woocommerce.css')->uri(),
        ['woocommerce-general', 'woocommerce-layout', 'woocommerce-smallscreen'],
        null
    );
}, 100);

add_action('wp_enqueue_scripts', function (): void {
    if (is_admin() || ! class_exists('WC_Frontend_Scripts')) {
        return;
    }

    if (is_product() || is_cart() || is_checkout() || is_account_page()) {
        \WC_Frontend_Scripts::load_scripts();
    }
}, 99);

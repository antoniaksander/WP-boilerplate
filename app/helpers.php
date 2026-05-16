<?php

/**
 * Generic theme helpers.
 */

namespace App;

function sobe_navigation_label(string $location, string $fallback): string
{
    $label = wp_get_nav_menu_name($location);

    return $label !== '' ? $label : $fallback;
}

function sobe_navigation_menu(array $args = []): string
{
    $location = $args['theme_location'] ?? 'primary_navigation';
    $menuClass = $args['menu_class'] ?? 'menu';
    $depth = isset($args['depth']) ? (int) $args['depth'] : 2;

    if (has_nav_menu($location)) {
        return wp_nav_menu(array_merge([
            'theme_location' => $location,
            'container' => false,
            'echo' => false,
            'depth' => $depth,
        ], $args));
    }

    $items = wp_list_pages([
        'title_li' => '',
        'echo' => false,
        'depth' => $depth,
        'sort_column' => 'menu_order,post_title',
    ]);

    if (! is_string($items) || trim($items) === '') {
        $items = sprintf(
            '<li class="menu-item menu-item-home"><a href="%s">%s</a></li>',
            esc_url(home_url('/')),
            esc_html__('Home', 'sobe')
        );
    }

    $html = sprintf(
        '<ul class="%s">%s</ul>',
        esc_attr($menuClass),
        $items
    );

    return (string) apply_filters('sobe/navigation/fallback_html', $html, $args);
}

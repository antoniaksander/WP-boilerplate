<?php

/**
 * Generic theme helpers.
 */

namespace App;

function sobe_render_layout_pattern(string $type, string $variant): string
{
    if ($variant === 'none') {
        return '';
    }

    $pfx = config('theme.prefix');
    $blockName = "{$pfx}/site-{$type}";
    $markup = sprintf('<!-- wp:%s %s /-->', $blockName, wp_json_encode(['variant' => $variant]));

    return do_blocks($markup);
}

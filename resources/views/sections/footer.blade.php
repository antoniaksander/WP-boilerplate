@php
    $footerLayout = get_theme_mod(config('theme.prefix') . '_footer_layout', 'layout-1');
@endphp

@if ($footerLayout !== 'none')
    @include('sections.footer-' . $footerLayout)
@endif

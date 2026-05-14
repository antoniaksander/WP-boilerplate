<!doctype html>
<html @php(language_attributes()) x-data="app" :class="{ dark: dark }">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php(wp_head())
    @vite(['resources/css/app.css', 'resources/js/app.js'])
  </head>

  <body @php(body_class())>
    @php(wp_body_open())

    <a class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface-1 focus:text-text focus:rounded" href="#main">
      {{ __('Skip to content', 'sobe') }}
    </a>

    @php(do_action('get_header'))
    {!! \App\sobe_render_layout_pattern('header', get_theme_mod(config('theme.prefix') . '_header_layout', 'header-1')) !!}

    <main id="main" class="relative z-10 flex-1">
      @yield('content')
    </main>

    {!! \App\sobe_render_layout_pattern('footer', get_theme_mod(config('theme.prefix') . '_footer_layout', 'layout-2')) !!}

    @php(do_action('get_footer'))
    @php(wp_footer())
  </body>
</html>

<!doctype html>
<html @php language_attributes(); @endphp x-data="app" :class="{ dark: dark }" @open-cart.window="openCart($event)">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php do_action('get_header'); @endphp
    @php wp_head(); @endphp
    @vite(['resources/css/app.css', 'resources/js/app.js'])
  </head>

  <body @php body_class(); @endphp>
    @php wp_body_open(); @endphp

    <canvas id="global-webgl" class="fixed inset-0 pointer-events-none z-0" aria-hidden="true"></canvas>
    <div class="sr-only" aria-live="polite" aria-atomic="true" x-text="cartAnnouncement"></div>

    <a class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:bg-surface-1 focus:text-text focus:outline-none" href="#main">
      {{ __('Skip to content', 'sobe') }}
    </a>

    @if (function_exists('is_checkout') && is_checkout())
      @include('sections.checkout-header')
    @else
      @include('sections.' . get_theme_mod(config('theme.prefix') . '_header_layout', 'header-1'))
    @endif

    <main id="main" class="relative z-10 pt-16">
      @yield('content')
    </main>

    @if (! (function_exists('is_checkout') && is_checkout()))
      @include('sections.footer')
    @endif

    <x-side-cart />

    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none" aria-live="polite">
      <x-toast-container />
    </div>

    @php do_action('get_footer'); @endphp
    @php wp_footer(); @endphp
  </body>
</html>

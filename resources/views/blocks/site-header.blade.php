@php
  $variant = $attributes['variant'] ?? 'header-1';
  $siteName = get_bloginfo('name');
  $navArgs = [
    'theme_location' => 'primary_navigation',
    'menu_class' => 'sobe-site-nav flex items-center gap-6 list-none m-0 p-0 text-sm font-medium',
    'container' => false,
    'echo' => false,
  ];
@endphp

<header class="site-header">
  <div class="max-w-standard mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
    @if ($variant === 'header-2')
      <div class="hidden md:block min-w-0">
        @if (has_nav_menu('primary_navigation'))
          <nav aria-label="{{ esc_attr(wp_get_nav_menu_name('primary_navigation')) }}">
            {!! wp_nav_menu($navArgs) !!}
          </nav>
        @endif
      </div>
      <a class="absolute left-1/2 -translate-x-1/2 font-semibold text-heading no-underline" href="{{ esc_url(home_url('/')) }}">
        {{ $siteName }}
      </a>
    @elseif ($variant === 'header-3')
      <button class="md:hidden inline-flex size-10 items-center justify-center rounded-md border border-border" type="button" @click="navOpen = !navOpen" :aria-expanded="navOpen.toString()" aria-label="{{ esc_attr__('Toggle navigation', 'sobe') }}">
        <span aria-hidden="true">☰</span>
      </button>
      <a class="font-semibold text-heading no-underline" href="{{ esc_url(home_url('/')) }}">
        {{ $siteName }}
      </a>
    @else
      <a class="font-semibold text-heading no-underline" href="{{ esc_url(home_url('/')) }}">
        {{ $siteName }}
      </a>
      @if (has_nav_menu('primary_navigation'))
        <nav class="hidden md:block" aria-label="{{ esc_attr(wp_get_nav_menu_name('primary_navigation')) }}">
          {!! wp_nav_menu($navArgs) !!}
        </nav>
      @endif
    @endif

    <div class="flex items-center gap-2">
      <x-dark-mode-toggle />
      @if ($variant !== 'header-3')
        <button class="md:hidden inline-flex size-10 items-center justify-center rounded-md border border-border" type="button" @click="navOpen = !navOpen" :aria-expanded="navOpen.toString()" aria-label="{{ esc_attr__('Toggle navigation', 'sobe') }}">
          <span aria-hidden="true">☰</span>
        </button>
      @endif
    </div>
  </div>

  @if (has_nav_menu('primary_navigation'))
    <div x-show="navOpen" x-cloak class="md:hidden border-t border-border bg-surface-1">
      <nav class="max-w-standard mx-auto px-6 py-4" aria-label="{{ esc_attr__('Mobile navigation', 'sobe') }}">
        {!! wp_nav_menu([
          'theme_location' => 'primary_navigation',
          'menu_class' => 'flex flex-col gap-3 list-none m-0 p-0 text-base font-medium',
          'container' => false,
          'echo' => false,
        ]) !!}
      </nav>
    </div>
  @endif
</header>

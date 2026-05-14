<footer class="bg-surface-2 border-t border-border mt-auto">
  <div class="max-w-standard mx-auto px-6 lg:px-8 py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
    <div class="max-w-sm">
      <a href="{{ esc_url(home_url('/')) }}" class="font-heading font-bold text-2xl text-heading no-underline">
        {{ get_bloginfo('name') }}
      </a>
      @if (get_bloginfo('description'))
        <p class="mt-3 text-sm text-text-muted leading-relaxed">{{ get_bloginfo('description') }}</p>
      @endif
      <p class="mt-6 text-xs text-text-subtle">&copy; {{ date('Y') }} {{ get_bloginfo('name') }}</p>
    </div>

    @if (has_nav_menu('footer_navigation'))
      <nav aria-label="{{ esc_attr(wp_get_nav_menu_name('footer_navigation')) }}">
        {!! wp_nav_menu([
          'theme_location' => 'footer_navigation',
          'menu_class' => 'flex flex-col gap-2 list-none m-0 p-0 text-sm text-text-muted',
          'container' => false,
          'echo' => false,
        ]) !!}
      </nav>
    @endif
  </div>
</footer>

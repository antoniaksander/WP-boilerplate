@php
  $hasLogo = is_string($logo ?? null) && trim($logo) !== '';
  $hasDarkLogo = is_string($darkLogo ?? null) && trim($darkLogo) !== '';
  $logoTextClass = 'inline-block max-w-[140px] truncate font-heading text-lg font-semibold leading-none text-heading';
@endphp

<header class="border-b border-border bg-surface-1">
  <div class="container mx-auto px-4 h-16 grid grid-cols-3 items-center">

    <a
      href="{{ wc_get_cart_url() }}"
      class="flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors duration-200 w-fit"
      aria-label="{{ __('Return to store', 'sobe') }}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
      {{ __('Return to store', 'sobe') }}
    </a>

    <a class="justify-self-center font-semibold text-lg text-heading" href="{{ home_url('/') }}">
      @if ($hasLogo)
        <img
          class="!h-8 w-auto max-w-[140px] object-contain"
          src="{{ $logo }}"
          alt="{{ $siteName }}"
          x-show="!dark"
        />
      @else
        <span class="{{ $logoTextClass }}" x-show="!dark">{{ $siteName }}</span>
      @endif
      @if ($hasDarkLogo)
        <img
          class="!h-8 w-auto max-w-[140px] object-contain"
          src="{{ $darkLogo }}"
          alt="{{ $siteName }}"
          x-show="dark"
          x-cloak
        />
      @else
        <span class="{{ $logoTextClass }}" x-show="dark" x-cloak>{{ $siteName }}</span>
      @endif
    </a>

  </div>
</header>

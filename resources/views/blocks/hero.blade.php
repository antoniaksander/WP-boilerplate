@php
  $heading     = $attributes['heading'] ?? '';
  $paragraph   = $attributes['paragraph'] ?? '';
  $ctaText     = $attributes['ctaText'] ?? '';
  $ctaUrl      = $attributes['ctaUrl'] ?? '';
  $ctaType     = $attributes['ctaType'] ?? 'btn-dark';
  $alignment   = $attributes['alignment'] ?? 'left';
  $height      = $attributes['height'] ?? '80vh';
  $imageId     = $attributes['backgroundImageId'] ?? 0;
  $imageUrl    = $attributes['backgroundImageUrl'] ?? '';
  $darkOverlay = $attributes['darkOverlay'] ?? true;

  $heightClass = match ($height) {
    '70vh' => 'min-h-[70vh]',
    '90vh' => 'min-h-[90vh]',
    '100vh' => 'min-h-screen',
    default => 'min-h-[80vh]',
  };

  $alignmentClass = match ($alignment) {
    'center' => 'items-center text-center mx-auto',
    'split-screen' => 'items-start text-left max-w-xl',
    'editorial' => 'items-start text-left justify-between',
    default => 'items-start text-left max-w-2xl',
  };

  $buttonClass = str_starts_with($ctaType, 'link-')
    ? 'sobe-link text-primary-fg hover:text-primary-fg'
    : (str_contains($ctaType, 'outline')
      ? 'sobe-button sobe-button--outline-light text-primary-fg'
      : 'sobe-button sobe-button--light');

  $imageAlt = $imageId ? (string) (get_post_meta($imageId, '_wp_attachment_image_alt', true) ?: '') : '';
  $wrapperAttrs = get_block_wrapper_attributes([
    'class' => "sobe-hero {$heightClass} relative overflow-hidden flex alignfull",
  ]);
@endphp

<section {!! $wrapperAttrs !!} aria-label="{{ esc_attr(wp_strip_all_tags($heading)) }}">
  @if ($imageUrl)
    <figure class="absolute inset-0 m-0 pointer-events-none" aria-hidden="true">
      <img
        src="{{ esc_url($imageUrl) }}"
        alt="{{ esc_attr($imageAlt) }}"
        class="w-full h-full object-cover"
        loading="eager"
        decoding="async"
      >
    </figure>
  @endif

  @if ($darkOverlay)
    <div class="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true"></div>
  @endif

  <div class="relative z-10 w-full max-w-standard mx-auto px-6 lg:px-8 py-20 lg:py-32 flex flex-col gap-6 {{ $alignmentClass }}">
    @if ($heading)
      <h1 class="hero__heading text-primary-fg font-heading font-bold leading-tight {{ $alignment === 'editorial' ? '' : 'text-5xl md:text-6xl lg:text-7xl' }}">
        {!! wp_kses_post($heading) !!}
      </h1>
    @endif

    @if ($paragraph)
      <p class="text-primary-fg/85 text-lg md:text-xl leading-relaxed max-w-prose">
        {!! wp_kses_post($paragraph) !!}
      </p>
    @endif

    @if ($ctaText && $ctaUrl)
      <a class="{{ $buttonClass }}" href="{{ esc_url($ctaUrl) }}">
        {!! wp_kses_post($ctaText) !!}
      </a>
    @endif
  </div>
</section>

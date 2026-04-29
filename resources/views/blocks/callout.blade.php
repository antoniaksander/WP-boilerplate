@php
  $heading     = $attributes['heading']     ?? '';
  $showCta     = $attributes['showCta']     ?? false;
  $ctaText     = $attributes['ctaText']     ?? '';
  $ctaUrl      = $attributes['ctaUrl']      ?? '#';
  $layout      = $attributes['layout']      ?? 'standard';

  $wrapperAttrs = get_block_wrapper_attributes(['class' => 'callout-block']);
@endphp

<section {!! $wrapperAttrs !!}>
    <h2>{!! wp_kses_post($heading) !!}</h2>

    @if($showCta && $ctaText)
        <a href="{{ esc_url($ctaUrl) }}" class="btn btn-primary">
            {!! wp_kses_post($ctaText) !!}
        </a>
    @endif
</section>
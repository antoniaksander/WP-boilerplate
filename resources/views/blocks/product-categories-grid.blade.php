@php
  $layout = $attributes['layout'] ?? 'bento-alternating';
  $allowedLayouts = [
    'bento-alternating',
    'uniform-2',
    'columns-4',
    'hero-follow',
    'split-tall-left',
    'stack',
  ];
  if (! in_array($layout, $allowedLayouts, true)) {
    $layout = 'bento-alternating';
  }

  $enableHover = ($attributes['enableHoverEffects'] ?? true) !== false;
  $count = count($categories);

  if ($count === 0) {
    return;
  }

  $layoutClass = 'sobe-product-categories-grid--layout-' . $layout;
  $countClass = 'sobe-product-categories-grid--items-' . min($count, 12);

  $wrapperAttrs = get_block_wrapper_attributes([
    'class' => trim('sobe-product-categories-grid bg-background ' . $layoutClass . ' ' . $countClass),
  ]);
@endphp

<section {!! $wrapperAttrs !!}>
  <ul class="sobe-product-categories-grid__list list-none p-0 m-0">
    @foreach ($categories as $cat)
      @php
        $hasImage = $cat['imageUrl'] !== '';
        $hoverClass = $enableHover ? 'sobe-pc-card--hoverable' : '';
      @endphp
      <li class="sobe-pc-card {{ $hoverClass }}">
        <a
          href="{{ esc_url($cat['link']) }}"
          class="sobe-pc-card__link focus-visible:outline-none"
        >
          <span class="sobe-pc-card__media">
            @if ($hasImage)
              <img
                src="{{ esc_url($cat['imageUrl']) }}"
                alt="{{ esc_attr($cat['imageAlt']) }}"
                class="sobe-pc-card__img"
                loading="lazy"
                decoding="async"
              />
            @else
              <span class="sobe-pc-card__placeholder" aria-hidden="true"></span>
            @endif
            <span class="sobe-pc-card__scrim sobe-pc-card__scrim--base" aria-hidden="true"></span>
            @if ($enableHover)
              <span class="sobe-pc-card__scrim sobe-pc-card__scrim--hover" aria-hidden="true"></span>
            @endif
          </span>
          <span class="sobe-pc-card__text">
            <span class="sobe-pc-card__count">
              {{ sprintf(
                /* translators: %d: number of products in the category */
                _n('%d product', '%d products', $cat['count'], 'sobe'),
                number_format_i18n($cat['count'])
              ) }}
            </span>
            <span class="sobe-pc-card__name">{{ esc_html($cat['name']) }}</span>
          </span>
        </a>
      </li>
    @endforeach
  </ul>
</section>

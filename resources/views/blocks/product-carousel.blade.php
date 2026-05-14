@php
  $count = max(1, min((int) ($attributes['count'] ?? 8), 12));
  $orderBy = $attributes['orderBy'] ?? 'latest';
  $categoryId = (int) ($attributes['categoryId'] ?? 0);
  $heading = $attributes['heading'] ?? '';
  $paragraph = $attributes['paragraph'] ?? '';
  $linkText = $attributes['linkText'] ?? '';
  $linkUrl = $attributes['linkUrl'] ?? '';
  $linkType = $attributes['linkType'] ?? 'btn-dark';

  $allowedOrderBy = ['latest', 'featured', 'best_selling', 'top_rated', 'on_sale', 'random'];
  $orderBy = in_array($orderBy, $allowedOrderBy, true) ? $orderBy : 'latest';

  $args = [
    'post_type' => 'product',
    'post_status' => 'publish',
    'posts_per_page' => $count,
  ];

  switch ($orderBy) {
    case 'featured':
      $args['tax_query'][] = [
        'taxonomy' => 'product_visibility',
        'field' => 'name',
        'terms' => 'featured',
        'operator' => 'IN',
      ];
      $args['orderby'] = 'date';
      $args['order'] = 'DESC';
      break;
    case 'best_selling':
      $args['meta_key'] = 'total_sales';
      $args['orderby'] = 'meta_value_num';
      $args['order'] = 'DESC';
      break;
    case 'top_rated':
      $args['meta_key'] = '_wc_average_rating';
      $args['orderby'] = 'meta_value_num';
      $args['order'] = 'DESC';
      break;
    case 'on_sale':
      $args['post__in'] = function_exists('wc_get_product_ids_on_sale') ? (wc_get_product_ids_on_sale() ?: [0]) : [0];
      $args['orderby'] = 'date';
      $args['order'] = 'DESC';
      break;
    case 'random':
      $args['orderby'] = 'rand';
      break;
    default:
      $args['orderby'] = 'date';
      $args['order'] = 'DESC';
      break;
  }

  if ($categoryId > 0) {
    $args['tax_query'][] = [
      'taxonomy' => 'product_cat',
      'field' => 'term_id',
      'terms' => $categoryId,
    ];
  }

  $productsQuery = class_exists('WooCommerce') ? new \WP_Query($args) : null;
  $wrapperAttrs = get_block_wrapper_attributes(['class' => 'sobe-product-carousel woocommerce my-12']);
  $hasHeader = $heading || $paragraph || ($linkText && $linkUrl);
  $linkClass = str_starts_with($linkType, 'link-') ? 'sobe-link' : 'sobe-button sobe-button--dark';
@endphp

@if ($productsQuery && $productsQuery->have_posts())
  <section {!! $wrapperAttrs !!}>
    @if ($hasHeader)
      <div class="product-carousel__header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          @if ($heading)
            <h2 class="text-3xl font-bold text-heading m-0 leading-tight">{{ esc_html($heading) }}</h2>
          @endif
          @if ($paragraph)
            <p class="text-text-muted mt-2 mb-0 max-w-prose">{{ esc_html($paragraph) }}</p>
          @endif
        </div>
        @if ($linkText && $linkUrl)
          <a class="{{ $linkClass }}" href="{{ esc_url($linkUrl) }}">
            {!! wp_kses_post($linkText) !!}
          </a>
        @endif
      </div>
    @endif

    <div class="swiper product-carousel-swiper relative overflow-hidden">
      <ul class="swiper-wrapper products m-0 p-0 !flex">
        @while ($productsQuery->have_posts()) @php($productsQuery->the_post())
          <li class="swiper-slide list-none">
            @php(wc_get_template_part('content', 'product'))
          </li>
        @endwhile
      </ul>

      <button class="carousel-btn-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 size-10 bg-surface-1 border border-border rounded-full items-center justify-center shadow-sm" aria-label="{{ __('Previous', 'sobe') }}">
        <span aria-hidden="true">&larr;</span>
      </button>
      <button class="carousel-btn-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 size-10 bg-surface-1 border border-border rounded-full items-center justify-center shadow-sm" aria-label="{{ __('Next', 'sobe') }}">
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  </section>
  @php(wp_reset_postdata())
@endif

@php
  $count      = $attributes['count'] ?? 8;
  $categoryId = $attributes['categoryId'] ?? 0;

  $args = [
    'post_type'      => 'product',
    'post_status'    => 'publish',
    'posts_per_page' => $count,
  ];

  if ($categoryId > 0) {
    $args['tax_query'] = [
      [
        'taxonomy' => 'product_cat',
        'field'    => 'term_id',
        'terms'    => $categoryId,
      ],
    ];
  }

  $products_query = new \WP_Query($args);
  $wrapperAttrs = get_block_wrapper_attributes(['class' => 'sobe-product-carousel woocommerce my-12']);
@endphp

@if($products_query->have_posts())
  <section {!! $wrapperAttrs !!}>
    <div class="swiper product-carousel-swiper relative overflow-hidden px-4 md:px-0">
      
      <ul class="swiper-wrapper products m-0 p-0 !flex">
        @while($products_query->have_posts()) @php($products_query->the_post())
          <div class="swiper-slide list-none">
            {{-- We include your generic card template here! --}}
            @include('woocommerce.content-product')
          </div>
        @endwhile
      </ul>

      {{-- Swiper Controls --}}
      <button class="carousel-btn-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 size-10 bg-white border border-gray-200 rounded-full items-center justify-center cursor-pointer shadow-sm" aria-label="{{ __('Previous', 'sobe') }}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="carousel-btn-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 size-10 bg-white border border-gray-200 rounded-full items-center justify-center cursor-pointer shadow-sm" aria-label="{{ __('Next', 'sobe') }}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      
    </div>
  </section>
  @php(wp_reset_postdata())
@endif
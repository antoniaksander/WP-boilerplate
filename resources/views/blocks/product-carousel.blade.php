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
      
      <ul class="swiper-wrapper products m-0 p-0 flex">
        @while($products_query->have_posts()) @php($products_query->the_post())
          <div class="swiper-slide list-none w-[75%] md:w-[30%] lg:w-[22%] flex-shrink-0">
            {{-- We include your generic card template here! --}}
            @include('woocommerce.content-product')
          </div>
        @endwhile
      </ul>

      {{-- Swiper Controls --}}
      <div class="swiper-button-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 size-10 bg-white border border-gray-200 rounded-full items-center justify-center cursor-pointer shadow-sm"></div>
      <div class="swiper-button-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 size-10 bg-white border border-gray-200 rounded-full items-center justify-center cursor-pointer shadow-sm"></div>
      
    </div>
  </section>
  @php(wp_reset_postdata())
@endif
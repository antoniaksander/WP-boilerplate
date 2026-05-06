@php
  /** @var array $attributes */
  $wrapperAttrs = get_block_wrapper_attributes();
@endphp

<section {!! $wrapperAttrs !!}>
  {{-- Test Block block output --}}
</section>

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php
    the_post();
    $showHero = get_post_meta(get_the_ID(), '_sobe_page_hero', true) && has_post_thumbnail();
  @endphp
    @if($showHero)
      @include('partials.page-hero')
    @endif
    <x-section width="standard" :padding="$showHero ? 'hero' : 'default'">
      @if(!$showHero)
        @include('partials.page-header')
      @endif
      @includeFirst(['partials.content-page', 'partials.content'])
    </x-section>
  @endwhile
@endsection

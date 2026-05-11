{{--
  Template Name: Custom Template
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php
    the_post();
    $showHero = get_post_meta(get_the_ID(), '_sobe_page_hero', true) && has_post_thumbnail();
  @endphp
    @if($showHero)
      @include('partials.page-hero')
    @endif
    @if(!$showHero)
      @include('partials.page-header')
    @endif
    @include('partials.content-page')
  @endwhile
@endsection

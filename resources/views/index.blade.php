@extends('layouts.app')

@section('content')
  <x-section width="standard" padding="default">
    @include('partials.page-header')

    @if (! have_posts())
    <x-alert type="warning">
      {!! __('Sorry, no results were found.', 'sobe') !!}
    </x-alert>

    {!! get_search_form(false) !!}
  @else
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @while(have_posts()) @php the_post(); @endphp
        <article class="post-card">
          @if (has_post_thumbnail())
            <a href="{{ get_permalink() }}">
              <img src="{{ get_the_post_thumbnail_url(get_the_ID(), 'medium_large') }}" alt="{{ get_the_title() }}" class="w-full h-48 object-cover">
            </a>
          @endif
          <div class="p-4">
            @php $categories = get_the_category(); @endphp
            @if (!empty($categories))
              @foreach($categories as $category)
                <x-badge type="new">{{ $category->name }}</x-badge>
              @endforeach
            @endif
            <h2 class="text-xl font-bold mt-2">
              <a href="{{ get_permalink() }}">{!! get_the_title() !!}</a>
            </h2>
            <p class="text-muted mt-2">{!! get_the_excerpt() !!}</p>
          </div>
        </article>
      @endwhile
    </div>
  @endif

    {!! get_the_posts_navigation() !!}
  </x-section>
@endsection

@section('sidebar')
  @include('sections.sidebar')
@endsection
@extends('layouts.app')

@section('content')
  <x-section width="standard" padding="default">
      @while(have_posts()) @php the_post(); @endphp
      @include('partials.page-header')
      @includeFirst(['partials.content-page', 'partials.content'])
    @endwhile
  </x-section>
@endsection

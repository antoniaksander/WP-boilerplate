<div
  class="sobe-page-hero"
  style="--_hero-bg: url('{{ esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full')) }}')"
  role="banner"
>
  <div class="sobe-page-hero__overlay" aria-hidden="true"></div>
  <div class="sobe-page-hero__inner">
    <h1 class="sobe-page-hero__title">{{ get_the_title() }}</h1>
  </div>
</div>

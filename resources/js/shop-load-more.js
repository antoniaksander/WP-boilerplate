(function () {
  const params = window.sobeLoadMoreParams;
  if (!params) return;

  let sentinel = document.querySelector('[data-load-more-sentinel]');
  if (!sentinel) return;

  let loading = false;
  let filterState = null;
  let filterAction = null;
  let filterNonce = null;

  const observer = new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting && !loading) loadMore(); },
    { rootMargin: '200px' },
  );
  observer.observe(sentinel);

  function hasActiveFilters() {
    if (!filterState) return false;
    return Object.keys(filterState).some((k) => {
      if (k === 'paged' || k === 'orderby' || k === 's') return false;
      const v = filterState[k];
      return Array.isArray(v) ? v.length > 0 : !!v;
    });
  }

  document.addEventListener('sobe:pagination-updated', (e) => {
    filterState  = e.detail.state;
    filterAction = e.detail.filterAction;
    filterNonce  = e.detail.filterNonce;

    const newSentinel = document.querySelector('[data-pagination] [data-load-more-sentinel]');
    if (newSentinel && newSentinel !== sentinel) {
      observer.unobserve(sentinel);
      sentinel = newSentinel;
      observer.observe(sentinel);
      loading = false;
    }
  });

  async function loadMore() {
    loading = true;
    const page = parseInt(sentinel.dataset.page, 10);
    const paginationZone = document.querySelector('[data-pagination]');
    const grid = document.querySelector('.woocommerce ul.products');

    try {
      if (hasActiveFilters()) {
        const body = new FormData();
        body.append('action', filterAction);
        body.append('nonce', filterNonce);
        body.append('filter_state', JSON.stringify({ ...filterState, paged: page }));
        const res = await fetch(params.ajaxUrl, { method: 'POST', body });
        const data = await res.json();

        if (data.html && grid) grid.insertAdjacentHTML('beforeend', data.html);

        if (paginationZone && data.pagination_html !== undefined) {
          paginationZone.innerHTML = data.pagination_html;
          const newSentinel = paginationZone.querySelector('[data-load-more-sentinel]');
          if (newSentinel) {
            observer.unobserve(sentinel);
            sentinel = newSentinel;
            observer.observe(sentinel);
            loading = false;
          } else {
            observer.disconnect();
          }
        }
        return;
      }

      const body = new FormData();
      body.append('action', params.ajaxAction);
      body.append('nonce', params.nonce);
      body.append('page', page);
      body.append('taxonomy', params.taxonomy ?? '');
      body.append('term_id', params.termId ?? 0);
      body.append('search', params.search ?? '');
      body.append('orderby', params.orderby ?? 'menu_order');
      const res = await fetch(params.ajaxUrl, { method: 'POST', body });
      const data = await res.json();

      if (data.html && grid) grid.insertAdjacentHTML('beforeend', data.html);

      if (data.has_more) {
        sentinel.dataset.page = data.next_page;
        if (params.historyEnabled) {
          history.replaceState({}, '', '?paged=' + data.next_page);
        }
        loading = false;
      } else {
        observer.disconnect();
        sentinel.remove();
      }
    } catch {
      loading = false;
    }
  }
})();

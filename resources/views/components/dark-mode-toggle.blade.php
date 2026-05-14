<button
  data-dark-toggle
  type="button"
  @click="toggleDark()"
  class="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface-1 text-text hover:bg-surface-2 transition-colors"
  :aria-label="dark ? '{{ esc_attr__('Switch to light mode', 'sobe') }}' : '{{ esc_attr__('Switch to dark mode', 'sobe') }}'"
>
  <span x-show="!dark" aria-hidden="true">☾</span>
  <span x-show="dark" x-cloak aria-hidden="true">☀</span>
</button>

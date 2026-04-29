<footer class="border-t border-black/5 mt-auto">
  @if (is_active_sidebar('sidebar-footer'))
    <div class="container mx-auto px-4 py-12">
      @php dynamic_sidebar('sidebar-footer'); @endphp
    </div>
  @endif
</footer>

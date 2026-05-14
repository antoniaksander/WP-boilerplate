import Alpine from 'alpinejs';

const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
  document.documentElement.classList.add('dark');
}

document.documentElement.classList.add('js');

Alpine.data('app', () => ({
  navOpen: false,
  dark: document.documentElement.classList.contains('dark'),

  init() {
    this.$watch('dark', (value) => {
      document.documentElement.classList.toggle('dark', value);
      localStorage.setItem('theme', value ? 'dark' : 'light');
    });
  },

  toggleDark() {
    this.dark = !this.dark;
  },
}));

window.Alpine = Alpine;
Alpine.start();

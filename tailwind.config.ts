import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'auth-bg': "url('https://picsum.photos/1080/720')"
      },
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        primary: 'var(--bs-primary)',
        secondary: 'var(--bs-secondary)',
        tertiary: 'var(--bs-tertiary)',
        success: 'var(--bs-success)',
        info: 'var(--bs-info)',
        warning: 'var(--bs-warning)',
        danger: 'var(--bs-danger)',
        light: 'var(--bs-light)',
        dark: 'var(--bs-dark)'
      }
    }
  },
  blocklist: ['collapse'],
  corePlugins: {
    preflight: false
  }
} satisfies Config;

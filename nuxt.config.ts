// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],
  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          theme: 'github-dark',
        }
      }
    }
  },

  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'fr', name: 'French', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Aurélien Tondoux - Tech Lead & Full Stack Developer',
      meta: [
        { name: 'description', content: 'Portfolio professionnel d\'Aurélien Tondoux - Tech Lead & Développeur Full Stack' },
        { name: 'author', content: 'Aurélien Tondoux' },
      ],
    },
  },

  compatibilityDate: '2024-12-20',

  devtools: { enabled: true },

  $production: {
    app: {
      head: {
        meta: [
          { name: 'robots', content: 'index, follow' },
        ],
      },
    },
  },
})

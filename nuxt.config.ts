// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/i18n'
  ],

  experimental: {
    defaults: {
      nuxtLink: {
        // This option ensures internal links and route resolution consistently use NO trailing slashes
        trailingSlash: 'remove'
      }
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  site: {
    url: 'https://aurelientondoux.com',
    name: 'Aurélien Tondoux',
    description: 'Ingénieur logiciel senior freelance avec plus de 15 ans d\'expérience',
    defaultLocale: 'fr'
  },

  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', files: ['fr.json'] },
      { code: 'en', language: 'en-US', name: 'English', files: ['en.json'] }
    ],
    langDir: 'locales',
  },

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://aurelientondoux.com'
    }
  },

  icon: {
    provider: 'server',
    clientBundle: {
      scan: true,
      icons: [
        // Dynamically rendered icons
        'lucide:sun',
        'lucide:moon',
        'lucide:arrow-left',
        'lucide:arrow-right',
        'lucide:hash',
        // Navigation icons
        'lucide:house',
        'lucide:hand-coins',
        'lucide:folder-kanban',
        'lucide:package',
        'lucide:user-round'
      ],
    }
  }
})

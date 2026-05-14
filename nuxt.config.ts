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
    '@nuxtjs/i18n',
    'nuxt-gtag'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://aurelientondoux.com',
    name: 'Aurélien Tondoux',
    description: 'Ingénieur logiciel senior freelance avec plus de 15 ans d\'expérience',
    defaultLocale: 'fr'
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  hooks: {
    'nitro:init'(nitro) {
      nitro.hooks.hook('prerender:done', async () => {
        // Problem:
        // When deploying a Nuxt static site to GitHub Pages:
        // - Visiting /docs/page works fine initially
        // - But refreshing the page or directly visiting /docs/page/ returns a 404 error
        // - This happens because Nuxt generates /path/index.html but GitHub Pages can also expect /path.html
        //   ensuring URLs work with or without trailing slashes
        //
        // Solution:
        // - Automatically create duplicate HTML files during the build process.
        // - For every /path/index.html, create a /path.html file.
        //
        // See: https://github.com/mitre/nuxt-github-pages
        const fs = await import('fs/promises')
        const path = await import('path')

        console.log('🔄 Starting static file duplication for GitHub Pages...')

        const publicDir = path.resolve(nitro.options.output.publicDir)
        console.log(`📁 Processing directory: ${publicDir}`)

        let duplicatedCount = 0

        // Recursively walk directory and find all index.html files
        async function walkDirectory(dir: string) {
          const entries = await fs.readdir(dir, { withFileTypes: true })

          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
              await walkDirectory(fullPath)
            } else if (entry.isFile() && entry.name === 'index.html') {
              // Skip root index files
              const relativePath = path.relative(publicDir, fullPath)
              const isRoot = relativePath === 'index.html' || relativePath === path.join('en', 'index.html')

              if (!isRoot) {
                // Create /path.html from /path/index.html
                const dir = path.dirname(fullPath)
                const parentDir = path.dirname(dir)
                const routeName = path.basename(dir)
                const duplicatePath = path.join(parentDir, `${routeName}.html`)

                await fs.copyFile(fullPath, duplicatePath)

                const duplicateRelativePath = path.relative(publicDir, duplicatePath)
                console.log(`  ✓ Duplicated: ${relativePath} → ${duplicateRelativePath}`)
                duplicatedCount++
              }
            }
          }
        }

        try {
          await walkDirectory(publicDir)
          console.log(`✅ Successfully duplicated ${duplicatedCount} files for GitHub Pages`)
        } catch (error) {
          console.error('❌ Error during static file duplication:', error)
          throw error
        }
      })
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

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID
  },

  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', files: ['fr.json'] },
      { code: 'en', language: 'en-US', name: 'English', files: ['en.json'] }
    ],
    langDir: 'locales'
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
      ]
    }
  }
})

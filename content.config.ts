import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const LOCALES = ['fr', 'en'] as const

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

// Define base collection configurations
const baseCollections = {
  index: {
    type: 'page' as const,
    source: 'index.yml',
    schema: z.object({
      hero: z.object({
        links: z.array(createButtonSchema()),
        images: z.array(createImageSchema())
      }),
      about: createBaseSchema(),
      experience: createBaseSchema().extend({
        items: z.array(z.object({
          date: z.date(),
          position: z.string(),
          company: z.object({
            name: z.string(),
            url: z.string(),
            logo: z.string().editor({ input: 'icon' }),
            color: z.string()
          })
        }))
      })
    })
  },
  projects: {
    type: 'data' as const,
    source: 'projects/*.yml',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      date: z.date(),
      image: z.string().nonempty().editor({ input: 'media' }),
      tags: z.array(z.string()),
      slug: z.string(),
      role: z.string(),
      actions: z.array(z.string()),
      links: z.array(createButtonSchema()).optional(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      }).optional()
    })
  },
  pages: {
    type: 'page' as const,
    source: [
      { include: 'projects.yml' }
    ],
    schema: z.object({
      path: z.string(),
      title: z.string(),
      description: z.string(),
      links: z.array(createButtonSchema()).optional(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      }).optional()
    })
  },
  speaking: {
    type: 'page' as const,
    source: 'speaking.yml',
    schema: z.object({
      links: z.array(createButtonSchema()),
      events: z.array(z.object({
        category: z.enum(['Live talk', 'Podcast', 'Conference']),
        title: z.string(),
        date: z.date(),
        location: z.string(),
        url: z.string().optional()
      }))
    })
  },
  about: {
    type: 'page' as const,
    source: 'about.yml',
    schema: z.object({
      content: z.string(),
      images: z.array(createImageSchema())
    })
  }
}

// Generate locale-specific collections
const collections: Record<string, any> = {}
for (const locale of LOCALES) {
  for (const [name, config] of Object.entries(baseCollections)) {
    const localeSource = Array.isArray(config.source)
      ? config.source.map(s => {
          const sourceStr = typeof s === 'string' ? s : s.include
          // Extract directory from pattern (e.g., 'projects.yml' -> 'projects', 'blog/*.md' -> 'blog')
          const pathMatch = sourceStr.match(/^([^/*]+)/)
          const prefix = pathMatch ? `/${pathMatch[1].replace(/\.(yml|yaml|md)$/, '')}` : '/'
          return {
            include: `${locale}/${sourceStr}`,
            prefix
          }
        })
      : (() => {
          // Extract directory from pattern for prefix
          const sourceStr = config.source
          const pathMatch = sourceStr.match(/^([^/*]+)/)
          const prefix = pathMatch ? `/${pathMatch[1].replace(/\.(yml|yaml|md)$/, '')}` : '/'
          return {
            include: `${locale}/${sourceStr}`,
            prefix
          }
        })()

    collections[`${name}_${locale}`] = defineCollection({
      type: config.type,
      source: localeSource,
      schema: config.schema as any
    })
  }
}

export default defineContentConfig({ collections })

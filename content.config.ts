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
      content: z.string(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      }).optional()
    })
  },
  products: {
    type: 'data' as const,
    source: 'products/*.yml',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      date: z.date(),
      image: z.string().nonempty().editor({ input: 'media' }),
      tags: z.array(z.string()),
      slug: z.string(),
      summary: z.string(),
      content: z.string(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      }).optional(),
      images: z.array(createImageSchema()).optional(),
      showFullImages: z.boolean().optional()
    })
  },
  services: {
    type: 'data' as const,
    source: 'services/*.yml',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      price: z.string().optional(),
      billingCycle: z.string().optional(),
      tagline: z.string().optional(),
      features: z.array(z.object({
        title: z.string(),
        icon: z.string().optional()
      })),
      button: z.object({
        label: z.string(),
        color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
        variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional()
      }).optional(),
      badge: z.object({
        label: z.string().optional(),
        color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
        variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional()
      }).optional(),
      variant: z.enum(['soft', 'solid', 'outline', 'subtle']).optional(),
      highlight: z.boolean().optional(),
      order: z.number()
    })
  },
  testimonials: {
    type: 'data' as const,
    source: 'testimonials/*.yml',
    schema: z.object({
      quote: z.string().nonempty(),
      author: z.object({
        name: z.string().nonempty(),
        description: z.string().optional(),
        avatar: z.object({
          src: z.string().editor({ input: 'media' }),
          alt: z.string()
        }).optional()
      }),
      order: z.number()
    })
  },
  pages: {
    type: 'page' as const,
    source: [
      { include: 'projects.yml' },
      { include: 'products.yml' },
      { include: 'services.yml' },
      { include: 'testimonials.yml' }
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
  about: {
    type: 'page' as const,
    source: 'about.yml',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      links: z.array(createButtonSchema()).optional(),
      content: z.string(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      }).optional()
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

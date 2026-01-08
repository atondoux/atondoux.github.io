export function usePageSeo(options: {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'article'
}) {
  const { locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const siteUrl = config.public.siteUrl
  const canonicalUrl = `${siteUrl}${route.path}`

  const ogLocale = locale.value === 'fr' ? 'fr_FR' : 'en_US'
  const ogLocaleAlternate = locale.value === 'fr' ? 'en_US' : 'fr_FR'

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonicalUrl,
    ogType: options.ogType || 'website',
    ogLocale,
    ogLocaleAlternate,
    twitterTitle: options.title,
    twitterDescription: options.description,
    robots: 'index, follow'
  })

  if (options.ogImage) {
    useSeoMeta({
      ogImage: options.ogImage,
      twitterImage: options.ogImage
    })
  }

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })
}

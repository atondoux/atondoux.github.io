<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

// Extract slug from route params (e.g., ['products', 'ortho-assistant'] -> 'ortho-assistant')
const slug = Array.isArray(route.params.slug)
  ? route.params.slug[route.params.slug.length - 1]
  : route.params.slug

const { data: page } = await useAsyncData(`${route.path}-${locale.value}`, () =>
  queryCollection(`products_${locale.value}`).where('slug', '=', slug).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

// Fetch all products to manually create surround navigation
const { data: allProducts } = await useAsyncData(`products-all-${locale.value}`, () =>
  queryCollection(`products_${locale.value}`).order('date', 'DESC').all()
)

// Create surround manually by finding prev/next in the list
const surround = computed(() => {
  if (!allProducts.value || !page.value) return null

  const currentIndex = allProducts.value.findIndex(p => p.slug === page.value.slug)
  if (currentIndex === -1) return null

  const prev = currentIndex < allProducts.value.length - 1 ? allProducts.value[currentIndex + 1] : null
  const next = currentIndex > 0 ? allProducts.value[currentIndex - 1] : null

  return [
    prev ? { ...prev, path: localePath(`/products/${prev.slug}`) } : null,
    next ? { ...next, path: localePath(`/products/${next.slug}`) } : null
  ]
})

if (page.value.image) {
  defineOgImage({ url: page.value.image })
} else {
  defineOgImageComponent('Product', {
    headline: page.value.title
  }, {
    fonts: ['Geist:400', 'Geist:600']
  })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          :to="localePath('/products')"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          {{ $t('nav.products') }}
        </ULink>
        <div class="flex flex-col lg:flex-row gap-8 mt-8 lg:items-center">
          <div class="flex-1 flex flex-col gap-3">
            <h1 class="text-4xl font-medium">
              {{ page.title }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {{ page.description }}
            </p>

          </div>
          <div class="shrink-0">
            <div class="w-64 h-48 rounded-lg flex items-center justify-center bg-gray-100 p-8">
              <NuxtImg
                :src="page.image"
                :alt="page.title"
                class="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <div
          v-if="page.tags && page.tags.length"
          class="flex flex-wrap gap-2 my-8 justify-center"
        >
          <UBadge
            v-for="tag in page.tags"
            :key="tag"
            color="primary"
            variant="outline"
            size="md"
          >
            {{ tag }}
          </UBadge>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <div v-if="page.about">
            <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-info" />
              {{ locale === 'fr' ? 'À propos' : 'About' }}
            </h2>
            <div class="prose dark:prose-invert max-w-none mb-8">
              <p
                v-for="(paragraph, index) in page.about.split('\n\n')"
                :key="index"
                class="text-gray-700 dark:text-gray-300 mb-4"
                v-html="paragraph.trim()"
              />
            </div>
          </div>

          <div v-if="page.features && page.features.length">
            <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-sparkles" />
              {{ locale === 'fr' ? 'Fonctionnalités' : 'Features' }}
            </h2>
            <ul class="list-disc list-outside ml-6 space-y-2 mb-8">
              <li
                v-for="(feature, index) in page.features"
                :key="index"
                class="text-gray-700 dark:text-gray-300 pl-2"
              >
                {{ feature }}
              </li>
            </ul>
          </div>

          <div v-if="page.links && page.links.length">
            <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-external-link" />
              {{ locale === 'fr' ? 'Liens' : 'Links' }}
            </h2>
            <div class="flex flex-wrap gap-3 mb-8">
              <UButton
                v-for="(link, index) in page.links"
                :key="index"
                :label="link.label"
                :to="link.to"
                :target="link.target"
                :color="link.color"
                :variant="link.variant"
              />
            </div>
          </div>

          <UContentSurround v-if="surround" :surround="surround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>

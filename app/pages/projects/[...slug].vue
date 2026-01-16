<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

// Extract slug from route params (e.g., ['malt'] -> 'malt')
const slug = Array.isArray(route.params.slug)
  ? route.params.slug[route.params.slug.length - 1]
  : route.params.slug

const { data: page } = await useAsyncData(`${route.path}-${locale.value}`, () =>
  queryCollection(`projects_${locale.value}`).where('slug', '=', slug).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

// Fetch all projects to manually create surround navigation
const { data: allProjects } = await useAsyncData(`projects-all-${locale.value}`, () =>
  queryCollection(`projects_${locale.value}`).order('date', 'DESC').all()
)

// Create surround manually by finding prev/next in the list
const surround = computed(() => {
  if (!allProjects.value || !page.value) return null

  const currentIndex = allProjects.value.findIndex(p => p.slug === page.value.slug)
  if (currentIndex === -1) return null

  const prev = currentIndex < allProjects.value.length - 1 ? allProjects.value[currentIndex + 1] : null
  const next = currentIndex > 0 ? allProjects.value[currentIndex - 1] : null

  return [
    prev ? { ...prev, path: localePath(`/projects/${prev.slug}`) } : null,
    next ? { ...next, path: localePath(`/projects/${next.slug}`) } : null
  ]
})

if (page.value.image) {
  defineOgImage({ url: page.value.image })
} else {
  defineOgImageComponent('Project', {
    headline: page.value.title
  }, {
    fonts: ['Geist:400', 'Geist:600']
  })
}

usePageSeo({
  title: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogImage: page.value.image,
  ogType: 'article'
})
</script>

<template>
  <UPage v-if="page">
    <template #header>
      <ULink
        :to="localePath('/projects')"
        class="text-sm flex items-center gap-1"
      >
        <UIcon name="lucide:chevron-left" />
        {{ $t('nav.projects') }}
      </ULink>
    </template>
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #description>
        <p>{{ page.description }}</p>
        <div
          v-if="page.tags && page.tags.length"
          class="flex flex-wrap gap-2 mt-4"
        >
          <UBadge
            v-for="tag in page.tags"
            :key="tag"
            color="primary"
            variant="subtle"
            size="md"
          >
            {{ tag }}
          </UBadge>
        </div>
      </template>
      <div class="w-64 h-48 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-100 p-8">
        <NuxtImg
          :src="page.image"
          :alt="page.title"
          class="w-full h-full object-contain"
        />
      </div>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <MDC
        :value="page.content"
        unwrap="p"
      />

      <UContentSurround v-if="surround" :surround="surround" />
    </UPageSection>
  </UPage>
</template>

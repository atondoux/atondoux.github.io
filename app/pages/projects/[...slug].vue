<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

// Extract slug from route params (e.g., ['projects', 'malt'] -> 'malt')
const slug = Array.isArray(route.params.slug)
  ? route.params.slug[route.params.slug.length - 1]
  : route.params.slug

const { data: page } = await useAsyncData(`${route.path}-${locale.value}`, () =>
  queryCollection(`projects_${locale.value}`).where('slug', '==', slug).first()
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

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          :to="localePath('/projects')"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          {{ $t('nav.projects') }}
        </ULink>
        <div class="flex flex-col lg:flex-row gap-8 mt-8 lg:items-start">
          <div class="flex-1 flex flex-col gap-3">
            <h1 class="text-4xl font-medium">
              {{ page.title }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {{ page.description }}
            </p>
            <div
              v-if="page.tags && page.tags.length"
              class="flex flex-wrap gap-2 mt-2"
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
        <UPageBody class="max-w-3xl mx-auto">
          <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
            <UIcon name="i-lucide-user" />
            {{ $t('projects.myRole') }}
          </h2>
          <ul class="list-disc list-outside ml-6 space-y-2 mb-8">
            <li class="text-gray-700 dark:text-gray-300 pl-2">
              {{ page.role }}
            </li>
          </ul>

          <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
            <UIcon name="i-lucide-circle-check" />
            {{ $t('projects.myActions') }}
          </h2>
          <ul class="list-disc list-outside ml-6 space-y-2">
            <li
              v-for="(action, index) in page.actions"
              :key="index"
              class="text-gray-700 dark:text-gray-300 pl-2"
            >
              {{ action }}
            </li>
          </ul>

          <UContentSurround v-if="surround" :surround="surround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>

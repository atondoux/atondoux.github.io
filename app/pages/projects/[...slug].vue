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
        <div class="flex flex-col gap-6 mt-8">
          <div class="flex flex-col lg:flex-row gap-8 items-center">
            <div class="flex-1">
              <UPageHero
                :title="page.title"
                :ui="{
                  title: '!mx-0 text-left',
                  description: '!mx-0 text-left'
                }"
              >
                <template #description>
                  <p class="text-muted">
                    {{ page.description }}
                  </p>
                  <div
                    v-if="page.tags && page.tags.length"
                    class="flex flex-wrap gap-2 mt-4"
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
                </template>
              </UPageHero>
            </div>
            <div class="w-full lg:w-auto shrink-0">
              <NuxtImg
                :src="page.image"
                :alt="page.title"
                class="rounded-lg w-full lg:w-72 h-72 object-contain"
              />
            </div>
          </div>
        </div>
        <UPageBody
          class="max-w-3xl mx-auto"
          :ui="{ wrapper: '!pt-4' }"
        >
          <div v-if="page.role">
            <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-user" class="size-6" />
              {{ $t('projects.myRole') }}
            </h2>
            <p class="text-muted">
              {{ page.role }}
            </p>
          </div>

          <div
            v-if="page.actions && page.actions.length"
            class="mt-8"
          >
            <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-circle-check" class="size-6" />
              {{ $t('projects.myActions') }}
            </h2>
            <ul class="list-disc list-inside space-y-2">
              <li
                v-for="(action, index) in page.actions"
                :key="index"
                class="text-muted"
              >
                {{ action }}
              </li>
            </ul>
          </div>
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>

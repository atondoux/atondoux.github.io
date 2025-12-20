<script setup lang="ts">
const { locale, t } = useI18n()

// Locale-aware content path
const contentPath = computed(() => {
  return locale.value === 'fr' ? '/index' : `/${locale.value}/index`
})

// Query content with reactive path
const { data: page } = await useAsyncData(
  `index-${locale.value}`,
  () => queryCollection('content').path(contentPath.value).first(),
  {
    watch: [locale], // Auto-refetch when locale changes
  }
)

// TODO SEO metadata for homepage
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-2xl mx-auto text-center space-y-8">
      <UCard>
        <template #header>
          <h1 class="text-4xl font-bold">{{ page?.title || 'Aurélien Tondoux' }}</h1>
        </template>

        <div class="space-y-6">
          <UBadge
            color="primary"
            variant="subtle"
            size="lg"
            class="px-4 py-2"
          >
            {{ t('comingSoon') }}
          </UBadge>

          <ContentRenderer
              v-if="page"
              :value="page!"
              class="prose dark:prose-invert mx-auto"
          />
        </div>
      </UCard>

      <div class="pt-6">
        <p class="text-sm text-gray-500 dark:text-gray-500">
          Tech Lead • Full Stack Developer
        </p>
      </div>
    </div>
  </UContainer>
</template>

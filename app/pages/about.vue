<script setup lang="ts">
const { locale } = useI18n()
const { data: page } = await useAsyncData(`about-${locale.value}`, () => {
  return queryCollection(`about_${locale.value}`).first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

usePageSeo({
  title: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogType: 'website'
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links && page.links.length > 0"
          class="flex items-center gap-2"
        >
          <UButton
            v-for="(link, index) in page.links"
            :key="index"
            :label="link.label"
            :to="link.to"
            :target="link.target"
            :color="link.color"
            v-bind="link"
          />
        </div>
      </template>
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
    </UPageSection>
  </UPage>
</template>

<style scoped>
:deep(table td:first-child),
:deep(table th:first-child) {
  white-space: nowrap;
}
</style>

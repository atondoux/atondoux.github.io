<script setup lang="ts">
const { locale } = useI18n()
const { data: page } = await useAsyncData(`index-${locale.value}`, () => {
  return queryCollection(`index_${locale.value}`).first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

usePageSeo({
  title: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogType: 'website'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
  </UPage>
</template>

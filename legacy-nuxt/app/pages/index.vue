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

const pageData = page.value
usePageSeo({
  title: pageData.seo.title,
  description: pageData.seo.description,
  ogType: 'website'
})
</script>

<template>
  <UPage v-if="page">
    <PageHero :page />
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <PageAbout :page />
      <PageWorkExperience :page />
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(`testimonials-page-${locale.value}`, () => {
  return queryCollection(`pages_${locale.value}`).path('/testimonials').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

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
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left'
      }"
    />
  </UPage>
</template>

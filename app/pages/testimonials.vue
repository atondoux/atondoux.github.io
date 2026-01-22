<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('testimonials.title'),
  description: t('testimonials.title'),
  ogType: 'website'
})
</script>

<template>
  <UPage>
    <UPageHero
      :title="$t('testimonials.title')"
      :ui="{
        title: '!mx-0 text-left'
      }"
    />
  </UPage>
</template>

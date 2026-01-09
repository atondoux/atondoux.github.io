<script setup lang="ts">
const { locale } = useI18n()

// Fetch page metadata
const { data: page } = await useAsyncData(`services-page-${locale.value}`, () => {
  return queryCollection(`pages_${locale.value}`).path('/services').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

// Fetch services
const { data: services } = await useAsyncData(`services-${locale.value}`, () => {
  return queryCollection(`services_${locale.value}`).order('order', 'ASC').all()
})

// SEO metadata
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
      :ui="{
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
      <UPricingPlans
        :plans="services"
        orientation="horizontal"
      />
    </UPageSection>
  </UPage>
</template>

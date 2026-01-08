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

const { global } = useAppConfig()

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
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            :target="'_blank'"
            v-bind="page.links[0]"
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

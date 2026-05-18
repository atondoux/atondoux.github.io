<script setup lang="ts">
const { locale } = useI18n()

// Fetch page metadata
const { data: page } = await useAsyncData(`pricing-page-${locale.value}`, () => {
  return queryCollection(`pages_${locale.value}`).path('/pricing').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

// Fetch pricing plans
const { data: plans } = await useAsyncData(`pricing-plans-${locale.value}`, () => {
  return queryCollection(`pricing_${locale.value}`).order('order', 'ASC').all()
})

const pageData = page.value
usePageSeo({
  title: pageData.seo.title,
  description: pageData.seo.description,
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
      <UPricingPlans orientation="horizontal">
        <UPricingPlan
          v-for="(plan, index) in plans"
          :key="index"
          v-bind="plan"
          :data-testid="`pricing-plan-${index}`"
        />
      </UPricingPlans>
    </UPageSection>
  </UPage>
</template>

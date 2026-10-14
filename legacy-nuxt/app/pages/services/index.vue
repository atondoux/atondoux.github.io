<script setup lang="ts">
const { locale } = useI18n()

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

const { data: items } = await useAsyncData(`services-items-${locale.value}`, () => {
  return queryCollection(`services_${locale.value}`).order('order', 'ASC').all()
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
      <UPageGrid>
        <div
          v-for="(item, index) in items"
          :key="item.order"
          :data-testid="`service-item-${index}`"
        >
          <UPageCard
            :description="item.description"
            :icon="item.icon"
            variant="subtle"
            :ui="{ root: 'h-full' }"
          >
            <template #title>
              <p :data-testid="`service-title-${index}`">
                {{ item.title }}
              </p>
            </template>
          </UPageCard>
        </div>
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>

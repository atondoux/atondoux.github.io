<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { data: page } = await useAsyncData(`products-page-${locale.value}`, () => {
  return queryCollection(`pages_${locale.value}`).path('/products').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: products } = await useAsyncData(`products-${locale.value}`, () => {
  return queryCollection(`products_${locale.value}`).order('date', 'DESC').all()
})

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
      <Motion
        v-for="(product, index) in products"
        :key="product.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="product.title"
          :description="product.description"
          :to="localePath(`/products/${product.slug}`)"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last',
            container: '!items-center',
            body: 'flex flex-col justify-center',
            description: 'text-gray-600 dark:text-gray-400'
          }"
        >
          <template #footer>
            <div
              v-if="product.tags && product.tags.length"
              class="flex flex-wrap gap-2 mb-4"
            >
              <UBadge
                v-for="tag in product.tags"
                :key="tag"
                color="primary"
                variant="subtle"
                size="md"
              >
                {{ tag }}
              </UBadge>
            </div>
            <ULink
              :to="localePath(`/products/${product.slug}`)"
              class="text-sm text-primary flex items-center"
            >
              {{ $t('global.viewProduct') }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </template>
          <div class="w-full h-full rounded-lg flex items-center justify-center bg-gray-100 transition-transform duration-500 ease-out group-hover:scale-105">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-contain rounded-lg"
            >
          </div>
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>

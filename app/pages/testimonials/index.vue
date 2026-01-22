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

const { data: testimonials } = await useAsyncData(`testimonials-${locale.value}`, () => {
  return queryCollection(`testimonials_${locale.value}`).order('order', 'ASC').all()
})

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

    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :data-testid="`testimonial-${index}`"
          :ui="{
            body: 'flex flex-col gap-4'
          }"
        >
          <p class="text-muted italic">
            "{{ testimonial.quote }}"
          </p>
          <UUser
            :name="testimonial.author.name"
            :description="testimonial.author.description"
            :avatar="testimonial.author.avatar"
            size="lg"
          />
        </UCard>
      </div>
    </UPageSection>
  </UPage>
</template>

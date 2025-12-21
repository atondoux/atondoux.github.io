<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const navLinks = useNavLinks()

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(`navigation-${locale.value}`, () => {
    return Promise.all([
      queryCollectionNavigation(`blog_${locale.value}`)
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData(`search-${locale.value}`, () => {
    return Promise.all([
      queryCollectionSearchSections(`blog_${locale.value}`)
    ])
  }, {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <div>
    <AppHeader :links="navLinks" />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>

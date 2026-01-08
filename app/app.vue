<script setup lang="ts">
const colorMode = useColorMode()
const { locale } = useI18n()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  titleTemplate: '%s - Aurélien Tondoux',
  ogSiteName: 'Aurélien Tondoux',
  ogImage: 'https://aurelientondoux.com/hero.jpg',
  ogImageAlt: 'Aurélien Tondoux profile picture',
  twitterImage: 'https://aurelientondoux.com/hero.jpg',
  twitterCard: 'summary_large_image',
  twitterSite: '@atondoux'
})

const navLinks = useNavLinks()

// Since we're only querying blog and removing it, simplify to empty arrays
const navigation = ref([])
const files = ref([])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>

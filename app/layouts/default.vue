<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()
const localePath = useLocalePath()

const alternateLocale = computed(() => {
  return locales.value.find(l => l.code !== locale.value)
})

const switchLanguage = () => {
  const newLocale = alternateLocale.value?.code || 'en'
  setLocale(newLocale)
}
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-gray-200 dark:border-gray-800">
      <UContainer class="py-4">
        <div class="flex justify-between items-center">
          <NuxtLink :to="localePath('/')" class="text-xl font-bold">
            Aurélien Tondoux
          </NuxtLink>
          <UButton
            :label="alternateLocale?.name || t('switchLanguage')"
            variant="soft"
            size="sm"
            @click="switchLanguage"
          />
        </div>
      </UContainer>
    </header>

    <main>
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800 mt-12">
      <UContainer class="py-6">
        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
          © {{ new Date().getFullYear() }} Aurélien Tondoux
        </p>
      </UContainer>
    </footer>
  </div>
</template>

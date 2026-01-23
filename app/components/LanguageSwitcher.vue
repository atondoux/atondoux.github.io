<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string, name: string }>).filter(l => l.code !== locale.value)
)

const nextLocale = computed(() => availableLocales.value[0])

const switchLanguage = () => {
  if (!nextLocale.value) return
  setLocale(nextLocale.value.code as 'fr' | 'en')
}

const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchLanguage()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    switchLanguage()
  })

  transition.ready.then(() => {
    const duration = 600
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      data-testid="language-switcher"
      :aria-label="`Switch to ${nextLocale?.name}`"
      icon="i-lucide-languages"
      color="neutral"
      variant="link"
      size="sm"
      class="px-2 py-1 cursor-pointer"
      @click="startViewTransition"
    />
    <template #fallback>
      <div class="size-4" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>

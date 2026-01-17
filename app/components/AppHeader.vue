<script setup lang="ts">
import type { NavigationMenuItem } from '~/types/navigation'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('sm') // < 640px
const displayLinks = computed(() => {
  return props.links.map(link => ({
    ...link,
    label: isMobile.value ? undefined : link.label,
    icon: isMobile.value ? link.icon : undefined,
    ...(link.testId && { 'data-testid': link.testId })
  }))
})
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <UNavigationMenu
      :items="displayLinks"
      variant="link"
      color="primary"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1'
      }"
    >
      <template #list-trailing>
        <LanguageSwitcher />
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>

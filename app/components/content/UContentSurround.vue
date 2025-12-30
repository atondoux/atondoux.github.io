<script setup lang="ts">
defineProps<{
  surround?: Array<any>
}>()

const appConfig = useAppConfig()
</script>

<template>
  <div v-if="surround" class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
    <!-- Previous Link -->
    <ULink
      v-if="surround[0]"
      :to="surround[0].path"
      class="group block px-6 py-8 rounded-lg border border-default hover:bg-elevated/50 focus-visible:outline-primary transition-colors"
    >
      <div class="inline-flex items-center rounded-full p-1.5 bg-elevated group-hover:bg-primary/10 ring ring-accented mb-4 group-hover:ring-primary/50 transition">
        <UIcon
          :name="appConfig.ui.icons.arrowLeft"
          class="size-5 shrink-0 text-highlighted group-hover:text-primary transition-[color,translate] group-active:-translate-x-0.5"
        />
      </div>
      <p class="font-medium text-[15px] text-highlighted truncate">
        {{ surround[0].title }}
      </p>
    </ULink>
    <span v-else class="hidden lg:block">&nbsp;</span>

    <!-- Next Link -->
    <ULink
      v-if="surround[1]"
      :to="surround[1].path"
      class="group block px-6 py-8 rounded-lg border border-default hover:bg-elevated/50 focus-visible:outline-primary transition-colors"
    >
      <div class="flex justify-end mb-4">
        <div class="inline-flex items-center rounded-full p-1.5 bg-elevated group-hover:bg-primary/10 ring ring-accented group-hover:ring-primary/50 transition">
          <UIcon
            :name="appConfig.ui.icons.arrowRight"
            class="size-5 shrink-0 text-highlighted group-hover:text-primary transition-[color,translate] group-active:translate-x-0.5"
          />
        </div>
      </div>
      <p class="font-medium text-[15px] text-highlighted truncate text-right">
        {{ surround[1].title }}
      </p>
    </ULink>
    <span v-else class="hidden lg:block">&nbsp;</span>
  </div>
</template>

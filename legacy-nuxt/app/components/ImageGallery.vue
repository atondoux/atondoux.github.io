<script setup lang="ts">
withDefaults(defineProps<{
  images: Array<{ src: string, alt: string }>
  displayFullImage?: boolean
}>(), {
  displayFullImage: false
})
</script>

<template>
  <UMarquee
    pause-on-hover
    class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]"
  >
    <Motion
      v-for="(img, index) in images"
      :key="index"
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      }"
      :transition="{
        duration: 0.6,
        delay: index * 0.1
      }"
    >
      <NuxtImg
        :width="displayFullImage ? undefined : 351"
        height="234"
        :class="[
          'rounded-lg object-contain',
          displayFullImage ? 'h-58.5 w-auto' : 'aspect-3/2',
          index % 2 === 0 ? '-rotate-2' : 'rotate-2'
        ]"
        v-bind="img"
      />
    </Motion>
  </UMarquee>
</template>

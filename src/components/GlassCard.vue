<script setup lang="ts">
// 毛玻璃卡片通用组件
const props = defineProps<{
  class?: string
  hover?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'glass rounded-3xl p-6 transition-all duration-300',
      hover ? 'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/20' : '',
      props.class,
    ]"
  >
    <slot />
  </div>
</template>

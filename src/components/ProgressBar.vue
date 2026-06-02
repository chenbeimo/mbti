<script setup lang="ts">
// 渐变进度条组件
const props = defineProps<{
  progress: number
  showLabel?: boolean
}>()
</script>

<template>
  <div class="w-full">
    <div v-if="props.showLabel" class="flex justify-between items-center mb-2">
      <span class="text-sm text-text-secondary">进度</span>
      <span class="text-sm font-bold gradient-text">{{ props.progress }}%</span>
    </div>
    <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :style="{
          width: `${props.progress}%`,
          background: 'linear-gradient(90deg, #c084fc, #fb7185, #34d399)',
        }"
      />
    </div>
  </div>
</template>

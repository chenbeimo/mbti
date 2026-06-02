<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  leftLabel: string
  rightLabel: string
  leftPercentage: number
  rightPercentage: number
  dominant: string
  color?: string
}>()

const animated = ref(false)

onMounted(() => {
  setTimeout(() => {
    animated.value = true
  }, 300)
})

const barColor = props.color || 'linear-gradient(90deg, #c084fc, #fb7185)'
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <span
        class="text-sm font-bold"
        :class="dominant === leftLabel ? 'text-primary-300' : 'text-text-muted'"
      >
        {{ leftLabel }}
      </span>
      <span class="text-xs text-text-muted">{{ leftPercentage }}% / {{ rightPercentage }}%</span>
      <span
        class="text-sm font-bold"
        :class="dominant === rightLabel ? 'text-primary-300' : 'text-text-muted'"
      >
        {{ rightLabel }}
      </span>
    </div>
    <div class="flex h-3 rounded-full overflow-hidden bg-white/10">
      <div
        class="transition-all duration-1000 ease-out rounded-l-full"
        :style="{
          width: animated ? `${leftPercentage}%` : '0%',
          background: barColor,
        }"
      />
      <div
        class="transition-all duration-1000 ease-out rounded-r-full"
        :style="{
          width: animated ? `${rightPercentage}%` : '0%',
          background: 'rgba(255, 255, 255, 0.15)',
        }"
      />
    </div>
  </div>
</template>

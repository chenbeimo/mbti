<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  data: { label: string; value: number }[]
  size?: number
}>()

const size = props.size || 280
const center = size / 2
const radius = (size / 2) * 0.75
const animated = ref(false)

onMounted(() => {
  setTimeout(() => {
    animated.value = true
  }, 500)
})

const points = computed(() => {
  const n = props.data.length
  return props.data.map((item, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    const r = animated.value ? (item.value / 100) * radius : 0
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 25) * Math.cos(angle),
      labelY: center + (radius + 25) * Math.sin(angle),
      label: item.label,
      value: item.value,
    }
  })
})

const polygonPath = computed(() => {
  return points.value.map((p) => `${p.x},${p.y}`).join(' ')
})

const gridLevels = [0.25, 0.5, 0.75, 1]

function getGridPolygon(level: number) {
  const n = props.data.length
  return Array.from({ length: n }, (_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    const r = level * radius
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
  }).join(' ')
}
</script>

<template>
  <div class="flex justify-center">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- 网格线 -->
      <polygon
        v-for="level in gridLevels"
        :key="level"
        :points="getGridPolygon(level)"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        stroke-width="1"
      />

      <!-- 轴线 -->
      <line
        v-for="(_, i) in points"
        :key="'axis-' + i"
        :x1="center"
        :y1="center"
        :x2="center + radius * Math.cos((Math.PI * 2 * i) / data.length - Math.PI / 2)"
        :y2="center + radius * Math.sin((Math.PI * 2 * i) / data.length - Math.PI / 2)"
        stroke="rgba(255,255,255,0.1)"
        stroke-width="1"
      />

      <!-- 数据区域 -->
      <polygon
        :points="polygonPath"
        fill="url(#radarGradient)"
        stroke="url(#radarStroke)"
        stroke-width="2"
        class="transition-all duration-1000 ease-out"
      />

      <!-- 数据点 -->
      <circle
        v-for="(point, i) in points"
        :key="'point-' + i"
        :cx="point.x"
        :cy="point.y"
        r="4"
        fill="#c084fc"
        stroke="white"
        stroke-width="2"
        class="transition-all duration-1000 ease-out"
      />

      <!-- 标签 -->
      <text
        v-for="(point, i) in points"
        :key="'label-' + i"
        :x="point.labelX"
        :y="point.labelY"
        text-anchor="middle"
        dominant-baseline="middle"
        class="fill-text-secondary text-xs font-medium"
      >
        {{ point.label }}
      </text>

      <!-- 渐变定义 -->
      <defs>
        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(192, 132, 252, 0.3)" />
          <stop offset="100%" stop-color="rgba(244, 63, 94, 0.3)" />
        </linearGradient>
        <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#fb7185" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

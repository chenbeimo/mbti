<script setup lang="ts">
import { ref } from 'vue'
import html2canvas from 'html2canvas'

const props = defineProps<{
  type: string
  nickname: string
  quote: string
  dimensions: {
    EI: { dominant: string; percentage: number }
    SN: { dominant: string; percentage: number }
    TF: { dominant: string; percentage: number }
    JP: { dominant: string; percentage: number }
  }
  hiddenTags: string[]
}>()

const posterRef = ref<HTMLElement | null>(null)
const isGenerating = ref(false)

async function generatePoster() {
  if (!posterRef.value) return

  isGenerating.value = true

  try {
    const canvas = await html2canvas(posterRef.value, {
      backgroundColor: '#1e1b4b',
      scale: 2,
      useCORS: true,
    })

    const link = document.createElement('a')
    link.download = `MBTI-${props.type}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (err) {
    console.error('Failed to generate poster:', err)
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div>
    <!-- 海报预览区域 -->
    <div
      ref="posterRef"
      class="w-[375px] mx-auto p-8 text-center"
      style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #6d28d9 100%); min-height: 667px;"
    >
      <!-- 标题 -->
      <div class="mb-8">
        <p class="text-sm text-text-secondary mb-2">我的 MBTI 人格是</p>
        <h1 class="text-5xl font-bold gradient-text mb-2">{{ props.type }}</h1>
        <p class="text-lg text-primary-300">{{ props.nickname }}</p>
      </div>

      <!-- 维度条 -->
      <div class="space-y-4 mb-8">
        <div v-for="(dim, key) in props.dimensions" :key="key" class="flex items-center gap-3">
          <span class="w-8 text-sm text-text-muted">{{ dim.dominant === (key as string).charAt(0) ? (key as string).charAt(0) : (key as string).charAt(1) }}</span>
          <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full"
              :style="{
                width: `${dim.percentage}%`,
                background: 'linear-gradient(90deg, #c084fc, #fb7185)',
              }"
            />
          </div>
          <span class="w-12 text-right text-sm text-text-muted">{{ dim.percentage }}%</span>
        </div>
      </div>

      <!-- 标签 -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <span
          v-for="tag in props.hiddenTags"
          :key="tag"
          class="px-3 py-1 text-xs rounded-full glass"
        >
          {{ tag }}
        </span>
      </div>

      <!-- 金句 -->
      <div class="glass rounded-2xl p-4 mb-8">
        <p class="text-sm text-text-secondary italic">"{{ props.quote }}"</p>
      </div>

      <!-- 底部引导 -->
      <div class="text-xs text-text-muted">
        <p>扫码测测你的 MBTI</p>
        <p class="mt-1 opacity-60">16 型人格，但加了点怪东西</p>
      </div>
    </div>

    <!-- 下载按钮 -->
    <button
      class="mt-6 w-full py-3 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-[1.02]"
      style="background: linear-gradient(135deg, #c084fc, #fb7185);"
      :disabled="isGenerating"
      @click="generatePoster"
    >
      {{ isGenerating ? '生成中...' : '📥 下载分享海报' }}
    </button>
  </div>
</template>

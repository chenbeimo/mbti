<script setup lang="ts">
import { ref, nextTick } from 'vue'
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
const posterImageUrl = ref<string | null>(null)

// 生成海报图片
async function generatePosterImage(): Promise<string | null> {
  if (!posterRef.value) return null

  // 临时显示海报用于截图
  posterRef.value.style.display = 'block'
  await nextTick()

  try {
    const canvas = await html2canvas(posterRef.value, {
      backgroundColor: '#1e1b4b',
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const dataUrl = canvas.toDataURL('image/png')
    posterImageUrl.value = dataUrl
    return dataUrl
  } catch (err) {
    console.error('Failed to generate poster:', err)
    return null
  } finally {
    posterRef.value.style.display = 'none'
  }
}

// 下载海报
async function handleDownload() {
  if (isGenerating.value) return
  isGenerating.value = true

  try {
    const dataUrl = posterImageUrl.value || await generatePosterImage()
    if (!dataUrl) return

    const link = document.createElement('a')
    link.download = `MBTI-${props.type}-${props.nickname}.png`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    isGenerating.value = false
  }
}

// Web Share API 原生分享
async function handleShare() {
  if (isGenerating.value) return
  isGenerating.value = true

  try {
    const dataUrl = posterImageUrl.value || await generatePosterImage()
    if (!dataUrl) return

    // 将 dataURL 转为 File 对象
    const blob = await (await fetch(dataUrl)).blob()
    const file = new File([blob], `MBTI-${props.type}.png`, { type: 'image/png' })

    // 检查是否支持 Web Share API + 文件分享
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: `我的MBTI是${props.type} - ${props.nickname}`,
        text: `测测你的灵魂出厂设置！我的MBTI是${props.type}（${props.nickname}），你呢？`,
        url: window.location.origin,
        files: [file],
      })
    } else if (navigator.share) {
      // 不支持文件分享，只分享链接和文字
      await navigator.share({
        title: `我的MBTI是${props.type} - ${props.nickname}`,
        text: `测测你的灵魂出厂设置！我的MBTI是${props.type}（${props.nickname}），你呢？\n\n"${props.quote}"`,
        url: window.location.origin,
      })
    } else {
      // 不支持 Web Share API，降级为下载
      await handleDownload()
    }
  } catch (err: any) {
    // 用户取消分享不算错误
    if (err.name !== 'AbortError') {
      console.error('Share failed:', err)
      // 降级为下载
      await handleDownload()
    }
  } finally {
    isGenerating.value = false
  }
}

// 复制链接
async function handleCopyLink() {
  try {
    await navigator.clipboard.writeText(
      `测测你的灵魂出厂设置！我的MBTI是${props.type}（${props.nickname}），你呢？ ${window.location.origin}`
    )
    alert('链接已复制到剪贴板！')
  } catch {
    // 降级方案
    const text = `测测你的灵魂出厂设置！我的MBTI是${props.type}（${props.nickname}），你呢？ ${window.location.origin}`
    const input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    alert('链接已复制到剪贴板！')
  }
}
</script>

<template>
  <div>
    <!-- 海报预览区域（隐藏，用于截图） -->
    <div
      ref="posterRef"
      class="poster-canvas"
      style="display: none; width: 375px; padding: 32px; text-align: center; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #6d28d9 100%); color: #f8fafc; font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;"
    >
      <!-- 标题 -->
      <div style="margin-bottom: 24px;">
        <p style="font-size: 14px; color: #94a3b8; margin-bottom: 8px;">我的 MBTI 人格是</p>
        <h1 style="font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #c084fc, #fb7185); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px;">{{ props.type }}</h1>
        <p style="font-size: 18px; color: #c084fc;">{{ props.nickname }}</p>
      </div>

      <!-- 维度条 -->
      <div style="margin-bottom: 24px;">
        <div v-for="(dim, key) in props.dimensions" :key="key" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <span style="width: 24px; font-size: 14px; color: #94a3b8; text-align: right;">{{ dim.dominant }}</span>
          <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
            <div :style="{ width: dim.percentage + '%', height: '100%', background: 'linear-gradient(90deg, #c084fc, #fb7185)', borderRadius: '4px' }" />
          </div>
          <span style="width: 40px; font-size: 14px; color: #94a3b8; text-align: right;">{{ dim.percentage }}%</span>
        </div>
      </div>

      <!-- 标签 -->
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 24px;">
        <span
          v-for="tag in props.hiddenTags"
          :key="tag"
          style="padding: 4px 12px; font-size: 12px; border-radius: 999px; background: rgba(255,255,255,0.1);"
        >
          {{ tag }}
        </span>
      </div>

      <!-- 金句 -->
      <div style="background: rgba(255,255,255,0.08); border-radius: 16px; padding: 16px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #cbd5e1; font-style: italic;">"{{ props.quote }}"</p>
      </div>

      <!-- 底部引导 -->
      <div style="font-size: 12px; color: #64748b;">
        <p>扫码测测你的 MBTI</p>
        <p style="margin-top: 4px; opacity: 0.6;">16 型人格，但加了点怪东西</p>
      </div>
    </div>

    <!-- 操作按钮组 -->
    <div class="space-y-3">
      <!-- 主要操作：分享 -->
      <button
        class="w-full py-3.5 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
        style="background: linear-gradient(135deg, #c084fc, #fb7185);"
        :disabled="isGenerating"
        @click="handleShare"
      >
        <span v-if="isGenerating" class="animate-spin">⏳</span>
        <span v-else>📤</span>
        <span>{{ isGenerating ? '生成中...' : '分享给好友' }}</span>
      </button>

      <!-- 次要操作 -->
      <div class="flex gap-3">
        <button
          class="flex-1 py-3 rounded-2xl font-medium glass text-text-secondary hover:text-text-primary transition-all duration-300 flex items-center justify-center gap-2"
          :disabled="isGenerating"
          @click="handleDownload"
        >
          <span>📥</span>
          <span>下载海报</span>
        </button>
        <button
          class="flex-1 py-3 rounded-2xl font-medium glass text-text-secondary hover:text-text-primary transition-all duration-300 flex items-center justify-center gap-2"
          @click="handleCopyLink"
        >
          <span>🔗</span>
          <span>复制链接</span>
        </button>
      </div>
    </div>
  </div>
</template>

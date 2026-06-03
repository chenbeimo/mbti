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

async function generatePosterImage(): Promise<string | null> {
  if (!posterRef.value) return null
  posterRef.value.style.display = 'block'
  await nextTick()

  try {
    const canvas = await html2canvas(posterRef.value, {
      backgroundColor: '#1e1b4b',
      scale: 2,
      useCORS: true,
      logging: false,
      width: 375,
      height: 667,
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

async function handleShare() {
  if (isGenerating.value) return
  isGenerating.value = true
  try {
    const dataUrl = posterImageUrl.value || await generatePosterImage()
    if (!dataUrl) return
    const blob = await (await fetch(dataUrl)).blob()
    const file = new File([blob], `MBTI-${props.type}.png`, { type: 'image/png' })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: `我的MBTI是${props.type} - ${props.nickname}`,
        text: `测测你的灵魂出厂设置！我的MBTI是${props.type}（${props.nickname}），你呢？`,
        url: window.location.origin,
        files: [file],
      })
    } else if (navigator.share) {
      await navigator.share({
        title: `我的MBTI是${props.type} - ${props.nickname}`,
        text: `测测你的灵魂出厂设置！我的MBTI是${props.type}（${props.nickname}），你呢？\n\n"${props.quote}"`,
        url: window.location.origin,
      })
    } else {
      await handleDownload()
    }
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      await handleDownload()
    }
  } finally {
    isGenerating.value = false
  }
}

async function handleCopyLink() {
  try {
    await navigator.clipboard.writeText(
      `测测你的灵魂出厂设置！我的MBTI是${props.type}（${props.nickname}），你呢？ ${window.location.origin}`
    )
    alert('链接已复制到剪贴板！')
  } catch {
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
    <!-- 海报画布（隐藏，用于截图） -->
    <div
      ref="posterRef"
      style="display:none; position:relative; width:375px; height:667px; overflow:hidden; background:linear-gradient(135deg,#1e1b4b 0%,#312e81 30%,#4c1d95 60%,#6d28d9 100%); font-family:'PingFang SC','Microsoft YaHei',sans-serif;"
    >
      <!-- 顶部小标题 -->
      <div style="position:absolute; top:40px; left:0; width:375px; text-align:center;">
        <span style="font-size:13px; color:#94a3b8; letter-spacing:2px;">我的 MBTI 人格是</span>
      </div>

      <!-- 类型大字 -->
      <div style="position:absolute; top:68px; left:0; width:375px; text-align:center;">
        <span style="font-size:52px; font-weight:800; background:linear-gradient(135deg,#c084fc,#fb7185); -webkit-background-clip:text; -webkit-text-fill-color:transparent; color:#c084fc;">{{ props.type }}</span>
      </div>

      <!-- 昵称 -->
      <div style="position:absolute; top:132px; left:0; width:375px; text-align:center;">
        <span style="font-size:16px; color:#c084fc;">{{ props.nickname }}</span>
      </div>

      <!-- 维度条区域 -->
      <div style="position:absolute; top:180px; left:40px; width:295px;">
        <!-- E/I -->
        <div style="margin-bottom:16px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
            <span style="font-size:13px; font-weight:700; color:#e2e8f0; width:20px; text-align:right;">{{ props.dimensions.EI.dominant }}</span>
            <span style="font-size:12px; color:#94a3b8;">{{ props.dimensions.EI.percentage }}%</span>
          </div>
          <div style="width:295px; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
            <div :style="{ width: props.dimensions.EI.percentage + '%', height:'8px', background:'#c084fc', borderRadius:'4px' }"></div>
          </div>
        </div>
        <!-- S/N -->
        <div style="margin-bottom:16px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
            <span style="font-size:13px; font-weight:700; color:#e2e8f0; width:20px; text-align:right;">{{ props.dimensions.SN.dominant }}</span>
            <span style="font-size:12px; color:#94a3b8;">{{ props.dimensions.SN.percentage }}%</span>
          </div>
          <div style="width:295px; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
            <div :style="{ width: props.dimensions.SN.percentage + '%', height:'8px', background:'#34d399', borderRadius:'4px' }"></div>
          </div>
        </div>
        <!-- T/F -->
        <div style="margin-bottom:16px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
            <span style="font-size:13px; font-weight:700; color:#e2e8f0; width:20px; text-align:right;">{{ props.dimensions.TF.dominant }}</span>
            <span style="font-size:12px; color:#94a3b8;">{{ props.dimensions.TF.percentage }}%</span>
          </div>
          <div style="width:295px; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
            <div :style="{ width: props.dimensions.TF.percentage + '%', height:'8px', background:'#60a5fa', borderRadius:'4px' }"></div>
          </div>
        </div>
        <!-- J/P -->
        <div style="margin-bottom:0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
            <span style="font-size:13px; font-weight:700; color:#e2e8f0; width:20px; text-align:right;">{{ props.dimensions.JP.dominant }}</span>
            <span style="font-size:12px; color:#94a3b8;">{{ props.dimensions.JP.percentage }}%</span>
          </div>
          <div style="width:295px; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
            <div :style="{ width: props.dimensions.JP.percentage + '%', height:'8px', background:'#fbbf24', borderRadius:'4px' }"></div>
          </div>
        </div>
      </div>

      <!-- 标签区域 -->
      <div style="position:absolute; top:370px; left:0; width:375px; text-align:center;">
        <span
          v-for="(tag, i) in props.hiddenTags"
          :key="tag"
          :style="{
            display:'inline-block',
            padding:'5px 14px',
            fontSize:'12px',
            color:'#e2e8f0',
            background:'rgba(255,255,255,0.1)',
            borderRadius:'20px',
            margin: i < props.hiddenTags.length - 1 ? '0 6px 0 0' : '0',
          }"
        >{{ tag }}</span>
      </div>

      <!-- 金句卡片 -->
      <div style="position:absolute; top:420px; left:40px; width:295px; background:rgba(255,255,255,0.08); border-radius:16px; padding:18px 16px;">
        <p style="margin:0; font-size:13px; color:#cbd5e1; font-style:italic; line-height:1.6; text-align:center;">"{{ props.quote }}"</p>
      </div>

      <!-- 底部引导文案 -->
      <div style="position:absolute; bottom:50px; left:0; width:375px; text-align:center;">
        <p style="margin:0 0 6px 0; font-size:13px; color:#94a3b8;">扫码测测你的 MBTI</p>
        <p style="margin:0; font-size:11px; color:#64748b;">16 型人格，但加了点怪东西</p>
      </div>
    </div>

    <!-- 操作按钮组 -->
    <div class="space-y-3">
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

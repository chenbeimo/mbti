<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import GlassCard from '../components/GlassCard.vue'

const router = useRouter()
const quizStore = useQuizStore()

// 如果没有结果，跳回首页
if (!quizStore.isLoading && !quizStore.isCompleted) {
  router.replace('/')
}

const currentMessage = ref('')
const progress = ref(0)

const messages = [
  '正在分析你的香菜耐受度...',
  '正在计算你的社交电量...',
  '正在连接异世界数据库...',
  '正在解码你的灵魂频率...',
  '正在比对 16 型人格数据库...',
  '正在生成你的专属报告...',
  '正在校准你的隐藏属性...',
  '即将完成，再等一下...',
]

onMounted(() => {
  let index = 0
  const interval = setInterval(() => {
    if (index < messages.length) {
      currentMessage.value = messages[index]
      progress.value = Math.min(((index + 1) / messages.length) * 100, 95)
      index++
    } else {
      clearInterval(interval)
    }
  }, 400)

  // 等待结果完成
  const checkResult = setInterval(() => {
    if (quizStore.isCompleted) {
      clearInterval(checkResult)
      clearInterval(interval)
      progress.value = 100
      currentMessage.value = '解析完成！'
      setTimeout(() => {
        router.replace('/result')
      }, 500)
    }
  }, 100)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <GlassCard class="max-w-md w-full text-center">
      <!-- 动画图标 -->
      <div class="mb-8">
        <div class="relative inline-block">
          <div
            class="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl"
            style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(244, 63, 94, 0.3));"
          >
            🔮
          </div>
          <!-- 扫描线效果 -->
          <div
            class="absolute inset-0 rounded-full overflow-hidden"
          >
            <div
              class="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-scan"
            />
          </div>
        </div>
      </div>

      <!-- 标题 -->
      <h2 class="text-2xl font-bold mb-2">
        <span class="gradient-text">灵魂解析中</span>
      </h2>
      <p class="text-text-secondary mb-8">正在连接异世界数据库...</p>

      <!-- 伪终端 -->
      <div class="glass rounded-xl p-4 mb-6 text-left font-mono text-sm">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-3 h-3 rounded-full bg-red-400" />
          <div class="w-3 h-3 rounded-full bg-yellow-400" />
          <div class="w-3 h-3 rounded-full bg-green-400" />
          <span class="text-text-muted text-xs ml-2">soul_analyzer.exe</span>
        </div>
        <div class="space-y-1 text-text-secondary">
          <p>> 初始化灵魂扫描仪...</p>
          <p>> 检测到 40 组思维模式数据</p>
          <p class="text-primary-300">> {{ currentMessage }}</p>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300 ease-out"
          :style="{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #c084fc, #fb7185, #34d399)',
          }"
        />
      </div>
      <p class="text-text-muted text-xs mt-2">{{ Math.round(progress) }}%</p>
    </GlassCard>
  </div>
</template>

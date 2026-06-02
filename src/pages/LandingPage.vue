<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import GlassCard from '../components/GlassCard.vue'
import AnimatedCharacter from '../components/AnimatedCharacter.vue'

const router = useRouter()
const quizStore = useQuizStore()

function handleStart() {
  quizStore.startQuiz()
  router.push('/quiz')
}

// 检查是否有未完成的进度
const hasProgress = quizStore.restoreProgress()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <GlassCard class="max-w-md w-full text-center">
      <!-- 动态角色 -->
      <div class="mb-8">
        <AnimatedCharacter />
      </div>

      <!-- 标题 -->
      <h1 class="text-3xl md:text-4xl font-bold mb-3">
        <span class="gradient-text">测测你的灵魂出厂设置</span>
      </h1>
      <p class="text-text-secondary mb-8 text-lg">
        16 型人格，但加了点怪东西
      </p>

      <!-- 特色说明 -->
      <div class="grid grid-cols-2 gap-3 mb-8 text-sm">
        <div class="glass rounded-xl p-3">
          <div class="text-2xl mb-1">📋</div>
          <div class="text-text-primary font-medium">40 道题</div>
          <div class="text-text-muted text-xs">经典 + 猎奇</div>
        </div>
        <div class="glass rounded-xl p-3">
          <div class="text-2xl mb-1">🎯</div>
          <div class="text-text-primary font-medium">多维报告</div>
          <div class="text-text-muted text-xs">恋爱 / 职场 / 八维</div>
        </div>
        <div class="glass rounded-xl p-3">
          <div class="text-2xl mb-1">🖼️</div>
          <div class="text-text-primary font-medium">分享海报</div>
          <div class="text-text-muted text-xs">一键生成</div>
        </div>
        <div class="glass rounded-xl p-3">
          <div class="text-2xl mb-1">💕</div>
          <div class="text-text-primary font-medium">好友匹配</div>
          <div class="text-text-muted text-xs">查看契合度</div>
        </div>
      </div>

      <!-- 开始按钮 -->
      <button
        class="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-[1.02] animate-pulse-glow"
        style="background: linear-gradient(135deg, #c084fc, #fb7185);"
        @click="handleStart"
      >
        {{ hasProgress ? '继续上次测试' : '✨ 开始测试' }}
      </button>

      <!-- 预计时间 -->
      <p class="text-text-muted text-xs mt-4">
        预计用时 5-8 分钟 · 答题进度自动保存
      </p>
    </GlassCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import GlassCard from '../components/GlassCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import QuestionCard from '../components/QuestionCard.vue'

const router = useRouter()
const quizStore = useQuizStore()

// 如果没有开始测试，跳回首页
if (!quizStore.isStarted) {
  router.replace('/')
}

const currentQuestion = computed(() => quizStore.currentQuestionData)
const selectedAnswer = computed(() => {
  if (!currentQuestion.value) return undefined
  return quizStore.answers[currentQuestion.value.id]
})

function handleSelect(index: number) {
  if (!currentQuestion.value) return

  // answerQuestion 返回 true 表示所有题目都答完了
  const isFinished = quizStore.answerQuestion(currentQuestion.value.id, index)

  if (isFinished) {
    // 所有题目答完，跳转到加载页
    handleFinish()
  }
}

function handleBack() {
  quizStore.goBack()
}

function handleFinish() {
  quizStore.completeQuiz()
  router.push('/loading')
}
</script>

<template>
  <div class="min-h-screen flex flex-col p-4">
    <!-- 顶部导航 -->
    <div class="flex items-center justify-between mb-6">
      <button
        v-if="quizStore.canGoBack"
        class="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        @click="handleBack"
      >
        <span>←</span>
        <span class="text-sm">上一题</span>
      </button>
      <div v-else />

      <div class="text-sm text-text-muted">
        {{ quizStore.currentQuestion + 1 }} / {{ quizStore.totalQuestions }}
      </div>
    </div>

    <!-- 进度条 -->
    <ProgressBar :progress="quizStore.progress" class="mb-8" />

    <!-- 题目卡片 -->
    <div class="flex-1 flex items-center justify-center">
      <GlassCard v-if="currentQuestion" class="max-w-lg w-full">
        <QuestionCard
          :question="currentQuestion"
          :selected-index="selectedAnswer"
          @select="handleSelect"
        />
      </GlassCard>
    </div>

    <!-- 底部提示 -->
    <div class="text-center mt-6">
      <p class="text-text-muted text-xs">
        {{ currentQuestion?.type === 'quirky' ? '🧠 这是一道脑洞题，选择最符合你的选项' : '选择最符合你的选项' }}
      </p>
    </div>
  </div>
</template>

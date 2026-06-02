<script setup lang="ts">
import { computed, onMounted } from 'vue'
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

// 注册完成回调：答完所有题后自动跳转加载页
onMounted(() => {
  quizStore.setOnFinish(() => {
    router.push('/loading')
  })
})

const currentQuestion = computed(() => quizStore.currentQuestionData)
const selectedAnswer = computed(() => {
  if (!currentQuestion.value) return undefined
  return quizStore.answers[currentQuestion.value.id]
})

// 判断最后一题是否已作答
const isLastQuestionAnswered = computed(() => {
  if (!currentQuestion.value) return false
  return quizStore.answers[currentQuestion.value.id] !== undefined
})

function handleSelect(index: number) {
  if (!currentQuestion.value) return
  quizStore.answerQuestion(currentQuestion.value.id, index)
}

function handleBack() {
  quizStore.goBack()
}

// 手动完成（保底按钮）
function handleManualFinish() {
  quizStore.completeQuiz()
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

        <!-- 最后一题：显示完成按钮 -->
        <div v-if="quizStore.isLastQuestion && isLastQuestionAnswered" class="mt-6">
          <button
            class="w-full py-3 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-[1.02]"
            style="background: linear-gradient(135deg, #c084fc, #fb7185);"
            :disabled="quizStore.isLoading"
            @click="handleManualFinish"
          >
            {{ quizStore.isLoading ? '计算中...' : '✨ 完成测试，查看结果' }}
          </button>
        </div>
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

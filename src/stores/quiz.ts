import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { questions } from '../data/questions'
import { calculateResult, type QuizResult } from '../utils/scoring'
import { saveQuizProgress, loadQuizProgress, clearQuizProgress } from '../utils/storage'

export const useQuizStore = defineStore('quiz', () => {
  // 状态
  const currentQuestion = ref(0)
  const answers = ref<Record<number, number>>({})
  const result = ref<QuizResult | null>(null)
  const isStarted = ref(false)
  const isCompleted = ref(false)
  const isLoading = ref(false)

  // 计算属性
  const progress = computed(() => {
    const answered = Object.keys(answers.value).length
    return Math.round((answered / questions.length) * 100)
  })

  const currentQuestionData = computed(() => {
    // 确保索引不越界
    const index = Math.min(currentQuestion.value, questions.length - 1)
    return questions[index] || null
  })

  const totalQuestions = computed(() => questions.length)

  const answeredCount = computed(() => Object.keys(answers.value).length)

  const canGoBack = computed(() => currentQuestion.value > 0)

  const isLastQuestion = computed(() => currentQuestion.value === questions.length - 1)

  const isAllAnswered = computed(() => answeredCount.value >= questions.length)

  // 动作
  function startQuiz() {
    isStarted.value = true
    currentQuestion.value = 0
    answers.value = {}
    result.value = null
    isCompleted.value = false
    isLoading.value = false
    saveProgress()
  }

  function answerQuestion(questionId: number, optionIndex: number) {
    // 防止重复提交
    if (isLoading.value || isCompleted.value) return

    answers.value[questionId] = optionIndex
    saveProgress()

    // 判断是否所有题目都答完了
    if (isAllAnswered.value) {
      // 所有题目答完，不再跳转下一题，直接返回 true 表示完成
      return true
    }

    // 还有题目没答完，跳转下一题
    if (currentQuestion.value < questions.length - 1) {
      setTimeout(() => {
        currentQuestion.value++
      }, 300)
    }

    return false
  }

  function goToQuestion(index: number) {
    if (index >= 0 && index < questions.length) {
      currentQuestion.value = index
    }
  }

  function goBack() {
    if (canGoBack.value) {
      currentQuestion.value--
    }
  }

  function completeQuiz() {
    if (isLoading.value || isCompleted.value) return

    isLoading.value = true

    // 模拟计算延迟，增加仪式感
    setTimeout(() => {
      result.value = calculateResult(answers.value)
      isCompleted.value = true
      isLoading.value = false
      saveProgress()
    }, 3500)
  }

  function resetQuiz() {
    currentQuestion.value = 0
    answers.value = {}
    result.value = null
    isStarted.value = false
    isCompleted.value = false
    isLoading.value = false
    clearQuizProgress()
  }

  function saveProgress() {
    saveQuizProgress({
      answers: answers.value,
      currentQuestion: Math.min(currentQuestion.value, questions.length - 1),
      result: result.value,
    })
  }

  function restoreProgress() {
    const saved = loadQuizProgress()
    if (saved) {
      answers.value = saved.answers
      // 确保恢复的索引不越界
      currentQuestion.value = Math.min(saved.currentQuestion, questions.length - 1)
      result.value = saved.result
      isStarted.value = Object.keys(saved.answers).length > 0
      isCompleted.value = saved.result !== null
      return true
    }
    return false
  }

  return {
    // 状态
    currentQuestion,
    answers,
    result,
    isStarted,
    isCompleted,
    isLoading,

    // 计算属性
    progress,
    currentQuestionData,
    totalQuestions,
    answeredCount,
    canGoBack,
    isLastQuestion,
    isAllAnswered,

    // 动作
    startQuiz,
    answerQuestion,
    goToQuestion,
    goBack,
    completeQuiz,
    resetQuiz,
    restoreProgress,
  }
})

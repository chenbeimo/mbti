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
    return questions[currentQuestion.value] || null
  })

  const totalQuestions = computed(() => questions.length)

  const answeredCount = computed(() => Object.keys(answers.value).length)

  const canGoBack = computed(() => currentQuestion.value > 0)

  const isLastQuestion = computed(() => currentQuestion.value === questions.length - 1)

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
    answers.value[questionId] = optionIndex
    saveProgress()

    // 自动跳转下一题
    if (currentQuestion.value < questions.length - 1) {
      setTimeout(() => {
        currentQuestion.value++
      }, 300)
    }
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
      currentQuestion: currentQuestion.value,
      result: result.value,
    })
  }

  function restoreProgress() {
    const saved = loadQuizProgress()
    if (saved) {
      answers.value = saved.answers
      currentQuestion.value = saved.currentQuestion
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

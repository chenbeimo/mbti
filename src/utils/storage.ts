import { safeJsonParse } from './sanitize'

const STORAGE_KEY = 'mbti_quiz_data'

interface StorageData {
  answers: Record<number, number>
  currentQuestion: number
  result: any | null
  timestamp: number
}

/**
 * 验证从 LocalStorage 恢复的数据是否合法
 */
function validateStorageData(data: any): data is StorageData {
  if (!data || typeof data !== 'object') return false

  // 验证 timestamp
  if (typeof data.timestamp !== 'number' || data.timestamp <= 0) return false

  // 验证 answers
  if (!data.answers || typeof data.answers !== 'object') return false
  for (const [key, value] of Object.entries(data.answers)) {
    const questionId = Number(key)
    const optionIndex = value as number
    // questionId 必须是 1-40 的整数
    if (!Number.isInteger(questionId) || questionId < 1 || questionId > 40) return false
    // optionIndex 必须是 0-3 的整数
    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex > 3) return false
  }

  // 验证 currentQuestion
  if (typeof data.currentQuestion !== 'number') return false
  if (data.currentQuestion < 0 || data.currentQuestion >= 40) return false

  // result 可以是 null 或对象
  if (data.result !== null && typeof data.result !== 'object') return false

  return true
}

export function saveQuizProgress(data: Omit<StorageData, 'timestamp'>): void {
  try {
    const saveData: StorageData = {
      ...data,
      timestamp: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData))
  } catch (e) {
    console.warn('Failed to save quiz progress:', e)
  }
}

export function loadQuizProgress(): StorageData | null {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY)
    if (!rawData) return null

    const parsed = safeJsonParse<StorageData | null>(rawData, null)
    if (!parsed) {
      clearQuizProgress()
      return null
    }

    // 验证数据结构
    if (!validateStorageData(parsed)) {
      clearQuizProgress()
      return null
    }

    // 检查是否过期（7天）
    const daysSinceSave = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24)
    if (daysSinceSave > 7) {
      clearQuizProgress()
      return null
    }

    return parsed
  } catch (e) {
    console.warn('Failed to load quiz progress:', e)
    clearQuizProgress()
    return null
  }
}

export function clearQuizProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('Failed to clear quiz progress:', e)
  }
}

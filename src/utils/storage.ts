const STORAGE_KEY = 'mbti_quiz_data'

interface StorageData {
  answers: Record<number, number>
  currentQuestion: number
  result: any | null
  timestamp: number
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
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null

    const parsed = JSON.parse(data) as StorageData

    // 检查是否过期（7天）
    const daysSinceSave = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24)
    if (daysSinceSave > 7) {
      clearQuizProgress()
      return null
    }

    return parsed
  } catch (e) {
    console.warn('Failed to load quiz progress:', e)
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

import { questions } from '../data/questions'

export interface QuizResult {
  type: string
  percentages: {
    E: number
    I: number
    S: number
    N: number
    T: number
    F: number
    J: number
    P: number
  }
  dimensions: {
    EI: { left: 'E'; right: 'I'; leftScore: number; rightScore: number; dominant: string; percentage: number }
    SN: { left: 'S'; right: 'N'; leftScore: number; rightScore: number; dominant: string; percentage: number }
    TF: { left: 'T'; right: 'F'; leftScore: number; rightScore: number; dominant: string; percentage: number }
    JP: { left: 'J'; right: 'P'; leftScore: number; rightScore: number; dominant: string; percentage: number }
  }
  hidden: {
    O: number // 纠结
    A: number // 果断
    C: number // 高冷
    H: number // 温暖
  }
  hiddenTags: string[]
  quirkyTags: string[]
}

export function calculateResult(answers: Record<number, number>): QuizResult {
  // 初始化分数
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  const hidden = { O: 0, A: 0, C: 0, H: 0 }
  const quirkyTags: string[] = []

  // 累加分数
  for (const question of questions) {
    const answerIndex = answers[question.id]
    if (answerIndex === undefined) continue

    const option = question.options[answerIndex]
    if (!option) continue

    // 累加维度分数
    for (const [key, value] of Object.entries(option.scores)) {
      scores[key as keyof typeof scores] += value
    }

    // 累加隐藏属性分数
    if (option.hiddenScores) {
      for (const [key, value] of Object.entries(option.hiddenScores)) {
        hidden[key as keyof typeof hidden] += value
      }
    }

    // 收集猎奇题标签
    if (question.type === 'quirky' && question.tag) {
      quirkyTags.push(question.tag)
    }
  }

  // 计算各维度百分比
  const calcPercentage = (a: number, b: number) => {
    const total = a + b
    return total === 0 ? 50 : Math.round((a / total) * 100)
  }

  const eiPercentage = calcPercentage(scores.E, scores.I)
  const snPercentage = calcPercentage(scores.S, scores.N)
  const tfPercentage = calcPercentage(scores.T, scores.F)
  const jpPercentage = calcPercentage(scores.J, scores.P)

  // 决定4字母类型
  const type = [
    eiPercentage >= 50 ? 'E' : 'I',
    snPercentage >= 50 ? 'S' : 'N',
    tfPercentage >= 50 ? 'T' : 'F',
    jpPercentage >= 50 ? 'J' : 'P',
  ].join('')

  // 计算隐藏属性百分比
  const hiddenTotal_OA = hidden.O + hidden.A
  const hiddenTotal_CH = hidden.C + hidden.H

  const hiddenTags: string[] = []
  hiddenTags.push(hiddenTotal_OA === 0 ? '中立' : hidden.O > hidden.A ? '纠结' : '果断')
  hiddenTags.push(hiddenTotal_CH === 0 ? '中立' : hidden.C > hidden.H ? '高冷' : '温暖')

  return {
    type,
    percentages: {
      E: eiPercentage,
      I: 100 - eiPercentage,
      S: snPercentage,
      N: 100 - snPercentage,
      T: tfPercentage,
      F: 100 - tfPercentage,
      J: jpPercentage,
      P: 100 - jpPercentage,
    },
    dimensions: {
      EI: {
        left: 'E',
        right: 'I',
        leftScore: scores.E,
        rightScore: scores.I,
        dominant: eiPercentage >= 50 ? 'E' : 'I',
        percentage: eiPercentage >= 50 ? eiPercentage : 100 - eiPercentage,
      },
      SN: {
        left: 'S',
        right: 'N',
        leftScore: scores.S,
        rightScore: scores.N,
        dominant: snPercentage >= 50 ? 'S' : 'N',
        percentage: snPercentage >= 50 ? snPercentage : 100 - snPercentage,
      },
      TF: {
        left: 'T',
        right: 'F',
        leftScore: scores.T,
        rightScore: scores.F,
        dominant: tfPercentage >= 50 ? 'T' : 'F',
        percentage: tfPercentage >= 50 ? tfPercentage : 100 - tfPercentage,
      },
      JP: {
        left: 'J',
        right: 'P',
        leftScore: scores.J,
        rightScore: scores.P,
        dominant: jpPercentage >= 50 ? 'J' : 'P',
        percentage: jpPercentage >= 50 ? jpPercentage : 100 - jpPercentage,
      },
    },
    hidden,
    hiddenTags,
    quirkyTags: [...new Set(quirkyTags)], // 去重
  }
}

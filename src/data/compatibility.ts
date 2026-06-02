export interface CompatibilityResult {
  score: number
  label: string
  description: string
  emoji: string
}

// 契合度矩阵（简化版，基于 MBTI 理论）
const compatibilityMatrix: Record<string, Record<string, number>> = {
  // NT 理性组
  INTJ: { ENFP: 95, ENTP: 90, INTP: 85, ENTJ: 80, INFJ: 75, INFP: 70, ENFJ: 65, INTJ: 60, ISTP: 55, ESTP: 50, ISFP: 45, ESFP: 40, ISTJ: 50, ISFJ: 45, ESTJ: 45, ESFJ: 40 },
  INTP: { ENTJ: 95, ENFJ: 85, ENFP: 80, INTJ: 85, ENTP: 90, INFJ: 75, INFP: 70, INTP: 60, ESTP: 55, ISTP: 65, ESFP: 45, ISFP: 50, ESTJ: 50, ISTJ: 55, ESFJ: 40, ISFJ: 45 },
  ENTJ: { INTP: 95, INFP: 80, INTJ: 80, ENTP: 85, INFJ: 75, ENFP: 85, ENFJ: 70, ENTJ: 60, ISTP: 60, ESTP: 55, ISFP: 50, ESFP: 45, ISTJ: 55, ISFJ: 50, ESTJ: 65, ESFJ: 45 },
  ENTP: { INFJ: 95, INTJ: 90, INTP: 90, ENFP: 80, ENFJ: 75, ENTJ: 85, INFP: 75, ENTP: 60, ISTP: 60, ESTP: 55, ISFP: 50, ESFP: 45, ISTJ: 50, ISFJ: 45, ESTJ: 50, ESFJ: 40 },

  // NF 理想组
  INFJ: { ENTP: 95, ENFP: 90, INTJ: 75, INFP: 85, ENFJ: 80, INFJ: 70, INTP: 75, ENTJ: 75, ISFP: 60, ESFP: 50, ISTP: 55, ESTP: 45, ISFJ: 60, ISTJ: 50, ESFJ: 55, ESTJ: 45 },
  INFP: { ENFJ: 95, INFJ: 85, ENFP: 80, ENTJ: 80, INTP: 70, INTJ: 70, ENTP: 75, INFP: 60, ISFP: 65, ESFP: 55, ISTP: 50, ESTP: 45, ISFJ: 60, ISTJ: 50, ESFJ: 55, ESTJ: 45 },
  ENFJ: { INFP: 95, INFJ: 80, ENFP: 85, ISFP: 80, INTJ: 65, INTP: 85, ENTJ: 70, ENFJ: 60, ESFP: 60, ISTP: 50, ESTP: 45, ISFJ: 65, ISTJ: 50, ESFJ: 65, ESTJ: 50 },
  ENFP: { INTJ: 95, INFJ: 90, ENFJ: 85, INTP: 80, ENTJ: 85, INFP: 80, ENTP: 80, ENFP: 60, ISFP: 65, ESFP: 60, ISTP: 55, ESTP: 50, ISFJ: 55, ISTJ: 50, ESFJ: 50, ESTJ: 45 },

  // ST 实用组
  ISTJ: { ESFP: 85, ESTP: 80, ISFP: 75, ISTP: 70, ESTJ: 60, ISTJ: 55, ISFJ: 60, ESFJ: 55, ENFP: 50, INFP: 50, ENTP: 50, INTP: 55, ENFJ: 50, INFJ: 50, ENTJ: 55, INTJ: 50 },
  ISFJ: { ESFP: 85, ESTP: 80, ISFP: 80, ISTP: 70, ESTJ: 60, ISTJ: 60, ISFJ: 55, ESFJ: 60, ENFP: 55, INFP: 60, ENTP: 45, INTP: 45, ENFJ: 65, INFJ: 60, ENTJ: 50, INTJ: 45 },
  ESTJ: { ISTP: 85, ISFP: 75, ISTJ: 60, ISFJ: 60, ESTJ: 55, ESFJ: 60, INTJ: 55, INTP: 50, ENTJ: 65, ENTP: 50, INFJ: 45, INFP: 45, ENFJ: 50, ENFP: 45, ESFP: 60, ESTP: 65 },
  ESFJ: { ISFP: 85, ISTP: 75, ISFJ: 60, ISTJ: 55, ESFJ: 55, ESTJ: 60, INFP: 55, INFJ: 60, ENFP: 50, ENFJ: 65, INTJ: 40, INTP: 40, ENTJ: 45, ENTP: 40, ESFP: 65, ESTP: 60 },

  // SP 体验组
  ISTP: { ESTJ: 85, ESFJ: 75, ISTJ: 70, ISFJ: 70, ISTP: 55, ESTP: 65, ISFP: 60, ESFP: 60, INTJ: 55, INTP: 65, ENTJ: 60, ENTP: 60, INFJ: 55, INFP: 50, ENFJ: 50, ENFP: 55 },
  ISFP: { ESTJ: 75, ESFJ: 85, ISTJ: 75, ISFJ: 80, ISFP: 55, ESTP: 65, ISTP: 60, ESFP: 70, INTJ: 45, INTP: 50, ENTJ: 50, ENTP: 50, INFJ: 60, INFP: 65, ENFJ: 80, ENFP: 65 },
  ESTP: { ISTJ: 80, ISFJ: 80, ESTJ: 65, ESFJ: 60, ESTP: 55, ISTP: 65, ISFP: 65, ESFP: 70, INTJ: 50, INTP: 55, ENTJ: 55, ENTP: 55, INFJ: 45, INFP: 45, ENFJ: 45, ENFP: 50 },
  ESFP: { ISTJ: 85, ISFJ: 85, ESTJ: 60, ESFJ: 65, ESFP: 55, ESTP: 70, ISFP: 70, ISTP: 60, INTJ: 40, INTP: 45, ENTJ: 45, ENTP: 45, INFJ: 50, INFP: 55, ENFJ: 60, ENFP: 60 },
}

export function getCompatibility(type1: string, type2: string): CompatibilityResult {
  const score = compatibilityMatrix[type1]?.[type2] ?? 50

  if (score >= 90) {
    return {
      score,
      label: '天作之合',
      description: '你们是灵魂伴侣级别的契合！彼此互补，相互成就，在一起会产生奇妙的化学反应。',
      emoji: '💕',
    }
  } else if (score >= 80) {
    return {
      score,
      label: '高度契合',
      description: '你们有着很高的契合度，能够理解彼此的需求，在一起很舒适自然。',
      emoji: '💖',
    }
  } else if (score >= 70) {
    return {
      score,
      label: '不错的选择',
      description: '你们有一定的互补性，在一起可以互相学习成长，需要一些磨合。',
      emoji: '💗',
    }
  } else if (score >= 60) {
    return {
      score,
      label: '有挑战但有趣',
      description: '你们有很多不同点，但正是这些不同让关系充满新鲜感和挑战。',
      emoji: '💝',
    }
  } else if (score >= 50) {
    return {
      score,
      label: '需要努力',
      description: '你们的差异较大，需要更多的理解和包容，但努力过后会有不一样的收获。',
      emoji: '💞',
    }
  } else {
    return {
      score,
      label: '相爱相杀',
      description: '你们是典型的"互相折磨"组合，但谁知道呢，也许这就是爱情的魔力？',
      emoji: '💘',
    }
  }
}

// 获取所有 MBTI 类型
export const allTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

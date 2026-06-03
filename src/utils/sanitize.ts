/**
 * XSS 防护工具
 * 对所有用户输入和动态内容进行转义
 */

// HTML 实体映射
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
}

/**
 * 转义 HTML 特殊字符，防止 XSS
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'`/]/g, (char) => HTML_ESCAPE_MAP[char] || char)
}

/**
 * 清理用户输入，移除潜在危险字符
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // 移除 HTML 标签
    .replace(/javascript:/gi, '') // 移除 javascript: 协议
    .replace(/on\w+=/gi, '') // 移除事件处理器
    .replace(/expression\(/gi, '') // 移除 CSS expression
    .replace(/url\(/gi, '') // 移除 CSS url()
    .trim()
    .slice(0, 500) // 限制长度
}

/**
 * 验证 MBTI 类型是否合法
 */
export function isValidMBTIType(type: string): boolean {
  const validTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
  ]
  return validTypes.includes(type.toUpperCase())
}

/**
 * 安全地获取 URL 参数
 */
export function getSafeQueryParam(key: string): string | null {
  try {
    const url = new URL(window.location.href)
    const value = url.searchParams.get(key)
    if (!value) return null
    return sanitizeInput(value)
  } catch {
    return null
  }
}

/**
 * 防止 JSON 注入
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    const parsed = JSON.parse(str)
    // 只允许对象和数组，不允许函数等
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as T
    }
    return fallback
  } catch {
    return fallback
  }
}

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: string
  size?: number
}>()

const size = computed(() => props.size || 160)

// 16 种 MBTI 类型 → 13 张图片映射
// 13 张图片，16 种类型，部分复用
const typeImageMap: Record<string, number> = {
  INTJ: 1,   // 冷酷战略家
  INTP: 2,   // 沉默思想家
  ENTJ: 3,   // 霸气指挥官
  ENTP: 4,   // 辩论冠军
  INFJ: 5,   // 神秘理想者
  INFP: 6,   // 温柔诗人
  ENFJ: 7,   // 魅力领袖
  ENFP: 8,   // 热情追梦人
  ISTJ: 9,   // 严谨管家
  ISFJ: 10,  // 温暖守护者
  ESTJ: 11,  // 天生管理者
  ESFJ: 12,  // 贴心大家长
  ISTP: 13,  // 冷静工匠
  ISFP: 6,   // 温柔艺术家（复用 INFP）
  ESTP: 4,   // 行动派冒险家（复用 ENTP）
  ESFP: 8,   // 快乐小太阳（复用 ENFP）
}

const imageIndex = computed(() => typeImageMap[props.type] || 1)
const imageSrc = computed(() => `/images/char-${String(imageIndex.value).padStart(2, '0')}.png`)
</script>

<template>
  <div class="type-character" :style="{ width: size + 'px', height: size + 'px' }">
    <div class="avatar-frame">
      <img
        :src="imageSrc"
        :alt="`${type} 角色立绘`"
        class="avatar-image"
        loading="lazy"
      />
      <!-- 边框光效 -->
      <div class="frame-glow"></div>
    </div>
    <!-- 底部类型标签 -->
    <div class="type-badge">
      <span>{{ type }}</span>
    </div>
  </div>
</template>

<style scoped>
.type-character {
  position: relative;
  display: inline-block;
  margin: 0 auto;
}

.avatar-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(192, 132, 252, 0.5);
  box-shadow:
    0 0 20px rgba(192, 132, 252, 0.25),
    0 0 40px rgba(244, 63, 94, 0.1),
    inset 0 0 20px rgba(0, 0, 0, 0.2);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.frame-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.3), rgba(244, 63, 94, 0.3)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: glow-rotate 4s linear infinite;
}

@keyframes glow-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.type-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #c084fc, #fb7185);
  padding: 4px 14px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(192, 132, 252, 0.3);
}

.type-badge span {
  font-size: 12px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}
</style>

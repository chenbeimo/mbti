<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 封面页会眨眼的卡通角色
const isBlinking = ref(false)
let blinkTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // 每 3-5 秒随机眨眼一次
  const startBlinking = () => {
    const delay = 3000 + Math.random() * 2000
    blinkTimer = setTimeout(() => {
      isBlinking.value = true
      setTimeout(() => {
        isBlinking.value = false
        startBlinking()
      }, 200)
    }, delay)
  }
  startBlinking()
})

onUnmounted(() => {
  if (blinkTimer) clearTimeout(blinkTimer)
})
</script>

<template>
  <div class="character-wrapper">
    <div class="character-container animate-float">
      <!-- 角色图片 -->
      <img
        src="/images/char-01.png"
        alt="MBTI 角色"
        class="character-image"
        :class="{ blinking: isBlinking }"
      />
      <!-- 眨眼遮罩层 -->
      <div class="blink-overlay" :class="{ active: isBlinking }">
        <div class="eyelid top"></div>
        <div class="eyelid bottom"></div>
      </div>
    </div>
    <!-- 底部光晕 -->
    <div class="glow-ring"></div>
  </div>
</template>

<style scoped>
.character-wrapper {
  position: relative;
  display: inline-block;
}

.character-container {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(192, 132, 252, 0.4);
  box-shadow:
    0 0 30px rgba(192, 132, 252, 0.3),
    0 0 60px rgba(244, 63, 94, 0.15);
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.1s ease;
}

.character-image.blinking {
  filter: brightness(0.95);
}

/* 眨眼遮罩 */
.blink-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.eyelid {
  position: absolute;
  left: 0;
  right: 0;
  height: 0%;
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  transition: height 0.1s ease-in-out;
}

.eyelid.top {
  top: 0;
}

.eyelid.bottom {
  bottom: 0;
}

.blink-overlay.active .eyelid {
  height: 50%;
}

/* 底部光晕 */
.glow-ring {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background: radial-gradient(ellipse, rgba(192, 132, 252, 0.3), transparent 70%);
  border-radius: 50%;
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%, 100% {
    opacity: 0.5;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 0.8;
    transform: translateX(-50%) scaleX(1.1);
  }
}
</style>

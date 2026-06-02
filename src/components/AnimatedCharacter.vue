<script setup lang="ts">
// 封面页会眨眼的卡通角色
</script>

<template>
  <div class="character-container">
    <svg viewBox="0 0 200 200" class="w-40 h-40 mx-auto animate-float">
      <!-- 身体 -->
      <ellipse cx="100" cy="160" rx="45" ry="35" fill="url(#bodyGrad)" />

      <!-- 头部 -->
      <circle cx="100" cy="90" r="50" fill="url(#headGrad)" />

      <!-- 头发 -->
      <path d="M50 80 Q55 30 100 25 Q145 30 150 80 Q145 55 100 50 Q55 55 50 80" fill="url(#hairGrad)" />
      <path d="M55 75 Q60 45 100 40 Q140 45 145 75" fill="url(#hairHighlight)" opacity="0.5" />

      <!-- 刘海 -->
      <path d="M65 70 Q70 50 85 55 Q75 60 70 70" fill="url(#hairGrad)" />
      <path d="M135 70 Q130 50 115 55 Q125 60 130 70" fill="url(#hairGrad)" />

      <!-- 眼睛 -->
      <g class="eyes">
        <!-- 左眼 -->
        <g class="left-eye">
          <ellipse cx="80" cy="90" rx="12" ry="14" fill="white" />
          <ellipse cx="82" cy="92" rx="7" ry="8" fill="#4c1d95" class="pupil" />
          <ellipse cx="84" cy="88" rx="3" ry="3" fill="white" opacity="0.8" />
          <!-- 眨眼遮罩 -->
          <ellipse cx="80" cy="90" rx="13" ry="0" fill="url(#headGrad)" class="eyelid" />
        </g>

        <!-- 右眼 -->
        <g class="right-eye">
          <ellipse cx="120" cy="90" rx="12" ry="14" fill="white" />
          <ellipse cx="122" cy="92" rx="7" ry="8" fill="#4c1d95" class="pupil" />
          <ellipse cx="124" cy="88" rx="3" ry="3" fill="white" opacity="0.8" />
          <!-- 眨眼遮罩 -->
          <ellipse cx="120" cy="90" rx="13" ry="0" fill="url(#headGrad)" class="eyelid" />
        </g>
      </g>

      <!-- 腮红 -->
      <ellipse cx="68" cy="105" rx="10" ry="6" fill="#fda4af" opacity="0.4" />
      <ellipse cx="132" cy="105" rx="10" ry="6" fill="#fda4af" opacity="0.4" />

      <!-- 嘴巴 -->
      <path d="M92 110 Q100 118 108 110" stroke="#e879a0" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <!-- 星星装饰 -->
      <g class="sparkle sparkle-1">
        <path d="M45 45 L47 40 L49 45 L54 43 L49 45 L47 50 L45 45 L40 43 Z" fill="#fbbf24" />
      </g>
      <g class="sparkle sparkle-2">
        <path d="M155 50 L157 45 L159 50 L164 48 L159 50 L157 55 L155 50 L150 48 Z" fill="#c084fc" />
      </g>
      <g class="sparkle sparkle-3">
        <path d="M40 120 L42 115 L44 120 L49 118 L44 120 L42 125 L40 120 L35 118 Z" fill="#34d399" />
      </g>

      <!-- 渐变定义 -->
      <defs>
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde68a" />
          <stop offset="100%" stop-color="#fbbf24" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7c3aed" />
          <stop offset="100%" stop-color="#6d28d9" />
        </linearGradient>
        <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a78bfa" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
@keyframes blink {
  0%, 45%, 55%, 100% {
    ry: 0;
  }
  50% {
    ry: 14;
  }
}

@keyframes sparkle-rotate {
  0%, 100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 0.6;
  }
}

@keyframes sparkle-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.eyelid {
  animation: blink 4s ease-in-out infinite;
}

.left-eye .eyelid {
  animation-delay: 0s;
}

.right-eye .eyelid {
  animation-delay: 0.05s;
}

.sparkle {
  transform-origin: center;
}

.sparkle-1 {
  animation: sparkle-rotate 3s ease-in-out infinite, sparkle-float 2s ease-in-out infinite;
}

.sparkle-2 {
  animation: sparkle-rotate 3s ease-in-out infinite 1s, sparkle-float 2s ease-in-out infinite 0.5s;
}

.sparkle-3 {
  animation: sparkle-rotate 3s ease-in-out infinite 2s, sparkle-float 2s ease-in-out infinite 1s;
}

.pupil {
  animation: pupil-move 6s ease-in-out infinite;
}

@keyframes pupil-move {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
}
</style>

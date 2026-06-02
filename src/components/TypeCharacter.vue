<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: string
  size?: number
}>()

const size = computed(() => props.size || 160)

// 每种类型的角色配置
const characterConfigs: Record<string, {
  hairColor: string
  hairHighlight: string
  bodyColor: string
  bodyHighlight: string
  eyeColor: string
  accessory: string
  expression: string
  style: string
}> = {
  INTJ: { hairColor: '#1e1b4b', hairHighlight: '#312e81', bodyColor: '#1e293b', bodyHighlight: '#334155', eyeColor: '#6366f1', accessory: 'glasses', expression: 'cool', style: '战略家' },
  INTP: { hairColor: '#4a1d96', hairHighlight: '#6d28d9', bodyColor: '#312e81', bodyHighlight: '#4338ca', eyeColor: '#8b5cf6', accessory: 'book', expression: 'thinking', style: '思想家' },
  ENTJ: { hairColor: '#1c1917', hairHighlight: '#44403c', bodyColor: '#7c2d12', bodyHighlight: '#9a3412', eyeColor: '#f97316', accessory: 'crown', expression: 'confident', style: '指挥官' },
  ENTP: { hairColor: '#854d0e', hairHighlight: '#a16207', bodyColor: '#1e1b4b', bodyHighlight: '#312e81', eyeColor: '#eab308', accessory: 'lightning', expression: 'smirk', style: '辩论家' },
  INFJ: { hairColor: '#3b0764', hairHighlight: '#581c87', bodyColor: '#1e1b4b', bodyHighlight: '#312e81', eyeColor: '#a78bfa', accessory: 'moon', expression: 'gentle', style: '提倡者' },
  INFP: { hairColor: '#831843', hairHighlight: '#9d174d', bodyColor: '#4c1d95', bodyHighlight: '#6d28d9', eyeColor: '#f472b6', accessory: 'butterfly', expression: 'dreamy', style: '调停者' },
  ENFJ: { hairColor: '#9a3412', hairHighlight: '#c2410c', bodyColor: '#7e22ce', bodyHighlight: '#9333ea', eyeColor: '#fb923c', accessory: 'star', expression: 'warm', style: '主人公' },
  ENFP: { hairColor: '#dc2626', hairHighlight: '#ef4444', bodyColor: '#7e22ce', bodyHighlight: '#9333ea', eyeColor: '#f87171', accessory: 'rainbow', expression: 'happy', style: '竞选者' },
  ISTJ: { hairColor: '#1c1917', hairHighlight: '#292524', bodyColor: '#1e3a5f', bodyHighlight: '#1e40af', eyeColor: '#60a5fa', accessory: 'badge', expression: 'serious', style: '物流师' },
  ISFJ: { hairColor: '#713f12', hairHighlight: '#854d0e', bodyColor: '#166534', bodyHighlight: '#15803d', eyeColor: '#4ade80', accessory: 'heart', expression: 'kind', style: '守护者' },
  ESTJ: { hairColor: '#1c1917', hairHighlight: '#3f3f46', bodyColor: '#1e3a5f', bodyHighlight: '#1e40af', eyeColor: '#38bdf8', accessory: 'medal', expression: 'determined', style: '总经理' },
  ESFJ: { hairColor: '#a16207', hairHighlight: '#ca8a04', bodyColor: '#be123c', bodyHighlight: '#e11d48', eyeColor: '#fda4af', accessory: 'flower', expression: 'cheerful', style: '执政官' },
  ISTP: { hairColor: '#374151', hairHighlight: '#4b5563', bodyColor: '#374151', bodyHighlight: '#4b5563', eyeColor: '#9ca3af', accessory: 'wrench', expression: 'calm', style: '鉴赏家' },
  ISFP: { hairColor: '#be185d', hairHighlight: '#db2777', bodyColor: '#4c1d95', bodyHighlight: '#6d28d9', eyeColor: '#c084fc', accessory: 'palette', expression: 'shy', style: '探险家' },
  ESTP: { hairColor: '#b91c1c', hairHighlight: '#dc2626', bodyColor: '#374151', bodyHighlight: '#4b5563', eyeColor: '#fbbf24', accessory: 'fire', expression: 'bold', style: '企业家' },
  ESFP: { hairColor: '#f59e0b', hairHighlight: '#fbbf24', bodyColor: '#e11d48', bodyHighlight: '#f43f5e', eyeColor: '#34d399', accessory: 'music', expression: 'excited', style: '表演者' },
}

const config = computed(() => characterConfigs[props.type] || characterConfigs.INTJ)
</script>

<template>
  <svg :viewBox="`0 0 200 240`" :width="size" :height="size * 1.2" class="mx-auto">
    <!-- 身体 -->
    <ellipse cx="100" cy="195" rx="50" ry="40" :fill="config.bodyColor" />
    <ellipse cx="100" cy="190" rx="45" ry="35" :fill="config.bodyHighlight" opacity="0.3" />

    <!-- 头部 -->
    <circle cx="100" cy="95" r="55" fill="#fde68a" />
    <circle cx="100" cy="95" r="52" fill="#fbbf24" opacity="0.3" />

    <!-- 头发 -->
    <path :d="getHairPath(config.style)" :fill="config.hairColor" />
    <path :d="getHairHighlightPath(config.style)" :fill="config.hairHighlight" opacity="0.4" />

    <!-- 眼睛 -->
    <g class="eyes">
      <g class="left-eye">
        <ellipse cx="78" cy="95" rx="13" ry="15" fill="white" />
        <ellipse cx="80" cy="97" rx="8" ry="9" :fill="config.eyeColor" />
        <ellipse cx="82" cy="93" rx="3" ry="3" fill="white" opacity="0.8" />
        <ellipse cx="78" cy="95" rx="14" ry="0" fill="#fde68a" class="eyelid" />
      </g>
      <g class="right-eye">
        <ellipse cx="122" cy="95" rx="13" ry="15" fill="white" />
        <ellipse cx="124" cy="97" rx="8" ry="9" :fill="config.eyeColor" />
        <ellipse cx="126" cy="93" rx="3" ry="3" fill="white" opacity="0.8" />
        <ellipse cx="122" cy="95" rx="14" ry="0" fill="#fde68a" class="eyelid" />
      </g>
    </g>

    <!-- 腮红 -->
    <ellipse cx="65" cy="110" rx="10" ry="6" fill="#fda4af" opacity="0.35" />
    <ellipse cx="135" cy="110" rx="10" ry="6" fill="#fda4af" opacity="0.35" />

    <!-- 嘴巴 -->
    <path :d="getMouthPath(config.expression)" stroke="#e879a0" stroke-width="2.5" fill="none" stroke-linecap="round" />

    <!-- 配饰 -->
    <g v-if="config.accessory === 'glasses'">
      <circle cx="78" cy="95" r="18" fill="none" stroke="#374151" stroke-width="2.5" />
      <circle cx="122" cy="95" r="18" fill="none" stroke="#374151" stroke-width="2.5" />
      <line x1="96" y1="95" x2="104" y2="95" stroke="#374151" stroke-width="2.5" />
    </g>

    <g v-if="config.accessory === 'crown'">
      <path d="M70 45 L80 30 L90 40 L100 25 L110 40 L120 30 L130 45" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5" />
      <circle cx="80" cy="35" r="3" fill="#ef4444" />
      <circle cx="100" cy="28" r="3" fill="#3b82f6" />
      <circle cx="120" cy="35" r="3" fill="#22c55e" />
    </g>

    <g v-if="config.accessory === 'moon'">
      <path d="M150 30 Q165 30 165 45 Q165 60 150 60 Q160 55 160 45 Q160 35 150 30" fill="#fbbf24" />
    </g>

    <g v-if="config.accessory === 'star'">
      <polygon points="160,25 163,35 173,35 165,41 168,51 160,45 152,51 155,41 147,35 157,35" fill="#fbbf24" />
    </g>

    <g v-if="config.accessory === 'butterfly'">
      <ellipse cx="155" cy="40" rx="12" ry="8" fill="#c084fc" transform="rotate(-30 155 40)" />
      <ellipse cx="165" cy="40" rx="12" ry="8" fill="#f472b6" transform="rotate(30 165 40)" />
      <ellipse cx="155" cy="50" rx="8" ry="6" fill="#a78bfa" transform="rotate(30 155 50)" />
      <ellipse cx="165" cy="50" rx="8" ry="6" fill="#ec4899" transform="rotate(-30 165 50)" />
      <line x1="160" y1="38" x2="160" y2="55" stroke="#6b21a8" stroke-width="1.5" />
    </g>

    <g v-if="config.accessory === 'rainbow'">
      <path d="M140 50 Q160 20 180 50" fill="none" stroke="#ef4444" stroke-width="3" />
      <path d="M143 53 Q160 25 177 53" fill="none" stroke="#f97316" stroke-width="3" />
      <path d="M146 56 Q160 30 174 56" fill="none" stroke="#eab308" stroke-width="3" />
      <path d="M149 59 Q160 35 171 59" fill="none" stroke="#22c55e" stroke-width="3" />
      <path d="M152 62 Q160 40 168 62" fill="none" stroke="#3b82f6" stroke-width="3" />
    </g>

    <g v-if="config.accessory === 'lightning'">
      <polygon points="160,25 155,45 165,40 158,60 170,35 162,38" fill="#fbbf24" />
    </g>

    <g v-if="config.accessory === 'badge'">
      <circle cx="100" cy="180" r="12" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5" />
      <text x="100" y="185" text-anchor="middle" font-size="12" font-weight="bold" fill="#78350f">★</text>
    </g>

    <g v-if="config.accessory === 'heart'">
      <path d="M155 35 Q155 25 165 25 Q175 25 175 35 Q175 45 165 55 Q155 45 155 35" fill="#ef4444" />
    </g>

    <g v-if="config.accessory === 'medal'">
      <circle cx="100" cy="180" r="10" fill="#fbbf24" />
      <rect x="95" y="170" width="10" height="8" fill="#3b82f6" />
      <text x="100" y="184" text-anchor="middle" font-size="10" font-weight="bold" fill="#78350f">1</text>
    </g>

    <g v-if="config.accessory === 'flower'">
      <circle cx="160" cy="40" r="8" fill="#f472b6" />
      <circle cx="160" cy="30" r="6" fill="#ec4899" />
      <circle cx="170" cy="40" r="6" fill="#ec4899" />
      <circle cx="160" cy="50" r="6" fill="#ec4899" />
      <circle cx="150" cy="40" r="6" fill="#ec4899" />
      <circle cx="160" cy="40" r="4" fill="#fbbf24" />
    </g>

    <g v-if="config.accessory === 'wrench'">
      <path d="M155 30 L165 50 L160 50 L160 60 L168 60 L168 50 L175 50 L155 30" fill="#9ca3af" />
    </g>

    <g v-if="config.accessory === 'palette'">
      <ellipse cx="160" cy="45" rx="20" ry="15" fill="#fde68a" />
      <circle cx="152" cy="38" r="4" fill="#ef4444" />
      <circle cx="162" cy="35" r="4" fill="#3b82f6" />
      <circle cx="170" cy="42" r="4" fill="#22c55e" />
      <circle cx="165" cy="52" r="4" fill="#f97316" />
    </g>

    <g v-if="config.accessory === 'fire'">
      <path d="M155 55 Q155 35 165 25 Q175 35 175 55 Q170 45 165 45 Q160 45 155 55" fill="#f97316" />
      <path d="M158 55 Q158 40 165 32 Q172 40 172 55 Q168 48 165 48 Q162 48 158 55" fill="#fbbf24" />
    </g>

    <g v-if="config.accessory === 'music'">
      <circle cx="155" cy="50" r="6" fill="#1e1b4b" />
      <circle cx="170" cy="45" r="6" fill="#1e1b4b" />
      <line x1="161" y1="50" x2="161" y2="25" stroke="#1e1b4b" stroke-width="2" />
      <line x1="176" y1="45" x2="176" y2="20" stroke="#1e1b4b" stroke-width="2" />
      <line x1="161" y1="25" x2="176" y2="20" stroke="#1e1b4b" stroke-width="2" />
    </g>

    <!-- 星星装饰 -->
    <g class="sparkle">
      <path d="M35 55 L37 50 L39 55 L44 53 L39 55 L37 60 L35 55 L30 53 Z" :fill="config.eyeColor" opacity="0.6" />
    </g>
  </svg>
</template>

<script lang="ts">
function getHairPath(style: string): string {
  const paths: Record<string, string> = {
    '战略家': 'M45 85 Q50 30 100 25 Q150 30 155 85 Q150 55 100 50 Q50 55 45 85',
    '思想家': 'M45 85 Q50 30 100 25 Q150 30 155 85 Q150 55 100 50 Q50 55 45 85 M55 70 Q60 50 75 55 Q65 60 60 70 M145 70 Q140 50 125 55 Q135 60 140 70',
    '指挥官': 'M45 80 Q50 25 100 20 Q150 25 155 80 Q150 50 100 45 Q50 50 45 80',
    '辩论家': 'M45 85 Q50 35 100 30 Q150 35 155 85 Q145 60 100 55 Q55 60 45 85 M60 65 Q65 50 80 55 Q70 60 65 65',
    '提倡者': 'M45 85 Q50 30 100 25 Q150 30 155 85 Q150 55 100 50 Q50 55 45 85 M70 60 Q75 45 90 50 Q80 55 75 60',
    '调停者': 'M45 90 Q50 35 100 30 Q150 35 155 90 Q145 65 100 60 Q55 65 45 90 M50 75 Q55 60 70 65 Q60 70 55 75 M150 75 Q145 60 130 65 Q140 70 145 75',
    '主人公': 'M45 80 Q50 25 100 20 Q150 25 155 80 Q145 55 100 50 Q55 55 45 80 M65 55 Q70 40 85 45 Q75 50 70 55',
    '竞选者': 'M40 90 Q45 35 100 28 Q155 35 160 90 Q150 65 100 58 Q50 65 40 90 M55 70 Q60 55 75 60 Q65 65 60 70 M145 70 Q140 55 125 60 Q135 65 140 70',
    '物流师': 'M45 80 Q50 30 100 25 Q150 30 155 80 Q150 55 100 50 Q50 55 45 80',
    '守护者': 'M45 85 Q50 30 100 25 Q150 30 155 85 Q150 55 100 50 Q50 55 45 85 M60 65 Q65 50 80 55 Q70 60 65 65',
    '总经理': 'M45 80 Q50 28 100 23 Q150 28 155 80 Q150 52 100 47 Q50 52 45 80',
    '执政官': 'M45 85 Q50 30 100 25 Q150 30 155 85 Q150 55 100 50 Q50 55 45 85 M55 70 Q60 55 75 60 Q65 65 60 70 M145 70 Q140 55 125 60 Q135 65 140 70',
    '鉴赏家': 'M45 80 Q50 30 100 25 Q150 30 155 80 Q150 52 100 47 Q50 52 45 80 M55 65 Q60 50 75 55 Q65 58 60 65',
    '探险家': 'M45 90 Q50 35 100 30 Q150 35 155 90 Q145 65 100 60 Q55 65 45 90 M50 75 Q55 60 70 65 Q60 70 55 75 M150 75 Q145 60 130 65 Q140 70 145 75',
    '企业家': 'M45 80 Q50 30 100 25 Q150 30 155 80 Q150 52 100 47 Q50 52 45 80 M60 60 Q65 48 78 52 Q68 56 63 62',
    '表演者': 'M40 88 Q45 32 100 25 Q155 32 160 88 Q150 60 100 53 Q50 60 40 88 M55 68 Q60 53 75 58 Q65 63 60 68 M145 68 Q140 53 125 58 Q135 63 140 68',
  }
  return paths[style] || paths['战略家']
}

function getHairHighlightPath(_style: string): string {
  return 'M55 75 Q60 45 100 40 Q140 45 145 75'
}

function getMouthPath(expression: string): string {
  const paths: Record<string, string> = {
    'cool': 'M90 115 Q100 115 110 115',
    'thinking': 'M92 112 Q100 115 108 112',
    'confident': 'M88 112 Q100 120 112 112',
    'smirk': 'M92 112 Q100 118 112 110',
    'gentle': 'M92 112 Q100 118 108 112',
    'dreamy': 'M95 115 Q100 118 105 115',
    'warm': 'M88 110 Q100 120 112 110',
    'happy': 'M88 108 Q100 120 112 108',
    'serious': 'M90 115 Q100 115 110 115',
    'kind': 'M92 112 Q100 118 108 112',
    'determined': 'M90 113 Q100 113 110 113',
    'cheerful': 'M88 108 Q100 120 112 108',
    'calm': 'M92 115 Q100 115 108 115',
    'shy': 'M95 115 Q100 117 105 115',
    'bold': 'M88 110 Q100 118 112 110',
    'excited': 'M90 108 Q100 118 110 108',
  }
  return paths[expression] || paths['cool']
}
</script>

<style scoped>
@keyframes blink {
  0%, 45%, 55%, 100% {
    ry: 0;
  }
  50% {
    ry: 15;
  }
}

@keyframes sparkle-rotate {
  0%, 100% {
    transform: rotate(0deg) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: rotate(180deg) scale(1.3);
    opacity: 0.3;
  }
}

.eyelid {
  animation: blink 4s ease-in-out infinite;
}

.sparkle {
  transform-origin: 37px 57px;
  animation: sparkle-rotate 3s ease-in-out infinite;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import { typeReports } from '../data/results'
import { getCompatibility, allTypes } from '../data/compatibility'
import GlassCard from '../components/GlassCard.vue'
import DimensionBar from '../components/DimensionBar.vue'
import RadarChart from '../components/RadarChart.vue'
import SharePoster from '../components/SharePoster.vue'

const router = useRouter()
const quizStore = useQuizStore()

// 如果没有结果，跳回首页
if (!quizStore.result) {
  router.replace('/')
}

const result = computed(() => quizStore.result!)
const report = computed(() => typeReports[result.value.type])

// Tab 控制
const activeTab = ref('basic')
const tabs = [
  { id: 'basic', label: '基本画像', icon: '👤' },
  { id: 'love', label: '恋爱人格', icon: '💕' },
  { id: 'career', label: '职场社交', icon: '💼' },
  { id: 'cognitive', label: '八维解读', icon: '🧠' },
  { id: 'share', label: '分享', icon: '📤' },
]

// 八维数据
const cognitiveData = computed(() => {
  if (!report.value) return []
  return [
    { label: 'Si', value: result.value.type.includes('S') && result.value.type.includes('J') ? 75 : 45 },
    { label: 'Se', value: result.value.type.includes('S') && result.value.type.includes('P') ? 75 : 45 },
    { label: 'Ni', value: result.value.type.includes('N') && result.value.type.includes('J') ? 75 : 45 },
    { label: 'Ne', value: result.value.type.includes('N') && result.value.type.includes('P') ? 75 : 45 },
    { label: 'Ti', value: result.value.type.includes('T') && result.value.type.includes('P') ? 75 : 45 },
    { label: 'Te', value: result.value.type.includes('T') && result.value.type.includes('J') ? 75 : 45 },
    { label: 'Fi', value: result.value.type.includes('F') && result.value.type.includes('P') ? 75 : 45 },
    { label: 'Fe', value: result.value.type.includes('F') && result.value.type.includes('J') ? 75 : 45 },
  ]
})

// 契合度
const selectedPartner = ref('')
const compatibilityResult = computed(() => {
  if (!selectedPartner.value) return null
  return getCompatibility(result.value.type, selectedPartner.value)
})

function handleReset() {
  quizStore.resetQuiz()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen p-4 pb-24" v-if="report">
    <!-- 顶部类型展示 -->
    <div class="text-center mb-8 animate-fade-in-up">
      <div class="text-6xl mb-4">{{ report.avatar }}</div>
      <h1 class="text-4xl md:text-5xl font-bold gradient-text mb-2">{{ result.type }}</h1>
      <p class="text-xl text-primary-300 mb-1">{{ report.nickname }}</p>
      <p class="text-text-secondary">{{ report.subtitle }}</p>

      <!-- 隐藏属性标签 -->
      <div class="flex flex-wrap justify-center gap-2 mt-4">
        <span
          v-for="tag in result.hiddenTags"
          :key="tag"
          class="px-4 py-1.5 text-sm rounded-full glass font-medium"
        >
          {{ tag }}
        </span>
        <span
          v-for="tag in result.quirkyTags.slice(0, 3)"
          :key="tag"
          class="px-4 py-1.5 text-sm rounded-full glass font-medium"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Tab 导航 -->
    <div class="flex overflow-x-auto gap-2 mb-6 pb-2 -mx-4 px-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300"
        :class="activeTab === tab.id ? 'glass-strong text-text-primary' : 'text-text-muted hover:text-text-secondary'"
        @click="activeTab = tab.id"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab 内容 -->
    <div class="animate-fade-in-up">
      <!-- 基本画像 -->
      <div v-if="activeTab === 'basic'">
        <GlassCard class="mb-6">
          <p class="text-text-secondary leading-relaxed mb-6">{{ report.basic.description }}</p>

          <!-- 金句 -->
          <div class="glass rounded-2xl p-4 mb-6">
            <p class="text-text-primary italic text-center">"{{ report.basic.quote }}"</p>
          </div>

          <!-- 四维度条形图 -->
          <div class="space-y-6">
            <DimensionBar
              left-label="E"
              right-label="I"
              :left-percentage="result.percentages.E"
              :right-percentage="result.percentages.I"
              :dominant="result.dimensions.EI.dominant"
            />
            <DimensionBar
              left-label="S"
              right-label="N"
              :left-percentage="result.percentages.S"
              :right-percentage="result.percentages.N"
              :dominant="result.dimensions.SN.dominant"
              color="linear-gradient(90deg, #34d399, #6ee7b7)"
            />
            <DimensionBar
              left-label="T"
              right-label="F"
              :left-percentage="result.percentages.T"
              :right-percentage="result.percentages.F"
              :dominant="result.dimensions.TF.dominant"
              color="linear-gradient(90deg, #60a5fa, #93c5fd)"
            />
            <DimensionBar
              left-label="J"
              right-label="P"
              :left-percentage="result.percentages.J"
              :right-percentage="result.percentages.P"
              :dominant="result.dimensions.JP.dominant"
              color="linear-gradient(90deg, #fbbf24, #fcd34d)"
            />
          </div>
        </GlassCard>

        <!-- 优劣势 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <h3 class="text-lg font-bold text-mint-300 mb-3">✨ 你的优势</h3>
            <ul class="space-y-2">
              <li v-for="s in report.basic.strengths" :key="s" class="flex items-center gap-2 text-text-secondary">
                <span class="text-mint-400">•</span>
                <span>{{ s }}</span>
              </li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h3 class="text-lg font-bold text-rose-gold-300 mb-3">⚠️ 注意事项</h3>
            <ul class="space-y-2">
              <li v-for="w in report.basic.weaknesses" :key="w" class="flex items-center gap-2 text-text-secondary">
                <span class="text-rose-gold-400">•</span>
                <span>{{ w }}</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>

      <!-- 恋爱人格 -->
      <div v-if="activeTab === 'love'">
        <GlassCard class="mb-6" style="background: linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(253, 164, 175, 0.1));">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold gradient-text-pink mb-2">{{ report.love.title }}</h2>
            <div class="flex flex-wrap justify-center gap-2">
              <span
                v-for="tag in report.love.tags"
                :key="tag"
                class="px-3 py-1 text-xs rounded-full"
                style="background: rgba(244, 63, 94, 0.2); color: #fda4af;"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- 金句 -->
          <div class="glass rounded-2xl p-4 mb-6">
            <p class="text-text-primary italic text-center">"{{ report.love.quote }}"</p>
          </div>

          <!-- 内容区块 -->
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-bold text-rose-gold-300 mb-2">💗 恋爱中的你</h3>
              <p class="text-text-secondary leading-relaxed">{{ report.love.inLove }}</p>
            </div>
            <div>
              <h3 class="text-lg font-bold text-rose-gold-300 mb-2">💝 你期待的爱</h3>
              <p class="text-text-secondary leading-relaxed">{{ report.love.expectLove }}</p>
            </div>
            <div>
              <h3 class="text-lg font-bold text-rose-gold-300 mb-2">💘 理想伴侣</h3>
              <p class="text-text-secondary leading-relaxed">{{ report.love.idealPartner }}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <!-- 职场社交 -->
      <div v-if="activeTab === 'career'">
        <GlassCard class="mb-6">
          <h2 class="text-2xl font-bold gradient-text mb-4">{{ report.career.title }}</h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-bold text-primary-300 mb-2">💪 职场优势</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="s in report.career.strengths"
                  :key="s"
                  class="px-3 py-1.5 text-sm rounded-xl glass"
                >
                  {{ s }}
                </span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-bold text-primary-300 mb-2">🎯 工作风格</h3>
              <p class="text-text-secondary leading-relaxed">{{ report.career.workStyle }}</p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-primary-300 mb-2">💼 适合的职业</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="job in report.career.suitableJobs"
                  :key="job"
                  class="px-3 py-1.5 text-sm rounded-xl glass"
                >
                  {{ job }}
                </span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-bold text-primary-300 mb-2">🎭 社交面具</h3>
              <p class="text-text-secondary leading-relaxed">{{ report.career.socialMask }}</p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-rose-gold-300 mb-2">⚡ 雷区预警</h3>
              <p class="text-text-secondary leading-relaxed">{{ report.career.minefield }}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <!-- 八维解读 -->
      <div v-if="activeTab === 'cognitive'">
        <GlassCard class="mb-6">
          <h2 class="text-2xl font-bold gradient-text mb-4 text-center">认知功能解读</h2>

          <!-- 雷达图 -->
          <RadarChart :data="cognitiveData" class="mb-6" />

          <!-- 认知功能说明 -->
          <div class="space-y-4">
            <div class="glass rounded-xl p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: linear-gradient(135deg, #c084fc, #fb7185);">1</span>
                <div>
                  <span class="font-bold text-text-primary">主导功能：{{ report.cognitive.dom }}</span>
                </div>
              </div>
            </div>
            <div class="glass rounded-xl p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: linear-gradient(135deg, #c084fc, #fb7185); opacity: 0.8;">2</span>
                <div>
                  <span class="font-bold text-text-primary">辅助功能：{{ report.cognitive.aux }}</span>
                </div>
              </div>
            </div>
            <div class="glass rounded-xl p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: linear-gradient(135deg, #c084fc, #fb7185); opacity: 0.6;">3</span>
                <div>
                  <span class="font-bold text-text-primary">第三功能：{{ report.cognitive.ter }}</span>
                </div>
              </div>
            </div>
            <div class="glass rounded-xl p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style="background: linear-gradient(135deg, #c084fc, #fb7185); opacity: 0.4;">4</span>
                <div>
                  <span class="font-bold text-text-primary">劣势功能：{{ report.cognitive.inf }}</span>
                </div>
              </div>
            </div>
          </div>

          <p class="text-text-secondary leading-relaxed mt-6">{{ report.cognitive.description }}</p>
        </GlassCard>
      </div>

      <!-- 分享 -->
      <div v-if="activeTab === 'share'">
        <!-- 好友契合度 -->
        <GlassCard class="mb-6">
          <h3 class="text-xl font-bold gradient-text mb-4 text-center">💕 好友契合度</h3>
          <p class="text-text-secondary text-sm mb-4 text-center">选择好友的 MBTI 类型，查看你们的契合度</p>

          <div class="grid grid-cols-4 gap-2 mb-4">
            <button
              v-for="t in allTypes"
              :key="t"
              class="py-2 px-1 text-xs rounded-xl transition-all duration-300"
              :class="selectedPartner === t ? 'glass-strong text-text-primary font-bold' : 'glass text-text-muted hover:text-text-secondary'"
              @click="selectedPartner = t"
            >
              {{ t }}
            </button>
          </div>

          <div v-if="compatibilityResult" class="glass rounded-2xl p-4 text-center animate-fade-in-up">
            <div class="text-4xl mb-2">{{ compatibilityResult.emoji }}</div>
            <div class="text-xl font-bold gradient-text mb-1">{{ compatibilityResult.label }}</div>
            <div class="text-2xl font-bold text-primary-300 mb-2">{{ compatibilityResult.score }}%</div>
            <p class="text-text-secondary text-sm">{{ compatibilityResult.description }}</p>
          </div>
        </GlassCard>

        <!-- 分享海报 -->
        <GlassCard class="mb-6">
          <h3 class="text-xl font-bold gradient-text mb-4 text-center">📤 生成分享海报</h3>
          <SharePoster
            :type="result.type"
            :nickname="report.nickname"
            :quote="report.basic.quote"
            :dimensions="result.dimensions"
            :hidden-tags="result.hiddenTags"
          />
        </GlassCard>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="fixed bottom-0 left-0 right-0 p-4 glass-strong">
      <div class="max-w-lg mx-auto flex gap-3">
        <button
          class="flex-1 py-3 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-[1.02]"
          style="background: linear-gradient(135deg, #c084fc, #fb7185);"
          @click="activeTab = 'share'"
        >
          📤 分享结果
        </button>
        <button
          class="px-6 py-3 rounded-2xl font-bold glass text-text-secondary hover:text-text-primary transition-all duration-300"
          @click="handleReset"
        >
          🔄 重新测试
        </button>
      </div>
    </div>
  </div>
</template>

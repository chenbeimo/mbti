<script setup lang="ts">
import type { Question } from '../data/questions'

const props = defineProps<{
  question: Question
  selectedIndex?: number
}>()

const emit = defineEmits<{
  select: [index: number]
}>()

function handleSelect(index: number) {
  emit('select', index)
}
</script>

<template>
  <div class="animate-fade-in-up">
    <!-- 猎奇题标签 -->
    <div v-if="props.question.type === 'quirky' && props.question.tag" class="mb-4">
      <span
        class="inline-block px-3 py-1 text-xs font-medium rounded-full glass"
        style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(244, 63, 94, 0.3));"
      >
        {{ props.question.tag }}
      </span>
    </div>

    <!-- 题目文本 -->
    <h2 class="text-xl md:text-2xl font-bold text-text-primary mb-8 leading-relaxed">
      {{ props.question.text }}
    </h2>

    <!-- 选项列表 -->
    <div class="space-y-3">
      <button
        v-for="(option, index) in props.question.options"
        :key="index"
        class="w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-300 border"
        :class="[
          selectedIndex === index
            ? 'option-selected scale-[1.02]'
            : 'glass border-white/10 hover:border-white/20 hover:scale-[1.01]',
        ]"
        @click="handleSelect(index)"
      >
        <div class="flex items-center gap-3">
          <span v-if="option.emoji" class="text-2xl">{{ option.emoji }}</span>
          <span class="text-base md:text-lg text-text-primary">{{ option.text }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

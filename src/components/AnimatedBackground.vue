<script setup lang="ts">
// 动态渐变背景组件
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <!-- 主渐变背景 -->
    <div
      class="absolute inset-0 animate-gradient"
      style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #6d28d9 75%, #7c3aed 100%); background-size: 400% 400%;"
    />

    <!-- 浮动光球 -->
    <div
      class="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
      style="background: radial-gradient(circle, #c084fc 0%, transparent 70%); top: -10%; left: -10%;"
    />
    <div
      class="absolute w-80 h-80 rounded-full opacity-15 blur-3xl animate-float"
      style="background: radial-gradient(circle, #fb7185 0%, transparent 70%); bottom: -10%; right: -10%; animation-delay: -1.5s;"
    />
    <div
      class="absolute w-64 h-64 rounded-full opacity-10 blur-3xl animate-float"
      style="background: radial-gradient(circle, #34d399 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: -3s;"
    />
  </div>
</template>

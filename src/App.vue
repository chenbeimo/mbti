<script setup lang="ts">
import AnimatedBackground from './components/AnimatedBackground.vue'
</script>

<template>
  <div class="min-h-screen relative">
    <AnimatedBackground />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

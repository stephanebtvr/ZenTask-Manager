<script setup lang="ts">
import { ref } from 'vue'

// Fonction appelée quand on clique sur le bouton Soleil/Lune

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value

  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>
<template>
  <header class="relative text-center mb-8 sm:mb-12">
    <button
      @click="toggleDark"
      class="absolute right-0 top-0 p-2 sm:p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-amber-300 hover:scale-110 hover:ring-2 ring-blue-400 transition-all cursor-pointer shadow-sm"
      :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    >
      <span v-if="isDark" class="text-xl sm:text-2xl leading-none block">☀️</span>
      <span v-else class="text-xl sm:text-2xl leading-none block">🌙</span>
    </button>

    <h1
      class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-2 sm:pt-0 transition-colors duration-300"
    >
      Gestionnaire de Tâches <span class="text-blue-600 dark:text-blue-400">Pro</span>
    </h1>
    <p
      class="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 transition-colors duration-300"
    >
      Architecture Clean avec Vue 3 & TypeScript
    </p>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import TaskForm from '@/features/tasks/components/TaskForm.vue'
import TaskList from '@/features/tasks/components/TaskList.vue'
import Header from '@/shared/components/Header.vue'
import Footer from '@/shared/components/Footer.vue'

const currentYear = ref(new Date().getFullYear())
// ==========================================
// LOGIQUE DU DARK MODE
// ==========================================
const isDark = ref(false)

// À l'ouverture de la page, on vérifie si l'utilisateur a déjà choisi un thème
// ou si son système d'exploitation est configuré en mode sombre.
onMounted(() => {
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <main
    class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans"
  >
    <div
      class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-grow py-6 sm:py-10"
    >
      <Header :is-dark="isDark" />

      <div class="flex flex-col gap-8 sm:gap-10 my-8">
        <section class="w-full max-w-2xl mx-auto">
          <TaskForm />
        </section>

        <section class="w-full">
          <TaskList />
        </section>
      </div>

      <div class="mt-auto">
        <Footer :current-year="currentYear" />
      </div>
    </div>
  </main>
</template>

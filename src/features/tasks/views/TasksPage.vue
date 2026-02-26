<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import TaskForm from '@/features/tasks/components/TaskForm.vue'
import TaskList from '@/features/tasks/components/TaskList.vue'
import Header from '@/shared/components/Header.vue'
import Footer from '@/shared/components/Footer.vue'

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
    class="min-h-screen min-w-[320px] bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-6 sm:py-10 font-sans"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header :is-dark="isDark"></Header>

      <div class="flex flex-col gap-8 sm:gap-10">
        <section class="w-full max-w-2xl mx-auto">
          <TaskForm />
        </section>

        <section class="w-full">
          <TaskList />
        </section>
      </div>
      <Footer></Footer>
    </div>
  </main>
</template>

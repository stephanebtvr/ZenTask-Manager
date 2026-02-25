<script lang="ts" setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { TaskPriority, TaskStatus, type Task } from '../domain/task'

// 1. Injection du Store
const taskStore = useTaskStore()

// 2. État Local (Le brouillon de notre formulaire)
// Analogie Java : C'est comme instancier un nouveau DTO vide : TaskDTO draft = new TaskDTO();
const title = ref<string>('')
const description = ref<string>('')
const priority = ref<TaskPriority>(TaskPriority.MEDIUM)

function onSubmit() {
  if (!title.value.trim()) return

  const newTask: Task = {
    id: crypto.randomUUID().toString(), // Utilise l'API native du navigateur pour générer un UUID
    title: title.value,
    description: description.value,
    status: TaskStatus.TODO,
    priority: priority.value,
    createdAt: new Date(),
  }
  taskStore.addTask(newTask)
  // Reset du formulaire
  title.value = ''
  description.value = ''
  priority.value = TaskPriority.MEDIUM
}
</script>
<template>
  <form
    @submit.prevent="onSubmit"
    class="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 transition-colors duration-300"
  >
    <h3 class="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200 transition-colors">
      Nouvelle Tâche
    </h3>

    <div class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
          >Titre</label
        >
        <input
          v-model="title"
          id="title"
          type="text"
          placeholder="Ex: Acheter du lait"
          class="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-slate-900 dark:text-white dark:placeholder-slate-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
          required
        />
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
          >Description</label
        >
        <textarea
          v-model="description"
          id="description"
          rows="3"
          placeholder="Détails supplémentaires (optionnel)"
          class="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-slate-900 dark:text-white dark:placeholder-slate-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 resize-none"
        ></textarea>
      </div>

      <div>
        <label
          for="priority"
          class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
          >Priorité</label
        >
        <select
          v-model="priority"
          id="priority"
          class="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
        >
          <option :value="TaskPriority.LOW">Basse</option>
          <option :value="TaskPriority.MEDIUM">Moyenne</option>
          <option :value="TaskPriority.HIGH">Haute</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors duration-200 focus:ring-2 focus:ring-blue-300"
      >
        Ajouter la Tâche
      </button>
    </div>
  </form>
</template>

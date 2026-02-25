import { defineStore } from 'pinia'
import type { Task, TaskStatus } from '../domain/task'
import { computed, ref, watch } from 'vue'

export const useTaskStore = defineStore('task', () => {
  // ==========================================
  // 0. HYDRATATION (Lecture depuis la base locale au démarrage)
  // ==========================================
  const savedTasks = localStorage.getItem('zen-tasks-storage')
  let initialTasks: Task[] = []

  if (savedTasks) {
    // Analogie Java : Désérialisation JSON vers notre tableau de DTOs
    const parsedTasks = JSON.parse(savedTasks) as Task[]

    // TRÈS IMPORTANT : JSON transforme les objets Date en chaînes de caractères (ISO string).
    // On doit les re-transformer en vrais objets Date TypeScript.
    initialTasks = parsedTasks.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }))
  }
  // ==========================================
  // 1. STATE (L'état interne du Singleton)
  // ==========================================
  const tasks = ref<Task[]>(initialTasks)

  // ==========================================
  // 2. PERSISTANCE AUTOMATIQUE (L'Observer)
  // ==========================================
  watch(
    tasks,
    (state) => {
      // Dès que 'tasks' change, on sérialise et on sauvegarde !
      localStorage.setItem('zen-tasks-storage', JSON.stringify(state))
    },
    { deep: true }, // L'option MAGIQUE
  )
  // ==========================================
  // 3. GETTERS (Données dérivées / Read-only)
  // ==========================================

  const toDoTasks = computed(() => tasks.value.filter((task) => task.status === 'TODO'))
  const pendingTasks = computed(() => tasks.value.filter((task) => task.status === 'IN_PROGRESS'))
  const completedTasks = computed(() => tasks.value.filter((task) => task.status === 'DONE'))

  // ==========================================
  // 4. ACTIONS (Mutations de l'état)
  // ==========================================

  function addTask(newTask: Task) {
    if (tasks.value.some((task) => task.id === newTask.id)) {
      console.warn(`Task with id ${newTask.id} already exists. Skipping addition.`)
      return
    }

    tasks.value.push(newTask)
    console.log(`Task with id ${newTask.id} added successfully.`)
  }

  function updateStatusTask(taskId: string, newStatus: TaskStatus) {
    const task = tasks.value.find((task) => task.id === taskId)
    if (task) {
      task.status = newStatus
    } else {
      console.warn(`Task with id ${taskId} not found. Cannot update status.`)
    }
  }

  function deleteTask(taskId: string) {
    // Analogie Java : tasks = tasks.stream().filter(t -> !t.getId().equals(taskId)).toList();
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
    console.log(`Task with id ${taskId} deleted.`)
  }

  return {
    tasks,
    toDoTasks,
    pendingTasks,
    completedTasks,
    addTask,
    updateStatusTask,
    deleteTask,
  }
})

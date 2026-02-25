<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/taskStore'
import { TaskStatus } from '../domain/task'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()
const { toDoTasks, pendingTasks, completedTasks } = storeToRefs(taskStore)
const { updateStatusTask, deleteTask } = taskStore

// Analogie Java : On "désérialise" l'ID à l'arrivée et on met à jour la base
function onDrop(event: DragEvent, newStatus: TaskStatus) {
  if (event.dataTransfer) {
    // On récupère l'ID qui a voyagé

    const taskId = event.dataTransfer.getData('taskId')
    if (taskId) {
      updateStatusTask(taskId, newStatus)
    }
  }
}

function handleTaskDelete(taskId: string) {
  deleteTask(taskId)
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <section
      @dragover.prevent
      @drop="onDrop($event, TaskStatus.TODO)"
      class="bg-gray-100 dark:bg-slate-800/50 p-5 rounded-xl shadow-sm border-t-4 border-blue-400 flex flex-col h-full min-h-[200px]"
    >
      <h2
        class="text-lg font-bold mb-4 text-gray-700 dark:text-slate-200 flex justify-between items-center border-b pb-2"
      >
        À faire
        <span class="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">{{
          toDoTasks.length
        }}</span>
      </h2>
      <ul class="space-y-3 flex-1">
        <TaskCard
          v-for="task in toDoTasks"
          :key="task.id"
          :task="task"
          @delete="handleTaskDelete"
        />
      </ul>
    </section>

    <section
      @dragover.prevent
      @drop="onDrop($event, TaskStatus.IN_PROGRESS)"
      class="bg-gray-100 dark:bg-slate-800/50 p-5 rounded-xl shadow-sm border-t-4 border-amber-400 flex flex-col h-full min-h-[200px]"
    >
      <h2
        class="text-lg font-bold mb-4 text-gray-700 dark:text-slate-200 flex justify-between items-center border-b pb-2"
      >
        En cours
        <span class="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full">{{
          pendingTasks.length
        }}</span>
      </h2>
      <ul class="space-y-3 flex-1">
        <TaskCard
          v-for="task in pendingTasks"
          :key="task.id"
          :task="task"
          @delete="handleTaskDelete"
        />
      </ul>
    </section>

    <section
      @dragover.prevent
      @drop="onDrop($event, TaskStatus.DONE)"
      class="bg-gray-100 dark:bg-slate-800/50 p-5 rounded-xl shadow-sm border-t-4 border-emerald-400 flex flex-col h-full min-h-[200px]"
    >
      <h2
        class="text-lg font-bold mb-4 text-gray-700 dark:text-slate-200 flex justify-between items-center border-b pb-2"
      >
        Terminées
        <span class="bg-emerald-200 text-emerald-800 text-xs px-2 py-1 rounded-full">{{
          completedTasks.length
        }}</span>
      </h2>
      <ul class="space-y-3 flex-1">
        <TaskCard
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
          @delete="handleTaskDelete"
        />
      </ul>
    </section>
  </div>
</template>

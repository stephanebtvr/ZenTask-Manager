<script setup lang="ts">
import { computed } from 'vue'
import { TaskStatus, type Task } from '../domain/task'

const props = defineProps<{ task: Task }>()

// 1. On déclare notre nouvel événement de sortie
const emit = defineEmits<{
  (e: 'delete', taskId: string): void
}>()

// Analogie Java : C'est ici qu'on "sérialise" l'ID pour le voyage
function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    // On attache l'ID de la tâche à l'événement de glissement
    event.dataTransfer.setData('taskId', props.task.id)
    // Optionnel : indique au navigateur le type d'effet visuel (déplacement)
    event.dataTransfer.effectAllowed = 'move'
  }
}

// 2. Fonction pour déclencher la suppression
function onDelete() {
  emit('delete', props.task.id)
}

const statusClasses = computed(() => {
  switch (props.task.status) {
    case TaskStatus.TODO:
      // Bordure bleue, fond blanc classique
      return 'border-l-4 border-l-blue-400 bg-white border-y-gray-200 border-r-gray-200'
    case TaskStatus.IN_PROGRESS:
      // Bordure ambre, fond légèrement teinté
      return 'border-l-4 border-l-amber-400 bg-amber-50 border-y-amber-100 border-r-amber-100'
    case TaskStatus.DONE:
      // Bordure verte, fond teinté et opacité réduite pour montrer que c'est "archivé"
      return 'border-l-4 border-l-emerald-400 bg-emerald-50 border-y-emerald-100 border-r-emerald-100 opacity-70'
    default:
      return 'bg-white border-gray-200'
  }
})
</script>

<template>
  <li
    draggable="true"
    @dragstart="onDragStart"
    :class="[
      statusClasses,
      'group cursor-grab active:cursor-grabbing flex flex-col p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200',
    ]"
  >
    <div class="flex justify-between items-start mb-2">
      <div class="flex flex-row items-center justify-between">
        <span class="font-semibold text-lg text-slate-800 leading-tight">{{ task.title }}</span>
        <button
          @click.stop="onDelete"
          class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
          title="Supprimer la tâche"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <span
        class="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100"
      >
        {{ task.priority }}
      </span>
    </div>

    <p v-if="task.description" class="text-sm text-slate-500 mb-1 line-clamp-2">
      {{ task.description }}
    </p>
  </li>
</template>

// src/features/tasks/components/TaskList.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TaskList from './TaskList.vue'
import TaskCard from './TaskCard.vue'
import { useTaskStore } from '../stores/taskStore'
import { TaskStatus, TaskPriority } from '../domain/task'

describe('TaskList.vue', () => {
  // 1. Préparation d'un faux état initial pour notre Store
  // On place délibérément une tâche dans chaque colonne pour s'assurer qu'elles s'affichent toutes
  const initialState = {
    task: {
      tasks: [
        {
          id: 't1',
          title: 'Tâche 1',
          status: TaskStatus.TODO,
          priority: TaskPriority.LOW,
          createdAt: new Date(),
        },
        {
          id: 't2',
          title: 'Tâche 2',
          status: TaskStatus.IN_PROGRESS,
          priority: TaskPriority.MEDIUM,
          createdAt: new Date(),
        },
        {
          id: 't3',
          title: 'Tâche 3',
          status: TaskStatus.DONE,
          priority: TaskPriority.HIGH,
          createdAt: new Date(),
        },
      ],
    },
  }

  it('devrait afficher les tâches correctement réparties', () => {
    const wrapper = mount(TaskList, {
      global: { plugins: [createTestingPinia({ initialState, createSpy: vi.fn })] },
    })

    // On vérifie que nos 3 composants enfants "TaskCard" ont bien été instanciés
    const cards = wrapper.findAllComponents(TaskCard)
    expect(cards.length).toBe(3)
  })

  it('devrait relayer la demande de suppression (handleTaskDelete) au Store', () => {
    const wrapper = mount(TaskList, {
      global: { plugins: [createTestingPinia({ initialState, createSpy: vi.fn })] },
    })
    const store = useTaskStore()

    // 1. On attrape la première carte (Tâche 1)
    const firstCard = wrapper.findComponent(TaskCard)

    // 2. On simule l'émission de l'événement 'delete' venant de cette carte
    firstCard.vm.$emit('delete', 't1')

    // 3. On vérifie que la liste a bien appelé la méthode deleteTask du Store
    expect(store.deleteTask).toHaveBeenCalledTimes(1)
    expect(store.deleteTask).toHaveBeenCalledWith('t1')
  })

  it("devrait mettre à jour le statut lors d'un Drag & Drop (onDrop)", async () => {
    const wrapper = mount(TaskList, {
      global: { plugins: [createTestingPinia({ initialState, createSpy: vi.fn })] },
    })
    const store = useTaskStore()

    // 1. On cible la section "Terminées" (C'est la 3ème balise <section> dans le code)
    const doneSection = wrapper.findAll('section')[2]

    // 2. Mock (Simulation) de l'événement natif de Drag & Drop
    // On doit feinter le navigateur en créant un faux objet "dataTransfer"
    const mockDropEvent = {
      dataTransfer: {
        // On simule que l'utilisateur a relâché la Tâche 1 ('t1')
        getData: vi.fn().mockReturnValue('t1'),
      },
    }

    // 3. On déclenche virtuellement l'événement 'drop' sur la section "Terminées"
    await doneSection?.trigger('drop', mockDropEvent)

    // 4. Vérifications de la logique métier
    expect(mockDropEvent.dataTransfer.getData).toHaveBeenCalledWith('taskId')
    // Le store doit avoir reçu l'ordre de passer 't1' en statut 'DONE'
    expect(store.updateStatusTask).toHaveBeenCalledWith('t1', TaskStatus.DONE)
  })
})

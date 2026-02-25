// src/features/tasks/components/TaskCard.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCard from './TaskCard.vue'
import { TaskStatus, TaskPriority } from '../domain/task'

describe('TaskCard.vue', () => {
  const mockTask = {
    id: 'test-1',
    title: 'Faire les tests unitaires',
    description: 'Objectif: 80% de couverture',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    createdAt: new Date(),
  }

  it('devrait afficher le titre et la description de la tâche', () => {
    // On "monte" le composant virtuellement en lui passant notre fausse tâche via les Props
    const wrapper = mount(TaskCard, {
      props: { task: mockTask },
    })

    // On vérifie que le HTML contient bien notre titre
    expect(wrapper.text()).toContain('Faire les tests unitaires')
    expect(wrapper.text()).toContain('Objectif: 80% de couverture')
    expect(wrapper.text()).toContain('HIGH')
  })

  it('devrait émettre un événement "delete" avec le bon ID lors du clic sur la corbeille', async () => {
    const wrapper = mount(TaskCard, {
      props: { task: mockTask },
    })

    // On trouve le bouton de suppression (celui qui a le title "Supprimer la tâche")
    const deleteBtn = wrapper.find('button[title="Supprimer la tâche"]')

    // On simule un vrai clic utilisateur
    await deleteBtn.trigger('click')

    // On vérifie que le composant a bien "émis" l'événement 'delete'
    expect(wrapper.emitted()).toHaveProperty('delete')
    // On vérifie que l'ID renvoyé avec l'événement est bien 'test-1'
    expect(wrapper.emitted('delete')?.[0]).toEqual(['test-1'])
  })
})

// src/features/tasks/components/TaskForm.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TaskForm from './TaskForm.vue'
import { useTaskStore } from '../stores/taskStore'

describe('TaskForm.vue', () => {
  it('ne doit pas soumettre de tâche si le titre est vide', async () => {
    const wrapper = mount(TaskForm, {
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    })
    const store = useTaskStore()

    // On simule la soumission du formulaire vide
    await wrapper.find('form').trigger('submit.prevent')

    // L'action addTask ne doit PAS avoir été appelée
    expect(store.addTask).not.toHaveBeenCalled()
  })

  it('doit soumettre une nouvelle tâche et vider le formulaire', async () => {
    const wrapper = mount(TaskForm, {
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    })
    const store = useTaskStore()

    // 1. On remplit le formulaire (Analogie Java : Remplir les champs d'un DTO)
    await wrapper.find('input#title').setValue('Apprendre les tests unitaires')
    await wrapper.find('textarea#description').setValue('Atteindre 80% de couverture')

    // 2. On soumet le formulaire
    await wrapper.find('form').trigger('submit.prevent')

    // 3. Vérifications
    expect(store.addTask).toHaveBeenCalledTimes(1)

    // On vérifie que le champ titre a bien été remis à zéro après l'ajout
    const titleInput = wrapper.find('input#title').element as HTMLInputElement
    expect(titleInput.value).toBe('')
  })
})

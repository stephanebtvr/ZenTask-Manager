import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import TasksPage from '@/features/tasks/views/TasksPage.vue'

beforeAll(() => {
  // On définit manuellement la fonction matchMedia sur l'objet window de jsdom
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false, // On simule que l'ordinateur N'EST PAS en mode sombre
      media: query,
      onchange: null,
      addListener: vi.fn(), // Fonction requise par certains vieux navigateurs
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('Task Store', () => {
  it('devrait basculer le mode sombre au clic du bouton', async () => {
    const wrapper = mount(TasksPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })

    // On trouve le bouton "Soleil/Lune" (le seul bouton de l'en-tête)
    const toggleBtn = wrapper.find('button[title*="Passer en mode"]')

    // On clique dessus pour activer le mode sombre
    await toggleBtn.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    // On reclique pour revenir au mode clair
    await toggleBtn.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })
})

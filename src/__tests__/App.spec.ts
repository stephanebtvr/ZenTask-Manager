import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing' // L'outil magique de mock
import TasksPage from '@/features/tasks/views/TasksPage.vue' // On importe LA bonne page

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

describe('TasksPage.vue', () => {
  it('renders properly', () => {
    // On monte la page en lui fournissant les dépendances globales requises
    const wrapper = mount(TasksPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })], // Simule un Store Pinia vide pour le test
      },
    })

    // Là, ça va fonctionner !
    expect(wrapper.text()).toContain('Architecture Clean avec Vue 3 & TypeScript')
  })
})

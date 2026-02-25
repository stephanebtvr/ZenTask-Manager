// src/features/tasks/stores/taskStore.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from './taskStore'
import { TaskStatus, TaskPriority } from '../domain/task'

describe('Task Store', () => {
  // Analogie Java : La méthode @BeforeEach
  // On crée un store Pinia tout neuf avant chaque test pour éviter les interférences
  beforeEach(() => {
    setActivePinia(createPinia())
    // On nettoie le localStorage pour simuler un démarrage à zéro
    localStorage.clear()
  })

  it('devrait ajouter une nouvelle tâche', () => {
    // 1. Arrange (Préparation)
    const store = useTaskStore()
    const newTask = {
      id: '123',
      title: 'Acheter du pain',
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date(),
    }

    // 2. Act (Action)
    store.addTask(newTask)

    // 3. Assert (Vérification)
    expect(store.tasks.length).toBe(1)
    expect(store.tasks[0]?.title).toBe('Acheter du pain')
    // Vérification du Getter : la tâche devrait être dans les "À faire"
    expect(store.toDoTasks.length).toBe(1)
  })

  it('devrait supprimer une tâche existante', () => {
    const store = useTaskStore()
    store.addTask({
      id: '999',
      title: 'Tâche à supprimer',
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      createdAt: new Date(),
    })

    expect(store.tasks.length).toBe(1)

    // Action : suppression
    store.deleteTask('999')

    // Vérification
    expect(store.tasks.length).toBe(0)
  })

  it("devrait changer le statut d'une tâche", () => {
    const store = useTaskStore()
    store.addTask({
      id: '456',
      title: 'Tâche en cours',
      status: TaskStatus.TODO,
      priority: TaskPriority.HIGH,
      createdAt: new Date(),
    })

    // On la passe en "Terminée"
    store.updateStatusTask('456', TaskStatus.DONE)

    expect(store.toDoTasks.length).toBe(0)
    expect(store.completedTasks.length).toBe(1)
    expect(store.tasks[0]?.status).toBe(TaskStatus.DONE)
  })
  // --- NOUVEAUX TESTS À AJOUTER DANS taskStore.spec.ts ---

  it('devrait charger les tâches depuis le localStorage au démarrage (Hydratation)', () => {
    // 1. On place une fausse donnée dans le LocalStorage AVANT d'instancier le store
    const savedTasks = [
      {
        id: 'local-1',
        title: 'Tâche persistée',
        status: 'TODO',
        priority: 'LOW',
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem('zen-tasks-storage', JSON.stringify(savedTasks))

    // 2. L'instanciation va lire le LocalStorage
    const store = useTaskStore()

    // 3. Vérification
    expect(store.tasks.length).toBe(1)
    expect(store.tasks[0]?.title).toBe('Tâche persistée')
  })

  it('ne devrait pas ajouter une tâche si son ID existe déjà', () => {
    const store = useTaskStore()
    const task = {
      id: 'doublon',
      title: 'Test',
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      createdAt: new Date(),
    }

    store.addTask(task)
    store.addTask(task) // On tente de l'ajouter une deuxième fois

    // Il ne doit y avoir qu'une seule tâche dans la liste
    expect(store.tasks.length).toBe(1)
  })

  it('ne devrait rien faire si on tente de mettre à jour une tâche introuvable', () => {
    const store = useTaskStore()
    // On met à jour un ID qui n'existe pas. Ça ne doit pas planter.
    store.updateStatusTask('fantôme', TaskStatus.DONE)

    expect(store.tasks.length).toBe(0)
  })
})

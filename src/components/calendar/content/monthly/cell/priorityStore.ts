interface IEvent {
  id: number
  priority: number
}

export class priorityStore {
  static store: IEvent[] = []

  add(event: IEvent) {
    if (priorityStore.store.find(i => i.id === event.id) === undefined) {
      priorityStore.store.push(event)
    }
  }

  clear() {
    priorityStore.store = []
  }
}

export const priorityStoreInit = new priorityStore()

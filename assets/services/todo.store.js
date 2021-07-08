class StorageManager {
  constructor() {
    this.key = 'todo-items';
  }

  set(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }
}

export const TodoItemsStorageManager = new StorageManager();

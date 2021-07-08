import { TodoItemsStorageManager } from '../../assets/services/todo.store';

export default {
  init({ commit }) {
    const items = TodoItemsStorageManager.get();
    commit('INIT', { items: items ? items : [] });
  },

  append({ commit }, item) {
    console.log(item);
    commit('APPEND', { item });
  },

  update({ commit }, item) {
    commit('UPDATE', { item });
  },

  remove({ commit }, item) {
    console.log(item);
    commit('REMOVE', { item });
  },
};

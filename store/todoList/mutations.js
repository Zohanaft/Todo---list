import { TodoItemsStorageManager } from '../../assets/services/todo.store';

// Не очень удобно работать с удалением и добавлением элементов - здесь можно было бы
// Создать структуру данных на основе массива, которая индексировалась бы по хешам без id
// таким образом можно упростить работу с элементами за счет работы с хешами
// как минимум можно было бы оставить в покое индексацию и
// просто дополнить Array или унаследоватьс от него, в таком случае можно было бы вынести логику
// с проверками на существование в отдельную сущность
// и код выглядел бы примерно так: hashArray.push(item): Exception | HashArray  (this)
// .splice(): Exception | HashArray
//
// Ну можно сказать использование хешей в подобном проекте - оверхед)

export default {
  INIT(state, { items }) {
    try {
      state.items.splice(0, state.items.length);
      state.items.push(...items);
    } catch (e) {
      console.warn('Failed init: Invalid todo list items', e.message);
    }
  },

  APPEND(state, { item }) {
    const id = JSON.stringify(item).hash();
    const index = state.items.find((todoItem) => todoItem.id === id);
    // Проверяем - существует ли уже точно такой-же объект
    if (index || item.id) {
      console.warn("Can't append existense element");
      return;
    }

    state.items.push({ id, ...item });
    TodoItemsStorageManager.set(state.items);
  },

  // По факту то же что APPEND, только приоритет на обновление существующего item
  UPDATE(state, { item }) {
    try {
      const index = state.items.findIndex(
        (todoItem) => todoItem.id === item.id,
      );
      console.log(index);
      state.items.splice(index, 1, item);
      TodoItemsStorageManager.set(state.items);
    } catch (e) {
      const id = JSON.stringify(item).hash();
      state.items.push({ id, ...item });
      TodoItemsStorageManager.set(state.items);
    }
  },

  REMOVE(state, { item }) {
    const index = state.items.findIndex((todoItem) => todoItem.id === item.id);
    console.log(index, item.id);
    state.items.splice(index, 1);
    TodoItemsStorageManager.set(state.items);
  },
};

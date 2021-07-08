<template>
  <div class="todo-item position-relative">
    <div class="d-flex">
      <span class="todo-item--title">{{ todoItem.title }}</span>
      <span v-if="todoItem.dt" class="todo-item-dt">{{ todoItem.dt }}</span>
    </div>
    <span v-if="todoItem.description" class="todo-item--description">{{
      todoItem.description
    }}</span>
    <span class="todo-item--id">id: ({{ todoItem.id }})</span>

    <slot class="d-flex row-cols-auto position-absolute" />
  </div>
</template>

<script>
export default {
  props: {
    todoItem: {
      default: () => ({}),
      type: Object | undefined,
    },
  },
  data: () => {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: lightgray;
  cursor: pointer;
  user-select: none;

  &--id {
    margin-top: 10px;
    font-size: 0.7em;
    color: lightslategrey;
  }

  &--description {
    padding-top: 10px;
    font-size: 0.8em;
  }

  &-dt {
    margin-left: auto;
    color: lightslategrey;
    font-size: 0.7em;
  }
}
</style>

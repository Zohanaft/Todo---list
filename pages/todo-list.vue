<template>
  <section class="container-fluid">
    <div class="d-flex flex-row">
      <div class="d-flex">
        <h1>TODO-LIST</h1>
      </div>
      <div
        class="
          d-flex
          flex-fill
          justify-content-end
          align-items-baseline
          mt-auto
          mb-1
        "
      >
        <button class="btn-group-rounded" @click="groupByReadyState = false">
          <span class="mdi mdi-format-list-bulleted"></span>
        </button>
        <button class="btn-group-rounded" @click="groupByReadyState = true">
          <span class="mdi mdi-format-columns"></span>
        </button>
      </div>
    </div>
    <div class="row" v-if="groupByReadyState">
      <div class="col-6">
        <todo-list-item
          v-for="(item, index) in items.filter((item) => !item.done)"
          :key="index"
          :todoItem="item"
          @click.native="
            update({
              ...item,
              done: !item.done,
            })
          "
        >
          <div class="position-absolute mt-2">
            <span class="btn-rounded color-green">
              <span class="mdi mdi-cancel"></span>
            </span>
            <span
              class="btn-rounded color-red"
              @click.prevent.stop="remove(item)"
            >
              <span class="mdi mdi-plus"></span>
            </span>
          </div>
        </todo-list-item>
      </div>
      <div class="col-6">
        <todo-list-item
          v-for="(item, index) in items.filter((item) => item.done)"
          :key="index"
          :todoItem="item"
          @click.native="
            update({
              ...item,
              done: !item.done,
            })
          "
        >
          <div class="position-absolute mt-2">
            <span class="btn-rounded color-green">
              <span class="mdi mdi-read"></span>
            </span>
            <span
              class="btn-rounded color-red"
              @click.prevent.stop="remove(item)"
            >
              <span class="mdi mdi-plus"></span>
            </span>
          </div>
        </todo-list-item>
      </div>
    </div>
    <div class="row" v-if="!groupByReadyState">
      <div class="col-12">
        <todo-list-item
          v-for="(item, index) in items"
          :key="index"
          :todoItem="item"
          @click.native="
            update({
              ...item,
              done: !item.done,
            })
          "
        >
          <div class="position-absolute mt-2">
            <span class="btn-rounded color-green">
              <span v-if="item.done" class="mdi mdi-read"></span>
              <span v-else class="mdi mdi-cancel"></span>
            </span>
            <span
              class="btn-rounded color-red"
              @click.prevent.stop="remove(item)"
            >
              <span class="mdi mdi-plus"></span>
            </span>
          </div>
        </todo-list-item>
      </div>
    </div>

    <div class="row">
      <append-todo-list-item class="col" @update:date="append($event)" />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppendTodoListItem from '../components/AppendTodoListItem.vue';

export default {
  components: { AppendTodoListItem },
  name: 'TodoListPage',
  data: () => {
    return {
      groupByReadyState: false,
      currentUpdateItem: {},
    };
  },
  computed: mapState('todoList', {
    items: (state) => state.items,
  }),
  methods: mapActions('todoList', ['init', 'append', 'remove', 'update']),
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped></style>

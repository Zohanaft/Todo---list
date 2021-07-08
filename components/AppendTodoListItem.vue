<template>
  <form @submit.prevent class="append-todo-item-form">
    <input
      type="text"
      name="title"
      id="title"
      required
      autofocus
      aria-required="1"
      placeholder="Title"
      v-model="todoItemCopy.title"
    />

    <textarea
      name="description"
      id="description"
      placeholder="Description text"
      v-model="todoItemCopy.description"
    />

    <div class="done">
      <label for="done">Ready? </label>
      <input
        type="checkbox"
        name="done"
        id="done"
        v-model="todoItemCopy.done"
      />
    </div>

    <input
      type="text"
      required
      name="dt"
      v-model="todoItemCopy.dt"
      v-mask="mask"
    />

    <button @click="validate">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    todoItem: {
      default: () => ({}),
      type: Object | undefined,
    },
  },
  data: (self) => {
    return {
      maskedValueDate: new Date(),
      mask: [
        '2',
        '0',
        /\d/,
        /\d/,
        '-',
        /[0-1]/,
        /[0-9]/,
        '-',
        /[0-1]/,
        /[0-9]/,
        ' ',
        /[0-2]/,
        /[0-9]/,
        ':',
        /[0-6]/,
        /[0-9]/,
      ],
      todoItemCopy: {
        title: '',
        description: '',
        done: false,
        dt: new Date().toLocaleString('az', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hourCycle: 'h24',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    };
  },
  computed: {
    maskedValue: {
      get() {
        return this.maskedValue;
      },
      set(val) {
        this.maskedValue = val;
      },
    },
  },
  methods: {
    validate() {
      try {
        const dt = new Date();
        const year = dt.getFullYear();
        const month = dt.getMonth();
        const day = dt.getDate();
        const hours = 23;
        const minutes = 59;
        const seconds = 59;

        const test = new Date(
          year,
          month,
          day - 1,
          hours,
          minutes,
          seconds,
        ).getTime();

        const date = new Date(this.todoItemCopy.dt).getTime();
        if (date >= test) {
          this.$emit(
            'update:date',
            JSON.parse(JSON.stringify(this.todoItemCopy)),
          );
        }
      } catch (e) {
        alert('Incorrect date');
        console.warn(e.message);
        return;
      }
    },
    getFormatDate(date = Date.now()) {
      return new Date(date).toLocaleString('az', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hourCycle: 'h24',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  mounted() {
    const copyTodoItem = JSON.parse(JSON.stringify(this.todoItem));
    copyTodoItem.dt = copyTodoItem.dt
      ? getFormatDate(copyTodoItem.dt)
      : this.todoItemCopy.dt;
    this.todoItemCopy = Object.assign(copyTodoItem, this.todoItemCopy);
  },
};
</script>

<style lang="scss" scoped>
.append-todo-item-form {
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 0 auto;
  margin-bottom: 20px;

  & > * {
    margin-top: 20px;
  }
}
</style>

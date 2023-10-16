<style>
label {
  user-select: none;
}

.form-todo {
  margin-bottom: 30px;
}

.fields-todo-form {
  margin-bottom: 25px;
}

.fields-todo-form__input {
  width: 100%;
}

.input {
  padding: 8px;
}

.fields-todo-form__input:not(:last-child) {
  margin-bottom: 15px;
}

.todo-section {
  margin-top: 30px;
  margin-bottom: 30px;
}

.todo-section__form {
  padding: 30px;
  border: 1px solid black;
  max-width: 350px;
}

.fields-todo-form__label {
  display: block;
  width: 100%;
}

.form-todo__button {
  display: block;
  padding: 10px;
  width: 100%;
  background-color: #519945;
  border: none;
}
.todo-list {
  border: 1px solid black;
  padding: 30px;
}

.todo-list__header {
  margin-bottom: 15px;
}

.todo-list__filters {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: left;
  flex-wrap: wrap;
  gap: 30px;
}

.filters__label {
  padding-right: 6px;
}

.list-todo {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 10px;
}

#todo-list-filter__by-status {
  min-width: 200px;
}
#todo-list-filter__by-id {
  min-width: 100px;
}
#todo-list-filter__search {
  min-width: 200px;
}
</style>

<template>
  <section class="todo-section">
    <form class="todo-section__form form-todo" action="">
      <div class="form-todo__fields fields-todo-form">
        <label
          class="fields-todo-form__label"
          for="fields-todo-form__input-user-id"
        >
          User ID:
        </label>
        <input
          v-model="newTodo.userId"
          class="fields-todo-form__input input"
          id="fields-todo-form__input-user-id"
          type="text"
        />
        <label
          class="fields-todo-form__label"
          for="fields-todo-form__input-title"
        >
          Title:
        </label>
        <input
          v-model="newTodo.title"
          class="fields-todo-form__input input"
          id="fields-todo-form__input-title"
          type="text"
        />
      </div>
      <button @click.prevent="addTodo" class="form-todo__button" type="submit">Add</button>
    </form>
    <div class="todo-section__todo-list todo-list">
      <header class="todo-list__header">
        <div class="todo-list__filters filters">
          <div class="filters__status-filter">
            <label class="filters__label" for="todo-list-filter__by-status"
              >Status
            </label>
            <select class="input" name="" id="todo-list-filter__by-status">
              <option value="All">All</option>
            </select>
          </div>
          <div class="filters__id-filter">
            <label class="filters__label" for="todo-list-filter__by-id"
              >User ID:</label
            >
            <select class="input" name="" id="todo-list-filter__by-id">
              <option value=""></option>
            </select>
          </div>
          <div class="filters__search-filter">
            <label class="filters__label" for="todo-list-filter__search"
              >Text</label
            >
            <input class="input" type="text" id="todo-list-filter__search" />
          </div>
        </div>
      </header>
      <div class="list-todo">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import axios from "axios";
export default {
  name: "TodoList",
  components: { TodoItem },
  data() {
    return {
      newTodo: {
        userId: "",
        title: "",
      },
      todos: [],
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        this.todos = response.data;
        console.log("this.todos", this.todos)
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
  },
  addTodo() {
    if (!this.newTodo.userId || !this.newTodo.title) {
      alert("User ID and Title are required.");
      return;
    }
    this.todos.push(this.newTodo);
    this.newTodo = {
      userId: "",
      title: "",
    };
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>

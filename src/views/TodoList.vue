<script>
import axios from "axios";
import TodoItem from "../components/TodoItem.vue";
import FilterSelect from "../components/FilterSelect.vue";
import FilterInput from "../components/FilterInput.vue";

export default {
  name: "TodoList",
  components: { FilterInput, FilterSelect, TodoItem },
  data() {
    return {
      newTodo: {
        userId: "",
        title: "",
        id: 0,
      },
      todos: [],
      favorites: [],
      favoriteFilter: "All",
      options: [],
      activeFilters: {},
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const url = "https://jsonplaceholder.typicode.com/todos";
        const response = await axios.get(url, {
          params: {
            ...this.activeFilters,
          },
        });
        if (response.data.length) {
          if (this.favoriteFilter === "All") {
            this.todos = response.data;
          } else {
            console.log("response.data", response.data);
            this.todos = response.data.filter((todo) =>
              this.favorites.includes(todo.id)
            );
          }
          if (!this.options.length) {
            this.makeOptions();
          }
        } else {
          this.todos = [];
          console.warn("Empty response");
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    addTodo() {
      if (!this.newTodo.userId || !this.newTodo.title) {
        alert("User ID and Title are required.");
        return;
      }
      this.todos.unshift(this.newTodo);
      this.newTodo = {
        ...this.newTodo,
        userId: "",
        title: "",
      };
      this.incrementId();
    },
    incrementId() {
      this.newTodo.id++;
    },
    addToFavorite(id) {
      const localStoreData =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const indexOfStorage = localStoreData.indexOf(id);
      if (indexOfStorage === -1) {
        localStoreData.push(id);
      } else {
        localStoreData.splice(indexOfStorage, 1);
      }
      this.favorites = localStoreData;
      localStorage.setItem("favorites", JSON.stringify(localStoreData));
    },
    makeOptions() {
      const optionsMap = this.todos.reduce((acc, current) => {
        for (const key in current) {
          if (acc[key]) {
            acc[key].add(current[key]);
          } else {
            acc[key] = new Set();
            acc[key].add(current[key]);
          }
        }
        return acc;
      }, {});
      for (const optionsMapKey in optionsMap) {
        const key = optionsMapKey;
        if (["title"].includes(key)) {
          this.activeFilters.q = [];
          continue;
        }
        const optionValues = [...optionsMap[optionsMapKey]];
        if (key === "id") {
          const max = optionValues.reduce((a, b) => Math.max(a, b), -Infinity);
          this.newTodo.id = max + 1;
        }
        this.activeFilters[key] = [];
        if (key === "completed") {
          this.options.push({
            name: key,
            values: optionValues.map((item) =>
              this.completedOptionConverter(item.toString())
            ),
          });
        } else {
          this.options.push({ name: key, values: optionValues });
        }
      }
    },
    setFilter(property, value) {
      if (["All", ""].includes(value)) {
        this.activeFilters[property] = [];
      } else {
        if (property === "completed") {
          this.activeFilters[property] = this.completedOptionConverter(value);
        } else {
          this.activeFilters[property] = value;
        }
      }
      this.fetchTodos();
    },
    completedOptionConverter(str) {
      const map = {
        true: "completed",
        completed: "true",
        false: "not completed",
        "not completed": "false",
      };
      return map[str];
    },
    setFavoriteFilter(property, value) {
      this.favoriteFilter = value;
      this.fetchTodos();
    },
  },
  mounted() {
    this.fetchTodos();
    this.favorites = JSON.parse(localStorage.getItem("favorites")).sort() || [];
  },
};
</script>

<template>
  <section class="todo-section">
    <form class="todo-section__form form-todo" action="">
      <div class="form-todo__title">Add todo</div>
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
      <button @click.prevent="addTodo" class="form-todo__button" type="submit">
        Add
      </button>
    </form>
    <div class="todo-section__todo-list todo-list">
      <header class="todo-list__header">
        <h2 class="todo-list__title">Todos:</h2>
        <div class="todo-list__filters">
          <FilterSelect
            v-for="select in options"
            :selectName="select.name"
            :selectOptions="select.values"
            :setFilter="setFilter"
            :key="select.name"
          />
          <FilterSelect
            :selectName="'Favorite'"
            :selectOptions="['Favorite']"
            :setFilter="setFavoriteFilter"
          />
          <FilterInput :selectName="q" :setFilter="setFilter" />
        </div>
      </header>
      <div v-if="todos.length" class="list-todo">
        <TodoItem
          v-for="todo in todos"
          :favorite="favorites.includes(todo.id)"
          :addToFavorite="addToFavorite"
          :key="todo.id"
          :todo="todo"
        />
      </div>
      <div v-if="!todos.length" class="div">
        <p>По данному фильтру ничего не найдено</p>
      </div>
    </div>
  </section>
</template>

<style>
label {
  user-select: none;
}

.form-todo {
  margin-bottom: 30px;
}

.form-todo__title {
  font-size: 25px;
  margin-top: -10px;
  margin-bottom: 5px;
}

.fields-todo-form {
  margin-bottom: 25px;
}

.fields-todo-form__input {
  width: 100%;
}

.input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
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
  border-radius: 5px;
  background-color: #a5a5a5;
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
  border-radius: 5px;
  color: white;
}

.form-todo__button:hover {
  color: #000000;
  box-shadow: 2px 4px 8px 1px #181818;
  transform: translateY(-1px) scale(1.03);
}
.form-todo__button:active {
  color: #000000;
  transform: translateY(0);
}

.todo-list {
  border: 1px solid black;
  padding: 30px;
  background-color: #a5a5a5;
  border-radius: 5px;
}

.todo-list__header {
  margin-bottom: 15px;
}

.todo-list__title {
  text-align: center;
  font-size: 30px;
  margin-top: -10px;
}

.todo-list__filters {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: left;
  flex-wrap: wrap;
  gap: 20px;
}

.list-todo {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 10px;
}
@media (max-width: 768px) {
  .list-todo {
    grid-template-columns: 1fr;
  }
}
</style>

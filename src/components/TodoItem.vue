<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
    favorite: Boolean,
    addToFavorite: Function,
  },
};
</script>

<template>
  <article class="todo" :class="{ completed: todo.completed }">
    <div class="todo__content">
      <div class="todo__content-header header-todo">
        <p class="header-todo__item">Id: {{ todo.id }}</p>
        <p class="header-todo__item">UserId: {{ todo.userId }}</p>
        <p class="header-todo__item header-todo__item--completed">
          {{ todo.completed ? "Completed ✅" : "Not completed ❌" }}
        </p>
      </div>
      <div class="todo__content-body body-todo">
        <p class="body-todo__item" :class="{ through: todo.completed }">
          Title: {{ todo.title }}
        </p>
      </div>
    </div>
    <button
      class="todo__button"
      :class="{ favorite: favorite }"
      @click="addToFavorite(todo.id)"
    />
  </article>
</template>

<style>
.todo {
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  background-color: #c3c3c3;
}

.todo__content-header {
  max-width: 80%;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

@media (max-width: 460px) {
  .todo__content-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 0;
  }
}

.header-todo__item {
  margin-right: 15px;
}
.through {
  text-decoration: line-through;
}

.completed {
  background-color: #8a9d8b;
}
.header-todo__item--completed {
  margin-left: auto;
}

@media (max-width: 460px){
  .header-todo__item--completed {
    margin-left: 0;
  }
}

.body-todo__item {
  font-size: 20px;
}

.todo__button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  background-color: transparent;
  border: none;
  filter: grayscale(100%);
  cursor: pointer;
  font-size: 20px;
}

.favorite {
  filter: grayscale(0);
}

.todo__button:hover {
  filter: grayscale(0);
}

.todo__button:after {
  content: "⭐";
}
</style>

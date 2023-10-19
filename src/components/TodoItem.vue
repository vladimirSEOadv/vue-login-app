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
  <article class="todo">
    <div class="todo__content">
      <p>completed: {{ todo.completed }}</p>
      <p>id: {{ todo.id }}</p>
      <p>title: {{ todo.title }}</p>
      <p>userId: {{ todo.userId }}</p>
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

.todo__button {
  position: absolute;
  top: 6px;
  right: 5px;
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

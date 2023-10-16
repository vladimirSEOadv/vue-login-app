<template>
  <article class="todo">
    <p>completed: {{ todo.completed }}</p>
    <p>id: {{ todo.id }}</p>
    <p>title: {{ todo.title }}</p>
    <p>userId: {{ todo.userId }}</p>
    <button class="todo__button"></button>
  </article>
</template>

<style>
.todo {
  border: 1px solid red;
  padding: 10px;
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

.todo__button:after {
  content: "⭐";
}
</style>
<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
  },
};
</script>

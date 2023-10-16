<template>
  <div class="container">
    <UserInfo />
    <TodoList />
  </div>
</template>

<script>
import UserInfo from "../components/UserInfo.vue";
import TodoList from "./TodoList.vue";

export default {
  components: { TodoList, UserInfo },
  data() {
    return {
      todo: [],
    };
  },
};
</script>

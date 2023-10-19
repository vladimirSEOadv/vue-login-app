<script>
import UserInfo from "../components/UserInfo.vue";
import TodoList from "./TodoList.vue";

export default {
  components: { TodoList, UserInfo },
  data() {
    return {
      todo: [],
      userInfo: null,
    };
  },
  created() {
    this.userInfo = this.$store.state.user;
  },
};
</script>

<template>
  <div class="container">
    <UserInfo :user-info="userInfo" />
    <TodoList />
  </div>
</template>

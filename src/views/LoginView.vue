<script setup lang="ts">
import Login from "@/components/LoginForm.vue";
import { store } from "../store/store";
const data = () => store.state.data;
</script>

<template>
  <div class="login-page-wrapper">
    <Login />
    <h1>Id пользователя: {{ data.id }}</h1>
  </div>
</template>

<style scoped>
.login-page-wrapper {
  margin-top: 208px;
  margin-bottom: 243px;
}
</style>

<script setup lang="ts">
import Login from "@/components/LoginForm.vue";
</script>

<template>
  <div class="login-page-wrapper">
    <Login />
  </div>
</template>

<style scoped>
.login-page-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
</style>

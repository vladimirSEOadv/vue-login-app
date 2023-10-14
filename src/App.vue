<script setup lang="ts"></script>

<template>
  <div id="app">
    <div class="app-wrapper">
      <header class="header"></header>
      <main class="main">
        <router-view />
      </main>
      <footer class="footer"></footer>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.header {
  height: 60px;
  background-color: #474747;
}

.main {
  flex: 1 1 auto;
}

.footer {
  height: 270px;
  background-color: #474747;
}
</style>

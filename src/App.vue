<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; 2026 Defense Transformation</p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
/* global styles could be in main.css but simple base here */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding: 2rem;
}
.footer {
  text-align: center;
  padding: 1rem;
  background-color: #192a56;
  color: #fff;
}
</style>

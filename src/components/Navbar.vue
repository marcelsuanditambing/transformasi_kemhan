<template>
  <nav class="navbar">
    <ul>
      <li>
        <router-link to="/" exact-active-class="active">Landing Page</router-link>
      </li>
      <li>
        <router-link to="/arsitektur" active-class="active">Arsitektur Transformasi Digital Kemhan</router-link>
      </li>
      <li>
        <router-link to="/roadmap" active-class="active">Roadmap Transformasi Digital</router-link>
      </li>
      <li>
        <router-link to="/jadc2" active-class="active">JADC2 (Joint All Defense Command Center)</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// no script necessary for now
</script>

<style scoped>
.navbar {
  background-color: #1e272e;
  color: white;
  padding: 1rem 2rem;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}
.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}
.navbar a:hover {
  color: #4b7bec;
}
.navbar .active {
  border-bottom: 2px solid #4b7bec;
}
@media (max-width: 600px) {
  .navbar ul {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

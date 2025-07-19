<script setup>
import Navbar from "./components/Navbar.vue";
import CategoryList from "./components/CategoryList.vue";
</script>

<template>
  <Navbar />
  <CategoryList />
</template>

<style>
body {
  margin: 0;
  overflow-x: hidden;
  font-family: "Poppins", "Segoe UI", "Roboto", "Helvetica Neue", Arial,
    sans-serif;
  background-color: #e8ecfd;
  color: #232946;
  font-weight: 400;
  letter-spacing: 0.02em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", "Segoe UI", "Roboto", "Helvetica Neue", Arial,
    sans-serif;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: 0.03em;
}

button,
input,
.logo-text {
  font-family: "Poppins", "Segoe UI", "Roboto", "Helvetica Neue", Arial,
    sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
}
</style>

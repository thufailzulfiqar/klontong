<script setup>
import Navbar from "./components/Navbar.vue";
import CategoryList from "./components/CategoryList.vue";
import ProductList from "./components/ProductList.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);
const router = useRouter();

router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});
router.afterEach(() => {
  setTimeout(() => {
    loading.value = false;
  }, 200);
});
</script>

<template>
  <div v-if="loading" class="global-loading">
    <div class="spinner"></div>
  </div>
  <router-view />
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

.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 6px solid #2563eb;
  border-top: 6px solid #e8ecfd;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

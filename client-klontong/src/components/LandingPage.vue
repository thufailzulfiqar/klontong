<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./Navbar.vue";
import CategoryList from "./CategoryList.vue";
import ProductList from "./ProductList.vue";
import { useRouter } from "vue-router";

const showAddProduct = ref(false);
const showManageUser = ref(false);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users/me", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      const role = data?.user?.role;
      showAddProduct.value = role === "admin" || role === "staff";
      showManageUser.value = role === "admin";
    }
  } catch {
    showAddProduct.value = false;
    showManageUser.value = false;
  }
});

function goToAddProduct() {
  router.push("/add-product");
}

function goToManageUser() {
  router.push("/manage-user");
}
</script>

<template>
  <Navbar />
  <div class="action-btn-group" v-if="showAddProduct || showManageUser">
    <button
      v-if="showAddProduct"
      class="add-product-btn"
      @click="goToAddProduct"
    >
      + Add Product
    </button>
    <button
      v-if="showManageUser"
      class="manage-user-btn"
      @click="goToManageUser"
    >
      Manage User
    </button>
  </div>
  <CategoryList />
  <ProductList />
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

.action-btn-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 48px auto 0 auto;
}

.add-product-btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.add-product-btn:hover {
  background: #1d4fbf;
}

.manage-user-btn {
  background: #ff3f3f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.manage-user-btn:hover {
  background: #e63946;
}
</style>

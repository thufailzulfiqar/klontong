<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./Navbar.vue";
import CategoryList from "./CategoryList.vue";
import ProductList from "./ProductList.vue";
import { useRouter } from "vue-router";

const showAddProduct = ref(false);
const showManageUser = ref(false);
const userName = ref("");
const router = useRouter();

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users/me", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      const role = data?.user?.role;
      userName.value = data?.user?.name || "";
      showAddProduct.value = role === "admin" || role === "staff";
      showManageUser.value = role === "admin";
    }
  } catch {
    showAddProduct.value = false;
    showManageUser.value = false;
    userName.value = "";
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
  <div v-if="userName" class="hello-user">Hello, {{ userName }}!</div>
  <div class="action-btn-group" v-if="showAddProduct || showManageUser">
    <button
      v-if="showAddProduct"
      class="add-product-btn"
      @click="goToAddProduct"
    >
      + Tambah Produk
    </button>
    <button
      v-if="showManageUser"
      class="manage-user-btn"
      @click="goToManageUser"
    >
      Kelola User
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

.hello-user {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 24px;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: 0.04em;
  background: linear-gradient(90deg, #b9c5fd 0%, #ffe2e2 100%);
  border-radius: 12px;
  padding: 10px 0 10px 0;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.07);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.action-btn-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 8px auto 0 auto;
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

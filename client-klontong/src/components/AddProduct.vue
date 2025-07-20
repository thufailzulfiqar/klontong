<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const categories = ref([]);
const selectedCategoryId = ref("");
const sku = ref("");
const name = ref("");
const description = ref("");
const weight = ref("");
const width = ref("");
const length = ref("");
const height = ref("");
const image = ref("");
const price = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");
const router = useRouter();

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories");
    if (res.ok) {
      categories.value = await res.json();
    }
  } catch {
    categories.value = [];
  }
});

function validateForm() {
  if (
    !selectedCategoryId.value ||
    !sku.value ||
    !name.value ||
    !description.value ||
    !weight.value ||
    !width.value ||
    !length.value ||
    !height.value ||
    !image.value ||
    !price.value
  ) {
    error.value = "Semua field wajib diisi";
    return false;
  }
  if (!/^https?:\/\/.+/.test(image.value)) {
    error.value = "URL gambar tidak valid";
    return false;
  }
  if (isNaN(Number(price.value)) || Number(price.value) < 1) {
    error.value = "Harga harus angka dan minimal 1";
    return false;
  }
  return true;
}

async function handleSubmit() {
  error.value = "";
  success.value = "";
  if (!validateForm()) {
    return;
  }
  loading.value = true;
  const selectedCategory = categories.value.find(
    (cat) => cat.id === Number(selectedCategoryId.value)
  );
  try {
    const res = await fetch("http://localhost:3000/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        CategoryId: Number(selectedCategoryId.value),
        categoryName: selectedCategory?.name || "",
        sku: sku.value,
        name: name.value,
        description: description.value,
        weight: Number(weight.value),
        width: Number(width.value),
        length: Number(length.value),
        height: Number(height.value),
        image: image.value,
        price: Number(price.value),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      success.value = "Produk berhasil ditambahkan!";
      error.value = "";
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      error.value = data.message || "Gagal menambah produk";
      success.value = "";
    }
  } catch (err) {
    error.value = "Gagal terhubung ke server";
    success.value = "";
  }
  loading.value = false;
}

function goBack() {
  window.location.href = "/";
}
</script>

<template>
  <div class="add-product-container">
    <h2>Tambah Produk</h2>
    <form @submit.prevent="handleSubmit" class="add-product-form">
      <select v-model="selectedCategoryId" required>
        <option value="" disabled selected>Pilih Kategori</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
      <input v-model="sku" type="text" placeholder="SKU" required />
      <input v-model="name" type="text" placeholder="Nama Produk" required />
      <textarea
        v-model="description"
        placeholder="Deskripsi"
        required
      ></textarea>
      <input
        v-model="weight"
        type="number"
        placeholder="Berat (gram)"
        required
      />
      <input v-model="width" type="number" placeholder="Lebar (cm)" required />
      <input
        v-model="length"
        type="number"
        placeholder="Panjang (cm)"
        required
      />
      <input
        v-model="height"
        type="number"
        placeholder="Tinggi (cm)"
        required
      />
      <input v-model="image" type="url" placeholder="URL Gambar" required />
      <input v-model="price" type="number" placeholder="Harga (Rp)" required />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Tambah Produk" }}
      </button>
      <div v-if="error" class="add-product-error">{{ error }}</div>
      <div v-if="success" class="add-product-success">{{ success }}</div>
    </form>
  </div>
  <button class="back-btn" @click="goBack">← Kembali</button>
</template>

<style scoped>
.add-product-container {
  width: 400px;
  max-width: 640px;
  margin: 10px auto 0;
  padding: 40px 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-product-form {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input,
textarea,
select {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #cdd3d9;
  font-size: 1rem;
  background: #f8fafd;
  color: #232946;
  transition: border-color 0.2s, box-shadow 0.2s;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%232569eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px 18px;
  cursor: pointer;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

button[type="submit"] {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button[type="submit"]:disabled {
  background: #d9dde2;
  color: #888;
  cursor: not-allowed;
}

.add-product-error {
  color: #ff3f3f;
  font-size: 0.98rem;
  margin-top: 8px;
  text-align: center;
}

.add-product-success {
  color: #48b400;
  font-size: 0.98rem;
  margin-top: 8px;
  text-align: center;
  font-weight: 500;
}

.back-btn {
  margin: 24px auto 0 auto;
  display: block;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #1d4fbf;
}
</style>

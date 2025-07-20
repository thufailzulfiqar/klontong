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
  if (!validateForm()) {
    alert(error.value);
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
      alert("Produk berhasil ditambahkan!");
      router.push("/");
    } else {
      error.value = data.message || "Gagal menambah produk";
      alert(error.value);
    }
  } catch (err) {
    error.value = "Gagal terhubung ke server";
    alert(error.value);
  }
  loading.value = false;
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
    </form>
  </div>
</template>

<style scoped>
.add-product-container {
  max-width: 480px;
  margin: 40px auto 0;
  padding: 32px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-product-form {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

input,
textarea {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #cdd3d9;
  font-size: 1rem;
  background: #f8fafd;
  color: #232946;
}

textarea {
  min-height: 60px;
  resize: vertical;
}

input:focus,
textarea:focus {
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
</style>

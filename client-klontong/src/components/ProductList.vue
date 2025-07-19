<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const products = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/products");
    products.value = res.data;
  } catch (error) {
    console.error("Gagal fetch products:", error);
  }
});
</script>

<template>
  <div class="product-list-container">
    <div class="header">
      <h2>Daftar Produk</h2>
    </div>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">
            Rp{{ product.price.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list-container {
  margin-top: 32px;
  padding: 0;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.header {
  margin-bottom: 16px;
}

.header h2 {
  font-size: 1.1rem;
  color: #222;
  margin: 0;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.product-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, transform 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  transform: translateY(-4px) scale(1);
  border-color: #2563eb;
}

.product-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.product-info {
  width: 100%;
  text-align: center;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #232946;
  margin-bottom: 4px;
}

.product-price {
  font-size: 0.95rem;
  color: #2563eb;
  font-weight: 500;
}

@media (max-width: 600px) {
  .product-list-container {
    max-width: 100vw;
    padding: 0 8px;
  }
  .product-list {
    gap: 10px;
  }
  .product-image {
    height: 80px;
  }
}
</style>

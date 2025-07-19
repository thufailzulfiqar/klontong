<template>
  <div class="category-list-container">
    <div class="header">
      <h2>Kategori Belanja</h2>
      <div class="header-line"></div>
    </div>
    <div class="category-list">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @click="handleCategoryClick(category)"
        :class="{ active: selectedCategoryId === category.id }"
      />
    </div>
    <div v-if="products.length" class="category-products">
      <div class="category-products-title">Produk pada kategori ini:</div>
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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import CategoryCard from "./CategoryCard.vue";

const categories = ref([]);
const selectedCategoryId = ref(null);
const products = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/categories");
    categories.value = res.data;
  } catch (error) {
    console.error("Gagal fetch categories:", error);
  }
});

async function handleCategoryClick(category) {
  if (selectedCategoryId.value === category.id) {
    selectedCategoryId.value = null;
    products.value = [];
    return;
  }
  selectedCategoryId.value = category.id;
  try {
    const res = await axios.get(
      `http://localhost:3000/api/products/category/${category.id}`
    );
    products.value = res.data;
  } catch (error) {
    products.value = [];
  }
}
</script>

<style scoped>
.category-list-container {
  margin-top: 56px;
  padding: 0;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  margin: 0 4px 12px;
}

.header h2 {
  font-size: 1.2rem;
  color: #222;
  margin: 0;
  padding-right: 12px;
  z-index: 1;
}

.header-line {
  flex: 1;
  height: 2px;
  background: #d9dde2;
  margin-left: 12px;
  border-radius: 1px;
}

.category-list {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 0 0 12px 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  box-sizing: border-box;
}

.category-list::-webkit-scrollbar {
  height: 5px;
  background: transparent;
}

.category-list::-webkit-scrollbar-thumb {
  background-color: #70b3ff;
  border-radius: 12px;
}

.category-list::-webkit-scrollbar-track {
  background: transparent;
}

.category-card {
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.category-card:hover,
.category-card.active {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  border-color: #2563eb;
  background: #e8ecfd;
}

.category-products {
  margin-top: 24px;
}
.category-products-title {
  font-size: 1rem;
  font-weight: 500;
  color: #2563eb;
  margin-bottom: 10px;
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
  transform: translateY(-4px) scale(1.04);
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
  .header {
    margin: 0 12px 10px;
  }
  .header-line {
    margin-left: 8px;
  }
  .category-list {
    gap: 10px;
    padding-left: 12px;
  }
  .product-list {
    gap: 10px;
  }
  .product-image {
    height: 80px;
  }
}
</style>

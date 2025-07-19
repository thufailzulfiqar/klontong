<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";

const products = ref([]);
const page = ref(1);
const lastPage = ref(1);
const total = ref(0);
const loading = ref(false);

async function fetchProducts(p = 1) {
  loading.value = true;
  try {
    const res = await axios.get(
      `http://localhost:3000/api/products/page?page=${p}`
    );
    products.value = res.data.data;
    page.value = res.data.page;
    lastPage.value = res.data.lastPage;
    total.value = res.data.total;
  } catch (error) {
    products.value = [];
  }
  loading.value = false;
}

onMounted(() => {
  fetchProducts(1);
});

function goToPage(p) {
  if (p < 1 || p > lastPage.value || p === page.value) return;
  fetchProducts(p);
}

// Show max 3 pages, sliding window
const visiblePages = computed(() => {
  if (lastPage.value <= 3) {
    return Array.from({ length: lastPage.value }, (_, i) => i + 1);
  }
  if (page.value <= 2) {
    return [1, 2, 3];
  }
  if (page.value >= lastPage.value - 1) {
    return [lastPage.value - 2, lastPage.value - 1, lastPage.value];
  }
  return [page.value - 1, page.value, page.value + 1];
});
</script>

<template>
  <div class="product-list-container">
    <div class="header">
      <h2>Daftar Produk</h2>
      <div class="header-line"></div>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="$router.push(`/product/${product.id}`)"
        style="cursor: pointer"
      >
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">
            Rp{{ product.price.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="lastPage > 1">
      <button
        class="page-btn"
        :disabled="page === 1"
        @click="goToPage(page - 1)"
      >
        &lt;
      </button>
      <button
        v-for="p in visiblePages"
        :key="p"
        class="page-btn"
        :class="{ active: page === p }"
        @click="goToPage(p)"
      >
        {{ p }}
      </button>
      <button
        class="page-btn"
        :disabled="page === lastPage"
        @click="goToPage(page + 1)"
      >
        &gt;
      </button>
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.header h2 {
  font-size: 1.2rem;
  color: #222;
  margin: 0;
  z-index: 1;
  padding-right: 12px;
}

.header-line {
  flex: 1;
  height: 2px;
  background: #d9dde2;
  margin-left: 12px;
  border-radius: 1px;
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

.loading {
  text-align: center;
  color: #2563eb;
  font-size: 1.1rem;
  margin: 24px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 24px 0 0 0;
}

.page-btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.page-btn:disabled {
  background: #d9dde2;
  color: #888;
  cursor: not-allowed;
}
.page-btn.active {
  background: #ffa41c;
  color: #232946;
}

@media (max-width: 600px) {
  .product-list-container {
    max-width: 100vw;
    padding: 0 8px;
  }
  .product-list {
    gap: 16px;
  }
  .product-image {
    height: 100px;
  }
  .pagination {
    gap: 12px;
  }
  .page-btn {
    padding: 6px 12px;
    font-size: 0.95rem;
  }
  .page-info {
    font-size: 0.95rem;
  }
}
</style>

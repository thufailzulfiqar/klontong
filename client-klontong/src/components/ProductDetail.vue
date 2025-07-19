<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "./Navbar.vue";

const product = ref(null);
const route = useRoute();
const router = useRouter();

watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return;
    try {
      const res = await fetch(`http://localhost:3000/api/products/${newId}`);
      if (res.ok) {
        product.value = await res.json();
      } else {
        product.value = null;
      }
    } catch {
      product.value = null;
    }
  },
  { immediate: true }
);

function goBack() {
  router.back();
}
</script>

<template>
  <Navbar />
  <div class="product-detail-container" v-if="product">
    <div class="product-detail-image-wrap">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-detail-image"
      />
    </div>
    <h2 class="product-detail-name">{{ product.name }}</h2>
    <div class="product-detail-table">
      <div class="row">
        <div class="label">Kategori</div>
        <div class="value">{{ product.categoryName }}</div>
      </div>
      <div class="row">
        <div class="label">SKU</div>
        <div class="value">{{ product.sku }}</div>
      </div>
      <div class="row">
        <div class="label">Deskripsi</div>
        <div class="value">{{ product.description }}</div>
      </div>
      <div class="row">
        <div class="label">Berat</div>
        <div class="value">{{ product.weight }} g</div>
      </div>
      <div class="row">
        <div class="label">Dimensi</div>
        <div class="value">
          {{ product.width }} cm x {{ product.length }} cm x
          {{ product.height }} cm
        </div>
      </div>
      <div class="row">
        <div class="label">Harga</div>
        <div class="value price">Rp{{ product.price.toLocaleString() }}</div>
      </div>
    </div>
    <button class="back-btn" @click="goBack">← Kembali</button>
  </div>
  <div v-else class="product-detail-empty">Produk tidak ditemukan.</div>
</template>

<style scoped>
.product-detail-container {
  max-width: 480px;
  margin: 80px auto 0;
  padding: 24px 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-btn {
  margin: 24px auto 0 auto;
  display: block;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #1d4fbf;
}

.product-detail-image-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.product-detail-image {
  width: 100%;
  max-width: 320px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
}

.product-detail-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 16px;
  text-align: center;
  width: 100%;
}

.product-detail-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}

.row:last-child {
  border-bottom: none;
}

.label {
  width: 110px;
  font-weight: 500;
  color: #232946;
  font-size: 1rem;
  text-align: left;
  margin-left: 12px;
}

.value {
  flex: 1;
  color: #444;
  font-size: 1rem;
  word-break: break-word;
  text-align: left;
  margin-left: 28px;
  margin-right: 12px;
}

.row .label,
.row .value {
  align-items: flex-start;
  justify-content: flex-start;
}

.row .label {
  min-width: 90px;
}

.row .value {
  min-width: 0;
}

.row .label,
.row .value {
  display: flex;
}

.row .label {
  align-items: flex-start;
}

.row .value {
  align-items: flex-start;
}

.row .label,
.row .value {
  text-align: left;
}

.row .label {
  white-space: nowrap;
}

.row .value.price {
  color: #ff9800;
  font-weight: 700;
  font-size: 1.1rem;
}

.row .label,
.row .value {
  line-height: 1.3;
}

.row:nth-child(3) .value {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  min-height: 2.6em;
  max-height: 2.6em;
}

.product-detail-empty {
  max-width: 480px;
  margin: 80px auto 0;
  padding: 32px 16px;
  text-align: center;
  color: #888;
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .product-detail-container {
    max-width: 100vw;
    padding: 16px 4px;
  }
  .product-detail-image {
    height: 120px;
    max-width: 100vw;
  }
  .label {
    width: 90px;
    font-size: 0.95rem;
  }
  .value {
    font-size: 0.95rem;
  }
  .price {
    font-size: 1rem;
  }
  .back-btn {
    padding: 8px 18px;
    font-size: 0.95rem;
  }
}
</style>

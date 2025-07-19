<template>
  <div class="category-list-container">
    <div class="header">
      <h2>Kategori Belanja</h2>
    </div>
    <div class="category-list">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import CategoryCard from "./CategoryCard.vue";

const categories = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/categories");
    categories.value = res.data;
  } catch (error) {
    console.error("Gagal fetch categories:", error);
  }
});
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
  justify-content: space-between;
  align-items: center;
  margin: 0 4px 12px;
}

.header h2 {
  font-size: 1.1rem;
  color: #222;
  margin: 0;
}

.category-list {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding: 0 0px 12px 0px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  box-sizing: border-box;
}

.category-list::-webkit-scrollbar {
  height: 6px;
}

.category-list::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 10px;
}

.category-list::-webkit-scrollbar-track {
  background: transparent;
}

.category-card {
  transition: box-shadow 0.2s, transform 0.2s;
}
.category-card:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  border-color: #2563eb;
}

@media (max-width: 600px) {
  .header {
    margin: 0 12px 10px;
  }

  .category-list {
    gap: 10px;
    padding-left: 12px;
  }
}
</style>

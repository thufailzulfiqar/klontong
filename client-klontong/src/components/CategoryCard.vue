<template>
  <div class="category-card">
    <p class="category-name">{{ category.name }}</p>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.category-card {
  flex-shrink: 0;
  width: 100px;
  min-height: 100px;
  border: 1px solid #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  scroll-snap-align: start;
}

.category-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.category-name {
  font-size: 0.85rem;
  margin-top: 6px;
  text-align: center;
  color: #333;
}

/* Responsif di HP */
@media (max-width: 600px) {
  .category-card {
    width: 80px;
    min-height: 90px;
    padding: 6px;
  }

  .category-image {
    width: 40px;
    height: 40px;
  }

  .category-name {
    font-size: 0.75rem;
  }
}
</style>

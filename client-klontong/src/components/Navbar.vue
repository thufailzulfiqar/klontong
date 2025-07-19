<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="/" class="logo-link">
        <div class="logo-group">
          <img src="../assets/logo.png" alt="Logo" class="logo-img" />
          <span class="logo-text">Klontong</span>
        </div>
      </a>
      <div class="right-side">
        <div class="search-wrapper">
          <input
            class="search-bar"
            type="text"
            placeholder="Cari jajanan..."
            v-model="searchQuery"
            @input="handleSearch"
            @focus="handleSearch"
            @blur="hideResults"
            autocomplete="off"
          />
          <div v-if="showResults" class="search-results">
            <div v-if="searchResults.length === 0" class="search-empty">
              Tidak ada produk ditemukan.
            </div>
            <div
              v-for="product in searchResults"
              :key="product.id"
              class="search-item"
            >
              <img :src="product.image" alt="" class="search-img" />
              <span class="search-name">{{ product.name }}</span>
              <span class="search-price"
                >Rp{{ product.price.toLocaleString() }}</span
              >
            </div>
          </div>
        </div>
        <button class="login-btn">Login</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const searchQuery = ref("");
const searchResults = ref([]);
const showResults = ref(false);

async function handleSearch() {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    showResults.value = false;
    return;
  }
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/search?q=${encodeURIComponent(
        searchQuery.value
      )}`
    );
    if (res.ok) {
      const data = await res.json();
      searchResults.value = Array.isArray(data) ? data : [];
      showResults.value = true;
    } else {
      searchResults.value = [];
      showResults.value = true;
    }
  } catch {
    searchResults.value = [];
    showResults.value = true;
  }
}

function hideResults() {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #0066ff;
  border-bottom: 1px solid #d9dde2;
  height: 56px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
}

.navbar-inner {
  width: 100%;
  max-width: 480px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-sizing: border-box;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  height: 34px;
  width: 34px;
  object-fit: contain;
}

.logo-text {
  font-weight: 600;
  font-size: 1.4rem;
  color: #ffffff;
  letter-spacing: 4px;
  transition: color 0.2s;
}

.logo-link:hover .logo-text {
  color: #ffa41c;
}

.right-side {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.search-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.search-bar {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #cdd3d9;
  font-size: 0.95rem;
  width: 160px;
  max-width: 40vw;
  background: #ffffff;
  color: #111;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-bar:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.search-results {
  position: absolute;
  top: 110%;
  left: 0;
  width: 260px;
  max-width: 90vw;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
  z-index: 999;
  padding: 8px 0;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  cursor: pointer;
  transition: background 0.15s;
}

.search-item:hover {
  background: #f5f6fa;
}

.search-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 6px;
}

.search-name {
  flex: 1;
  font-size: 0.98rem;
  color: #232946;
}

.search-price {
  font-size: 0.95rem;
  color: #2563eb;
  font-weight: 500;
}

.search-empty {
  padding: 10px 16px;
  color: #888;
  font-size: 0.95rem;
  text-align: center;
}

.login-btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.45rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  line-height: 1;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #1d4fbf;
}

@media (max-width: 600px) {
  .navbar-inner {
    padding: 0 0.75rem;
  }
  .search-bar {
    width: 150px;
  }
}
</style>

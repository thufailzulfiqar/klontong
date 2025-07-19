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
        <input class="search-bar" type="text" placeholder="Cari jajanan..." />
        <button class="login-btn">Login</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
// no script
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

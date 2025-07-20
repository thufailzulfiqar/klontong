<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const router = useRouter();

function validateForm() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    error.value = "Email tidak valid";
    return false;
  }
  if (!password.value || password.value.length < 6) {
    error.value = "Password minimal 6 karakter";
    return false;
  }
  return true;
}

async function handleLogin() {
  error.value = "";
  if (!validateForm()) {
    alert(error.value);
    return;
  }
  loading.value = true;
  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/");
    } else {
      error.value = data.message || "Login gagal";
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
  <div class="login-container">
    <button class="logo-home-btn" @click="router.push('/')">
      <img src="../assets/logo.png" alt="Klontong Logo" class="logo-img" />
    </button>
    <h2>Masuk</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
        autocomplete="username"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
        autocomplete="current-password"
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Masuk" }}
      </button>
      <div v-if="error" class="login-error">{{ error }}</div>
    </form>
    <div class="register-question">
      Belum Punya Akun?
      <button class="register-btn" @click="router.push('/register')">
        Daftar
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 360px;
  margin: 80px auto 0;
  padding: 32px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input[type="email"],
input[type="password"] {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #cdd3d9;
  font-size: 1rem;
  background: #f8fafd;
  color: #232946;
}

input:focus {
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

.login-error {
  color: #ff3f3f;
  font-size: 0.98rem;
  margin-top: 8px;
  text-align: center;
}

.register-btn {
  margin-top: 16px;
  background: transparent;
  color: #2563eb;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  box-shadow: none;
  outline: none;
  transition: color 0.2s;
}

.register-btn:hover {
  color: #3f72ff;
  border: none;
  box-shadow: none;
  outline: none;
}

.logo-home-btn {
  background: none;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0px auto;
  cursor: pointer;
  transition: filter 0.2s;
}

.logo-home-btn:hover .logo-img {
  filter: brightness(0.85) drop-shadow(0 2px 8px #2563eb55);
}

.logo-img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.1);
}
</style>

<script setup>
// filepath: client-klontong/src/components/RegisterPage.vue
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const router = useRouter();

function validateForm() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name.value || name.value.length < 3) {
    error.value = "Nama minimal 3 karakter";
    return false;
  }
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

async function handleRegister() {
  error.value = "";
  if (!validateForm()) {
    alert(error.value);
    return;
  }
  loading.value = true;
  try {
    const res = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } else {
      error.value = data.message || "Registrasi gagal";
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
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <input
        type="text"
        v-model="name"
        placeholder="Nama"
        required
        autocomplete="name"
      />
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
        autocomplete="new-password"
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Sign Up" }}
      </button>
      <div v-if="error" class="register-error">{{ error }}</div>
    </form>
    <div class="login-question">
      Already have an account?
      <button class="login-btn" @click="router.push('/login')">Login</button>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 340px;
  margin: 80px auto 0;
  padding: 32px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input[type="text"],
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

.register-error {
  color: #ff3f3f;
  font-size: 0.98rem;
  margin-top: 8px;
  text-align: center;
}

.login-question {
  margin-top: 18px;
  font-size: 1rem;
  color: #232946;
  text-align: center;
}

.login-btn {
  margin-left: 6px;
  background: transparent;
  color: #2563eb;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  box-shadow: none;
  outline: none;
  transition: color 0.2s;
}

.login-btn:hover {
  color: #3f72ff;
  border: none;
  box-shadow: none;
  outline: none;
}
</style>

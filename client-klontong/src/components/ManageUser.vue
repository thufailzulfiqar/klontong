<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const users = ref([]);
const loading = ref(true);
const error = ref("");
const success = ref("");
const router = useRouter();

const currentRole = ref("");

onMounted(async () => {
  try {
    const resMe = await fetch("http://localhost:3000/api/users/me", {
      credentials: "include",
    });
    if (!resMe.ok) {
      router.push("/");
      return;
    }
    const me = await resMe.json();
    currentRole.value = me?.user?.role;
    if (currentRole.value !== "admin") {
      error.value = "Hanya admin yang bisa mengakses halaman ini.";
      router.push("/");
      return;
    }
  } catch {
    router.push("/");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/users", {
      credentials: "include",
    });
    if (res.ok) {
      users.value = await res.json();
    } else {
      error.value = "Gagal mengambil data user";
    }
  } catch {
    error.value = "Gagal terhubung ke server";
  }
  loading.value = false;
});

async function handleRoleChange(userId, newRole) {
  error.value = "";
  success.value = "";
  try {
    const res = await fetch(`http://localhost:3000/api/users/edit/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role: newRole }),
    });
    const data = await res.json();
    if (res.ok) {
      const idx = users.value.findIndex((u) => u.id === userId);
      if (idx !== -1) users.value[idx].role = newRole;
      success.value = "Role berhasil diupdate";
    } else {
      error.value = data.message || "Gagal update role";
    }
  } catch {
    error.value = "Gagal terhubung ke server";
  }
}
function goBack() {
  window.location.href = "/";
}
</script>

<template>
  <div class="manage-user-container">
    <h2>Manage User</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
    <table v-if="!loading && users.length" class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <select v-model="user.role">
              <option value="admin">admin</option>
              <option value="staff">staff</option>
              <option value="customer">customer</option>
            </select>
          </td>
          <td>
            <button @click="handleRoleChange(user.id, user.role)">
              Simpan
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!loading && users.length === 0">Tidak ada user.</div>
    <button class="back-btn" @click="goBack">← Kembali</button>
  </div>
</template>

<style scoped>
.manage-user-container {
  max-width: 480px;
  margin: 48px auto 0 auto;
  padding: 32px 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.07);
  overflow-x: auto;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  table-layout: fixed;
}
.user-table th,
.user-table td {
  border: 1px solid #e5e7eb;
  padding: 8px 6px;
  text-align: left;
  font-size: 0.9rem;
  word-break: break-word;
}
.user-table th {
  background: #2563eb;
  color: #fff;
  font-size: 0.95rem;
}
.user-table th:first-child,
.user-table td:first-child {
  width: 36px;
  min-width: 36px;
  max-width: 36px;
  text-align: center;
}
.user-table th:nth-child(3),
.user-table td:nth-child(3) {
  min-width: 120px;
  max-width: 180px;
  width: 140px;
  font-size: 0.8rem;
  color: #444;
}
.user-table th:nth-child(4),
.user-table td:nth-child(4) {
  width: 70px;
  min-width: 60px;
  max-width: 80px;
  font-size: 0.8rem;
  text-align: center;
}
.user-table select {
  width: 64px;
  padding: 2px 4px;
  font-size: 0.8rem;
  border-radius: 6px;
  border: 1.5px solid #2563eb;
  background: #f8fafd;
  color: #2563eb;
  font-weight: 600;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  cursor: pointer;
}
.user-table button {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.error {
  color: #ff3f3f;
  margin-top: 16px;
  text-align: center;
}
.success {
  color: #00880b;
  margin-top: 16px;
  text-align: center;
  font-weight: 600;
}
.back-btn {
  margin: 32px auto 0 auto;
  display: block;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #1d4fbf;
}

@media (max-width: 600px) {
  .manage-user-container {
    max-width: 100vw;
    margin: 24px 0 0 0;
    padding: 16px 4px;
    border-radius: 10px;
  }
  .user-table th,
  .user-table td {
    font-size: 0.8rem;
    padding: 6px 2px;
  }
  .user-table th:nth-child(3),
  .user-table td:nth-child(3) {
    min-width: 80px;
    max-width: 120px;
    width: 90px;
    font-size: 0.7rem;
  }
  .user-table th:nth-child(4),
  .user-table td:nth-child(4) {
    width: 50px;
    min-width: 40px;
    max-width: 60px;
    font-size: 0.7rem;
  }
  .user-table select {
    width: 48px;
    font-size: 0.7rem;
    padding: 2px 2px;
  }
  .user-table button {
    padding: 2px 6px;
    font-size: 0.7rem;
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const users = ref([]);
const loading = ref(true);
const error = ref("");
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
      alert("Hanya admin yang bisa mengakses halaman ini.");
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
      alert("Role berhasil diupdate");
    } else {
      alert(data.message || "Gagal update role");
    }
  } catch {
    alert("Gagal terhubung ke server");
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
  max-width: 700px;
  margin: 48px auto 0 auto;
  padding: 32px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.07);
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
}
.user-table th,
.user-table td {
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  text-align: left;
}
.user-table th {
  background: #2563eb;
  color: #fff;
}
.user-table select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1.5px solid #2563eb;
  font-size: 1rem;
  background: #f8fafd;
  color: #2563eb;
  font-weight: 600;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  cursor: pointer;
}
.user-table select:focus {
  border-color: #ffa41c;
  box-shadow: 0 0 0 2px rgba(255, 164, 28, 0.15);
}
.user-table option[value="admin"] {
  color: #2563eb;
  background: #e8ecfd;
  font-weight: 700;
}
.user-table option[value="staff"] {
  color: #ff9800;
  background: #fffbe8;
  font-weight: 600;
}
.user-table option[value="customer"] {
  color: #232946;
  background: #f8fafd;
  font-weight: 500;
}
.user-table button {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.user-table button:hover {
  background: #1d4fbf;
}
.error {
  color: #ff3f3f;
  margin-top: 16px;
  text-align: center;
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
</style>

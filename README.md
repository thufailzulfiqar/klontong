# Klontong

Sistem manajemen produk dan user berbasis Vue.js (frontend) dan NestJS + Prisma (backend).

## Cara Menjalankan Project Setelah Clone Repo

### 1. Clone Repo

```sh
git clone <url-repo>
cd klontong
```

---

### 2. Setup & Jalankan Server (Backend)

Masuk ke folder server:

```sh
cd server-klontong
```

#### Install dependencies:

```sh
npm install
```

#### Setup database:

- Edit file `.env` dan isi `DATABASE_URL` sesuai koneksi PostgreSQL Anda.

#### Contoh file `.env` untuk backend (server-klontong/.env):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dbklontong"
JWT_SECRET=your_jwt_secret
```

#### Migrasi & seeding database:

```sh
npx prisma migrate reset
npx prisma migrate deploy
npm run seed
```

#### Jalankan server:

```sh
npm run start:dev
```

Server berjalan di `http://localhost:3000`

---

### 3. Setup & Jalankan Client (Frontend)

Buka terminal baru, masuk ke folder client:

```sh
cd client-klontong
```

#### Install dependencies:

```sh
npm install
```

#### Jalankan client:

```sh
npm run dev
```

Client berjalan di `http://localhost:5173`

---

### 4. Akun Default

Setelah seeding, terdapat user default:

Untuk role admin (Dapat melakukan add product, dan manage user (edit role))

- Email: `admin1@mail.com`
- Password: `admin123`

Untuk role staff (Dapat melakukan add product)

- Email: `staff1@mail.com`
- Password: `staff123`

Ketika register akan default dengan role "customer", dapat dirubah oleh admin.

---

### 6. Testing

Untuk menjalankan test backend:

```sh
cd server-klontong
npm run test
```

---

### 6. Troubleshooting

- Pastikan database sudah berjalan dan koneksi di `.env` benar.
- Jika ada error seeding, cek file `prisma/data/` dan koneksi database.
- Jika ingin reset data, gunakan:
  ```sh
  npx prisma migrate reset
  npm run seed
  ```

---

## Daftar Page & Fitur di Aplikasi Klontong

### Page Utama

- **Landing Page**  
  Menampilkan daftar kategori dan produk, serta tombol aksi sesuai role user.

### Page Produk

- **Product Detail**  
  Melihat detail produk.

- **Add Product**  
  (Hanya admin & staff)  
  Menambah produk baru ke database.

### Page User

- **Login**  
  Login user dengan email dan password.

- **Register**  
  Registrasi user baru (role default: customer).

- **Manage User**  
  (Hanya admin)  
  Melihat daftar user dan mengubah role user.

### Fitur Umum

- **Navbar**  
  Navigasi antar halaman, status login, dan tombol logout.

- **Transisi Animasi**  
  Transisi smooth saat masuk halaman.

- **Validasi Form**  
  Validasi input pada login, register, dan tambah produk.

- **Alert di Dalam Page**  
  Pesan error/sukses tampil di dalam halaman, bukan alert browser.

- **Responsive Design**  
  Tampilan menyesuaikan perangkat (mobile & desktop).

- **Role Based Access**  
  Fitur tertentu hanya bisa diakses oleh admin/staff.

- **Logout**  
  Menghapus session dan kembali ke landing page.

---

**Lihat file [src/router/index.js](client-klontong/src/router/index.js) untuk detail lebih lanjut tentang rute dan halaman di aplikasi.**

## Tech Stack

- **Frontend:** Vue 3, Vite, Vue Router, Composition API
- **Backend:** NestJS, Prisma ORM, PostgreSQL, JWT Auth, bcrypt
- **Testing:** Jest (unit & e2e), ts-node (seed)
- **Style:** CSS, scoped style di komponen

---

**Selamat mencoba!**

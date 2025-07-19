# klontong

## Cara Menjalankan Project Setelah Clone Repo

### 1. Clone Repo

```sh
git clone <url-repo-anda>
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

#### Migrasi & seeding database:

```sh
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

- Email: `user1@mail.com`
- Password: `user123`

---

### 5. Testing

Untuk menjalankan test backend:

```sh
cd server-klontong
npm run test
```

---

### 6. Troubleshooting

- Pastikan database sudah berjalan dan koneksi di `.env` benar.
- Jika ada error seeding, cek file `prisma/data/` dan koneksi database.

---

**Selamat mencoba!**

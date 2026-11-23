### Database Configuration

Sistem Lost and Found menggunakan PostgreSQL 16 sebagai database utama. Database dijalankan menggunakan Docker Compose untuk mempermudah pengelolaan lingkungan pengembangan.

**Konfigurasi Database:**

| Paramete          | Value          |
| ----------------- | -------------- |
| Database Engine   | PostgreSQL 16  |
| Container Name    | lostfound-db   |
| Database Name     | lostfound      |
| Username          | lostfound      |
| Port              | 5432           |
| Persistent Volume | lostfound_data |

**Menjalankan Database**

Jalankan perintah berikut dari direktori yang memiliki file `docker-compose.yml`:

```bash
docker compose up -d
```

**Memeriksa Status Database**

```bash
docker compose ps
```

**Memeriksa Log Database**

```bash
docker compose logs -f postgres
```

**Menghentikan Database**

```bash
docker compose down
```

**Koneksi Database**

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=lostfound
DB_PASSWORD=lostfound_dev
DB_NAME=lostfound
DB_SSLMODE=disable
```

Konfigurasi environment di atas digunakan untuk koneksi backend yang berjalan langsung di komputer host. Jika backend berjalan dalam container Docker yang sama, host database menggunakan nama service `postgres`, bukan `localhost`.

**Persistent Storage**

Database menggunakan Docker volume `lostfound_data` agar data tetap tersimpan meskipun container dihentikan atau dibuat ulang.

Catatan: Jangan menggunakan password development untuk lingkungan produksi.

### Backend Dependencies

Backend aplikasi Lost and Found dikembangkan menggunakan bahasa pemrograman Go (Golang) dengan beberapa library pendukung.

| Library                  | Version | Description                        |
| ------------------------ | ------- | ---------------------------------- |
| github.com/jackc/pgx/v5  | 5.13.0  | PostgreSQL database driver         |
| github.com/joho/godotenv | 1.5.1   | Environment variable configuration |
| golang.org/x/crypto      | 0.4 1.0 | Cryptographic functions            |

**Indirect Dependencies:**

- github.com/jackc/pgpassfile
- github.com/jackc/pgservicefile
- github.com/jackc/puddle/v2
- golang.org/x/sync
- golang.org/x/text

**Dependency Installation:**

```bash
go mod download
```

**Verify Dependencies:**

```bash
go mod tidy
go list -m all
```

### Database Integration

Backend menggunakan library `github.com/jackc/pgx/v5` untuk melakukan komunikasi dengan PostgreSQL 16 yang berjalan melalui Docker Compose.

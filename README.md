# BSI

## Login Satpam pada development lokal

Login Satpam memverifikasi `username` dan hash bcrypt pada tabel `staff`. Akun seed lokal memakai username `satpam_pos1`.

Untuk database yang sudah ada, jalankan `backend/migrations/006_satpam_password_hash.sql` setelah migrasi sebelumnya agar password seed tersimpan sebagai hash bcrypt. Password seed hanya untuk development lokal.
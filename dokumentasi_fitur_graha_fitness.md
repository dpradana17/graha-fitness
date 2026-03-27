# Dokumentasi Fitur Graha Fitness

Sistem Manajemen Graha Fitness memiliki beberapa fitur utama yang dirancang untuk mengelola anggota, kehadiran, keuangan, dan stok makanan. Berikut adalah dokumentasi lengkap dari masing-masing fitur.

---

## 1. Login & Autentikasi
Aplikasi dilengkapi dengan sistem login untuk memastikan hanya pengguna yang berwenang yang dapat mengakses dashboard.
- **Login:** Pengguna memasukkan *username* dan *password* untuk masuk.
- Terdapat dua tingkat akses (demo): `superadmin` dan `admin`.

---

## 2. Dashboard (Beranda)
Dashboard memberikan gambaran umum (overview) terkait operasional gym secara '*real-time*'.
- **Statistik Utama:** Menampilkan metrik penting:
    - **Total Anggota Aktif:** Jumlah member yang masa aktifnya masih berlaku.
    - **Pendapatan Bulan Ini:** Total pemasukan bulan berjalan.
    - **Check-in Hari Ini:** Jumlah anggota yang hadir pada hari ini.
    - **Peringatan Stok Tipis:** Jumlah barang/makanan yang jumlah stoknya hampir habis.
- **Aktivitas Terbaru (Recent Activity):** Menampilkan daftar log transaksi, check-in, atau penambahan anggota yang baru saja terjadi.
- **Keanggotaan Segera Berakhir (Expiring Memberships):** Menampilkan daftar anggota yang masa aktif keanggotaannya akan segera habis.

---

## 3. Members (Anggota & Kehadiran)
Fitur ini digunakan untuk merekap data keanggotaan dan absensi (kehadiran) harian anggota gym.

### A. Manajemen Anggota
- **Pencarian Anggota:** Mencari data anggota berdasarkan nama atau nomor telepon.
- **Tambah Anggota Baru (+ Add Member):** Mendaftarkan anggota baru dengan informasi nama, nomor telepon, dan paket keanggotaan (misalnya: 1 Bulan, 3 Bulan).
- **Tabel Anggota:** Menampilkan daftar anggota beserta:
    - Nama dan Nomor Telepon.
    - Paket (Plan) dan tanggal kedaluwarsa (Expires).
    - Status (Aktif / Kedaluwarsa).
- **Aksi Anggota:** Admin dapat memperbarui (Edit), menghapus, atau memperpanjang (Renew) keanggotaan.

### B. Kehadiran Hari Ini (Today's Attendance)
- **Log Kehadiran:** Menampilkan daftar anggota yang telah melakukan *check-in* pada hari tersebut beserta waktu kedatangannya.
- **Laporan dan Pembersihan:** Admin dapat mengekspor laporan kehadiran (Report) atau membersihkan log kehadiran harian (Clear Logs).

---

## 4. Finance (Keuangan / Finansial)
Fitur ini melacak semua rekaman pemasukan dan pengeluaran gym untuk memonitor profit bulanan.

- **Ringkasan Finansial:** Menampilkan 3 metrik keuangan utama:
    - **Pendapatan Bulanan (Income).**
    - **Pengeluaran Bulanan (Expense).**
    - **Laba Bersih (Net Profit).**
- **Filter Transaksi:** Memfilter transaksi berdasarkan Bulan (Month) dan Jenis (Pemasukan/Pengeluaran).
- **Tambah Transaksi (+ Add Transaction):** Mencatat transaksi baru (pemasukan atau pengeluaran) dengan memilih kategori, jumlah uang, referensi, dan catatan tambahan.
- **Ekspor Laporan (Export Report):** Menyimpan daftar riwayat keuangan ke dalam bentuk laporan.

---

## 5. Food Stock (Stok Makanan/Minuman)
Modul untuk memanajemen inventaris (stok barang fisik) seperti suplemen, air minum, atau makanan di gym.

- **Daftar Stok:** Menampilkan daftar barang beserta Kategorinya, Jumlah (Quantity), Satuan (Unit), dan Status Stok (Aman/Tipis/Habis).
- **Tambah Barang (+ Add Item):** Memasukkan jenis barang baru ke dalam sistem inventaris.
- **Pergerakan Stok (Stock Movement):** Mengelola masuk keluarnya barang, misalnya restock (barang masuk) atau penjualan (barang keluar).
- **Log Pergerakan Barang:** Melacak riwayat barang apa saja yang baru dimasukkan atau dikeluarkan beserta jumlahnya.

---

## 6. Scan Check-in
Fitur bagi anggota untuk melakukan *check-in* kehadiran mereka secara cepat dan mandiri.

- **Input Manual:** Admin atau anggota dapat mengetikkan `Member ID`, nomor telepon, atau ID unik lainnya untuk check-in.
- **Scan Kamera (*Scan Camera*):** Menggunakan kamera (webcam/kamera HP) untuk memindai QR Code anggota sehingga proses *check-in* menjadi otomatis tanpa mengetik.

---

## Fitur Sistem Lainnya (App Shell)

- **Sinkronisasi Otomatis (Sync):** Terdapat indikator "Online / Offline" di atas. Aplikasi dapat bekerja dalam mode *offline* dan akan menyinkronkan data ketika koneksi kembali tersedia ("Sync Now").
- **Ganti Bahasa (Localization):** Tersedia tombol di bagian bawah menu samping (sidebar) untuk mengubah bahasa antarmuka antara Bahasa Indonesia (ID) dan English (EN).
- **Responsive Design:** Dapat diakses secara nyaman melalui Perangkat Komputer (Desktop) maupun Ponsel (Mobile).

---
*Dokumentasi ini otomatis di-generate berdasarkan antarmuka dan komponen (fitur-fitur) dari sistem Graha Fitness.*

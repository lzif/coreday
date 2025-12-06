# 📝 COREDAY - REFACTORING ROADMAP

## 🏗️ TAB SPECIFIC TASKS

### 1. 📋 TASKS Tab (High Priority)
- [x] **Separation of Concerns:** Pisahkan icon **Edit (Pensil)** dan **Delete (Sampah)**. Beri jarak aman (`gap-4` atau pindah Delete ke dalam modal/menu).
- [x] **Input Layout:** Ubah input `What needs doing?` jadi **width 100%** (full row).
- [x] **Action Grouping:** Pindahkan Dropdown Priority (`MED`) dan Tombol `Add` ke baris di bawah input atau gunakan layout yang lebih lega.
- [x] **Empty State:** Tambahkan ilustrasi visual jika task list kosong (jangan cuma blank space).

### 2. 🔄 HABITS Tab (High Priority)
- [x] **Hit Area Expansion:** Jadikan **seluruh kolom vertikal hari** sebagai area klik, bukan cuma kotak checkbox kecilnya.
- [x] **Remove "Remove":** Hapus teks link "remove" yang kecil. Ganti dengan:
  - Option A: Swipe-to-delete (Mobile native feel).
  - Option B: Long-press untuk opsi delete.
  - Option C: Icon titik tiga (...) yang membuka menu delete.
- [x] **Visual Feedback:** Beri warna background tipis/abu-abu pada checkbox kosong agar terlihat "bisa dipencet".

### 3. 💸 FINANCE Tab
- [x] **Input Sizing:** Besarkan padding input amount & description (`p-3` atau `h-12`).
- [x] **Button Hierarchy:** Beri warna pada tombol `Income` (misal: abu-abu gelap/hijau pastel) agar seimbang dengan tombol `Expense` (Merah).
- [x] **Quick Add Chips:** Ubah link text `+$10`, `+$50` menjadi tombol bentuk **Badge/Chip** (Rounded pill shape).

### 4. 📈 ANALYTICS Tab
- [x] **Chart Dual Axis:** Perbaiki visualisasi "Mood vs Spend".
  - Gunakan **Bar Chart** untuk Spending.
  - Gunakan **Background Color/Gradient** vertical untuk Mood, ATAU pisahkan chart-nya.
- [x] **Readability:** Besarkan font size label sumbu Y ($120, $90...).
- [x] **Tooltip:** Tambahkan interaksi klik/hover pada chart untuk melihat detail ("Spent $X, Mood: Happy").

### 5. 🍅 POMODORO Tab
- [x] **Control Group:** Ubah tombol terpisah `Work`, `Break`, `Long` menjadi satu komponen **Segmented Control** (Menyatu).
- [x] **Start Button:** Pastikan tombol `Start` mendominasi layar (Primary Action) dengan warna kontras.

### 6. 🎭 MOOD Tab
- [x] **Expressive UI:** Ganti tombol mood kecil (Sad/Meh/Happy) dengan **Emoji Besar/3D** atau icon yang lebih ekspresif.
- [x] **Scrollable History:** Buat chart mood bisa di-scroll secara horizontal jika data > 7 hari (jangan dipadatkan).

### 7. 🏆 PROFILE Tab (Legacy)
- [x] **Motivation Fix:** Ganti icon "Gembok" murni dengan **Icon Badge Grayscale** (hitam putih & transparan).
- [x] **Unlock Criteria:** Tambahkan tooltip atau modal saat badge diklik yang menjelaskan syarat unlock (e.g., "Complete 10 Tasks").

### 8. 🧠 INSIGHT Tab (Life Coach)
- [x] **Friendly Empty State:** Hapus pesan teknis "API Key Missing".
- [x] **Call to Action:** Ganti dengan ilustrasi "AI Brain Offline" dan tombol "Connect API Key" yang membuka modal settings.

### 9. 📓 JOURNAL Tab
- [x] **Typography:** Naikkan `line-height` (jarak antar baris) menjadi `leading-relaxed` atau `leading-loose` untuk keterbacaan.
- [x] **FAB (Floating Action Button):** Ganti icon edit kecil dengan tombol melayang (FAB) besar di pojok kanan bawah untuk mode menulis.

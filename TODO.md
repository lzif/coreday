# 📝 COREDAY - REFACTORING ROADMAP

## 🚨 GLOBAL UX (CRITICAL FIXES)
> "Stop menyiksa jempol user."
- [ ] **Touch Target Size:** Pastikan semua tombol/input minimal tinggi/lebar **44px** (Standard Mobile Touch).
- [ ] **Scrollbar Cleanup:** Hide default browser scrollbar di semua container yang bisa di-scroll (`overflow-x-auto` & `overflow-y-auto`).
  - *Tech:* Pake plugin `tailwind-scrollbar-hide` atau custom CSS utility.
- [ ] **Destructive Actions:** Jauhkan tombol Delete/Remove dari tombol Edit/Utama. Gunakan konfirmasi atau menu tersembunyi.
- [ ] **Error Messages:** Jangan pernah tampilkan raw error ("API Key Missing", "Null"). Ganti dengan ilustrasi atau pesan manusiawi.

---

## 🏗️ TAB SPECIFIC TASKS

### 1. 📋 TASKS Tab (High Priority)
- [ ] **Separation of Concerns:** Pisahkan icon **Edit (Pensil)** dan **Delete (Sampah)**. Beri jarak aman (`gap-4` atau pindah Delete ke dalam modal/menu).
- [ ] **Input Layout:** Ubah input `What needs doing?` jadi **width 100%** (full row).
- [ ] **Action Grouping:** Pindahkan Dropdown Priority (`MED`) dan Tombol `Add` ke baris di bawah input atau gunakan layout yang lebih lega.
- [ ] **Empty State:** Tambahkan ilustrasi visual jika task list kosong (jangan cuma blank space).

### 2. 🔄 HABITS Tab (High Priority)
- [ ] **Hit Area Expansion:** Jadikan **seluruh kolom vertikal hari** sebagai area klik, bukan cuma kotak checkbox kecilnya.
- [ ] **Remove "Remove":** Hapus teks link "remove" yang kecil. Ganti dengan:
  - Option A: Swipe-to-delete (Mobile native feel).
  - Option B: Long-press untuk opsi delete.
  - Option C: Icon titik tiga (...) yang membuka menu delete.
- [ ] **Visual Feedback:** Beri warna background tipis/abu-abu pada checkbox kosong agar terlihat "bisa dipencet".

### 3. 💸 FINANCE Tab
- [ ] **Input Sizing:** Besarkan padding input amount & description (`p-3` atau `h-12`).
- [ ] **Button Hierarchy:** Beri warna pada tombol `Income` (misal: abu-abu gelap/hijau pastel) agar seimbang dengan tombol `Expense` (Merah).
- [ ] **Quick Add Chips:** Ubah link text `+$10`, `+$50` menjadi tombol bentuk **Badge/Chip** (Rounded pill shape).

### 4. 📈 ANALYTICS Tab
- [ ] **Chart Dual Axis:** Perbaiki visualisasi "Mood vs Spend".
  - Gunakan **Bar Chart** untuk Spending.
  - Gunakan **Background Color/Gradient** vertical untuk Mood, ATAU pisahkan chart-nya.
- [ ] **Readability:** Besarkan font size label sumbu Y ($120, $90...).
- [ ] **Tooltip:** Tambahkan interaksi klik/hover pada chart untuk melihat detail ("Spent $X, Mood: Happy").

### 5. 🍅 POMODORO Tab
- [ ] **Control Group:** Ubah tombol terpisah `Work`, `Break`, `Long` menjadi satu komponen **Segmented Control** (Menyatu).
- [ ] **Start Button:** Pastikan tombol `Start` mendominasi layar (Primary Action) dengan warna kontras.

### 6. 🎭 MOOD Tab
- [ ] **Expressive UI:** Ganti tombol mood kecil (Sad/Meh/Happy) dengan **Emoji Besar/3D** atau icon yang lebih ekspresif.
- [ ] **Scrollable History:** Buat chart mood bisa di-scroll secara horizontal jika data > 7 hari (jangan dipadatkan).

### 7. 🏆 PROFILE Tab (Legacy)
- [ ] **Motivation Fix:** Ganti icon "Gembok" murni dengan **Icon Badge Grayscale** (hitam putih & transparan).
- [ ] **Unlock Criteria:** Tambahkan tooltip atau modal saat badge diklik yang menjelaskan syarat unlock (e.g., "Complete 10 Tasks").

### 8. 🧠 INSIGHT Tab (Life Coach)
- [ ] **Friendly Empty State:** Hapus pesan teknis "API Key Missing".
- [ ] **Call to Action:** Ganti dengan ilustrasi "AI Brain Offline" dan tombol "Connect API Key" yang membuka modal settings.

### 9. 📓 JOURNAL Tab
- [ ] **Typography:** Naikkan `line-height` (jarak antar baris) menjadi `leading-relaxed` atau `leading-loose` untuk keterbacaan.
- [ ] **FAB (Floating Action Button):** Ganti icon edit kecil dengan tombol melayang (FAB) besar di pojok kanan bawah untuk mode menulis.

---

## 🎨 VISUAL POLISH (THE "INDIE" VIBE)
- [ ] **Consistency:** Pastikan ketebalan border konsisten (misal: semua `border-2` atau `border-[3px]`).
- [ ] **Whitespace:** Tambahkan padding bottom pada container utama agar konten paling bawah tidak tertutup navigasi/layar HP (`pb-24`).


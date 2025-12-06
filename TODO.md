# 🚀 CORE SYSTEM REFACTORING & OPTIMIZATION

## 🚨 PHASE 1: SECURITY HARDENING (CRITICAL)
> **Goal:** Mencegah kebocoran API Key dan penyalahgunaan kuota Gemini.

- [ ] **Remove Hardcoded Key:** Hapus `process.env.API_KEY` dari `src/services/geminiService.ts` dan file code lainnya.
- [ ] **Create Settings UI:** Buat Modal/Menu baru (misal di Profile atau pojok kanan atas) untuk input "Gemini API Key".
- [ ] **Local Storage Logic:** Simpan API Key input user ke `localStorage` browser.
- [ ] **Service Refactor:** Update `generateLifeInsights` dan `generateSubtasks` untuk mengambil key dari `localStorage` user, bukan environment variable build time.
- [ ] **Error Handling:** Jika key tidak ada atau invalid (401/403), tampilkan pesan ramah: "Please add your API Key in Settings" daripada error raw.

---

## 🏗️ PHASE 2: ARCHITECTURE REFACTOR (THE "GOD OBJECT" FIX)
> **Goal:** Memecah `App.tsx` yang kegemukan dan memperbaiki performa rendering.

- [ ] **Install Zustand:** `npm install zustand` (Library state management ringan).
- [ ] **Create Task Store (`useTaskStore`):**
  - Pindahkan logic `tasks` (add, edit, delete, toggle) dari `App.tsx` ke store ini.
  - Implementasi persist middleware (untuk save ke localStorage otomatis).
- [ ] **Create Finance Store (`useFinanceStore`):**
  - Pindahkan logic `transactions` dan `savingsGoal`.
- [ ] **Create Gamification Store (`useGamificationStore`):**
  - Pindahkan logic XP, Level, dan Badges.
- [ ] **Isolate Journal State:**
  - Ubah `notes` di `App.tsx` agar tidak memicu re-render global.
  - **Option A:** Pindahkan state text ke dalam komponen `JournalWidget` (lokal).
  - **Option B:** Gunakan teknik *Debounce* (tunggu 1 detik setelah user berhenti mengetik baru simpan ke Global Store).
- [ ] **Cleanup App.tsx:** Hapus semua function handler raksasa. `App.tsx` harusnya hanya berisi Layout dan memanggil Widget components.

---

## ⚡ PHASE 3: LOGIC & PERFORMANCE TUNING
> **Goal:** Memperbaiki bug timer dan menghemat penggunaan resource CPU.

- [ ] **Fix Pomodoro Timer Drift:**
  - Hapus logic `timeLeft - 1`.
  - Ganti logic: Saat start, catat `targetTime = Date.now() + duration`.
  - Di `setInterval`, hitung sisa waktu = `targetTime - Date.now()`.
- [ ] **Optimize Gamification Triggers:**
  - Hapus pengecekan `checkBadges` yang berjalan di setiap update state.
  - Ubah jadi *Event-Driven*:
    - Cek badge "Money Bags" **HANYA** saat transaksi ditambahkan/diedit.
    - Cek badge "Streak" **HANYA** saat habit di-toggle.
    - Cek badge "Task Warrior" **HANYA** saat task selesai.

---

## 🎨 PHASE 4: UX & DATA INTEGRITY
> **Goal:** Visualisasi data yang akurat dan pencegahan error data import.

- [ ] **Chart Scaling Fix (Analytics):**
  - Pisahkan Axis (Sumbu Y). Gunakan Sumbu Kiri untuk Spending ($) dan Sumbu Kanan untuk Mood (1-5).
  - Atau, pisahkan menjadi 2 chart berbeda agar visual spending yang besar tidak membuat grafik mood terlihat datar (gepeng).
- [ ] **Data Validation (Import):**
  - Tambahkan validasi JSON Schema saat user melakukan "Import Backup".
  - Pastikan file yang diupload memiliki struktur `tasks`, `transactions`, dll yang valid sebelum me-replace state aplikasi (Mencegah *White Screen of Death*).


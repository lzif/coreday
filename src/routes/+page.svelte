<script>
  import Header from "$lib/components/Header.svelte";
  import { Button } from "m3-svelte";
</script>

<Header>🧭 Coreday</Header>

<main>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1 class="hero-title">
        Atur Semua Aspek Hidupmu. <br /><span>Simple & Powerful.</span>
      </h1>
      <p class="hero-subtitle">
        Coreday adalah aplikasi offline-first untuk mengelola keuangan, tugas,
        kebiasaan, dan jurnal harian dalam satu tempat. Fokus, aman, dan
        sepenuhnya milikmu.
      </p>
      <Button variant="filled" href="/app">Mulai Sekarang (Gratis)</Button>
    </div>
  </section>

  <!-- Features Section -->
  <section id="fitur" class="features">
    <div class="container">
      <h2 class="section-title">Fitur Utama</h2>
      <div class="features-grid">
        <!-- Feature Card 1 -->
        <div class="feature-card">
          <div class="feature-icon">💸</div>
          <h3 class="feature-title">Finance Tracker</h3>
          <p class="feature-description">
            Catat pemasukan & pengeluaran dengan mudah. Lengkap dengan kategori,
            budget bulanan, dan statistik interaktif.
          </p>
        </div>
        <!-- Feature Card 2 -->
        <div class="feature-card">
          <div class="feature-icon">📆</div>
          <h3 class="feature-title">Time & Task Manager</h3>
          <p class="feature-description">
            Rencanakan harimu dengan to-do list, proyek, subtask, dan kalender.
            Atur prioritas dan jangan lewatkan deadline.
          </p>
        </div>
        <!-- Feature Card 3 -->
        <div class="feature-card">
          <div class="feature-icon">🪴</div>
          <h3 class="feature-title">Habit Tracker</h3>
          <p class="feature-description">
            Bangun kebiasaan baik dengan checklist harian/mingguan. Pantau
            progres dengan statistik dan motivasi visual.
          </p>
        </div>
        <!-- Feature Card 4 -->
        <div class="feature-card">
          <div class="feature-icon">💰</div>
          <h3 class="feature-title">Saving Progress</h3>
          <p class="feature-description">
            Buat target tabungan impianmu dan lihat progresnya secara visual.
            Terhubung otomatis dengan catatan keuanganmu.
          </p>
        </div>
        <!-- Feature Card 5 -->
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3 class="feature-title">Note & Daily Journal</h3>
          <p class="feature-description">
            Simpan ide dan refleksi harian dengan editor Markdown yang mendukung
            tag, pencarian, dan fitur pin.
          </p>
        </div>
        <!-- Feature Card 6 -->
        <div class="feature-card">
          <div class="feature-icon">🧩</div>
          <h3 class="feature-title">Insight & Widgets</h3>
          <p class="feature-description">
            Dapatkan analisa otomatis dari datamu dan atur dashboard modular
            sesuai kebutuhanmu untuk akses cepat.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Principles Section -->
  <section id="prinsip" class="principles">
    <div class="container">
      <h2 class="section-title">Prinsip Kami</h2>
      <div class="principles-list">
        <div class="principle-item">
          <h3>Offline-First</h3>
          <p>
            Tetap produktif bahkan tanpa koneksi internet. Semua data tersimpan
            aman di perangkatmu.
          </p>
        </div>
        <div class="principle-item">
          <h3>Data Milikmu</h3>
          <p>
            Kami menggunakan enkripsi lokal. Hanya kamu yang bisa mengakses
            datamu, selamanya.
          </p>
        </div>
        <div class="principle-item">
          <h3>PWA Support</h3>
          <p>
            Install di HP atau desktop untuk pengalaman seperti aplikasi native
            yang cepat dan ringan.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <p>Made with ❤️ by @lzif. Open Source — MIT License.</p>
  </div>
</footer>

<style>
  .container {
    width: 90%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 15px;
  }

  h1,
  h2,
  h3 {
    color: rgb(var(--m3-scheme-on-surface));
    font-weight: 700;
  }

  /* Hero Section */
  .hero {
    text-align: center;
    padding: 6rem 0;
  }

  .hero-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero-title span {
    color: rgb(var(--m3-scheme-primary));
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
    max-width: 650px;
    margin: 0 auto 2rem;
  }

  /* Features Section */
  .features {
    padding: 4rem 0;
    text-align: center;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    background-color: rgb(var(--m3-scheme-surface-container));
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid rgb(var(--m3-scheme-outline-variant));
    text-align: left;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-color: rgb(var(--m3-scheme-outline));
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: rgb(var(--m3-scheme-on-surface));
  }

  .feature-description {
    color: rgb(var(--m3-scheme-on-surface-variant));
    font-size: 0.95rem;
  }

  /* Principles Section */
  .principles {
    padding: 4rem 0;
    background-color: rgb(var(--m3-scheme-surface-container-low));
  }

  .principles-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
    text-align: center;
  }

  .principle-item {
    max-width: 250px;
  }

  .principle-item h3 {
    font-size: 1.2rem;
    color: rgb(var(--m3-scheme-primary));
    margin-bottom: 0.5rem;
  }

  .principle-item p {
    color: rgb(var(--m3-scheme-on-surface-variant));
  }

  /* Footer */
  .footer {
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid rgb(var(--m3-scheme-outline-variant));
    color: rgb(var(--m3-scheme-on-surface-variant));
    font-size: 0.9rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    .hero-subtitle {
      font-size: 1rem;
    }
  }
</style>

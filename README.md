# Undangan Pernikahan Digital

Aplikasi web undangan pernikahan digital interaktif berbasis Single Page Application (SPA). Dibangun menggunakan React 19, TypeScript, Sass (SCSS), Framer Motion, dan terintegrasi dengan database Supabase untuk sistem konfirmasi kehadiran (RSVP) serta ucapan doa secara real-time.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20RSVP-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)

---

## Fitur Utama

- **Personalisasi Nama Tamu**: Pembacaan parameter URL query dinamis (contoh: `?to=Nama+Tamu`) untuk menampilkan nama tamu undangan secara khusus pada layar pembuka.
- **Layar Gerbang (Gate Screen)**: Halaman sampul pembuka dengan animasi interaktif. Saat tombol "Buka Undangan" diklik, audio latar belakang otomatis mulai diputar (*user gesture autoplay compliant*).
- **Kontrol Audio Latar**: Tombol floating interaktif untuk memutar atau menghentikan musik latar (`public/audio/`).
- **Hitung Mundur Acara (Countdown)**: Penghitung mundur waktu menuju tanggal pelaksanaan resepsi secara presisi (hari, jam, menit, detik).
- **Profil Mempelai & Rincian Acara**: Informasi lengkap kedua mempelai, jadwal prosesi upacara/resepsi, dan tombol navigasi langsung ke Google Maps.
- **Galeri Foto Pre-Wedding**: Tampilan galeri foto responsif dengan integrasi lightbox layar penuh menggunakan `yet-another-react-lightbox`.
- **Formulir RSVP & Ucapan Doa**:
  - Konfirmasi kehadiran (Hadir, Tidak Hadir, Ragu-ragu).
  - Jumlah tamu yang akan hadir.
  - Input doa restu yang tersimpan langsung ke tabel Supabase PostgreSQL dan langsung ditampilkan dalam daftar ucapan.
- **Amplop Digital (Digital Envelope)**: Informasi nomor rekening dan QRIS untuk transfer tanda kasih, dilengkapi tombol salin nomor rekening instan.
- **Panel Pemilik (Owner Panel)**: Antarmuka rekapitulasi data kehadiran dan ringkasan ucapan doa untuk keluarga mempelai.

---

## Spesifikasi Stack Teknologi

| Bagian | Teknologi / Library |
|---|---|
| **Frontend Framework** | React 19, TypeScript |
| **Build Tool** | Vite 8 |
| **Styling & Layout** | Sass (SCSS modular), Bootstrap 5.3 grid & utilities |
| **Animasi** | Framer Motion |
| **Komponen Galeri** | Yet Another React Lightbox |
| **Database & Realtime** | Supabase (PostgreSQL Client SDK) |
| **Linter** | Oxlint |

---

## Struktur Direktori

```text
undangan-pernikahan/
├── public/                 # Favicon, ikon SVG, dan file audio latar
│   └── audio/              # File musik pernikahan (bgm.m4a, bgm.mp3)
├── src/
│   ├── assets/             # Aset foto galeri pre-wedding & ornamen
│   ├── components/         # Komponen modular antarmuka
│   │   ├── GateScreen.tsx  # Layar sampul pembuka
│   │   ├── Hero.tsx        # Judul & tanggal utama
│   │   ├── CoupleProfile.tsx # Profil mempelai
│   │   ├── EventDetails.tsx  # Jadwal acara & link peta
│   │   ├── Countdown.tsx   # Komponen hitung mundur
│   │   ├── Gallery.tsx     # Galeri foto dengan lightbox
│   │   ├── RsvpForm.tsx    # Formulir RSVP & doa restu
│   │   ├── DigitalEnvelope.tsx # Rekening bank & QRIS
│   │   ├── MusicToggle.tsx # Kontrol audio floating
│   │   └── OwnerPanel.tsx  # Panel rekapitulasi kehadiran
│   ├── data/               # invitation.ts (konfigurasi nama, tanggal, rekening)
│   ├── hooks/              # useGuestName, useCountdown
│   ├── lib/                # supabase.ts (koneksi database)
│   ├── styles/             # global.scss, tokens.scss
│   ├── App.tsx             # Komposisi layout utama
│   └── main.tsx            # Entry point aplikasi
├── index.html              # Template root HTML
├── package.json            # Daftar dependensi modul
└── vite.config.ts          # Konfigurasi bundler Vite

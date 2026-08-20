// ──────────────────────────────────────────────
// Invitation Data — Dhici & Praba Pawiwahan
// ──────────────────────────────────────────────

export interface Mempelai {
  nickname: string;
  fullName: string;
  childOrder: string;
  parentFather: string;
  parentMother: string;
  address: string;
  profession?: string;
  instagram?: string;
}

export interface Acara {
  id: string;
  title: string;        // e.g. "Resepsi 1" / "Resepsi 2"
  dayName: string;      // "Senin" / "Selasa"
  date: string;         // "24 Agustus 2026"
  dateISO: string;      // "2026-08-24T11:00:00+08:00"
  time: string;         // "11.00 WITA – Selesai" / "16.00 WITA – Selesai"
  venue: string;
  address: string;
  locationUrl: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface InvitationData {
  groom: Mempelai;
  bride: Mempelai;
  event: Acara;
  events: Acara[];
  quoteSanskrit: string;
  quoteTranslation: string;
  quoteSource: string;
  closingMessage: string;
  whatsappNumber: string;
  giftAccounts: BankAccount[];
}

export const invitation: InvitationData = {
  groom: {
    nickname: 'Dhici',
    fullName: 'Bripda I Putu Dadhici Bayu Putra Sanjaya',
    childOrder: 'Putra Pertama',
    parentFather: 'I Komang Edy Sanjaya, S.T.',
    parentMother: 'Francisca Sagita Hendrayani Bayu Putri, S.E., M.Si.',
    address: 'Jl. Pandu 1 No. 17, Banjar Tengah, Kec. Negara, Kab. Jembrana – Bali',
  },
  bride: {
    nickname: 'Praba',
    fullName: 'Ni Putu Nathania Prabaswari',
    childOrder: 'Putri Pertama',
    parentFather: 'I Putu Sudiasnawa, S.H.',
    parentMother: 'Ni Komang Indah Maria Isaka',
    address: 'Jl. Jalak Putih No. 16, Pendem, Jembrana – Bali',
  },
  event: {
    id: 'main',
    title: 'Pawiwahan & Resepsi',
    dayName: 'Senin & Selasa',
    date: '24 & 25 Agustus 2026',
    dateISO: '2026-08-24T11:00:00+08:00',
    time: '11.00 WITA – Selesai',
    venue: 'Jembrana, Bali',
    address: 'JL. JALAK PUTIH NO 16 Pendem & JL. PANDU 1 NO 17 Banjar Tengah, Jembrana - Bali',
    locationUrl: 'https://maps.app.goo.gl/L617wMjrmJgAYQtJ7?g_st=iw',
  },
  events: [
    {
      id: 'resepsi-1',
      title: 'Resepsi 1',
      dayName: 'Senin',
      date: '24 Agustus 2026',
      dateISO: '2026-08-24T11:00:00+08:00',
      time: '11.00 WITA – Selesai',
      venue: 'Lokasi Resepsi 1',
      address: 'JL. JALAK PUTIH NO 16 Pendem Jembrana-Bali',
      locationUrl: 'https://maps.app.goo.gl/L617wMjrmJgAYQtJ7?g_st=iw',
    },
    {
      id: 'resepsi-2',
      title: 'Resepsi 2',
      dayName: 'Selasa',
      date: '25 Agustus 2026',
      dateISO: '2026-08-25T16:00:00+08:00',
      time: '16.00 WITA – Selesai',
      venue: 'Lokasi Resepsi 2',
      address: 'JL. PANDU 1 NO 17 Banjar Tengah Kec. Negara Kab. Jembrana-Bali',
      locationUrl: 'https://maps.app.goo.gl/ZvJD5xiKRjwgKgFy8?g_st=ic',
    },
  ],
  quoteSanskrit:
    'Om ihaiwa stam ma wi yaustam wiswam ayur wyasnutam kridantau putrair naptrbhih modamanau swe grhe.',
  quoteTranslation:
    'Ya Tuhan, Sang Hyang Widhi Wasa, anugerahkanlah pasangan ini agar tetap bersatu, tidak terpisahkan, meraih kehidupan yang penuh kebahagiaan, serta dikaruniai keturunan yang berbudi luhur di dalam rumah tangga mereka.',
  quoteSource: 'Rg Veda X.85.42',
  closingMessage:
    'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.',
  whatsappNumber: '6281234567890',
  giftAccounts: [
    {
      bankName: 'BCA',
      accountNumber: '1234567890',
      accountName: 'I Putu Dadhici Bayu Putra Sanjaya',
    },
    {
      bankName: 'BRI',
      accountNumber: '0987654321',
      accountName: 'Ni Putu Nathania Prabaswari',
    },
  ],
};

export interface GalleryPhotoItem {
  id: string;
  src: string;
  category: 'payas-agung' | 'resepsi';
  title: string;
  subtitle?: string;
}

// 1. Payas Agung Balinese Royal Attire Photos
const payasModules = import.meta.glob<{ default: string }>(
  '../assets/gallery/payas-agung-*.jpg',
  { eager: true }
);

// 2. Resepsi & Pre-Wedding Photos
const resepsiModules = import.meta.glob<{ default: string }>(
  '../assets/gallery/resepsi-*.jpeg',
  { eager: true }
);

const payasTitles: Record<string, string> = {
  'payas-agung-01.jpg': 'Busana Adat Pawiwahan',
  'payas-agung-02.jpg': 'Keanggunan Adat Bali',
  'payas-agung-03.jpg': 'Pawiwahan di Candi Bentar',
  'payas-agung-04.jpg': 'Momen Gelung Agung',
  'payas-agung-05.jpg': 'Kebersamaan Pasangan',
};

export const payasAgungPhotos: GalleryPhotoItem[] = Object.keys(payasModules)
  .sort()
  .map((key, i) => {
    const filename = key.split('/').pop() || '';
    return {
      id: `payas-${i + 1}`,
      src: payasModules[key].default,
      category: 'payas-agung',
      title: payasTitles[filename] || `Busana Adat Bali ${i + 1}`,
      subtitle: 'Balinese Attire',
    };
  });

export const resepsiPhotos: GalleryPhotoItem[] = Object.keys(resepsiModules)
  .sort()
  .map((key, i) => ({
    id: `resepsi-${i + 1}`,
    src: resepsiModules[key].default,
    category: 'resepsi',
    title: `Pre-Wedding ${i + 1}`,
    subtitle: 'Momen Kebahagiaan',
  }));

export const allGalleryItems: GalleryPhotoItem[] = [
  ...payasAgungPhotos,
  ...resepsiPhotos,
];

export const galleryPhotos: string[] = allGalleryItems.map((item) => item.src);

// =====================================================================
// KONFIGURASI UTAMA APLIKASI INFAQMU (config.js) — VERSI 3.0 (v.3)
// =====================================================================

const DEFAULT_SUPABASE_URL = "https://pmcqlufrsrfkfblljdzb.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_D0xmTYa3K7pO2d15zsdD_A_Tx-7bh9y";

const STORAGE_KEYS = {
    SB_CONFIG: 'infaqmu_supabase_creds_v5',
    SETTINGS: 'infaqmu_local_settings_v5',
    TRANSACTIONS: 'infaqmu_local_transactions_v6',
    LIKED_IDS: 'infaqmu_local_liked_v5',
    WA_REPORTS: 'infaqmu_wa_reports_v6',
    TAKZIAH: 'infaqmu_takziah_data_v1'
};

const CATEGORIES = {
    news: [
        'Laporan Keuangan Bulanan',
        'Penyaluran Sembako',
        'Santunan Yatim & Dhuafa',
        'Program Kesehatan & Sosial',
        'Kegiatan Dakwah & TPQ',
        'Pengumuman Lembaga'
    ],
    in: [
        'Kaleng Infaqmu',
        'Sisa Saldo Bulan Lalu',
        'Kotak Amal Jumat',
        'Donatur Tetap Bulanan',
        'Transfer Rekening Infaq',
        'Infaq Hamba Allah'
    ],
    out: [
        'Belanja Sembako',
        'Santunan Anak Yatim & Piatu',
        'Bantuan Fakir Miskin & Dhuafa',
        'Bantuan Kesehatan & Pengobatan',
        'Bantuan Tanggap Bencana',
        'Operasional Dakwah & TPQ'
    ]
};

const MONTH_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function getDefaultDummyData() {
    return [
        // =====================================================================
        // BUKU KAS PENERIMAAN & PENGELUARAN TIAP BULAN (JANUARI - OKTOBER 2026)
        // =====================================================================

        // --- JANUARI 2026 ---
        {
            id: 'local-in-2026-01',
            tx_date: '2026-01-25',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Januari 2026',
            description: '- Kaleng Infaqmu = 650.000 + 720.000 + 580.000 = 1.950.000. Sisa saldo tahun lalu = Rp 25.000,- (Total Penerimaan: Rp 1.975.000,-).',
            amount: 1975000,
            theme: 'emerald',
            aamiin_count: 38
        },
        {
            id: 'local-out-2026-01',
            tx_date: '2026-01-28',
            type: 'out',
            category: 'Belanja Sembako',
            title: 'Belanja Sembako Lansia (Januari 2026)',
            description: 'Rincian Penyaluran Sembako: - Beras Horas 18 sak x 72.000 = 1.296.000,- - Minyakita 18 bks x 16.000 = 288.000,- - Telur 180 butir x 1.600 = 288.000,- (Total Pengeluaran: Rp 1.872.000,- | Saldo Akhir: Rp 103.000,-).',
            amount: 1872000,
            theme: 'amber',
            aamiin_count: 52
        },

        // --- FEBRUARI 2026 ---
        {
            id: 'local-in-2026-02',
            tx_date: '2026-02-22',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Februari 2026',
            description: '- Kaleng Infaqmu = 710.000 + 690.000 + 640.000 = 2.040.000. Sisa saldo bulan Januari = Rp 103.000,- (Total Penerimaan: Rp 2.143.000,-).',
            amount: 2143000,
            theme: 'emerald',
            aamiin_count: 44
        },
        {
            id: 'local-out-2026-02',
            tx_date: '2026-02-25',
            type: 'out',
            category: 'Bantuan Kesehatan & Pengobatan',
            title: 'Program Kesehatan & Sembako Sehat (Februari 2026)',
            description: 'Rincian Penyaluran: - Paket Sembako Sehat 19 paket x 85.000 = 1.615.000,- - Madu & Multivitamin Dhuafa 19 botol x 24.000 = 456.000,- (Total Pengeluaran: Rp 2.071.000,- | Saldo Akhir: Rp 72.000,-).',
            amount: 2071000,
            theme: 'amber',
            aamiin_count: 48
        },

        // --- MARET 2026 ---
        {
            id: 'local-in-2026-03',
            tx_date: '2026-03-20',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Maret 2026',
            description: '- Kaleng Infaqmu = 820.000 + 790.000 + 740.000 = 2.350.000. Sisa saldo bulan Februari = Rp 72.000,- (Total Penerimaan: Rp 2.422.000,-).',
            amount: 2422000,
            theme: 'emerald',
            aamiin_count: 61
        },
        {
            id: 'local-out-2026-03',
            tx_date: '2026-03-23',
            type: 'out',
            category: 'Belanja Sembako',
            title: 'Parsel Cinta Ramadhan (Maret 2026)',
            description: 'Rincian Penyaluran: - Beras Premium 20 sak x 75.000 = 1.500.000,- - Paket Kurma & Sirup Ramadhan 20 paket x 25.000 = 500.000,- - Minyakita 20 bks x 17.000 = 340.000,- (Total Pengeluaran: Rp 2.340.000,- | Saldo Akhir: Rp 82.000,-).',
            amount: 2340000,
            theme: 'amber',
            aamiin_count: 73
        },

        // --- APRIL 2026 ---
        {
            id: 'local-in-2026-04',
            tx_date: '2026-04-23',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan April 2026',
            description: '- Kaleng Infaqmu = 750.000 + 780.000 + 690.000 = 2.220.000. Sisa saldo bulan Maret = Rp 82.000,- (Total Penerimaan: Rp 2.302.000,-).',
            amount: 2302000,
            theme: 'emerald',
            aamiin_count: 57
        },
        {
            id: 'local-out-2026-04',
            tx_date: '2026-04-26',
            type: 'out',
            category: 'Santunan Anak Yatim & Piatu',
            title: 'Santunan Syawal & Paket Yatim (April 2026)',
            description: 'Rincian Penyaluran: - Santunan Tunai Yatim 15 anak x 100.000 = 1.500.000,- - Paket Tas & Alat Tulis 15 paket x 48.000 = 720.000,- (Total Pengeluaran: Rp 2.220.000,- | Saldo Akhir: Rp 82.000,-).',
            amount: 2220000,
            theme: 'purple',
            aamiin_count: 89
        },

        // --- MEI 2026 ---
        {
            id: 'local-in-2026-05',
            tx_date: '2026-05-24',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Mei 2026',
            description: '- Kaleng Infaqmu = 700.000 + 730.000 + 680.000 = 2.110.000. Sisa saldo bulan April = Rp 82.000,- (Total Penerimaan: Rp 2.192.000,-).',
            amount: 2192000,
            theme: 'emerald',
            aamiin_count: 49
        },
        {
            id: 'local-out-2026-05',
            tx_date: '2026-05-27',
            type: 'out',
            category: 'Operasional Dakwah & TPQ',
            title: 'Wakaf Al-Qur’an & Meja Lipat TPQ (Mei 2026)',
            description: 'Rincian Penyaluran: - Mushaf Al-Qur’an 25 mushaf x 55.000 = 1.375.000,- - Meja Lipat Kayu TPQ 20 unit x 35.000 = 700.000,- (Total Pengeluaran: Rp 2.075.000,- | Saldo Akhir: Rp 117.000,-).',
            amount: 2075000,
            theme: 'emerald',
            aamiin_count: 65
        },

        // --- JUNI 2026 ---
        {
            id: 'local-in-2026-06',
            tx_date: '2026-06-25',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Juni 2026',
            description: '- Kaleng Infaqmu = 690.000 + 750.000 + 660.000 = 2.100.000. Sisa saldo bulan Mei = Rp 117.000,- (Total Penerimaan: Rp 2.217.000,-).',
            amount: 2217000,
            theme: 'emerald',
            aamiin_count: 53
        },
        {
            id: 'local-out-2026-06',
            tx_date: '2026-06-28',
            type: 'out',
            category: 'Bantuan Fakir Miskin & Dhuafa',
            title: 'Penyaluran Paket Gizi Balita & Beras Sehat (Juni 2026)',
            description: 'Rincian Penyaluran: - Beras Sehat 19 sak x 73.000 = 1.387.000,- - Telur & Kacang Hijau 19 paket x 25.000 = 475.000,- - Susu Balita Gizi 19 bks x 14.000 = 266.000,- (Total Pengeluaran: Rp 2.128.000,- | Saldo Akhir: Rp 89.000,-).',
            amount: 2128000,
            theme: 'rose',
            aamiin_count: 58
        },

        // --- JULI 2026 ---
        {
            id: 'local-in-2026-07',
            tx_date: '2026-07-23',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Juli 2026',
            description: '- Kaleng Infaqmu = 760.000 + 790.000 + 720.000 = 2.270.000. Sisa saldo bulan Juni = Rp 89.000,- (Total Penerimaan: Rp 2.359.000,-).',
            amount: 2359000,
            theme: 'emerald',
            aamiin_count: 62
        },
        {
            id: 'local-out-2026-07',
            tx_date: '2026-07-26',
            type: 'out',
            category: 'Santunan Anak Yatim & Piatu',
            title: 'Bantuan Seragam & Sepatu Sekolah (Juli 2026)',
            description: 'Rincian Penyaluran: - Paket Seragam Sekolah 18 stel x 85.000 = 1.530.000,- - Sepatu & Kaos Kaki 18 pasang x 42.000 = 756.000,- (Total Pengeluaran: Rp 2.286.000,- | Saldo Akhir: Rp 73.000,-).',
            amount: 2286000,
            theme: 'blue',
            aamiin_count: 70
        },

        // --- AGUSTUS 2026 ---
        {
            id: 'local-in-2026-08',
            tx_date: '2026-08-21',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Agustus 2026',
            description: '- Kaleng Infaqmu = 720.000 + 750.000 + 680.000 = 2.150.000. Sisa saldo bulan Juli = Rp 73.000,- (Total Penerimaan: Rp 2.223.000,-).',
            amount: 2223000,
            theme: 'emerald',
            aamiin_count: 55
        },
        {
            id: 'local-out-2026-08',
            tx_date: '2026-08-24',
            type: 'out',
            category: 'Bantuan Fakir Miskin & Dhuafa',
            title: 'Baksos Kemerdekaan & Borong Lansia (Agustus 2026)',
            description: 'Rincian Penyaluran: - Borong Dagangan Lansia & Sembako 19 paket x 76.000 = 1.444.000,- - Paket Minyak & Gula Kemerdekaan 19 paket x 37.000 = 703.000,- (Total Pengeluaran: Rp 2.147.000,- | Saldo Akhir: Rp 76.000,-).',
            amount: 2147000,
            theme: 'rose',
            aamiin_count: 78
        },

        // --- SEPTEMBER 2026 ---
        {
            id: 'local-in-2026-09',
            tx_date: '2026-09-24',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan September 2026',
            description: '- Kaleng Infaqmu = 670.000 + 740.000 + 640.000 = 2.050.000. Sisa saldo bulan Agustus = Rp 76.000,- (Total Penerimaan: Rp 2.126.000,-).',
            amount: 2126000,
            theme: 'emerald',
            aamiin_count: 51
        },
        {
            id: 'local-out-2026-09',
            tx_date: '2026-09-27',
            type: 'out',
            category: 'Belanja Sembako',
            title: 'Lumbung Pangan Tetangga Sembako (September 2026)',
            description: 'Rincian Penyaluran: - Beras Horas 19 sak x 74.000 = 1.406.000,- - Minyakita 19 bks x 16.500 = 313.500,- - Telur Ayam 239 butir x 1.650 = 394.000,- (Total Pengeluaran: Rp 2.113.500,- | Saldo Akhir: Rp 12.500,-).',
            amount: 2113500,
            theme: 'emerald',
            aamiin_count: 67
        },

        // --- OKTOBER 2026 ---
        {
            id: 'local-1001',
            tx_date: '2026-10-25',
            type: 'in',
            category: 'Kaleng Infaqmu',
            title: 'Penerimaan Infaq Bulan Oktober 2026',
            description: '- Kaleng Infaqmu = 686.500 + 807.500 + 612.500 = 2.106.500. Sisa saldo bulan September = Rp 12.500,- (Total Penerimaan: Rp 2.119.000,-).',
            amount: 2119000,
            theme: 'emerald',
            aamiin_count: 54
        },
        {
            id: 'local-1002',
            tx_date: '2026-10-28',
            type: 'out',
            category: 'Belanja Sembako',
            title: 'Belanja sembako (Oktober 2026)',
            description: 'Rincian Belanja sembako: - Beras Horas 19 sak x 74.000 = 1.406.000,- - Minyakita 19 bks x 16.500 = 313.500,- - Telur 190 butir x 1.650 = 313.500,- (Total Pengeluaran: Rp 2.033.000,- | Saldo Akhir: Rp 86.000,-).',
            amount: 2033000,
            theme: 'amber',
            aamiin_count: 82
        },

        // =====================================================================
        // POSTINGAN BERITA LAPORAN KEUANGAN BULANAN (JANUARI - OKTOBER 2026)
        // =====================================================================
        {
            id: 'local-news-2026-01',
            tx_date: '2026-01-27',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Penyaluran Sembako Januari 2026',
            description: 'Alhamdulillah, amanah infaq bulan Januari 2026 telah dibukukan dan disalurkan kepada 18 keluarga lansia berupa beras, minyak goreng, dan telur. Jazakumullahu khairan kepada seluruh jamaah donatur.',
            amount: 0,
            theme: 'emerald',
            aamiin_count: 71
        },
        {
            id: 'local-news-2026-02',
            tx_date: '2026-02-24',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Program Sehat Dhuafa Februari 2026',
            description: 'Laporan transparansi infaq bulan Februari 2026 telah rampung: tersalurkan 19 paket sembako sehat serta madu dan vitamin bagi warga rentan dan lansia dhuafa.',
            amount: 0,
            theme: 'blue',
            aamiin_count: 68
        },
        {
            id: 'local-news-2026-03',
            tx_date: '2026-03-22',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Parsel Berkah Ramadhan Maret 2026',
            description: 'Penerimaan Kaleng Infaqmu bulan Maret 2026 telah disalurkan dalam bentuk 20 parsel sembako komplit dan kurma menyambut bulan suci Ramadhan bagi keluarga prasejahtera.',
            amount: 0,
            theme: 'amber',
            aamiin_count: 114
        },
        {
            id: 'local-news-2026-04',
            tx_date: '2026-04-25',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Santunan Lebaran Yatim April 2026',
            description: 'Laporan keuangan infaq bulan April 2026: santunan tunai Idulfitri dan paket perlengkapan sekolah telah diserahkan kepada 15 anak yatim di lingkungan sekitar.',
            amount: 0,
            theme: 'purple',
            aamiin_count: 103
        },
        {
            id: 'local-news-2026-05',
            tx_date: '2026-05-26',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Wakaf Sarana TPQ Mei 2026',
            description: 'Transparansi infaq bulan Mei 2026: alhamdulillah telah terealisasi pengadaan 25 mushaf Al-Qur’an baru dan 20 meja lipat santri TPQ agar kegiatan mengaji makin nyaman.',
            amount: 0,
            theme: 'emerald',
            aamiin_count: 89
        },
        {
            id: 'local-news-2026-06',
            tx_date: '2026-06-27',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Penyaluran Paket Gizi Juni 2026',
            description: 'Penyaluran infaq bulan Juni 2026 difokuskan pada penguatan gizi balita prasejahtera dan dhuafa berupa 19 paket beras sehat, telur, dan susu pertumbuhan.',
            amount: 0,
            theme: 'rose',
            aamiin_count: 92
        },
        {
            id: 'local-news-2026-07',
            tx_date: '2026-07-25',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Paket Seragam Sekolah Juli 2026',
            description: 'Laporan infaq bulan Juli 2026 menyambut tahun ajaran baru: 18 paket seragam sekolah dan sepatu telah disalurkan langsung kepada siswa dari keluarga dhuafa.',
            amount: 0,
            theme: 'blue',
            aamiin_count: 85
        },
        {
            id: 'local-news-2026-08',
            tx_date: '2026-08-23',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Baksos Kemerdekaan Agustus 2026',
            description: 'Realisasi infaq bulan Agustus 2026: bakti sosial kemerdekaan dengan memborong dagangan pedagang kecil lansia dan membagikan paket sembako bagi pekerja harian lepas.',
            amount: 0,
            theme: 'rose',
            aamiin_count: 119
        },
        {
            id: 'local-news-2026-09',
            tx_date: '2026-09-26',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Lumbung Pangan Sembako September 2026',
            description: 'Laporan keuangan infaq bulan September 2026: pengadaan lumbung pangan sembako (beras, minyak, telur) telah selesai disalurkan tepat sasaran bagi warga yang membutuhkan.',
            amount: 0,
            theme: 'emerald',
            aamiin_count: 77
        },
        {
            id: 'local-1003',
            tx_date: '2026-10-29',
            type: 'news',
            category: 'Laporan Keuangan Bulanan',
            title: 'Laporan Kas & Distribusi 19 Paket Sembako Oktober 2026',
            description: 'Alhamdulillah, amanah dari kotak Kaleng Infaqmu bulan Oktober 2026 telah disalurkan dalam bentuk 19 paket sembako (Beras Horas, Minyakita, dan Telur) kepada warga yang membutuhkan. Jazakumullahu khairan katsiran kepada seluruh donatur.',
            amount: 0,
            theme: 'emerald',
            aamiin_count: 96
        }
    ];
}

function getDefaultWaReports() {
    return {
        '2026-01': {
            month: '01',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '650.000 + 720.000 + 580.000' }
            ],
            prevLabel: 'Sisa saldo tahun 2025',
            prevAmount: 25000,
            expenseGroupTitle: 'Belanja Sembako Lansia',
            expenses: [
                { name: 'Beras Horas', qty: 18, unit: 'sak', price: 72000 },
                { name: 'Minyakita', qty: 18, unit: 'bks', price: 16000 },
                { name: 'Telur', qty: 180, unit: 'butir', price: 1600 }
            ]
        },
        '2026-02': {
            month: '02',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '710.000 + 690.000 + 640.000' }
            ],
            prevLabel: 'Sisa saldo bulan Januari',
            prevAmount: 103000,
            expenseGroupTitle: 'Program Kesehatan & Sembako',
            expenses: [
                { name: 'Paket Sembako Sehat', qty: 19, unit: 'paket', price: 85000 },
                { name: 'Madu & Multivitamin', qty: 19, unit: 'botol', price: 24000 }
            ]
        },
        '2026-03': {
            month: '03',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '820.000 + 790.000 + 740.000' }
            ],
            prevLabel: 'Sisa saldo bulan Februari',
            prevAmount: 72000,
            expenseGroupTitle: 'Parsel Cinta Ramadhan',
            expenses: [
                { name: 'Beras Premium', qty: 20, unit: 'sak', price: 75000 },
                { name: 'Paket Kurma & Sirup', qty: 20, unit: 'paket', price: 25000 },
                { name: 'Minyakita', qty: 20, unit: 'bks', price: 17000 }
            ]
        },
        '2026-04': {
            month: '04',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '750.000 + 780.000 + 690.000' }
            ],
            prevLabel: 'Sisa saldo bulan Maret',
            prevAmount: 82000,
            expenseGroupTitle: 'Santunan Syawal & Yatim',
            expenses: [
                { name: 'Santunan Tunai Yatim', qty: 15, unit: 'anak', price: 100000 },
                { name: 'Paket Tas & Alat Tulis', qty: 15, unit: 'paket', price: 48000 }
            ]
        },
        '2026-05': {
            month: '05',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '700.000 + 730.000 + 680.000' }
            ],
            prevLabel: 'Sisa saldo bulan April',
            prevAmount: 82000,
            expenseGroupTitle: 'Wakaf Sarana TPQ',
            expenses: [
                { name: 'Mushaf Al-Qur’an', qty: 25, unit: 'mushaf', price: 55000 },
                { name: 'Meja Lipat Kayu TPQ', qty: 20, unit: 'unit', price: 35000 }
            ]
        },
        '2026-06': {
            month: '06',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '690.000 + 750.000 + 660.000' }
            ],
            prevLabel: 'Sisa saldo bulan Mei',
            prevAmount: 117000,
            expenseGroupTitle: 'Paket Gizi Balita & Dhuafa',
            expenses: [
                { name: 'Beras Sehat', qty: 19, unit: 'sak', price: 73000 },
                { name: 'Telur & Kacang Hijau', qty: 19, unit: 'paket', price: 25000 },
                { name: 'Susu Balita Gizi', qty: 19, unit: 'bks', price: 14000 }
            ]
        },
        '2026-07': {
            month: '07',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '760.000 + 790.000 + 720.000' }
            ],
            prevLabel: 'Sisa saldo bulan Juni',
            prevAmount: 89000,
            expenseGroupTitle: 'Seragam & Sepatu Sekolah',
            expenses: [
                { name: 'Paket Seragam Sekolah', qty: 18, unit: 'stel', price: 85000 },
                { name: 'Sepatu & Kaos Kaki', qty: 18, unit: 'pasang', price: 42000 }
            ]
        },
        '2026-08': {
            month: '08',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '720.000 + 750.000 + 680.000' }
            ],
            prevLabel: 'Sisa saldo bulan Juli',
            prevAmount: 73000,
            expenseGroupTitle: 'Baksos Kemerdekaan & Lansia',
            expenses: [
                { name: 'Borong Dagangan Lansia', qty: 19, unit: 'paket', price: 76000 },
                { name: 'Paket Minyak & Gula', qty: 19, unit: 'paket', price: 37000 }
            ]
        },
        '2026-09': {
            month: '09',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '670.000 + 740.000 + 640.000' }
            ],
            prevLabel: 'Sisa saldo bulan Agustus',
            prevAmount: 76000,
            expenseGroupTitle: 'Lumbung Pangan Sembako',
            expenses: [
                { name: 'Beras Horas', qty: 19, unit: 'sak', price: 74000 },
                { name: 'Minyakita', qty: 19, unit: 'bks', price: 16500 },
                { name: 'Telur Ayam', qty: 239, unit: 'butir', price: 1650 }
            ]
        },
        '2026-10': {
            month: '10',
            year: '2026',
            incomes: [
                { name: 'Kaleng Infaqmu', breakdown: '686.500 + 807.500 + 612.500' }
            ],
            prevLabel: 'Sisa saldo bulan September',
            prevAmount: 12500,
            expenseGroupTitle: 'Belanja sembako',
            expenses: [
                { name: 'Beras Horas', qty: 19, unit: 'sak', price: 74000 },
                { name: 'Minyakita', qty: 19, unit: 'bks', price: 16500 },
                { name: 'Telur', qty: 190, unit: 'butir', price: 1650 }
            ]
        }
    };
}

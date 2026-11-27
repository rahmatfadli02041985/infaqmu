// =====================================================================
// DATA & MODUL JURNAL KAS MASUK DAN KAS KELUAR (js/jurnal.js)
// Berdasarkan data resmi pembukuan kas InfaqMu (191 Transaksi)
// Total Kas Masuk  : Rp 6.623.500
// Total Kas Keluar : Rp 5.564.656
// Saldo Kas Akhir  : Rp 1.058.844
// =====================================================================

const INITIAL_JURNAL_KAS = [
    {
        "id": "jk-1",
        "no": 1,
        "date": "25/12/2023",
        "isoDate": "2023-12-25",
        "desc": "Pembayaran uang kalender 2024 sebanyak 14 lembar @24.000",
        "category": "Biaya Pembelian",
        "type": "out",
        "in": 0,
        "out": 336000,
        "amount": 336000
    },
    {
        "id": "jk-2",
        "no": 2,
        "date": "25/12/2023",
        "isoDate": "2023-12-25",
        "desc": "Bayar uang Transport pengajian daerah",
        "category": "Biaya Transportasi",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-3",
        "no": 3,
        "date": "30/12/2023",
        "isoDate": "2023-12-30",
        "desc": "Bayar Uang transport musywil pemuda 3 orang.",
        "category": "Biaya Transportasi",
        "type": "out",
        "in": 0,
        "out": 300000,
        "amount": 300000
    },
    {
        "id": "jk-4",
        "no": 4,
        "date": "03/01/2024",
        "isoDate": "2024-01-03",
        "desc": "Infaq tabung pengajian",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 41500,
        "out": 0,
        "amount": 41500
    },
    {
        "id": "jk-5",
        "no": 5,
        "date": "27/01/2024",
        "isoDate": "2024-01-27",
        "desc": "Infaq tabung pengajian dirumah Bpk. Masta",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 54000,
        "out": 0,
        "amount": 54000
    },
    {
        "id": "jk-6",
        "no": 6,
        "date": "10/02/2024",
        "isoDate": "2024-02-10",
        "desc": "Infaq tabung pengajian dirumah bpk yahman damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 55000,
        "out": 0,
        "amount": 55000
    },
    {
        "id": "jk-7",
        "no": 7,
        "date": "10/02/2024",
        "isoDate": "2024-02-10",
        "desc": "Bayar ke bpk Hendrik untuk Servis batere speaker",
        "category": "Biaya Servis / Perbaikan",
        "type": "out",
        "in": 0,
        "out": 125000,
        "amount": 125000
    },
    {
        "id": "jk-8",
        "no": 8,
        "date": "25/02/2024",
        "isoDate": "2024-02-25",
        "desc": "Terima Uang kalender pak kardi",
        "category": "Uang Kalender",
        "type": "in",
        "in": 25000,
        "out": 0,
        "amount": 25000
    },
    {
        "id": "jk-9",
        "no": 9,
        "date": "25/02/2024",
        "isoDate": "2024-02-25",
        "desc": "Infaq tabung Pengajian di rumah ibuk Risniatik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 83000,
        "out": 0,
        "amount": 83000
    },
    {
        "id": "jk-10",
        "no": 10,
        "date": "09/03/2024",
        "isoDate": "2024-03-09",
        "desc": "Infaq tabung Pengajian dirumah bpk adi kusdi",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 61000,
        "out": 0,
        "amount": 61000
    },
    {
        "id": "jk-11",
        "no": 11,
        "date": "09/05/2024",
        "isoDate": "2024-05-09",
        "desc": "Bayar Uang jajan pengajian cabang",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 300000,
        "amount": 300000
    },
    {
        "id": "jk-12",
        "no": 12,
        "date": "18/05/2024",
        "isoDate": "2024-05-18",
        "desc": "Infaq Tabung pengajian dirumah Bpk. Yahman",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 71000,
        "out": 0,
        "amount": 71000
    },
    {
        "id": "jk-13",
        "no": 13,
        "date": "01/06/2024",
        "isoDate": "2024-06-01",
        "desc": "Infaq tabung Pengajian di rumah bapak irul",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 64000,
        "out": 0,
        "amount": 64000
    },
    {
        "id": "jk-14",
        "no": 14,
        "date": "11/08/2024",
        "isoDate": "2024-08-11",
        "desc": "Infaq Tabung pengajian",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 66000,
        "out": 0,
        "amount": 66000
    },
    {
        "id": "jk-15",
        "no": 15,
        "date": "24/08/2024",
        "isoDate": "2024-08-24",
        "desc": "Infaq Tabung pengajian",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 72000,
        "out": 0,
        "amount": 72000
    },
    {
        "id": "jk-16",
        "no": 16,
        "date": "21/09/2024",
        "isoDate": "2024-09-21",
        "desc": "Infaq Tabung pengajian",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 94500,
        "out": 0,
        "amount": 94500
    },
    {
        "id": "jk-17",
        "no": 17,
        "date": "05/10/2024",
        "isoDate": "2024-10-05",
        "desc": "Infaq tabung pengajian",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 83000,
        "out": 0,
        "amount": 83000
    },
    {
        "id": "jk-18",
        "no": 18,
        "date": "05/10/2024",
        "isoDate": "2024-10-05",
        "desc": "Infaq tabung pengajian dirumah bpk Azis Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 83000,
        "out": 0,
        "amount": 83000
    },
    {
        "id": "jk-19",
        "no": 19,
        "date": "08/10/2024",
        "isoDate": "2024-10-08",
        "desc": "Bayar uang takziah (istri Bapak Kardi)",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-20",
        "no": 20,
        "date": "27/10/2024",
        "isoDate": "2024-10-27",
        "desc": "Bayar uang Takziah orang tua Bpk Adi Kusdi",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-21",
        "no": 21,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Infaq tabung pengajian di rumah ibu Nurpiah",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 67000,
        "out": 0,
        "amount": 67000
    },
    {
        "id": "jk-22",
        "no": 22,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk fatwa fayandi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-23",
        "no": 23,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk adi kusdi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-24",
        "no": 24,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk kardi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-25",
        "no": 25,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-26",
        "no": 26,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk azhar",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-27",
        "no": 27,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk sahri",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-28",
        "no": 28,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk kaliaman",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-29",
        "no": 29,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk yogi w.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-30",
        "no": 30,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk kamal",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-31",
        "no": 31,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk Rahmat Fadli",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-32",
        "no": 32,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk zulkarnain",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-33",
        "no": 33,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk yahman s.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-34",
        "no": 34,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah bpk budi setiawan",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-35",
        "no": 35,
        "date": "02/11/2024",
        "isoDate": "2024-11-02",
        "desc": "Iuran takziah Bpk Abdul Hamid S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-36",
        "no": 36,
        "date": "03/11/2024",
        "isoDate": "2024-11-03",
        "desc": "Bayar uang takziah bpk simangunsong ranting silau malela",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-37",
        "no": 37,
        "date": "03/11/2024",
        "isoDate": "2024-11-03",
        "desc": "Beli Batere AA untuk mic 4 biji.",
        "category": "Biaya Pembelian",
        "type": "out",
        "in": 0,
        "out": 12000,
        "amount": 12000
    },
    {
        "id": "jk-38",
        "no": 38,
        "date": "15/11/2024",
        "isoDate": "2024-11-15",
        "desc": "Bayar uang takziah bpk. Sono Bt. Tomok",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-39",
        "no": 39,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Infaq tabung pengajian dirumah bpk Edi kurniawan Saragih.",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 70000,
        "out": 0,
        "amount": 70000
    },
    {
        "id": "jk-40",
        "no": 40,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah Bpk Abdul Hamid S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-41",
        "no": 41,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk adi kusdi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-42",
        "no": 42,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk zulkarnain",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-43",
        "no": 43,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk kardi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-44",
        "no": 44,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk kamal",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-45",
        "no": 45,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk Rahmat Fadli",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-46",
        "no": 46,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk sahri",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-47",
        "no": 47,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk sudianto",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-48",
        "no": 48,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-49",
        "no": 49,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk Edi Kurniawan S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-50",
        "no": 50,
        "date": "16/11/2024",
        "isoDate": "2024-11-16",
        "desc": "Iuran takziah bpk Masta",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-51",
        "no": 51,
        "date": "22/11/2024",
        "isoDate": "2024-11-22",
        "desc": "Bayar uang jajan pengajian cabang",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-52",
        "no": 52,
        "date": "28/11/2024",
        "isoDate": "2024-11-28",
        "desc": "Infaq Tabung pengajian dirumah Bpk. Dodi suhendra",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 78000,
        "out": 0,
        "amount": 78000
    },
    {
        "id": "jk-53",
        "no": 53,
        "date": "14/12/2024",
        "isoDate": "2024-12-14",
        "desc": "Iuran takziah bpk Dodi Saragih",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-54",
        "no": 54,
        "date": "14/12/2024",
        "isoDate": "2024-12-14",
        "desc": "Infaq tabung Pengajian di rumah bapak Junaedi damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 83500,
        "out": 0,
        "amount": 83500
    },
    {
        "id": "jk-55",
        "no": 55,
        "date": "29/12/2024",
        "isoDate": "2024-12-29",
        "desc": "Infaq tabung Pengajian di rumah bapak Kaliaman Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-56",
        "no": 56,
        "date": "11/01/2025",
        "isoDate": "2025-01-11",
        "desc": "Iuran Takziah bpk Azis Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-57",
        "no": 57,
        "date": "11/01/2025",
        "isoDate": "2025-01-11",
        "desc": "Iuran Takziah bpk Azhar Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-58",
        "no": 58,
        "date": "11/01/2025",
        "isoDate": "2025-01-11",
        "desc": "Iuran Takziah bpk Dzulkifli Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-59",
        "no": 59,
        "date": "11/01/2025",
        "isoDate": "2025-01-11",
        "desc": "Iuran Takziah bpk Junaidi Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-60",
        "no": 60,
        "date": "11/01/2025",
        "isoDate": "2025-01-11",
        "desc": "Infaq tabung Pengajian di rumah bapak Yogi Wardana",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 69000,
        "out": 0,
        "amount": 69000
    },
    {
        "id": "jk-61",
        "no": 61,
        "date": "11/01/2025",
        "isoDate": "2025-01-11",
        "desc": "Iuran takziah Bpk Fatwa Fayandi Kalimantan",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-62",
        "no": 62,
        "date": "25/01/2025",
        "isoDate": "2025-01-25",
        "desc": "Infaq tabung Pengajian di rumah bapak Dzulkifli Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 77000,
        "out": 0,
        "amount": 77000
    },
    {
        "id": "jk-63",
        "no": 63,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran Takziah bpk Azis Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-64",
        "no": 64,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah Bpk Abdul Hamid S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-65",
        "no": 65,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah bpk adi kusdi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-66",
        "no": 66,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran Takziah bpk Azhar Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-67",
        "no": 67,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah bpk budi setiawan",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-68",
        "no": 68,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran Takziah bpk Dzulkifli Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-69",
        "no": 69,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran Takziah bpk Junaidi Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-70",
        "no": 70,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah bpk kamal damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-71",
        "no": 71,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah bpk sahri",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-72",
        "no": 72,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah bpk sudianto",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-73",
        "no": 73,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah bpk suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-74",
        "no": 74,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Iuran takziah bpk yahman srg",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-75",
        "no": 75,
        "date": "09/02/2025",
        "isoDate": "2025-02-09",
        "desc": "Infaq tabung Pengajian di rumah bapak Kardi",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 51000,
        "out": 0,
        "amount": 51000
    },
    {
        "id": "jk-76",
        "no": 76,
        "date": "27/02/2025",
        "isoDate": "2025-02-27",
        "desc": "Iuran takziah bpk kaliaman",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-77",
        "no": 77,
        "date": "27/02/2025",
        "isoDate": "2025-02-27",
        "desc": "Iuran takziah bpk suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-78",
        "no": 78,
        "date": "27/02/2025",
        "isoDate": "2025-02-27",
        "desc": "Iuran takziah bpk adi kusdi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-79",
        "no": 79,
        "date": "27/02/2025",
        "isoDate": "2025-02-27",
        "desc": "Infaq Tabung pengajian dirumah Bpk. Budi S.",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 82000,
        "out": 0,
        "amount": 82000
    },
    {
        "id": "jk-80",
        "no": 80,
        "date": "18/04/2025",
        "isoDate": "2025-04-18",
        "desc": "Bayar Uang jajan pengajian cabang / halal bi halal",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 250000,
        "amount": 250000
    },
    {
        "id": "jk-81",
        "no": 81,
        "date": "03/05/2025",
        "isoDate": "2025-05-03",
        "desc": "Iuran takziah bpk kardi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-82",
        "no": 82,
        "date": "03/05/2025",
        "isoDate": "2025-05-03",
        "desc": "Iuran takziah bpk suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-83",
        "no": 83,
        "date": "03/05/2025",
        "isoDate": "2025-05-03",
        "desc": "Iuran takziah bpk kamal",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-84",
        "no": 84,
        "date": "03/05/2025",
        "isoDate": "2025-05-03",
        "desc": "Iuran Takziah bpk Khairul A.F.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-85",
        "no": 85,
        "date": "03/05/2025",
        "isoDate": "2025-05-03",
        "desc": "Iuran takziah bpk Rindu Syuhada",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 70000,
        "out": 0,
        "amount": 70000
    },
    {
        "id": "jk-86",
        "no": 86,
        "date": "03/05/2025",
        "isoDate": "2025-05-03",
        "desc": "Infaq tabung Pengajian di rumah bapak Sahriudin Saragih",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 102000,
        "out": 0,
        "amount": 102000
    },
    {
        "id": "jk-87",
        "no": 87,
        "date": "17/05/2025",
        "isoDate": "2025-05-17",
        "desc": "Infaq tabung Pengajian di rumah bapak Abdul Azis Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 80000,
        "out": 0,
        "amount": 80000
    },
    {
        "id": "jk-88",
        "no": 88,
        "date": "17/05/2025",
        "isoDate": "2025-05-17",
        "desc": "Iuran Takziah bpk Azis Damanik",
        "category": "Infaq Perorangan",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-89",
        "no": 89,
        "date": "17/05/2025",
        "isoDate": "2025-05-17",
        "desc": "Iuran takziah bpk kardi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-90",
        "no": 90,
        "date": "17/05/2025",
        "isoDate": "2025-05-17",
        "desc": "Iuran takziah bpk Kaliaman Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-91",
        "no": 91,
        "date": "09/06/2025",
        "isoDate": "2025-06-09",
        "desc": "Bayar uang Takziah orang tua Bpk Suprat bt tomok",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-92",
        "no": 92,
        "date": "09/06/2025",
        "isoDate": "2025-06-09",
        "desc": "Bayar uang Takziah  mertua Bpk Sudianto",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-93",
        "no": 93,
        "date": "09/06/2025",
        "isoDate": "2025-06-09",
        "desc": "Iuran takziah Bpk Fatwa Fayandi Kalimantan",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-94",
        "no": 94,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran Takziah bpk Azis Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-95",
        "no": 95,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Infaq tabung Pengajian di rumah bapak Julianto damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 65000,
        "out": 0,
        "amount": 65000
    },
    {
        "id": "jk-96",
        "no": 96,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran Takziah bpk Azis Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-97",
        "no": 97,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran takziah Bpk Abdul Hamid S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-98",
        "no": 98,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran Takziah bpk Dzulkarnain Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-99",
        "no": 99,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran Takziah bpk Julianto Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 90000,
        "out": 0,
        "amount": 90000
    },
    {
        "id": "jk-100",
        "no": 100,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran Takziah bpk Junaidi Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-101",
        "no": 101,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran takziah bpk kamal damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-102",
        "no": 102,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran takziah bpk suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-103",
        "no": 103,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran takziah bpk Yogi W. Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 80000,
        "out": 0,
        "amount": 80000
    },
    {
        "id": "jk-104",
        "no": 104,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran takziah bpk Edi Kurniawan S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-105",
        "no": 105,
        "date": "14/06/2025",
        "isoDate": "2025-06-14",
        "desc": "Iuran takziah bpk kamsino",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-106",
        "no": 106,
        "date": "28/06/2025",
        "isoDate": "2025-06-28",
        "desc": "Iuran takziah bpk Masta Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-107",
        "no": 107,
        "date": "28/06/2025",
        "isoDate": "2025-06-28",
        "desc": "Infaq tabung Pengajian di rumah ibuk Sarniah Srg",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-108",
        "no": 108,
        "date": "09/07/2025",
        "isoDate": "2025-07-09",
        "desc": "Beli spidol 4 buah dan penghapus whiteboard",
        "category": "Biaya Pembelian",
        "type": "out",
        "in": 0,
        "out": 42500,
        "amount": 42500
    },
    {
        "id": "jk-109",
        "no": 109,
        "date": "12/07/2025",
        "isoDate": "2025-07-12",
        "desc": "Iuran Takziah bpk Taufiq Simangunsong",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-110",
        "no": 110,
        "date": "12/07/2025",
        "isoDate": "2025-07-12",
        "desc": "Iuran takziah bpk Rindu Syuhada",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-111",
        "no": 111,
        "date": "12/07/2025",
        "isoDate": "2025-07-12",
        "desc": "Infaq Tabung pengajian dirumah Ibu Sariamah Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 80000,
        "out": 0,
        "amount": 80000
    },
    {
        "id": "jk-112",
        "no": 112,
        "date": "26/07/2025",
        "isoDate": "2025-07-26",
        "desc": "Infaq tabung Pengajian di rumah ibuk Risniatik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 83000,
        "out": 0,
        "amount": 83000
    },
    {
        "id": "jk-113",
        "no": 113,
        "date": "26/07/2025",
        "isoDate": "2025-07-26",
        "desc": "Iuran takziah bpk kamsino",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-114",
        "no": 114,
        "date": "26/07/2025",
        "isoDate": "2025-07-26",
        "desc": "Iuran takziah bpk kardi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-115",
        "no": 115,
        "date": "06/08/2025",
        "isoDate": "2025-08-06",
        "desc": "Beli 1 buah charger batere AA Taffware C903W",
        "category": "Biaya Pembelian",
        "type": "out",
        "in": 0,
        "out": 91900,
        "amount": 91900
    },
    {
        "id": "jk-116",
        "no": 116,
        "date": "08/08/2025",
        "isoDate": "2025-08-08",
        "desc": "Beli 4 buah batere AA recharger Panasonic Eneloop.",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 105256,
        "amount": 105256
    },
    {
        "id": "jk-117",
        "no": 117,
        "date": "09/08/2025",
        "isoDate": "2025-08-09",
        "desc": "Infaq tabung Pengajian di rumah bapak Azhar Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 85000,
        "out": 0,
        "amount": 85000
    },
    {
        "id": "jk-118",
        "no": 118,
        "date": "09/08/2025",
        "isoDate": "2025-08-09",
        "desc": "Iuran takziah bpk Edi Kurniawan S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-119",
        "no": 119,
        "date": "09/08/2025",
        "isoDate": "2025-08-09",
        "desc": "Iuran Takziah bpk Khairul A.F.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-120",
        "no": 120,
        "date": "23/08/2025",
        "isoDate": "2025-08-23",
        "desc": "Infaq Tabung pengajian dirumah Bpk Fadli",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 53000,
        "out": 0,
        "amount": 53000
    },
    {
        "id": "jk-121",
        "no": 121,
        "date": "06/09/2025",
        "isoDate": "2025-09-06",
        "desc": "Infaq Tabung pengajian dirumah Bpk Kamsino",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 73000,
        "out": 0,
        "amount": 73000
    },
    {
        "id": "jk-122",
        "no": 122,
        "date": "11/09/2025",
        "isoDate": "2025-09-11",
        "desc": "Bayar Uang jajan pengajian cabang",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-123",
        "no": 123,
        "date": "20/09/2025",
        "isoDate": "2025-09-20",
        "desc": "Iuran Takziah bpk Azhar Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-124",
        "no": 124,
        "date": "20/09/2025",
        "isoDate": "2025-09-20",
        "desc": "Iuran takziah bpk Kaliaman Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-125",
        "no": 125,
        "date": "20/09/2025",
        "isoDate": "2025-09-20",
        "desc": "Iuran takziah bpk Suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-126",
        "no": 126,
        "date": "04/10/2025",
        "isoDate": "2025-10-04",
        "desc": "Infaq Tabung pengajian dirumah Bpk Rindu Syuhada S.",
        "category": "Infaq Perorangan",
        "type": "in",
        "in": 74000,
        "out": 0,
        "amount": 74000
    },
    {
        "id": "jk-127",
        "no": 127,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Infaq tabung pengajian dirumah bpk Edi kurniawan Saragih.",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 67000,
        "out": 0,
        "amount": 67000
    },
    {
        "id": "jk-128",
        "no": 128,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk kardi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-129",
        "no": 129,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Bayar uang Takziah Bpk Saridun pematang",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-130",
        "no": 130,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk Suhendy",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-131",
        "no": 131,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk kamal damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-132",
        "no": 132,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk sahri",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-133",
        "no": 133,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk kamsino",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-134",
        "no": 134,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah Bpk Abdul Hamid S.",
        "category": "Infaq Perorangan",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-135",
        "no": 135,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk Kaliaman Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-136",
        "no": 136,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk Edi Kurniawan S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-137",
        "no": 137,
        "date": "15/11/2025",
        "isoDate": "2025-11-15",
        "desc": "Iuran takziah bpk adi kusdi",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-138",
        "no": 138,
        "date": "29/11/2025",
        "isoDate": "2025-11-29",
        "desc": "Infaq tabung pengajian dirumah bpk Kamal Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 80000,
        "out": 0,
        "amount": 80000
    },
    {
        "id": "jk-139",
        "no": 139,
        "date": "29/11/2025",
        "isoDate": "2025-11-29",
        "desc": "Iuran takziah bpk Masta Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-140",
        "no": 140,
        "date": "29/11/2025",
        "isoDate": "2025-11-29",
        "desc": "Iuran takziah bpk kamal damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-141",
        "no": 141,
        "date": "01/12/2025",
        "isoDate": "2025-12-01",
        "desc": "Bayar uang Takziah  istri Bpk Saridun Sinaga",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-142",
        "no": 142,
        "date": "13/12/2025",
        "isoDate": "2025-12-13",
        "desc": "Infaq tabung Pengajian dirumah bpk adi kusdi",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 77000,
        "out": 0,
        "amount": 77000
    },
    {
        "id": "jk-143",
        "no": 143,
        "date": "27/12/2025",
        "isoDate": "2025-12-27",
        "desc": "Infaq tabung pengajian dirumah bpk yahman saragih",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 83000,
        "out": 0,
        "amount": 83000
    },
    {
        "id": "jk-144",
        "no": 144,
        "date": "10/01/2026",
        "isoDate": "2026-01-10",
        "desc": "Iuran takziah bpk Yogi W. Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 30000,
        "out": 0,
        "amount": 30000
    },
    {
        "id": "jk-145",
        "no": 145,
        "date": "10/01/2026",
        "isoDate": "2026-01-10",
        "desc": "Iuran takziah bpk zulkarnain",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-146",
        "no": 146,
        "date": "10/01/2026",
        "isoDate": "2026-01-10",
        "desc": "Iuran takziah bpk azhar",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-147",
        "no": 147,
        "date": "10/01/2026",
        "isoDate": "2026-01-10",
        "desc": "Iuran takziah bpk kamsino",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-148",
        "no": 148,
        "date": "24/01/2026",
        "isoDate": "2026-01-24",
        "desc": "Infaq tabung Pengajian di rumah bapak Yogi Wardana",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 74000,
        "out": 0,
        "amount": 74000
    },
    {
        "id": "jk-149",
        "no": 149,
        "date": "04/02/2026",
        "isoDate": "2026-02-04",
        "desc": "Proposal HW Simalungun",
        "category": "Biaya Lain-lain",
        "type": "out",
        "in": 0,
        "out": 200000,
        "amount": 200000
    },
    {
        "id": "jk-150",
        "no": 150,
        "date": "07/02/2026",
        "isoDate": "2026-02-07",
        "desc": "Iuran takziah bpk Rahmat Fadli",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-151",
        "no": 151,
        "date": "07/02/2026",
        "isoDate": "2026-02-07",
        "desc": "Infaq tabung Pengajian di rumah bapak Dzulkarnain Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 60000,
        "out": 0,
        "amount": 60000
    },
    {
        "id": "jk-152",
        "no": 152,
        "date": "07/02/2026",
        "isoDate": "2026-02-07",
        "desc": "Subsidi sumbangan Isra Miraj PHBI Nagori bandar Malela",
        "category": "Biaya Lain-lain",
        "type": "out",
        "in": 0,
        "out": 52000,
        "amount": 52000
    },
    {
        "id": "jk-153",
        "no": 153,
        "date": "15/02/2026",
        "isoDate": "2026-02-15",
        "desc": "Infaq Tabung pengajian dirumah Bpk. Taufiq Simangunsong",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 59000,
        "out": 0,
        "amount": 59000
    },
    {
        "id": "jk-154",
        "no": 154,
        "date": "02/03/2026",
        "isoDate": "2026-03-02",
        "desc": "Bayar uang Takziah orang tua Bpk Andi Kalimantan",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-155",
        "no": 155,
        "date": "04/04/2026",
        "isoDate": "2026-04-04",
        "desc": "Infaq tabung Pengajian di rumah bapak Kaliaman Damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 73000,
        "out": 0,
        "amount": 73000
    },
    {
        "id": "jk-156",
        "no": 156,
        "date": "04/04/2026",
        "isoDate": "2026-04-04",
        "desc": "Bayar Uang jajan pengajian cabang / halal bilhalal   1447H",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 300000,
        "amount": 300000
    },
    {
        "id": "jk-157",
        "no": 157,
        "date": "18/04/2026",
        "isoDate": "2026-04-18",
        "desc": "Infaq tabung Pengajian dirumah bpk adi kusdi",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 86000,
        "out": 0,
        "amount": 86000
    },
    {
        "id": "jk-158",
        "no": 158,
        "date": "01/05/2026",
        "isoDate": "2026-05-01",
        "desc": "Infaq tabung Pengajian di rumah bapak Julianto damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 58000,
        "out": 0,
        "amount": 58000
    },
    {
        "id": "jk-159",
        "no": 159,
        "date": "27/05/2026",
        "isoDate": "2026-05-27",
        "desc": "Bayar uang Takziah ibu Ngatinem (ortu Bpk Dodi Suhendra Saragih)",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-160",
        "no": 160,
        "date": "28/05/2026",
        "isoDate": "2026-05-28",
        "desc": "Bayar uang takziah mertua Bpk Abdul Hamid Saragih",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-161",
        "no": 161,
        "date": "06/06/2026",
        "isoDate": "2026-06-06",
        "desc": "Bayar Uang jajan pengajian cabang",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-162",
        "no": 162,
        "date": "13/06/2026",
        "isoDate": "2026-06-13",
        "desc": "Infaq Tabung pengajian",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 46000,
        "out": 0,
        "amount": 46000
    },
    {
        "id": "jk-163",
        "no": 163,
        "date": "26/06/2026",
        "isoDate": "2026-06-26",
        "desc": "Infaq tabung Pengajian di rumah bapak Junaedi damanik",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 96000,
        "out": 0,
        "amount": 96000
    },
    {
        "id": "jk-164",
        "no": 164,
        "date": "10/07/2026",
        "isoDate": "2026-07-10",
        "desc": "Infaq tabung pengajian",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 64000,
        "out": 0,
        "amount": 64000
    },
    {
        "id": "jk-165",
        "no": 165,
        "date": "25/07/2026",
        "isoDate": "2026-07-25",
        "desc": "Infaq Tabung pengajian",
        "category": "Infaq Perorangan",
        "type": "in",
        "in": 92000,
        "out": 0,
        "amount": 92000
    },
    {
        "id": "jk-166",
        "no": 166,
        "date": "01/08/2026",
        "isoDate": "2026-08-01",
        "desc": "Bayar Uang jajan pengajian cabang",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-167",
        "no": 167,
        "date": "08/08/2026",
        "isoDate": "2026-08-08",
        "desc": "Infaq Tabung pengajian dirumah Bpk. Taufiq Simangunsong",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 92000,
        "out": 0,
        "amount": 92000
    },
    {
        "id": "jk-168",
        "no": 168,
        "date": "10/08/2026",
        "isoDate": "2026-08-10",
        "desc": "Debet kas (pinjaman an. Junaidi Damanik)",
        "category": "Biaya Lain-lain",
        "type": "out",
        "in": 0,
        "out": 500000,
        "amount": 500000
    },
    {
        "id": "jk-169",
        "no": 169,
        "date": "12/08/2026",
        "isoDate": "2026-08-12",
        "desc": "Bayar uang Takziah pak Siman Silau Malela (ortu bpk Salipok)",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-170",
        "no": 170,
        "date": "22/08/2026",
        "isoDate": "2026-08-22",
        "desc": "Infaq Tabung pengajian dirumah Bpk. Dodi suhendra saragih",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 68000,
        "out": 0,
        "amount": 68000
    },
    {
        "id": "jk-171",
        "no": 171,
        "date": "05/09/2026",
        "isoDate": "2026-09-05",
        "desc": "Iuran Takziah bpk Khairul A.F.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-172",
        "no": 172,
        "date": "05/09/2026",
        "isoDate": "2026-09-05",
        "desc": "Iuran takziah Bpk Fatwa Fayandi Kalimantan",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 10000,
        "out": 0,
        "amount": 10000
    },
    {
        "id": "jk-173",
        "no": 173,
        "date": "05/09/2026",
        "isoDate": "2026-09-05",
        "desc": "Infaq Tabung pengajian dirumah Bpk Fadli",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 117000,
        "out": 0,
        "amount": 117000
    },
    {
        "id": "jk-174",
        "no": 174,
        "date": "05/09/2026",
        "isoDate": "2026-09-05",
        "desc": "Bayar uang ustadz pengajian ranting dirumah Bpk. Rahmat Fadli",
        "category": "Subsidi ustadz",
        "type": "out",
        "in": 0,
        "out": 100000,
        "amount": 100000
    },
    {
        "id": "jk-175",
        "no": 175,
        "date": "19/09/2026",
        "isoDate": "2026-09-19",
        "desc": "Infaq tabung Pengajian di rumah ibuk Sarniah Srg",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 58000,
        "out": 0,
        "amount": 58000
    },
    {
        "id": "jk-176",
        "no": 176,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran Takziah bpk Dzulkarnain Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-177",
        "no": 177,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran takziah bpk Rindu Syuhada",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-178",
        "no": 178,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran Takziah bpk Taufiq Simangunsong",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-179",
        "no": 179,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran takziah bpk sahriudin saragih",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-180",
        "no": 180,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran takziah bpk kamsino",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-181",
        "no": 181,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran Takziah bpk Azhar Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 50000,
        "out": 0,
        "amount": 50000
    },
    {
        "id": "jk-182",
        "no": 182,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran takziah Bpk Abdul Hamid S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 60000,
        "out": 0,
        "amount": 60000
    },
    {
        "id": "jk-183",
        "no": 183,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran takziah bpk Edi Kurniawan S.",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 60000,
        "out": 0,
        "amount": 60000
    },
    {
        "id": "jk-184",
        "no": 184,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Infaq tabung Pengajian di rumah bapak Sahriudin Saragih",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 89000,
        "out": 0,
        "amount": 89000
    },
    {
        "id": "jk-185",
        "no": 185,
        "date": "03/10/2026",
        "isoDate": "2026-10-03",
        "desc": "Iuran takziah bpk Kaliaman Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    },
    {
        "id": "jk-186",
        "no": 186,
        "date": "10/10/2026",
        "isoDate": "2026-10-10",
        "desc": "Bayar uang Takziah  mertua Bpk Rindu S.",
        "category": "Biaya Sumbangan Kemalangan",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-187",
        "no": 187,
        "date": "10/10/2026",
        "isoDate": "2026-10-10",
        "desc": "Bayar Uang jajan pengajian cabang",
        "category": "Biaya Iuran Pengajian Cabang",
        "type": "out",
        "in": 0,
        "out": 150000,
        "amount": 150000
    },
    {
        "id": "jk-188",
        "no": 188,
        "date": "31/10/2026",
        "isoDate": "2026-10-31",
        "desc": "Infaq Tabung pengajian dirumah ibu risniatik srg.",
        "category": "Infaq Tabung Pengajian",
        "type": "in",
        "in": 69000,
        "out": 0,
        "amount": 69000
    },
    {
        "id": "jk-189",
        "no": 189,
        "date": "31/10/2026",
        "isoDate": "2026-10-31",
        "desc": "Iuran takziah bpk Masta Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 70000,
        "out": 0,
        "amount": 70000
    },
    {
        "id": "jk-190",
        "no": 190,
        "date": "31/10/2026",
        "isoDate": "2026-10-31",
        "desc": "Iuran takziah bpk Kaliaman Damanik",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 40000,
        "out": 0,
        "amount": 40000
    },
    {
        "id": "jk-191",
        "no": 191,
        "date": "31/10/2026",
        "isoDate": "2026-10-31",
        "desc": "Iuran takziah bpk yahman srg",
        "category": "Iuran Takziah",
        "type": "in",
        "in": 20000,
        "out": 0,
        "amount": 20000
    }
];

let jurnalKasState = [...INITIAL_JURNAL_KAS];
let jurnalKasCategories = [];

function getJurnalDefaultFilter() {
    const now = new Date();
    const curYear = String(now.getFullYear());
    const curMonth = String(now.getMonth() + 1).padStart(2, '0');
    return {
        search: '',
        year: curYear,
        month: curMonth,
        type: 'all',
        category: 'all',
        sort: 'asc' // 'asc' (No 1..N) atau 'desc' (Terbaru ke terlama)
    };
}

let jurnalFilter = getJurnalDefaultFilter();


function loadJurnalKasState() {
    let loaded = false;
    try {
        const key = (typeof STORAGE_KEYS !== 'undefined' && STORAGE_KEYS.JURNAL_KAS)
            ? STORAGE_KEYS.JURNAL_KAS
            : 'infaqmu_jurnal_kas_v1';
        const raw = localStorage.getItem(key);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                jurnalKasState = parsed;
                loaded = true;
            }
        }
    } catch (e) {}
    if (!loaded) jurnalKasState = JSON.parse(JSON.stringify(INITIAL_JURNAL_KAS));

    try {
        const rawCategories = localStorage.getItem(STORAGE_KEYS.JURNAL_CATEGORIES);
        const parsedCategories = rawCategories ? JSON.parse(rawCategories) : null;
        jurnalKasCategories = Array.isArray(parsedCategories)
            ? parsedCategories.filter(category => typeof category === 'string' && category.trim())
            : [];
    } catch (e) {
        jurnalKasCategories = [];
    }

    if (typeof takziahState !== 'undefined' && Array.isArray(takziahState.members)) {
        let descriptionsChanged = false;
        jurnalKasState.forEach(item => {
            if (!String(item.sourceKey || '').startsWith('takziah')) return;
            let memberId = '';
            if (item.sourceKey.startsWith('takziah-payment:')) {
                const transactionId = item.sourceKey.slice('takziah-payment:'.length);
                const payment = (takziahState.paymentTransactions || []).find(tx => tx.id === transactionId);
                memberId = payment?.memberId || '';
            } else if (item.sourceKey.startsWith('takziah:')) {
                memberId = item.sourceKey.split(':')[1] || '';
            }
            const member = takziahState.members.find(entry => entry.id === memberId)
                || takziahState.members.find(entry => entry.name && String(item.desc || '').toLowerCase().includes(String(entry.name).toLowerCase()));
            if (!member) return;
            const description = `Iuran Takziah - ${member.name}`;
            if (item.desc !== description) {
                item.desc = description;
                descriptionsChanged = true;
            }
        });
        if (descriptionsChanged) saveJurnalKasState();
    }
}

function saveJurnalKasState(skipCloud = false) {
    try {
        const key = (typeof STORAGE_KEYS !== 'undefined' && STORAGE_KEYS.JURNAL_KAS)
            ? STORAGE_KEYS.JURNAL_KAS
            : 'infaqmu_jurnal_kas_v1';
        localStorage.setItem(key, JSON.stringify(jurnalKasState));
    } catch (e) {}
    if (!skipCloud && typeof queueSharedAppStateSave === 'function') {
        queueSharedAppStateSave('jurnal_kas_data', jurnalKasState);
    }
}

// Keep every Takziah payment submission mirrored to exactly one Journal row.
function syncTakziahPaymentsToJournal(changes) {
    if (!Array.isArray(changes) || !changes.length || !Array.isArray(jurnalKasState)) return;
    let changed = false;

    changes.forEach(change => {
        if (change.legacyMemberId || change.legacyEventIds) {
            const eventIds = change.legacyEventIds || [];
            const before = jurnalKasState.length;
            jurnalKasState = jurnalKasState.filter(item => {
                if (!item.sourceKey || !item.sourceKey.startsWith('takziah:')) return true;
                const [, memberId, eventId] = item.sourceKey.split(':');
                return !((!change.legacyMemberId || memberId === change.legacyMemberId) && (!eventIds.length || eventIds.includes(eventId)));
            });
            if (jurnalKasState.length !== before) changed = true;
        }

        const { transaction, member, events = [], remove, createIfMissing } = change;
        if (!transaction) return;
        const sourceKey = `takziah-payment:${transaction.id}`;
        const existingIndex = jurnalKasState.findIndex(item => item.sourceKey === sourceKey);
        if (remove || Number(transaction.amount) <= 0 || !member) {
            if (existingIndex >= 0) {
                jurnalKasState.splice(existingIndex, 1);
                changed = true;
            }
            return;
        }

        const rawDate = String(transaction.date || '').trim();
        let isoDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : '';
        if (!isoDate) {
            const dmy = rawDate.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
            if (dmy) isoDate = `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`;
        }
        if (!isoDate) isoDate = new Date().toISOString().slice(0, 10);
        const [year, month, day] = isoDate.split('-');
        const dateFormatted = `${day}/${month}/${year}`;
        const description = `Iuran Takziah - ${member.name}`;
        const value = Number(transaction.amount) || 0;

        if (existingIndex >= 0) {
            const item = jurnalKasState[existingIndex];
            if (item.date !== dateFormatted || item.isoDate !== isoDate || item.desc !== description || item.category !== 'Iuran Takziah' || item.type !== 'in' || Number(item.in) !== value || Number(item.out) !== 0 || Number(item.amount) !== value) {
                Object.assign(item, { date: dateFormatted, isoDate, desc: description, category: 'Iuran Takziah', type: 'in', in: value, out: 0, amount: value });
                changed = true;
            }
            return;
        }
        if (!createIfMissing) return;

        const nextNo = jurnalKasState.reduce((max, item) => Math.max(max, Number(item.no) || 0), 0) + 1;
        jurnalKasState.push({
            id: `jk-takziah-${Date.now()}-${nextNo}`,
            sourceKey,
            no: nextNo,
            date: dateFormatted,
            isoDate,
            desc: description,
            category: 'Iuran Takziah',
            type: 'in',
            in: value,
            out: 0,
            amount: value
        });
        changed = true;
    });

    if (!changed) return;
    jurnalKasState.forEach((item, index) => { item.no = index + 1; });
    saveJurnalKasState();
    if (typeof renderJurnalView === 'function' && document.getElementById('jurnal-view')) renderJurnalView();
}

function saveJurnalCategoryState(skipCloud = false) {
    try {
        localStorage.setItem(STORAGE_KEYS.JURNAL_CATEGORIES, JSON.stringify(jurnalKasCategories));
    } catch (e) {}
    if (!skipCloud && typeof queueSharedAppStateSave === 'function') {
        queueSharedAppStateSave('jurnal_kas_categories', jurnalKasCategories);
    }
}

function resetJurnalKasToDefault() {
    if (!confirm('Apakah Anda yakin ingin memulihkan 191 data Jurnal Kas ke data awal?')) return;
    jurnalKasState = JSON.parse(JSON.stringify(INITIAL_JURNAL_KAS));
    saveJurnalKasState();
    renderJurnalView();
    showToast('Data Jurnal Kas berhasil dipulihkan ke 191 data resmi!', 'success');
}

// Menghitung Saldo Kumulatif (Running Balance) dari nomor 1 sampai N
function getJurnalWithCumulativeBalance() {
    // Pastikan urut kronologis berdasarkan 'no' untuk kalkulasi saldo berjalan akuntansi
    const sortedChronological = [...jurnalKasState].sort((a, b) => a.no - b.no);
    let running = 0;
    sortedChronological.forEach(item => {
        const inAmt = Number(item.in) || 0;
        const outAmt = Number(item.out) || 0;
        running += (inAmt - outAmt);
        item.runningBalance = running;
    });
    return sortedChronological;
}

function getJurnalUniqueCategories() {
    const cats = new Set(jurnalKasCategories);
    jurnalKasState.forEach(item => {
        if (item.category) cats.add(item.category);
    });
    return Array.from(cats).sort();
}

function refreshJurnalCategorySelect(selectId, selectedValue = '', lockTakziah = false) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const categories = getJurnalUniqueCategories();
    select.innerHTML = [
        '<option value="">Pilih kategori transaksi</option>',
        ...categories.map(category => {
            const locked = lockTakziah && isTakziahJournalCategory(category);
            const label = locked ? `${category} (khusus form edit)` : category;
            return `<option value="${escapeHtml(category)}" ${locked ? 'disabled' : ''}>${escapeHtml(label)}</option>`;
        })
    ].join('');
    select.value = categories.includes(selectedValue) && !(lockTakziah && isTakziahJournalCategory(selectedValue)) ? selectedValue : '';
}

function refreshNewJurnalCategorySelect(selectedValue = '') {
    refreshJurnalCategorySelect('new-jurnal-category', selectedValue, true);
}

function refreshEditJurnalCategorySelect(selectedValue = '') {
    refreshJurnalCategorySelect('edit-jurnal-category', selectedValue);
}

function isTakziahJournalCategory(category) {
    return String(category || '').trim().toLowerCase() === 'iuran takziah';
}

function findTakziahMemberIdFromDescription(description) {
    if (typeof takziahState === 'undefined' || !Array.isArray(takziahState.members)) return '';
    const normalized = String(description || '').toLowerCase();
    const match = [...takziahState.members]
        .filter(member => member.name && normalized.includes(String(member.name).toLowerCase()))
        .sort((a, b) => String(b.name).length - String(a.name).length)[0];
    return match ? match.id : '';
}

function getJurnalDescriptionValue(mode) {
    const memberSelect = document.getElementById(`${mode}-jurnal-desc-member`);
    if (memberSelect) {
        const member = (typeof takziahState !== 'undefined' ? takziahState.members : []).find(item => item.id === memberSelect.value);
        return member ? `Iuran Takziah - ${member.name}` : '';
    }
    return document.getElementById(`${mode}-jurnal-desc`)?.value.trim() || '';
}

function renderJurnalDescriptionField(mode, currentValue = '') {
    const container = document.getElementById(`${mode}-jurnal-desc-container`);
    const categorySelect = document.getElementById(`${mode}-jurnal-category`);
    if (!container || !categorySelect) return;

    if (isTakziahJournalCategory(categorySelect.value)) {
        const members = typeof takziahState !== 'undefined' && Array.isArray(takziahState.members)
            ? [...takziahState.members].sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'id'))
            : [];
        const selectedMemberId = findTakziahMemberIdFromDescription(currentValue);
        container.innerHTML = `
            <label for="${mode}-jurnal-desc-member" class="block text-xs font-bold text-slate-700 mb-1">Keterangan Lengkap</label>
            <select id="${mode}-jurnal-desc-member" required class="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold outline-none focus:border-emerald-500">
                <option value="">${members.length ? 'Pilih nama anggota' : 'Belum ada anggota Takziah'}</option>
                ${members.map(member => `<option value="${escapeHtml(member.id)}" ${member.id === selectedMemberId ? 'selected' : ''}>${escapeHtml(member.name)}</option>`).join('')}
            </select>
        `;
        return;
    }

    container.innerHTML = `
        <label for="${mode}-jurnal-desc" class="block text-xs font-bold text-slate-700 mb-1">Keterangan Lengkap</label>
        <textarea id="${mode}-jurnal-desc" required rows="2" placeholder="Tuliskan keterangan detail transaksi..." class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:border-emerald-500">${escapeHtml(currentValue)}</textarea>
    `;
}

function handleJurnalCategorySelection(mode) {
    renderJurnalDescriptionField(mode, getJurnalDescriptionValue(mode));
}

function openJurnalCategoryManager() {
    if (currentRole !== 'admin') return;
    let modal = document.getElementById('jurnal-category-manager-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'jurnal-category-manager-modal';
        modal.className = 'fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-sm hidden items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-5 space-y-4 max-h-[85vh] flex flex-col">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
                    <div>
                        <h3 class="font-display font-extrabold text-base text-slate-900">Kelola Kategori Jurnal Kas</h3>
                        <p class="text-[11px] text-slate-500 mt-0.5">Kategori yang dipakai transaksi tidak dapat dihapus.</p>
                    </div>
                    <button type="button" onclick="closeJurnalCategoryManager()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">×</button>
                </div>
                <form id="form-add-jurnal-category" class="flex gap-2 shrink-0">
                    <input type="text" id="new-jurnal-category-name" required maxlength="80" placeholder="Nama kategori baru" class="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:border-emerald-500">
                    <button type="submit" class="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">Tambah</button>
                </form>
                <div id="jurnal-category-manager-list" class="flex-1 overflow-y-auto space-y-2 pr-1"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#form-add-jurnal-category').addEventListener('submit', handleAddJurnalCategory);
        modal.querySelector('#jurnal-category-manager-list').addEventListener('click', handleJurnalCategoryManagerAction);
    }
    renderJurnalCategoryManager();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeJurnalCategoryManager() {
    const modal = document.getElementById('jurnal-category-manager-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function renderJurnalCategoryManager() {
    const list = document.getElementById('jurnal-category-manager-list');
    if (!list) return;
    const categories = getJurnalUniqueCategories();
    if (categories.length === 0) {
        list.innerHTML = '<p class="py-8 text-center text-xs text-slate-400">Belum ada kategori.</p>';
        return;
    }
    list.innerHTML = categories.map(category => {
        const usageCount = jurnalKasState.filter(item => item.category === category).length;
        return `
            <div class="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                <div class="min-w-0 flex-1">
                    <div class="truncate text-xs font-bold text-slate-800">${escapeHtml(category)}</div>
                    <div class="text-[10px] text-slate-500">${usageCount} transaksi</div>
                </div>
                <button type="button" data-category-action="rename" data-category="${escapeHtml(category)}" class="px-2 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-[10px] font-bold">Ubah</button>
                <button type="button" data-category-action="delete" data-category="${escapeHtml(category)}" class="px-2 py-1 rounded-lg ${usageCount ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'} text-[10px] font-bold" ${usageCount ? 'disabled' : ''}>Hapus</button>
            </div>
        `;
    }).join('');
}

function handleAddJurnalCategory(event) {
    event.preventDefault();
    if (currentRole !== 'admin') return;
    const input = document.getElementById('new-jurnal-category-name');
    const name = input?.value.trim();
    if (!name) return;
    if (getJurnalUniqueCategories().some(category => category.toLowerCase() === name.toLowerCase())) {
        showToast('Kategori tersebut sudah ada.', 'error');
        return;
    }
    jurnalKasCategories = getJurnalUniqueCategories();
    jurnalKasCategories.push(name);
    saveJurnalCategoryState();
    refreshNewJurnalCategorySelect(name);
    refreshEditJurnalCategorySelect(document.getElementById('edit-jurnal-category')?.value || '');
    handleJurnalCategorySelection('new');
    handleJurnalCategorySelection('edit');
    renderJurnalCategoryManager();
    input.value = '';
    showToast(`Kategori “${name}” berhasil ditambahkan.`, 'success');
}

async function handleJurnalCategoryManagerAction(event) {
    if (currentRole !== 'admin') return;
    const button = event.target.closest('[data-category-action]');
    if (!button) return;
    const category = button.dataset.category;
    const editSelectedCategory = document.getElementById('edit-jurnal-category')?.value || '';

    if (button.dataset.categoryAction === 'rename') {
        const newName = await showInAppDialog({
            title: 'Ubah Kategori Jurnal Kas',
            message: 'Nama baru juga akan diterapkan ke transaksi yang menggunakan kategori ini.',
            inputDefault: category,
            confirmText: 'Simpan'
        });
        if (!newName || !newName.trim()) return;
        const cleanedName = newName.trim();
        if (cleanedName.toLowerCase() !== category.toLowerCase() && getJurnalUniqueCategories().some(item => item.toLowerCase() === cleanedName.toLowerCase())) {
            showToast('Kategori dengan nama tersebut sudah ada.', 'error');
            return;
        }
        jurnalKasCategories = getJurnalUniqueCategories().map(item => item === category ? cleanedName : item);
        jurnalKasState.forEach(item => {
            if (item.category === category) item.category = cleanedName;
        });
        if (jurnalFilter.category === category) jurnalFilter.category = cleanedName;
        saveJurnalCategoryState();
        saveJurnalKasState();
        refreshNewJurnalCategorySelect(cleanedName);
        refreshEditJurnalCategorySelect(editSelectedCategory === category ? cleanedName : editSelectedCategory);
        handleJurnalCategorySelection('new');
        handleJurnalCategorySelection('edit');
        renderJurnalCategoryManager();
        renderJurnalView();
        showToast('Kategori dan transaksi terkait berhasil diperbarui.', 'success');
        return;
    }

    if (button.dataset.categoryAction === 'delete') {
        const usageCount = jurnalKasState.filter(item => item.category === category).length;
        if (usageCount > 0) {
            showToast('Kategori masih dipakai transaksi dan tidak dapat dihapus.', 'error');
            return;
        }
        const confirmed = await showInAppDialog({
            title: 'Hapus Kategori?',
            message: `Kategori “${category}” akan dihapus dari daftar referensi.`,
            confirmText: 'Hapus',
            cancelText: 'Batal'
        });
        if (!confirmed) return;
        jurnalKasCategories = getJurnalUniqueCategories().filter(item => item !== category);
        saveJurnalCategoryState();
        refreshNewJurnalCategorySelect();
        refreshEditJurnalCategorySelect(editSelectedCategory);
        handleJurnalCategorySelection('new');
        handleJurnalCategorySelection('edit');
        renderJurnalCategoryManager();
        renderJurnalView();
        showToast('Kategori berhasil dihapus.', 'success');
    }
}

function getJurnalUniqueYears() {
    const years = new Set();
    const curYear = String(new Date().getFullYear());
    years.add(curYear);
    jurnalKasState.forEach(item => {
        if (item.isoDate && item.isoDate.length >= 4) {
            years.add(item.isoDate.substring(0, 4));
        }
    });
    return Array.from(years).sort().reverse();
}

function setJurnalFilter(key, value) {
    jurnalFilter[key] = value;
    renderJurnalView();
}

function resetJurnalFilters() {
    jurnalFilter = getJurnalDefaultFilter();
    renderJurnalView();
}

let isJurnalFilterCollapsed = false;

function toggleJurnalFilterCollapse() {
    isJurnalFilterCollapsed = !isJurnalFilterCollapsed;
    renderJurnalView();
}

function renderJurnalView() {
    const container = document.getElementById('jurnal-view');
    if (!container) return;

    loadJurnalKasState();
    const isAdmin = currentRole === 'admin';

    // 1. Dapatkan semua data dengan saldo kumulatif berjalan
    const allChronological = getJurnalWithCumulativeBalance();

    // 2. Hitung Grand Total Keseluruhan (All Time)
    const grandTotalIn = allChronological.reduce((acc, it) => acc + (Number(it.in) || 0), 0);
    const grandTotalOut = allChronological.reduce((acc, it) => acc + (Number(it.out) || 0), 0);
    const grandTotalBalance = grandTotalIn - grandTotalOut;

    // 3. Filter data sesuai filter aktif
    const searchLow = (jurnalFilter.search || '').trim().toLowerCase();
    let filtered = allChronological.filter(item => {
        if (searchLow) {
            const matchDesc = (item.desc || '').toLowerCase().includes(searchLow);
            const matchCat = (item.category || '').toLowerCase().includes(searchLow);
            const matchDate = (item.date || '').toLowerCase().includes(searchLow);
            const matchNo = String(item.no) === searchLow;
            if (!matchDesc && !matchCat && !matchDate && !matchNo) return false;
        }
        if (jurnalFilter.year !== 'all') {
            if (!item.isoDate || !item.isoDate.startsWith(jurnalFilter.year)) return false;
        }
        if (jurnalFilter.month !== 'all') {
            const expectedYm = jurnalFilter.year !== 'all'
                ? `${jurnalFilter.year}-${jurnalFilter.month}`
                : `-${jurnalFilter.month}-`;
            if (!item.isoDate || !item.isoDate.includes(expectedYm)) return false;
        }
        if (jurnalFilter.type !== 'all') {
            if (item.type !== jurnalFilter.type) return false;
        }
        if (jurnalFilter.category !== 'all') {
            if (item.category !== jurnalFilter.category) return false;
        }
        return true;
    });

    // 4. Urutkan tampilan
    if (jurnalFilter.sort === 'desc') {
        filtered = [...filtered].reverse();
    }

    // 5. Hitung subtotal filter
    const filteredIn = filtered.reduce((acc, it) => acc + (Number(it.in) || 0), 0);
    const filteredOut = filtered.reduce((acc, it) => acc + (Number(it.out) || 0), 0);
    const filteredNet = filteredIn - filteredOut;

    const uniqueCats = getJurnalUniqueCategories();
    const uniqueYears = getJurnalUniqueYears();

    // Render HTML
    container.innerHTML = `
        <!-- HEADER JURNAL KAS (TERKUNCI / STICKY DI ATAS) -->
        <div id="jurnal-header-card-wrapper" class="sticky top-[56px] z-20 -mx-4 px-4 py-1.5 bg-white/95 backdrop-blur-md transition-all shadow-2xs">
            <div id="jurnal-header-banner" class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white shadow-md border border-emerald-900/40">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                            Buku Kas Umum
                        </span>
                        <h2 class="font-display font-extrabold text-base sm:text-lg mt-0.5 text-white">
                            Jurnal Kas Ranting Masuk & Keluar
                        </h2>
                    </div>
                    <div class="text-right shrink-0">
                        <span class="text-[11px] font-semibold text-emerald-300 block">Total ${allChronological.length} Transaksi</span>
                        <span class="text-[10px] text-slate-300">2023 - 2026</span>
                    </div>
                </div>
                <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                    Laporan catatan keuangan resmi arus kas masuk (penerimaan), kas keluar (pengeluaran), serta saldo kas kumulatif InfaqMU.
                </p>
            </div>

            <!-- TABEL HEADER TERKUNCI (STICKY TEPAT DI BAWAH JUDUL) -->
            <div id="jurnal-sticky-table-header-wrap" class="hidden mt-1.5 rounded-xl overflow-hidden shadow-md border border-slate-800 bg-slate-900 transition-opacity">
                <div id="jurnal-sticky-table-header-scroll" class="overflow-x-hidden no-scrollbar">
                    <table id="jurnal-sticky-clone-table" class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-900 text-white text-[11px] font-bold tracking-wide">
                                <th class="py-2.5 px-2.5 text-center border-r border-slate-800 w-10">No</th>
                                <th class="py-2.5 px-2.5 border-r border-slate-800 w-24 bg-slate-900 text-white font-bold">Tanggal</th>
                                <th class="py-2.5 px-3 border-r border-slate-800 min-w-[200px]">Keterangan & Kategori</th>
                                <th class="py-2.5 px-3 text-right border-r border-slate-800 text-emerald-300 w-28">Kas Masuk</th>
                                <th class="py-2.5 px-3 text-right border-r border-slate-800 text-rose-300 w-28">Kas Keluar</th>
                                <th class="py-2.5 px-3 text-right text-teal-300 w-32">Saldo Kas</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>

        <!-- 3 KPI RINGKASAN KAS -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div class="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 shadow-2xs">
                <div class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Total Kas Masuk</div>
                <div class="font-display font-extrabold text-lg text-emerald-900 mt-1">
                    Rp${formatIndoDots(grandTotalIn)}
                </div>
                <div class="text-[10px] text-emerald-700 mt-0.5">Penerimaan & Iuran</div>
            </div>

            <div class="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 shadow-2xs">
                <div class="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Total Kas Keluar</div>
                <div class="font-display font-extrabold text-lg text-rose-900 mt-1">
                    Rp${formatIndoDots(grandTotalOut)}
                </div>
                <div class="text-[10px] text-rose-700 mt-0.5">Pengeluaran & Santunan</div>
            </div>

            <div class="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-100/70 border border-teal-300 shadow-2xs">
                <div class="flex items-center justify-between">
                    <div class="text-[11px] font-bold text-teal-900 uppercase tracking-wider">Saldo Kas Akhir</div>
                    <span class="text-[9px] px-1.5 py-0.2 rounded bg-teal-600 text-white font-bold">Real</span>
                </div>
                <div class="font-display font-extrabold text-lg text-teal-950 mt-1">
                    Rp${formatIndoDots(grandTotalBalance)}
                </div>
                <div class="text-[10px] text-teal-800 mt-0.5">Saldo Bersih Tersedia</div>
            </div>
        </div>

        <!-- FILTER & PENCARIAN CONTROLS (NO-PRINT) -->
        <div class="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-3 shadow-xs no-print">
            <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                        </svg>
                        Filter & Pencarian Jurnal
                    </span>
                    <button type="button" onclick="toggleJurnalFilterCollapse()" class="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 transition-colors flex items-center gap-1">
                        <span>${isJurnalFilterCollapsed ? 'Tampilkan Filter' : 'Sembunyikan Filter'}</span>
                        <svg class="w-3.5 h-3.5 transition-transform duration-200 ${isJurnalFilterCollapsed ? '' : 'rotate-180'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                </div>
                <div class="flex items-center gap-1.5">
                    <button type="button" onclick="resetJurnalFilters()" class="text-[11px] font-bold text-slate-500 hover:text-slate-800 hover:underline">
                        Reset Filter
                    </button>
                    ${isAdmin ? `
                        <button type="button" onclick="openAddJurnalModal()" class="px-3.5 py-2 rounded-xl border border-sky-300 border-b-4 border-b-indigo-800 bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 text-white text-xs font-extrabold shadow-lg shadow-blue-300/60 transition-all hover:from-sky-300 hover:via-blue-500 hover:to-indigo-500 active:translate-y-0.5 active:border-b-2 active:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2">
                            + Transaksi Baru
                        </button>
                    ` : ''}
                </div>
            </div>

            <div id="jurnal-filter-body" class="${isJurnalFilterCollapsed ? 'hidden' : 'space-y-3 pt-1'}">
                <div class="relative">
                    <input type="text"
                        id="jurnal-search-input"
                        value="${escapeHtml(jurnalFilter.search)}"
                        oninput="setJurnalFilter('search', this.value)"
                        placeholder="Cari transaksi, keterangan, nama jamaah, atau kategori..."
                        class="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-emerald-500 bg-slate-50/50">
                    <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 mb-0.5">Tahun</label>
                        <select onchange="setJurnalFilter('year', this.value)" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800 outline-none">
                            <option value="all" ${jurnalFilter.year === 'all' ? 'selected' : ''}>Semua Tahun</option>
                            ${uniqueYears.map(y => `<option value="${y}" ${jurnalFilter.year === y ? 'selected' : ''}>${y}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 mb-0.5">Bulan</label>
                        <select onchange="setJurnalFilter('month', this.value)" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800 outline-none">
                            <option value="all" ${jurnalFilter.month === 'all' ? 'selected' : ''}>Semua Bulan</option>
                            <option value="01" ${jurnalFilter.month === '01' ? 'selected' : ''}>01 - Januari</option>
                            <option value="02" ${jurnalFilter.month === '02' ? 'selected' : ''}>02 - Februari</option>
                            <option value="03" ${jurnalFilter.month === '03' ? 'selected' : ''}>03 - Maret</option>
                            <option value="04" ${jurnalFilter.month === '04' ? 'selected' : ''}>04 - April</option>
                            <option value="05" ${jurnalFilter.month === '05' ? 'selected' : ''}>05 - Mei</option>
                            <option value="06" ${jurnalFilter.month === '06' ? 'selected' : ''}>06 - Juni</option>
                            <option value="07" ${jurnalFilter.month === '07' ? 'selected' : ''}>07 - Juli</option>
                            <option value="08" ${jurnalFilter.month === '08' ? 'selected' : ''}>08 - Agustus</option>
                            <option value="09" ${jurnalFilter.month === '09' ? 'selected' : ''}>09 - September</option>
                            <option value="10" ${jurnalFilter.month === '10' ? 'selected' : ''}>10 - Oktober</option>
                            <option value="11" ${jurnalFilter.month === '11' ? 'selected' : ''}>11 - November</option>
                            <option value="12" ${jurnalFilter.month === '12' ? 'selected' : ''}>12 - Desember</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 mb-0.5">Jenis Kas</label>
                        <select onchange="setJurnalFilter('type', this.value)" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800 outline-none">
                            <option value="all" ${jurnalFilter.type === 'all' ? 'selected' : ''}>Semua (Masuk & Keluar)</option>
                            <option value="in" ${jurnalFilter.type === 'in' ? 'selected' : ''}>Kas Masuk (+)</option>
                            <option value="out" ${jurnalFilter.type === 'out' ? 'selected' : ''}>Kas Keluar (-)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 mb-0.5">Urutan No</label>
                        <select onchange="setJurnalFilter('sort', this.value)" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800 outline-none">
                            <option value="asc" ${jurnalFilter.sort === 'asc' ? 'selected' : ''}>No 1 → ${allChronological.length} (Awal)</option>
                            <option value="desc" ${jurnalFilter.sort === 'desc' ? 'selected' : ''}>Terbaru → Terlama</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-500 mb-0.5">Kategori Transaksi</label>
                    <select onchange="setJurnalFilter('category', this.value)" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800 outline-none">
                        <option value="all" ${jurnalFilter.category === 'all' ? 'selected' : ''}>Semua Kategori</option>
                        ${uniqueCats.map(cat => `<option value="${cat}" ${jurnalFilter.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                    </select>
                </div>

                <!-- TOMBOL EKSPOR & AKSI -->
                <div class="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-100">
                    <span class="text-[11px] font-semibold text-slate-500">
                        Menampilkan <strong>${filtered.length}</strong> dari ${allChronological.length} transaksi
                    </span>
                    <div class="flex items-center gap-1.5">
                        <button type="button" onclick="copyJurnalSummaryText()" class="px-2.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs">
                            Salin Rekap
                        </button>
                        <button type="button" onclick="exportJurnalToCSV()" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">
                            Unduh CSV
                        </button>
                        <button type="button" onclick="window.print()" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">
                            Cetak
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- TABEL JURNAL KAS AKUNTANSI -->
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div id="jurnal-table-scroll-container" class="overflow-x-auto no-scrollbar">
                <table id="jurnal-main-table" class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-900 text-white text-[11px] font-bold tracking-wide">
                            <th class="py-2.5 px-2.5 text-center border-r border-slate-800 w-10">No</th>
                            <th class="py-2.5 px-2.5 border-r border-slate-800 w-24 bg-slate-900 text-white font-bold" style="position: static !important; box-shadow: none !important;">Tanggal</th>
                            <th class="py-2.5 px-3 border-r border-slate-800 min-w-[200px]">Keterangan & Kategori</th>
                            <th class="py-2.5 px-3 text-right border-r border-slate-800 text-emerald-300 w-28">Kas Masuk</th>
                            <th class="py-2.5 px-3 text-right border-r border-slate-800 text-rose-300 w-28">Kas Keluar</th>
                            <th class="py-2.5 px-3 text-right text-teal-300 w-32">Saldo Kas</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-medium">
                        ${filtered.length === 0 ? `
                            <tr>
                                <td colspan="6" class="py-8 text-center text-slate-400 text-xs">
                                    Tidak ada data transaksi yang cocok dengan filter.
                                </td>
                            </tr>
                        ` : filtered.map((item, idx) => {
                            const isMasuk = item.in > 0;
                            const isKeluar = item.out > 0;
                            const catBadgeCls = getJurnalCategoryBadgeClass(item.category);
                            const rowBg = idx % 2 === 1 ? 'bg-slate-100/75' : 'bg-white';
                            return `
                                <tr class="${rowBg} hover:bg-emerald-50/80 transition-colors ${isAdmin ? 'cursor-pointer' : ''}" ${isAdmin ? `onclick="if (!event.target.closest('button')) openEditJurnalModal('${item.id}')"` : ''}>
                                    <td class="py-2.5 px-2.5 text-center text-slate-500 font-bold border-r border-slate-200/80">
                                        ${item.no}
                                    </td>
                                    <td class="py-2.5 px-2.5 text-slate-800 font-semibold border-r border-slate-200/80 whitespace-nowrap" style="position: static !important; box-shadow: none !important;">
                                        ${item.date}
                                    </td>
                                    <td class="py-2.5 px-3 border-r border-slate-200/80 leading-snug">
                                        <div class="font-semibold text-slate-900">${escapeHtml(item.desc)}</div>
                                        <div class="mt-1.5 flex items-center justify-between gap-1.5 flex-wrap">
                                            <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${catBadgeCls}">
                                                ${escapeHtml(item.category)}
                                            </span>
                                            ${isAdmin ? `
                                                <div class="inline-flex items-center gap-1.5 no-print" onclick="event.stopPropagation()">
                                                    <button type="button" onclick="openEditJurnalModal('${item.id}')" title="Ubah Transaksi #${item.no}" class="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300 transition-colors inline-flex items-center gap-1 shadow-2xs">
                                                        <svg class="w-3 h-3 text-amber-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                        <span>Ubah</span>
                                                    </button>
                                                    <button type="button" onclick="confirmDeleteJurnalItem('${item.id}')" title="Hapus Transaksi #${item.no}" class="px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-300 transition-colors inline-flex items-center gap-1 shadow-2xs">
                                                        <svg class="w-3 h-3 text-rose-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                        <span>Hapus</span>
                                                    </button>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </td>
                                    <td class="py-2.5 px-3 text-right border-r border-slate-200/80 whitespace-nowrap font-bold ${isMasuk ? 'text-emerald-700 font-extrabold' : 'text-slate-300'}">
                                        ${isMasuk ? '+ Rp' + formatIndoDots(item.in) : '-'}
                                    </td>
                                    <td class="py-2.5 px-3 text-right border-r border-slate-200/80 whitespace-nowrap font-bold ${isKeluar ? 'text-rose-700 font-extrabold' : 'text-slate-300'}">
                                        ${isKeluar ? '- Rp' + formatIndoDots(item.out) : '-'}
                                    </td>
                                    <td class="py-2.5 px-3 text-right whitespace-nowrap font-extrabold text-slate-900">
                                        Rp${formatIndoDots(item.runningBalance)}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                    <tfoot>
                        <tr class="bg-slate-950 text-white font-extrabold text-xs">
                            <td colspan="3" class="py-3 px-3 text-right border-r border-slate-800 bg-slate-950 text-white">
                                SUBTOTAL HASIL FILTER:
                            </td>
                            <td class="py-3 px-3 text-right border-r border-slate-800 text-emerald-400 whitespace-nowrap bg-slate-950">
                                + Rp${formatIndoDots(filteredIn)}
                            </td>
                            <td class="py-3 px-3 text-right border-r border-slate-800 text-rose-400 whitespace-nowrap bg-slate-950">
                                - Rp${formatIndoDots(filteredOut)}
                            </td>
                            <td class="py-3 px-3 text-right text-teal-300 whitespace-nowrap bg-slate-950">
                                Rp${formatIndoDots(filteredNet)}
                            </td>
                        </tr>
                        <tr class="bg-slate-900 text-slate-200 font-extrabold text-[11px] border-t border-slate-800">
                            <td colspan="3" class="py-2.5 px-3 text-right border-r border-slate-800 bg-slate-900 text-slate-200">
                                TOTAL KAS AKHIR KESELURUHAN (ALL TIME):
                            </td>
                            <td class="py-2.5 px-3 text-right border-r border-slate-800 text-emerald-300 whitespace-nowrap bg-slate-900">
                                Rp${formatIndoDots(grandTotalIn)}
                            </td>
                            <td class="py-2.5 px-3 text-right border-r border-slate-800 text-rose-300 whitespace-nowrap bg-slate-900">
                                Rp${formatIndoDots(grandTotalOut)}
                            </td>
                            <td class="py-2.5 px-3 text-right text-emerald-300 whitespace-nowrap font-bold text-xs bg-slate-900">
                                Rp${formatIndoDots(grandTotalBalance)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        ${isAdmin ? `
            <div class="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs text-slate-600 no-print">
                <span>Mode Admin Aktif: Anda dapat menambah, mengedit, atau menghapus transaksi.</span>
                <button type="button" onclick="resetJurnalKasToDefault()" class="px-2 py-1 rounded bg-white hover:bg-slate-200 text-rose-700 font-bold text-[11px] border border-slate-300">
                    Reset 191 Data Awal
                </button>
            </div>
        ` : ''}
    `;

    setTimeout(setupStickyJurnalHeader, 30);
}

function syncJurnalHeaderWidths() {
    const mainThs = document.querySelectorAll('#jurnal-main-table thead th');
    const cloneThs = document.querySelectorAll('#jurnal-sticky-clone-table thead th');
    const mainTable = document.getElementById('jurnal-main-table');
    const cloneTable = document.getElementById('jurnal-sticky-clone-table');
    if (!mainTable || !cloneTable || mainThs.length === 0 || cloneThs.length === 0) return;

    cloneTable.style.width = `${mainTable.offsetWidth}px`;
    mainThs.forEach((th, idx) => {
        if (cloneThs[idx]) {
            const w = th.getBoundingClientRect().width;
            cloneThs[idx].style.width = `${w}px`;
            cloneThs[idx].style.minWidth = `${w}px`;
            cloneThs[idx].style.maxWidth = `${w}px`;
        }
    });
}

function handleJurnalScroll() {
    const wrapper = document.getElementById('jurnal-header-card-wrapper');
    const stickyHeader = document.getElementById('jurnal-sticky-table-header-wrap');
    const mainTable = document.getElementById('jurnal-main-table');
    if (!wrapper || !stickyHeader || !mainTable) return;

    const banner = document.getElementById('jurnal-header-banner');
    const bannerBottom = banner ? banner.getBoundingClientRect().bottom : wrapper.getBoundingClientRect().bottom;
    const tableRect = mainTable.getBoundingClientRect();

    // Munculkan sticky table header tepat di bawah banner judul saat tabel terscroll mencapai bawah judul
    const isTableUnderBanner = tableRect.top <= (bannerBottom + 4);
    const isTableStillVisible = tableRect.bottom > (bannerBottom + 40);

    if (isTableUnderBanner && isTableStillVisible) {
        stickyHeader.classList.remove('hidden');
        syncJurnalHeaderWidths();
        const mainScroll = document.getElementById('jurnal-table-scroll-container');
        const cloneScroll = document.getElementById('jurnal-sticky-table-header-scroll');
        if (mainScroll && cloneScroll) {
            cloneScroll.scrollLeft = mainScroll.scrollLeft;
        }
    } else {
        stickyHeader.classList.add('hidden');
    }
}

function setupStickyJurnalHeader() {
    const wrapper = document.getElementById('jurnal-header-card-wrapper');
    if (!wrapper) return;
    const mainHeader = document.querySelector('#main-app header');
    const headerHeight = mainHeader ? mainHeader.offsetHeight : 56;
    wrapper.style.top = `${headerHeight}px`;

    const mainScroll = document.getElementById('jurnal-table-scroll-container');
    const cloneScroll = document.getElementById('jurnal-sticky-table-header-scroll');
    if (mainScroll && cloneScroll) {
        mainScroll.onscroll = () => {
            cloneScroll.scrollLeft = mainScroll.scrollLeft;
        };
    }

    syncJurnalHeaderWidths();
    handleJurnalScroll();
}

if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
        setupStickyJurnalHeader();
        syncJurnalHeaderWidths();
        handleJurnalScroll();
    });
    window.addEventListener('scroll', handleJurnalScroll, { passive: true });
}

function getJurnalCategoryBadgeClass(category) {
    if (!category) return 'bg-slate-100 text-slate-700';
    const c = category.toLowerCase();
    if (c.includes('infaq tabung') || c.includes('infaq perorangan')) {
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    }
    if (c.includes('iuran takziah')) {
        return 'bg-sky-100 text-sky-800 border border-sky-200';
    }
    if (c.includes('takziah') || c.includes('kemalangan')) {
        return 'bg-purple-100 text-purple-800 border border-purple-200';
    }
    if (c.includes('pengajian cabang')) {
        return 'bg-blue-100 text-blue-800 border border-blue-200';
    }
    if (c.includes('pembelian') || c.includes('servis')) {
        return 'bg-amber-100 text-amber-800 border border-amber-200';
    }
    if (c.includes('transportasi')) {
        return 'bg-orange-100 text-orange-800 border border-orange-200';
    }
    if (c.includes('kalender')) {
        return 'bg-teal-100 text-teal-800 border border-teal-200';
    }
    return 'bg-slate-100 text-slate-800 border border-slate-200';
}

function copyJurnalSummaryText() {
    const all = getJurnalWithCumulativeBalance();
    const grandTotalIn = all.reduce((acc, it) => acc + (Number(it.in) || 0), 0);
    const grandTotalOut = all.reduce((acc, it) => acc + (Number(it.out) || 0), 0);
    const grandBalance = grandTotalIn - grandTotalOut;

    const lines = [
        `*JURNAL BUKU KAS INFAQMU*`,
        `Periode: 2023 - 2026 (Total ${all.length} Transaksi)`,
        `====================================`,
        `Total Kas Masuk  : Rp ${formatIndoDots(grandTotalIn)}`,
        `Total Kas Keluar : Rp ${formatIndoDots(grandTotalOut)}`,
        `*SALDO KAS AKHIR : Rp ${formatIndoDots(grandBalance)}*`,
        `====================================`,
        `Catatan: Seluruh data kas masuk & keluar tercatat rapi secara digital di sistem InfaqMu.`
    ];

    copyTextFallback(lines.join('\n'), 'Ringkasan Jurnal Kas berhasil disalin!');
}

function exportJurnalToCSV() {
    const all = getJurnalWithCumulativeBalance();
    const headers = ['No', 'Tanggal', 'Keterangan', 'Kategori', 'Kas Masuk', 'Kas Keluar', 'Saldo Kumulatif'];
    const rows = [headers];

    all.forEach(item => {
        rows.push([
            item.no,
            `"${item.date}"`,
            `"${(item.desc || '').replace(/"/g, '""')}"`,
            `"${(item.category || '').replace(/"/g, '""')}"`,
            item.in || 0,
            item.out || 0,
            item.runningBalance || 0
        ]);
    });

    const csvContent = '\uFEFF' + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jurnal_kas_infaqmu_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('File CSV Jurnal Kas berhasil diunduh!', 'success');
}

// Modal Tambah Transaksi Kas Baru
function openAddJurnalModal() {
    if (currentRole !== 'admin') return;
    const modalId = 'modal-add-jurnal-transaction';
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 class="font-display font-extrabold text-base text-slate-900">Tambah Transaksi Jurnal Kas</h3>
                    <button type="button" onclick="closeAddJurnalModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold">×</button>
                </div>
                <form id="form-add-jurnal" onsubmit="handleSaveNewJurnalTransaction(event)" class="space-y-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
                        <input type="date" id="new-jurnal-date" required value="${new Date().toISOString().split('T')[0]}" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Jenis Kas</label>
                        <select id="new-jurnal-type" required class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-emerald-500">
                            <option value="in">Kas Masuk (Penerimaan / Infaq)</option>
                            <option value="out">Kas Keluar (Pengeluaran / Biaya)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Nominal (Rp)</label>
                        <input type="text" id="new-jurnal-amount" required placeholder="Contoh: 100.000" oninput="formatMoneyInputLive(this)" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <div class="mb-1 flex items-center justify-between gap-2">
                            <label for="new-jurnal-category" class="block text-xs font-bold text-slate-700">Kategori</label>
                            <button type="button" onclick="openJurnalCategoryManager()" class="text-[10px] font-bold text-emerald-700 hover:text-emerald-900">Kelola Kategori</button>
                        </div>
                        <select id="new-jurnal-category" required onchange="handleJurnalCategorySelection('new')" class="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold outline-none focus:border-emerald-500">
                            <option value="">Pilih kategori transaksi</option>
                        </select>
                    </div>
                    <div id="new-jurnal-desc-container"></div>
                    <div class="flex items-center justify-end gap-2 pt-2">
                        <button type="button" onclick="closeAddJurnalModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">Batal</button>
                        <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md">Simpan Transaksi</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }
    refreshNewJurnalCategorySelect();
    renderJurnalDescriptionField('new', '');
    modal.classList.remove('hidden');
}

function closeAddJurnalModal() {
    const modal = document.getElementById('modal-add-jurnal-transaction');
    if (modal) modal.classList.add('hidden');
}

function handleSaveNewJurnalTransaction(e) {
    e.preventDefault();
    if (currentRole !== 'admin') return;

    const dateVal = document.getElementById('new-jurnal-date').value;
    const typeVal = document.getElementById('new-jurnal-type').value;
    const amountVal = parseIndoNumber(document.getElementById('new-jurnal-amount').value);
    const catVal = document.getElementById('new-jurnal-category').value.trim();
    const descVal = getJurnalDescriptionValue('new');

    if (isTakziahJournalCategory(catVal)) {
        showToast('Kategori Iuran Takziah hanya dapat digunakan melalui form Edit Transaksi.', 'error');
        return;
    }

    if (!amountVal || amountVal <= 0) {
        showToast('Nominal harus lebih dari 0.', 'error');
        return;
    }
    if (!descVal) {
        showToast(isTakziahJournalCategory(catVal) ? 'Silakan pilih nama anggota Takziah.' : 'Keterangan transaksi wajib diisi.', 'error');
        return;
    }

    const [y, m, d] = dateVal.split('-');
    const dateFormatted = `${d}/${m}/${y}`;
    const nextNo = jurnalKasState.length + 1;

    const newTx = {
        id: 'jk-' + nextNo + '-' + Date.now(),
        no: nextNo,
        date: dateFormatted,
        isoDate: dateVal,
        desc: descVal,
        category: catVal,
        type: typeVal,
        in: typeVal === 'in' ? amountVal : 0,
        out: typeVal === 'out' ? amountVal : 0,
        amount: amountVal
    };

    jurnalKasState.push(newTx);
    saveJurnalKasState();
    closeAddJurnalModal();
    renderJurnalView();
    showToast(`Transaksi berhasil ditambahkan ke Jurnal Kas (#${nextNo})!`, 'success');
}

// Modal Edit Transaksi Kas
function openEditJurnalModal(itemId) {
    if (currentRole !== 'admin') return;
    const item = jurnalKasState.find(it => it.id === itemId);
    if (!item) return;

    let isoDateVal = item.isoDate;
    if (!isoDateVal && item.date) {
        const parts = item.date.split('/');
        if (parts.length === 3) {
            isoDateVal = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    }

    const modalId = 'modal-edit-jurnal-transaction';
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                    <h3 class="font-display font-extrabold text-base text-slate-900">Edit Transaksi Jurnal Kas</h3>
                    <span class="text-[11px] font-bold text-emerald-700">Transaksi #${item.no}</span>
                </div>
                <button type="button" onclick="closeEditJurnalModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold">×</button>
            </div>
            <form id="form-edit-jurnal" onsubmit="handleUpdateJurnalTransaction(event, '${item.id}')" class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
                    <input type="date" id="edit-jurnal-date" required value="${isoDateVal || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Jenis Kas</label>
                    <select id="edit-jurnal-type" required class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-emerald-500">
                        <option value="in" ${item.type === 'in' ? 'selected' : ''}>Kas Masuk (Penerimaan / Infaq)</option>
                        <option value="out" ${item.type === 'out' ? 'selected' : ''}>Kas Keluar (Pengeluaran / Biaya)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Nominal (Rp)</label>
                    <input type="text" id="edit-jurnal-amount" required value="${formatIndoDots(item.amount || item.in || item.out)}" placeholder="Contoh: 100.000" oninput="formatMoneyInputLive(this)" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-emerald-500">
                </div>
                <div>
                    <div class="mb-1 flex items-center justify-between gap-2">
                        <label for="edit-jurnal-category" class="block text-xs font-bold text-slate-700">Kategori</label>
                        <button type="button" onclick="openJurnalCategoryManager()" class="text-[10px] font-bold text-emerald-700 hover:text-emerald-900">Kelola Kategori</button>
                    </div>
                    <select id="edit-jurnal-category" required onchange="handleJurnalCategorySelection('edit')" class="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold outline-none focus:border-emerald-500">
                        <option value="">Pilih kategori transaksi</option>
                    </select>
                </div>
                <div id="edit-jurnal-desc-container"></div>
                <div class="flex items-center justify-end gap-2 pt-2">
                    <button type="button" onclick="closeEditJurnalModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">Batal</button>
                    <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    `;
    refreshEditJurnalCategorySelect(item.category || '');
    renderJurnalDescriptionField('edit', item.desc || '');
    modal.classList.remove('hidden');
}

function closeEditJurnalModal() {
    const modal = document.getElementById('modal-edit-jurnal-transaction');
    if (modal) modal.classList.add('hidden');
}

function handleUpdateJurnalTransaction(e, itemId) {
    e.preventDefault();
    if (currentRole !== 'admin') return;

    const item = jurnalKasState.find(it => it.id === itemId);
    if (!item) return;

    const dateVal = document.getElementById('edit-jurnal-date').value;
    const typeVal = document.getElementById('edit-jurnal-type').value;
    const amountVal = parseIndoNumber(document.getElementById('edit-jurnal-amount').value);
    const catVal = document.getElementById('edit-jurnal-category').value.trim();
    const descVal = getJurnalDescriptionValue('edit');

    if (!amountVal || amountVal <= 0) {
        showToast('Nominal harus lebih dari 0.', 'error');
        return;
    }
    if (!descVal) {
        showToast(isTakziahJournalCategory(catVal) ? 'Silakan pilih nama anggota Takziah.' : 'Keterangan transaksi wajib diisi.', 'error');
        return;
    }

    const [y, m, d] = dateVal.split('-');
    item.date = `${d}/${m}/${y}`;
    item.isoDate = dateVal;
    item.type = typeVal;
    item.amount = amountVal;
    item.in = typeVal === 'in' ? amountVal : 0;
    item.out = typeVal === 'out' ? amountVal : 0;
    item.category = catVal;
    item.desc = descVal;

    saveJurnalKasState();
    closeEditJurnalModal();
    renderJurnalView();
    showToast(`Transaksi #${item.no} berhasil diperbarui!`, 'success');
}

async function confirmDeleteJurnalItem(itemId) {
    if (currentRole !== 'admin') return;
    const item = jurnalKasState.find(it => it.id === itemId);
    if (!item) return;

    const typeLabel = item.type === 'in' ? 'Kas Masuk (+)' : 'Kas Keluar (-)';
    const ok = await showInAppDialog({
        title: 'Hapus Transaksi Jurnal',
        message: `Apakah Anda yakin ingin menghapus transaksi #${item.no} (${item.date})?\n\n"${item.desc}"\nNominal: ${typeLabel} Rp${formatIndoDots(item.amount || item.in || item.out)}`,
        confirmText: 'Hapus Transaksi',
        cancelText: 'Batal'
    });
    if (!ok) return;

    const deletedNo = item.no;
    jurnalKasState = jurnalKasState.filter(it => it.id !== itemId);
    // Renumber nomor transaksi agar tetap urut
    jurnalKasState.forEach((it, idx) => {
        it.no = idx + 1;
    });

    saveJurnalKasState();
    renderJurnalView();
    showToast(`Transaksi #${deletedNo} berhasil dihapus.`, 'info');
}

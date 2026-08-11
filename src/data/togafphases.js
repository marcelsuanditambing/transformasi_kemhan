// Data konten TOGAF Pertahanan Indonesia (BAB III.2.3 tesis).
// Dihasilkan otomatis dari naskah tesis; isi lengkap, tanpa dikurangi.

export const overview = {
  "title": "TOGAF Pertahanan Indonesia",
  "subtitle": "Kerangka Arsitektur Enterprise berbasis TOGAF ADM untuk transformasi digital sektor pertahanan Indonesia.",
  "paragraphs": [
    "TOGAF Pertahanan Indonesia merupakan hasil penyesuaian (kustomisasi) TOGAF ADM yang disesuaikan dengan kebutuhan transformasi digital sektor pertahanan. Framework ini mempertahankan seluruh kekuatan metodologis TOGAF ADM, yaitu sifat bertahap, iteratif, dan preskriptif, dengan Requirements Management yang tetap berada di pusat siklus sebagai pengendali konsistensi kebutuhan antarfase.",
    "TOGAF Pertahanan Indonesia terdiri atas sepuluh fase utama, yaitu Preliminary, Architecture Vision, Business Architecture, Information Systems Architecture, Technology Architecture, C5ISR Architecture, Opportunities & Solutions, Migration Planning, Implementation Governance, dan Architecture Change Management.",
    "Kesepuluh fase tersebut dapat dipandang sebagai tiga kelompok yang berurutan. Kelompok pertama adalah fase penetapan arah dan fondasi, yang mencakup Preliminary dan Architecture Vision. Pada kelompok inilah muatan pertahanan ditanamkan paling awal, yaitu melalui penetapan doktrin dan strategi pertahanan nasional sebagai masukan serta penetapan prinsip arsitektur.",
    "Kelompok kedua adalah fase pengembangan domain arsitektur, yang mencakup Business Architecture, Information Systems Architecture, Technology Architecture, dan C5ISR Architecture. Tiga fase pertama merupakan bagian standar TOGAF yang dipertahankan tanpa pengurangan, sedangkan Fase C5ISR Architecture merupakan fase baru yang menjadi pembeda utama framework ini dari TOGAF standar.",
    "Kelompok ketiga adalah fase realisasi dan keberlanjutan, yang mencakup Opportunities & Solutions, Migration Planning, Implementation Governance, dan Architecture Change Management. Keempat fase ini dipertahankan sebagaimana adanya pada TOGAF ADM standar karena telah memadai untuk menjamin bahwa arsitektur yang dirancang dapat diwujudkan, dikendalikan, dan dipelihara relevansinya secara berkelanjutan.",
    "Setiap fase diuraikan dalam format yang seragam, yaitu masukan (input), langkah utama (step), dan keluaran (output), sehingga setiap fase dapat langsung dijadikan panduan pelaksanaan."
  ]
};

export const phases = [
  {
    "id": "preliminary",
    "label": "Preliminary",
    "chapter": "III.2.3.1",
    "title": "Fase Preliminary",
    "paragraphs": [
      "Fase Preliminary merupakan fase persiapan yang menetapkan fondasi bagi keseluruhan pengembangan arsitektur. Pada fase ini ditetapkan ruang lingkup transformasi digital pertahanan, prinsip-prinsip arsitektur, struktur tata kelola arsitektur, serta penilaian kesiapan organisasi. Fase ini juga memastikan keterkaitan arsitektur dengan kerangka regulasi nasional dan sektor pertahanan, sehingga arsitektur yang dihasilkan selaras dengan kebijakan yang berlaku.",
      "Gambar III.2 menempatkan fase Preliminary pada puncak siklus, terpisah dari kesembilan fase lain yang mengelilingi Requirements Management. Kedudukan ini menegaskan sifatnya sebagai fase persiapan yang dijalankan satu kali di awal untuk membentuk fondasi seluruh siklus, bukan bagian dari perulangan pengembangan arsitektur. Pada fase inilah kesiapan organisasi dinilai, tim arsitektur dibentuk, prinsip arsitektur ditetapkan, dan kerangka TOGAF disesuaikan menjadi TOGAF Pertahanan Indonesia. Rincian input, step dan output yang membentuk fase tersebut terdapat pada Tabel III.5.",
      "Fase Preliminary TOGAF Pertahanan Indonesia menghadirkan konteks pertahanan sejak titik paling awal. Fase ini menerima input doktrin dan strategi pertahanan nasional, standar industri pertahanan, serta kerangka regulasi dan tata kelola yang mencakup SPBE dan Satu Data Indonesia. Ketiga kelompok input ini memastikan bahwa arsitektur yang akan dibentuk selaras dengan karakteristik organisasi pertahanan dan berada sesuai dengan hukum yang berlaku.",
      "Langkah-langkah fase ini bergerak dari penetapan ruang lingkup organisasi yang terdampak, pembentukan tim arsitektur, hingga penetapan prinsip arsitektur pertahanan. Langkah yang paling menentukan adalah penyesuaian kerangka TOGAF ADM menjadi TOGAF Pertahanan Indonesia, karena pada langkah inilah struktur sepuluh fase, prinsip pertahanan, dan penempatan fase C5ISR ditetapkan.",
      "Output dari fase ini merupakan perangkat kerja bagi seluruh siklus. Model organisasi arsitektur, kerangka tata kelola arsitektur, dan prinsip arsitektur pertahanan menjadi acuan pengendalian mutu pada setiap fase."
    ],
    "io": {
      "input": [
        "TOGAF reference material dan TOGAF Library",
        "Kerangka arsitektur pertahanan sebagai rujukan",
        "Doktrin dan strategi pertahanan nasional",
        "Rencana strategis transformasi digital Kemhan",
        "Standar industri pertahanan",
        "Kerangka regulasi dan tata kelola, mencakup SPBE dan Satu Data Indonesia",
        "Informasi pemangku kepentingan dan struktur organisasi",
        "Kapabilitas arsitektur yang telah dimiliki organisasi",
        "Perjanjian kemitraan dan kontrak kerja sama industri pertahanan"
      ],
      "step": [
        "Menentukan ruang lingkup organisasi yang terdampak transformasi digital pertahanan",
        "Mengonfirmasi kerangka tata kelola dan kerangka pendukung",
        "Mendefinisikan dan membentuk tim serta organisasi Enterprise Architecture pertahanan",
        "Mengidentifikasi dan menetapkan prinsip arsitektur pertahanan",
        "Melakukan penyesuaian (tailoring) kerangka TOGAF menjadi TOGAF Pertahanan Indonesia",
        "Mengidentifikasi keterkaitan arsitektur dengan regulasi nasional dan sektor pertahanan",
        "Menetapkan definisi smart defence dan prinsip interoperabilitas sebagai acuan bersama"
      ],
      "output": [
        "Model organisasi untuk arsitektur enterprise (organizational model)",
        "Kerangka arsitektur hasil penyesuaian, yaitu TOGAF Pertahanan Indonesia",
        "Architecture Repository awal yang telah diisi muatan kerangka",
        "Prinsip arsitektur pertahanan",
        "Kerangka tata kelola arsitektur (architecture governance framework)",
        "Dokumen ruang lingkup dan keterkaitan regulasi",
        "Request for Architecture Work",
        "Arsitektur kapabilitas Enterprise Architecture"
      ]
    }
  },
  {
    "id": "architecture-vision",
    "label": "A",
    "chapter": "III.2.3.2",
    "title": "Fase Architecture Vision",
    "paragraphs": [
      "Pada fase Architecture Vision dilakukan perumusan visi, misi, dan tujuan strategis arsitektur transformasi digital pertahanan, serta identifikasi pemangku kepentingan utama. Fase ini memberikan gambaran tingkat tinggi mengenai kondisi target (to-be) yang ingin dicapai dan menjadi acuan arah bagi seluruh fase berikutnya.",
      "Gambar III.3 menunjukkan fase Architecture Vision sebagai fase pertama yang terhubung langsung dengan Requirements Management di pusat siklus. Posisi ini menandai peralihan dari persiapan menuju pengembangan, yaitu titik ketika kebutuhan pemangku kepentingan mulai dikumpulkan dan diterjemahkan menjadi arah arsitektur. Input, step dan output yang menghasilkan arah tersebut diuraikan pada Tabel III.6,",
      "Input fase ini bertumpu pada output fase Preliminary, ditambah satu masukan khas berupa kerangka regulasi nasional serta doktrin dan strategi pertahanan. Input ini memastikan bahwa visi arsitektur yang dirumuskan tidak menyimpang dari arah kebijakan pertahanan nasional.",
      "Rangkaian langkah-langkah fase ini menuntun penyusunan visi secara sistematis, mulai dari penetapan proyek arsitektur, identifikasi pemangku kepentingan beserta kepeduliannya, penilaian kesiapan organisasi, hingga penyusunan visi dan misi pertahanan digital.",
      "Output fase ini menetapkan arah yang mengikat fase-fase berikutnya. Dokumen Architecture Vision, prinsip arsitektur yang telah dikonfirmasi, peta pemangku kepentingan, dan tujuan strategis arsitektur menjadi rujukan bersama, sedangkan rencana komunikasi mengatur penyampaian kemajuan kepada tiap kelompok pemangku kepentingan yang berjenjang di lingkungan Kemhan dan TNI."
    ],
    "io": {
      "input": [
        "Architecture reference materials",
        "Request for Architecture Work",
        "Prinsip, sasaran, dan pendorong organisasi pertahanan",
        "Model organisasi untuk arsitektur enterprise",
        "TOGAF Pertahanan Indonesia hasil penyesuaian",
        "Architecture Repository yang telah terisi",
        "Kerangka regulasi nasional serta doktrin dan strategi pertahanan"
      ],
      "step": [
        "Menetapkan proyek arsitektur",
        "Mengidentifikasi pemangku kepentingan, kepedulian (concern), dan kebutuhan organisasi",
        "Mengonfirmasi dan menguraikan sasaran, pendorong, serta kendala organisasi pertahanan",
        "Mengevaluasi kapabilitas organisasi",
        "Menilai kesiapan organisasi terhadap transformasi",
        "Menetapkan ruang lingkup arsitektur",
        "Mengonfirmasi dan menguraikan prinsip arsitektur pertahanan",
        "Menyusun visi dan misi arsitektur pertahanan digital",
        "Menetapkan proposisi nilai manfaatan arsitektur target dan indikator kinerja utama",
        "Mengidentifikasi risiko transformasi dan tindakan mitigasinya",
        "Menyusun statement of architecture work (kesepakatan kerja) dan memperoleh persetujuan"
      ],
      "output": [
        "Statement of Architecture Work yang disetujui",
        "Pernyataan yang telah diperbarui mengenai prinsip, sasaran, dan pendorong organisasi",
        "Prinsip arsitektur pertahanan yang telah dikonfirmasi",
        "Hasil penilaian kapabilitas (capability assessment)",
        "TOGAF Pertahanan Indonesia yang telah disesuaikan",
        "Dokumen Architecture Vision berisi visi dan misi pertahanan digital",
        "Peta pemangku kepentingan (stakeholder map)",
        "Tujuan strategis arsitektur pertahanan",
        "Rencana komunikasi (communications plan)",
        "Tambahan file yang mengisi Architecture Repository"
      ]
    }
  },
  {
    "id": "business-architecture",
    "label": "B",
    "chapter": "III.2.3.3",
    "title": "Fase Business Architecture",
    "paragraphs": [
      "Pada fase Business Architecture dilakukan perancangan model proses bisnis, kapabilitas, dan organisasi pertahanan yang efektif untuk mendukung komando dan kendali, integrasi data, serta kolaborasi lintas satuan.",
      "Input fase ini mencakup arahan strategis dari fase Architecture Vision serta gambaran struktur organisasi dan proses bisnis eksisting di lingkungan Kemhan dan TNI. Kombinasi keduanya pada fase ini menghasilkan perbandingan kondisi saat ini (as-is) dengan kondisi yang dituju (target), sehingga rancangan yang dihasilkan berangkat dari keadaan nyata organisasi pertahanan.",
      "Langkah-langkah fase ini menegaskan pendekatan berbasis kapabilitas. Pemodelan proses bisnis inti dan pendukung, penyusunan peta kapabilitas, dan penyusunan value stream pertahanan menempatkan kapabilitas sebagai analisis utama. Setelah arsitektur bisnis target disusun, analisis kesenjangan mengidentifikasi selisih antara kondisi saat ini dan kondisi target yang harus ditutup.",
      "Output fase ini menyediakan pijakan organisasional bagi fase berikutnya. Peta kapabilitas dan value stream pertahanan menjadi acuan penurunan kebutuhan data dan aplikasi, sedangkan model tata kelola dan komando serta model operasi dan interoperabilitas lintas matra secara khusus menyiapkan landasan bagi perancangan arsitektur komando dan kendali pada fase C5ISR. Dengan demikian, arsitektur C5ISR tidak dirancang terlepas dari struktur organisasi yang menjalankannya."
    ],
    "io": {
      "input": [
        "Architecture reference materials",
        "Request for Architecture Work",
        "Prinsip, sasaran, dan pendorong organisasi pertahanan",
        "Hasil penilaian kapabilitas dan rencana komunikasi",
        "Model organisasi untuk arsitektur enterprise",
        "TOGAF Pertahanan Indonesia",
        "Statement of Architecture Work yang disetujui",
        "Prinsip arsitektur pertahanan",
        "Enterprise Continuum dan Architecture Repository",
        "Dokumen Architecture Vision",
        "Draf Architecture Definition Document",
        "Struktur organisasi dan proses bisnis eksisting Kemhan dan TNI",
        "Strategi pertahanan dan transformasi digital"
      ],
      "step": [
        "Memilih model rujukan, sudut pandang (viewpoint), dan perangkat pemodelan",
        "Menyusun deskripsi arsitektur bisnis baseline",
        "Memodelkan proses bisnis inti dan proses bisnis pendukung pertahanan",
        "Menyusun peta kapabilitas (business capability map) dan value stream pertahanan",
        "Menyusun deskripsi arsitektur bisnis target",
        "Melakukan analisis kesenjangan (as-is vs to-be)",
        "Menetapkan komponen kandidat roadmap",
        "Menyelesaikan dampak lintas lanskap arsitektur",
        "Melaksanakan tinjauan formal pemangku kepentingan",
        "Memfinalkan arsitektur bisnis",
        "Menyusun atau memutakhirkan Architecture Definition Document"
      ],
      "output": [
        "Versi yang diperhalus dan dimutakhirkan dari keluaran fase Architecture Vision",
        "Draf Architecture Definition Document",
        "Draf Architecture Requirements Specification",
        "Komponen arsitektur bisnis pada roadmap arsitektur",
        "Peta kapabilitas pertahanan (business capability map)",
        "Value stream pertahanan",
        "Model tata kelola dan komando",
        "Model operasi dan interoperabilitas lintas matra"
      ]
    }
  },
  {
    "id": "information-system-architecture",
    "label": "C",
    "chapter": "III.2.3.4",
    "title": "Fase Information System Architecture",
    "intro": [
      "Fase Information Systems Architecture dilakukan untuk menentukan arsitektur sistem informasi yang mendukung proses bisnis pertahanan. Fase ini mencakup dua sub-domain, yaitu arsitektur data (data architecture) dan arsitektur aplikasi (application architecture).",
      "Pada TOGAF Pertahanan Indonesia, kedua sub-domain dikerjakan secara berurutan dengan arsitektur data didahulukan. Karena permasalahan utama ekosistem digital pertahanan terletak pada data yang terkotak-kotak antarsatuan, sehingga penetapan definisi, klasifikasi, dan kepemilikan data harus lebih dahulu diselesaikan sebelum portofolio aplikasi dirancang."
    ],
    "hasSubDomains": true,
    "subDomains": [
      {
        "id": "data-architecture",
        "chapter": "III.2.3.4.1",
        "title": "Data Architecture",
        "paragraphs": [
          "Arsitektur data merancang struktur definisi, klasifikasi, dan tata kelola kepemilikan data pertahanan. Perancangan arsitektur data berpedoman pada prinsip Data as Strategic Asset, serta pada ketentuan Satu Data Indonesia dan ketentuan klasifikasi informasi pertahanan. Kedudukan sub-domain ini dalam siklus TOGAF Pertahanan Indonesia ditunjukkan pada Gambar III.5.",
          "Gambar III.5 menunjukkan bahwa arsitektur data merupakan salah satu dari dua cabang fase Information Systems Architecture yang dikerjakan terlebih dahulu. Input, step, dan output yang membentuk arsitektur data disajikan pada Tabel III.8.",
          "Input pada sub-domain ini menghadirkan ketentuan yang mengikat pengelolaan data pertahanan, yaitu regulasi tentang data termasuk Satu Data Indonesia serta standar keamanan siber dan pelindungan data. Kedua masukan tersebut menjadi pembatas sekaligus pengarah, karena rancangan data yang dihasilkan harus memenuhi kewajiban berbagi pakai data sekaligus menghormati ketentuan kerahasiaan.",
          "Langkah-langkah dari sub-domain ini dipusatkan pada penataan data yang selama ini terkotak antarsatuan. Pemodelan entitas data utama, penyusunan klasifikasi data menurut tingkat kerahasiaan, dan penetapan kepemilikan data antarsatuan merupakan inti pekerjaan yang menjadikan data dapat dibagipakaikan menurut aturan yang jelas. Tanpa klasifikasi yang tegas, setiap satuan cenderung memilih sikap paling aman dengan tidak membagikan data sama sekali.",
          "Output sub-domain ini menjadi rujukan tunggal bagi pengelolaan data. Model entitas data, klasifikasi kerahasiaan, kamus data, dan matriks kepemilikan menetapkan siapa yang bertanggung jawab atas setiap kumpulan data, sedangkan rancangan data security and access control menjadi masukan langsung bagi arsitektur aplikasi dan bagi perancangan fondasi keamanan siber pada fase Technology Architecture."
        ],
        "io": {
          "input": [
            "Architecture reference materials",
            "Request for Architecture Work",
            "Hasil penilaian kapabilitas",
            "Rencana komunikasi",
            "Model organisasi untuk arsitektur enterprise",
            "TOGAF Pertahanan Indonesia",
            "Prinsip data (data principles)",
            "Statement of Architecture Work",
            "Dokumen Architecture Vision",
            "Architecture Repository",
            "Draf Architecture Definition Document dan draf Architecture Requirements Specification",
            "Komponen arsitektur bisnis pada roadmap arsitektur",
            "Regulasi nasional dan sektor pertahanan tentang data, mencakup Satu Data Indonesia",
            "Standar keamanan siber dan pelindungan data pertahanan"
          ],
          "step": [
            "Memilih model rujukan, sudut pandang, dan perangkat pemodelan data",
            "Menyusun deskripsi arsitektur data baseline",
            "Memodelkan entitas data utama dan hubungan antarsistem pertahanan",
            "Menyusun klasifikasi data pertahanan menurut tingkat kerahasiaan",
            "Menetapkan kepemilikan dan tata kelola data antarsatuan",
            "Menyusun deskripsi arsitektur data target",
            "Melakukan analisis kesenjangan (as-is vs to-be)",
            "Menetapkan komponen roadmap arsitektur data",
            "Melaksanakan tinjauan formal pemangku kepentingan",
            "Menyelesaikan arsitektur data",
            "Menyusun atau memperbarui Architecture Definition Document"
          ],
          "output": [
            "Versi yang diperhalus dan diperbarui dari keluaran fase Architecture Vision",
            "Draf Architecture Definition Document",
            "Draf Architecture Requirements Specification",
            "Komponen arsitektur data pada roadmap arsitektur",
            "Model entitas data pertahanan",
            "Klasifikasi data pertahanan menurut tingkat kerahasiaan",
            "Kamus data dan standar penamaan data pertahanan",
            "Matriks kepemilikan dan tata kelola data antarsatuan",
            "Rancangan data security and access control"
          ]
        }
      },
      {
        "id": "application-architecture",
        "chapter": "III.2.3.4.2",
        "title": "Application Architecture",
        "paragraphs": [
          "Arsitektur aplikasi dilakukan untuk merancang portofolio aplikasi yang diperlukan untuk menjalankan proses bisnis pertahanan serta menetapkan mekanisme keterhubungan antaraplikasi. Perancangan arsitektur aplikasi berpedoman pada prinsip Interoperabilitas dan prinsip User-Centric Service. Kedudukan sub-domain ini dalam siklus TOGAF Pertahanan Indonesia ditunjukkan pada Gambar III.6.",
          "Gambar III.6 menunjukkan arsitektur aplikasi sebagai cabang kedua fase Information Systems Architecture, yang dikerjakan setelah arsitektur data selesai ditetapkan. Fokusnya adalah menentukan aplikasi apa yang dibutuhkan, aplikasi mana yang masih layak dipertahankan, dan bagaimana aplikasi lintas satuan dapat saling bertukar data. Rincian input, step, dan ouput dapat dilihat pada Tabel III.9.",
          "Input pada sub-domain ini mencakup keluaran arsitektur data, khususnya kamus data dan aturan akses, serta standar interoperabilitas dan integrasi lintas matra. Ketergantungan pada keluaran arsitektur data inilah yang menjadi alasan arsitektur aplikasi dikerjakan setelahnya, sebab keterhubungan antaraplikasi hanya dapat dirancang di atas definisi data yang telah disepakati.",
          "Langkah-langkah pada sub-domain ini dimulai dari inventarisasi aplikasi yang berjalan di lingkungan Kemhan dan TNI, dilanjutkan dengan perancangan portofolio aplikasi target dan mekanisme pertukaran data lintas matra. Rangkaian ini diarahkan tidak hanya untuk menambah aplikasi baru, tetapi juga untuk menata aplikasi yang sudah ada agar tidak saling tumpang tindih.",
          "Output dari sub-domain ini menegaskan orientasi rasionalisasi. Portofolio aplikasi, peta keterkaitan aplikasi dengan kapabilitas dan proses bisnis, serta daftar aplikasi yang dipertahankan, digabungkan, atau dihentikan memberikan dasar bagi penataan aplikasi pertahanan secara menyeluruh. Rancangan mekanisme integrasi lintas matra yang dihasilkan bekerja di atas klasifikasi dan aturan akses dari arsitektur data, sehingga pertukaran data berlangsung menurut aturan yang telah disepakati."
        ],
        "io": {
          "input": [
            "Architecture reference materials",
            "Request for Architecture Work",
            "Hasil penilaian kapabilitas",
            "Rencana komunikasi",
            "Model organisasi untuk arsitektur enterprise",
            "TOGAF Pertahanan Indonesia",
            "Prinsip aplikasi (application principles)",
            "Statement of Architecture Work",
            "Dokumen Architecture Vision",
            "Architecture Repository",
            "Draf Architecture Definition Document dan draf Architecture Requirements Specification",
            "Komponen arsitektur bisnis pada roadmap arsitektur",
            "Komponen arsitektur data pada roadmap arsitektur",
            "Standar interoperabilitas dan integrasi lintas matra"
          ],
          "step": [
            "Memilih model rujukan, sudut pandang, dan perangkat pemodelan aplikasi",
            "Menyusun deskripsi arsitektur aplikasi baseline melalui inventarisasi aplikasi Kemhan dan TNI",
            "Menyusun deskripsi arsitektur aplikasi target",
            "Merancang portofolio aplikasi pendukung operasi dan administrasi pertahanan",
            "Merancang mekanisme integrasi dan pertukaran data lintas matra (data exchange)",
            "Melakukan analisis kesenjangan (as-is vs to-be)",
            "Menetapkan komponen roadmap arsitektur aplikasi",
            "Melaksanakan tinjauan formal pemangku kepentingan",
            "Menyelesaikan arsitektur aplikasi",
            "Menyusun atau memutakhirkan Architecture Definition Document"
          ],
          "output": [
            "Versi yang diperhalus dan diperbarui dari keluaran fase Architecture Vision",
            "Draf Architecture Definition Document",
            "Draf Architecture Requirements Specification",
            "Komponen arsitektur aplikasi pada roadmap arsitektur",
            "Portofolio aplikasi pertahanan",
            "Peta keterkaitan aplikasi dengan kapabilitas dan proses bisnis pertahanan",
            "Rancangan mekanisme integrasi dan pertukaran data lintas matra",
            "Daftar aplikasi yang dipertahankan, digabungkan, atau dihentikan"
          ]
        }
      }
    ]
  },
  {
    "id": "technology-architecture",
    "label": "D",
    "chapter": "III.2.3.5",
    "title": "Fase Technology Architecture",
    "paragraphs": [
      "Pada fase Technology Architecture disusun arsitektur teknologi yang mencakup infrastruktur jaringan, pusat data, komputasi awan dan tepi, serta fondasi keamanan siber. Arsitektur teknologi ini menjadi landasan fisik dan logis bagi seluruh ekosistem digital pertahanan, sehingga menentukan kelayakan penerapan rancangan arsitektur bisnis, data, dan aplikasi yang telah disusun sebelumnya.",
      "Input fase ini bertumpu pada keluaran arsitektur data dan aplikasi, ditambah kebutuhan keamanan siber pertahanan sebagai masukan khas. Kehadiran kebutuhan keamanan siber sejak awal fase menandakan bahwa keamanan diperlakukan sebagai pertimbangan perancangan, bukan sebagai penyesuaian yang ditambahkan setelah teknologi dipilih.",
      "Langkah-langkah pada fase ini memuat perancangan arsitektur teknologi target yang mencakup jaringan, server, komputasi awan, dan komputasi tepi, disertai dua langkah bernilai strategis, yaitu perancangan fondasi keamanan siber terpadu lintas lapisan dan penetapan standar teknologi serta protokol keamanan. Kedua langkah ini merupakan penerapan langsung prinsip Security by Design.",
      "Output fase ini berupa model arsitektur teknologi pertahanan, standar teknologi dan protokol keamanan, serta rancangan fondasi keamanan siber terpadu. Rancangan fondasi keamanan tersebut menjadi masukan penting bagi fase C5ISR Architecture, sehingga kapabilitas komando dan kendali dibangun di atas landasan keamanan yang telah ditetapkan, bukan di atas landasan yang masih harus disiapkan kemudian."
    ],
    "io": {
      "input": [
        "Architecture reference materials",
        "Informasi produk atas kandidat teknologi",
        "Request for Architecture Work",
        "Hasil penilaian kapabilitas dan rencana komunikasi",
        "Model organisasi untuk arsitektur enterprise",
        "TOGAF Pertahanan Indonesia",
        "Prinsip teknologi dan spesifikasi kebutuhan standar",
        "Statement of Architecture Work dan dokumen Architecture Vision",
        "Architecture Repository",
        "Draf Architecture Definition Document dan draf Architecture Requirements Specification",
        "Komponen arsitektur data dan aplikasi pada roadmap arsitektur",
        "Kebutuhan keamanan siber pertahanan"
      ],
      "step": [
        "Memilih model rujukan, sudut pandang, dan perangkat pemodelan",
        "Mendeskripsikan arsitektur teknologi baseline",
        "Menyusun deskripsi arsitektur teknologi target yang mencakup jaringan, server, cloud, dan edge",
        "Merancang fondasi keamanan siber terpadu lintas lapisan",
        "Menetapkan standar teknologi dan protokol keamanan pertahanan",
        "Melakukan analisis kesenjangan",
        "Menetapkan komponen roadmap",
        "Menyelesaikan dampak lintas lanskap arsitektur",
        "Melaksanakan tinjauan formal pemangku kepentingan",
        "Memfinalkan arsitektur teknologi",
        "Menyusun Architecture Definition Document"
      ],
      "output": [
        "Versi yang diperhalus dan dimutakhirkan dari keluaran fase Architecture Vision",
        "Draf Architecture Definition Document",
        "Draf Architecture Requirements Specification",
        "Komponen teknologi pada roadmap arsitektur",
        "Model arsitektur teknologi pertahanan",
        "Standar teknologi dan protokol keamanan",
        "Rancangan fondasi keamanan siber terpadu"
      ]
    }
  },
  {
    "id": "c5isr-architecture",
    "label": "E",
    "chapter": "III.2.3.6",
    "title": "Fase C5ISR Architecture",
    "paragraphs": [
      "Fase C5ISR Architecture merupakan fase khusus yang terdapat pada TOGAF Pertahanan Indonesia. Fase ini merancang arsitektur kapabilitas C5ISR, yaitu Command, Control, Communication, Computer, Cyber, Intelligence, Surveillance, and Reconnaissance, sebagai inti operasional pertahanan.",
      "Arsitektur C5ISR dirancang dengan pendekatan network centric warfare yang menghubungkan unsur sensor (surveillance dan reconnaissance), unsur pemroses dan intelijen, unsur pengambil keputusan (command and control), serta unsur penindak (effector) dalam satu jaringan informasi terpadu.",
      "Input fase ini menghimpun keluaran ketiga fase arsitektur sebelumnya beserta rujukan operasional pertahanan, yaitu doktrin, kebutuhan smart defence, konsep network centric warfare, dan operasi multi-domain. Himpunan dari masukan ini menempatkan arsitektur C5ISR sebagai bagian akhir dari seluruh rancangan teknis sekaligus penerjemah doktrin pertahanan ke dalam rancangan sistem.",
      "Langkah-langkah pada fase ini mulai dari pemilihan sudut pandang, pemetaan kapabilitas C5ISR, penyusunan arsitektur baseline dan target, hingga finalisasi. Inti perancangannya terletak pada integrasi unsur sensor, unsur pengambil keputusan, dan unsur penindak dalam satu jaringan, atau rangkaian sensor to effector, yang dipadukan dengan pertahanan siber dan operasi lintas domain.",
      "Output fase ini berupa model arsitektur C5ISR pertahanan, rancangan jaringan sensor to effector, dan kerangka integrasi multi-domain dan pertahanan siber. Ketiga keluaran tersebut merupakan wujud kapabilitas pertahanan cerdas yang menjadi tujuan penelitian."
    ],
    "io": {
      "input": [
        "Model arsitektur data, aplikasi, dan teknologi dari fase sebelumnya",
        "Prinsip arsitektur pertahanan, khususnya Integrated Command & Control dan Interoperabilitas",
        "Doktrin pertahanan dan kebutuhan smart defence",
        "Konsep Network Centric Warfare dan operasi multi-domain",
        "Standar interoperabilitas lintas matra dan lintas entitas",
        "Rancangan fondasi keamanan siber terpadu dari fase Technology Architecture",
        "Draf Architecture Definition Document dan draf Architecture Requirements Specification"
      ],
      "step": [
        "Memilih model rujukan dan sudut pandang C5ISR, antara lain operational dan systems viewpoint",
        "Memetakan kapabilitas C5ISR dan keterkaitannya dengan proses pertahanan",
        "Menyusun deskripsi arsitektur C5ISR baseline",
        "Merancang arsitektur komando dan kendali terpadu",
        "Merancang integrasi unsur sensor, pengambil keputusan, dan penindak dalam satu jaringan (sensor to effector)",
        "Mengintegrasikan pertahanan siber dan operasi lintas domain",
        "Menyusun deskripsi arsitektur C5ISR target",
        "Melakukan analisis kesenjangan",
        "Menetapkan komponen roadmap C5ISR",
        "Melaksanakan tinjauan formal pemangku kepentingan",
        "Memfinalkan arsitektur C5ISR dan memutakhirkan Architecture Definition Document"
      ],
      "output": [
        "Model arsitektur C5ISR pertahanan",
        "Rancangan jaringan sensor to effector",
        "Kerangka integrasi multi-domain dan pertahanan siber",
        "Draf Architecture Definition Document dan Architecture Requirements Specification yang dimutakhirkan",
        "Komponen arsitektur C5ISR pada roadmap arsitektur"
      ]
    }
  },
  {
    "id": "opportunities-solutions",
    "label": "F",
    "chapter": "III.2.3.7",
    "title": "Fase Opportunities & Solutions",
    "paragraphs": [
      "Pada fase Opportunities & Solutions dilakukan penggabungan seluruh kesenjangan yang teridentifikasi dari fase arsitektur bisnis, data, aplikasi, teknologi, dan C5ISR, kemudian menerjemahkannya menjadi kelompok inisiatif dan arsitektur transisi.",
      "Gambar III.9 menempatkan fase Opportunities & Solutions sebagai fase pertama dari kelompok realisasi, yaitu titik ketika rancangan arsitektur mulai diterjemahkan menjadi rencana pelaksanaan. Posisi ini menjadikannya penghubung antara kelima fase perancangan sebelumnya dan fase-fase implementasi sesudahnya. Input, step, dan output dapat dilihat pada Tabel III.12.",
      "Input fase ini menghimpun hasil analisis kesenjangan dari seluruh fase arsitektur, termasuk fase C5ISR, beserta komponen roadmap dari tiap domain. Cakupan yang meliputi kelima domain memastikan bahwa rencana pelaksanaan yang disusun tidak melewatkan satu pun aspek arsitektur yang telah dirancang.",
      "Langkah-langkah pada fase ini yaitu konsolidasi dan pengelompokan kesenjangan menjadi paket pekerjaan yang seragam, penyelarasan kebutuhan interoperabilitas lintas matra, serta penyusunan arsitektur transisi.",
      "Keluaran fase ini berupa daftar inisiatif dan proyek transformasi, arsitektur transisi, serta garis besar rencana implementasi dan migrasi. Ketiga keluaran tersebut menjadi bahan utama bagi fase Migration Planning untuk menyusun roadmap yang lebih rinci beserta urutan pelaksanaannya."
    ],
    "io": {
      "input": [
        "Architecture reference materials",
        "Request for Architecture Work dan hasil penilaian kapabilitas",
        "Rencana komunikasi",
        "Statement of Architecture Work, dokumen Architecture Vision, dan Architecture Repository",
        "Draf Architecture Definition Document dan draf Architecture Requirements Specification",
        "Hasil analisis kesenjangan dari seluruh fase arsitektur, termasuk fase C5ISR",
        "Komponen roadmap arsitektur dari Fase B, C, D, dan E",
        "Prinsip arsitektur pertahanan dan prioritas strategi organisasi"
      ],
      "step": [
        "Menetapkan atau mengonfirmasi atribut perubahan utama organisasi",
        "Menetapkan kendala organisasi bagi implementasi",
        "Meninjau dan mengonsolidasikan hasil analisis kesenjangan Fase B sampai Fase E",
        "Meninjau kebutuhan penguatan fungsi organisasi",
        "Menggabungkan dan menyelaraskan kebutuhan interoperabilitas lintas matra",
        "Memvalidasi pelaksanaan antarinisiatif sudah benar",
        "Mengonfirmasi kesiapan dan risiko transformasi",
        "Merumuskan strategi implementasi dan migrasi",
        "Mengidentifikasi dan mengelompokkan paket pekerjaan utama (work packages)",
        "Mengidentifikasi arsitektur transisi",
        "Menyusun roadmap arsitektur serta garis besar rencana implementasi dan migrasi"
      ],
      "output": [
        "Versi yang diperhalus dari keluaran fase Architecture Vision",
        "Draf Architecture Definition Document yang memuat arsitektur transisi",
        "Draf Architecture Requirements Specification",
        "Hasil penilaian kapabilitas",
        "Roadmap arsitektur (architecture roadmap)",
        "Garis besar rencana implementasi dan migrasi",
        "Daftar inisiatif dan proyek transformasi digital pertahanan"
      ]
    }
  },
  {
    "id": "migration-planning",
    "label": "G",
    "chapter": "III.2.3.8",
    "title": "Fase Migration Planning",
    "paragraphs": [
      "Pada fase Migration Planning dilakukan penyusunan rencana migrasi dan peta jalan (roadmap) implementasi transformasi digital secara bertahap. Inisiatif yang telah diidentifikasi diprioritaskan berdasarkan nilai manfaat, biaya, risiko, dan ketergantungan antarinisiatif. Selanjutnya, dipetakan menjadi jangka pendek, menengah dan panjang.",
      "Gambar III.10 menunjukkan fase Migration Planning sebagai kelanjutan langsung dari fase Opportunities & Solutions dalam kelompok realisasi. Posisi berurutan ini memperlihatkan peralihan dari penetapan paket pekerjaan menuju penetapan urutan dan waktu pelaksanaannya. Input, step dan output dapat dilihat pada Tabel III.13.",
      "Input fase ini berupa daftar inisiatif dan arsitektur transisi dari fase sebelumnya, yang menjadi bahan mentah bagi penyusunan jadwal pelaksanaan. Kelengkapan daftar inisiatif menentukan ketepatan peta jalan yang dihasilkan, sehingga tidak ada inisiatif penting yang terlewat dari perencanaan.",
      "Langkah-langkah pada fase ini mencakup penilaian manfaat setiap paket pekerjaan, analisis biaya-manfaat dan risiko, penetapan prioritas berdasarkan manfaat dan ketergantungan, serta penyusunan roadmap bertahap. Penetapan rentang waktu jangka pendek, menengah, dan panjang menjadi langkah khas fase ini, karena rentang tersebut memungkinkan roadmap diselaraskan dengan siklus rencanaan strategis pertahanan dan dengan RPJPN 2025–2045.",
      "Output fase ini berupa rencana implementasi dan migrasi yang terperinci beserta roadmap jangka pendek, menengah, dan panjang."
    ],
    "io": {
      "input": [
        "Architecture reference materials",
        "Request for Architecture Work dan rencana komunikasi",
        "Statement of Architecture Work, dokumen Architecture Vision, dan Architecture Repository",
        "Draf Architecture Definition Document dan draf Architecture Requirements Specification",
        "Hasil penilaian kapabilitas",
        "Roadmap arsitektur dan arsitektur transisi",
        "Garis besar rencana implementasi dan migrasi",
        "Daftar inisiatif transformasi digital pertahanan"
      ],
      "step": [
        "Mengonfirmasi keterkaitan kerangka manajemen dengan rencana implementasi dan migrasi",
        "Menetapkan nilai manfaat setiap paket pekerjaan",
        "Memperkirakan kebutuhan sumber daya, waktu pelaksanaan, dan sarana penyampaian",
        "Memprioritaskan proyek migrasi melalui analisis biaya-manfaat dan validasi risiko",
        "Mengonfirmasi roadmap arsitektur dan memutakhirkan Architecture Definition Document",
        "Menyelesaikan rencana implementasi dan migrasi",
        "Menyusun roadmap implementasi bertahap jangka pendek, menengah, dan panjang"
      ],
      "output": [
        "Rencana implementasi dan migrasi yang terperinci",
        "Architecture Definition Document final",
        "Architecture Requirements Specification final",
        "Roadmap arsitektur final",
        "Architecture Building Block yang dapat digunakan ulang",
        "Request for Architecture Work untuk siklus berikutnya",
        "Kontrak arsitektur (architecture contract)",
        "Model tata kelola implementasi",
        "Roadmap jangka pendek, menengah, dan panjang"
      ]
    }
  },
  {
    "id": "implementation-governance",
    "label": "H",
    "chapter": "III.2.3.9",
    "title": "Fase Implementation Governance",
    "paragraphs": [
      "Fase Implementation Governance memastikan bahwa implementasi inisiatif berjalan sesuai dengan arsitektur yang telah dirancang dan patuh terhadap regulasi nasional serta ketentuan sektor pertahanan.",
      "Gambar III.11 menempatkan fase Implementation Governance setelah fase Migration Planning, yaitu pada tahap ketika rencana yang telah disusun mulai diwujudkan menjadi solusi nyata. Posisi ini menegaskan perannya sebagai fase pengendalian pelaksanaan yang menjaga agar solusi yang dibangun tidak menyimpang dari rancangan. Input, step, dan output dapat dilihat pada Tabel III.14.",
      "Input pada fase ini adalah rencana migrasi, roadmap implementasi, serta prinsip arsitektur dan ketentuan regulasi nasional sebagai dasar penilaian kepatuhan.",
      "Langkah-langkah pada fase ini meliputi penetapan kontrak arsitektur dengan pelaksana, pemanduan pengembangan solusi, serta dua jenis tinjauan kepatuhan, yaitu kepatuhan terhadap arsitektur dan kepatuhan terhadap regulasi nasional dan sektor pertahanan.",
      "Output fase ini berupa kontrak arsitektur yang telah ditandatangani, hasil penilaian kepatuhan, permintaan perubahan, dan laporan kepatuhan terhadap regulasi. Keluaran tersebut menjadi bukti terkendalinya pelaksanaan sekaligus sebagai sasaran bagi fase Architecture Change Management apabila ditemukan kebutuhan penyesuaian arsitektur."
    ],
    "io": {
      "input": [
        "Architecture reference materials",
        "Request for Architecture Work dan hasil penilaian kapabilitas",
        "Model organisasi untuk arsitektur enterprise",
        "TOGAF Pertahanan Indonesia",
        "Statement of Architecture Work, dokumen Architecture Vision, dan Architecture Repository",
        "Architecture Definition Document final",
        "Architecture Requirements Specification final",
        "Roadmap arsitektur dan arsitektur transisi",
        "Model tata kelola implementasi",
        "Kontrak arsitektur (standar)",
        "Rencana implementasi dan migrasi",
        "Prinsip arsitektur pertahanan dan ketentuan regulasi nasional"
      ],
      "step": [
        "Mengonfirmasi ruang lingkup dan prioritas penggelaran bersama manajemen pengembangan",
        "Mengidentifikasi sumber daya dan keahlian pelaksana penggelaran",
        "Memandu pengembangan solusi dan penggelarannya",
        "Melaksanakan tinjauan kepatuhan arsitektur enterprise",
        "Melaksanakan tinjauan kepatuhan terhadap regulasi nasional dan sektor pertahanan",
        "Menetapkan kontrak arsitektur dengan pelaksana implementasi",
        "Menjalankan operasi organisasi dan teknologi informasi",
        "Melakukan tinjauan pascaimplementasi dan menutup implementasi"
      ],
      "output": [
        "Kontrak arsitektur yang telah ditandatangani",
        "Hasil penilaian kepatuhan (compliance assessments)",
        "Permintaan perubahan (change requests)",
        "Solusi terkelola yang patuh terhadap arsitektur",
        "Laporan kepatuhan terhadap regulasi nasional dan sektor pertahanan"
      ]
    }
  },
  {
    "id": "architecture-change-management",
    "label": "I",
    "chapter": "III.2.3.10",
    "title": "Fase Architecture Change Management",
    "paragraphs": [
      "Fase Architecture Change Management bertujuan untuk mengelola perubahan arsitektur secara terkendali sebagai respons terhadap dinamika sektor pertahanan, perkembangan teknologi dan perubahan kebijakan. Fase ini memastikan arsitektur pertahanan tetap relevan dan adaptif melalui pemantauan berkelanjutan serta penilaian dampak perubahan, sehingga siklus Architecture Development Method dapat berulang secara berkesinambungan.",
      "Gambar III.12 memperlihatkan TOGAF Pertahanan Indonesia menutup siklusnya dengan fase Architecture Change Management, yang terhubung kembali ke fase Architecture Vision. Hubungan balik inilah yang menandai sifat berulang keseluruhan siklus, sekaligus menempatkan fase ini sebagai penjaga keberlanjutan yang mengawali siklus baru ketika perubahan menuntut penyesuaian arsitektur. Input, step dan output dapat dilihat pada Tabel III.15.",
      "Input fase ini mencakup hasil implementasi dan umpan balik operasional, serta perubahan lingkungan strategis pertahanan, teknologi, dan regulasi. Kedua kelompok masukan tersebut menjadi pemicu yang menentukan apakah arsitektur perlu disesuaikan, sehingga penyesuaian arsitektur selalu berangkat dari kondisi nyata dan bukan dari asumsi.",
      "Langkah-langkah pada fase ini meliputi pemantauan kinerja arsitektur, pemantauan perubahan lingkungan strategis pertahanan, penilaian dampak perubahan, serta pengelolaan permintaan perubahan secara terkendali. Pemantauan lingkungan strategis pertahanan menjadi langkah khas fase ini, karena perubahan lingkungan ancaman dan kebijakan pertahanan merupakan pemicu perubahan yang bergerak cepat dan berpengaruh besar terhadap kebutuhan arsitektur.",
      "Output fase ini berupa pemutakhiran arsitektur, permintaan pekerjaan arsitektur baru, serta perubahan pada kerangka dan prinsip arsitektur bila diperlukan. Keluaran terakhir menegaskan bahwa TOGAF Pertahanan Indonesia bersifat terbuka terhadap penyempurnaan, karena kerangka ini akan terus disesuaikan melalui siklus berikutnya seiring perubahan doktrin, teknologi, dan regulasi."
    ],
    "io": {
      "input": [
        "Architecture reference materials",
        "Request for Architecture Work",
        "Model organisasi untuk arsitektur enterprise dan TOGAF Pertahanan Indonesia",
        "Statement of Architecture Work dan dokumen Architecture Vision",
        "Architecture Definition Document dan Architecture Requirements Specification",
        "Roadmap arsitektur dan Architecture Repository",
        "Kontrak arsitektur dan hasil penilaian kepatuhan",
        "Rencana implementasi dan migrasi",
        "Hasil implementasi dan umpan balik operasional",
        "Perubahan lingkungan strategis pertahanan, teknologi, dan regulasi"
      ],
      "step": [
        "Menetapkan proses perwujudan nilai (value realization process)",
        "Menerapkan perangkat pemantauan kinerja arsitektur",
        "Mengelola risiko arsitektur",
        "Menyediakan analisis bagi manajemen perubahan arsitektur",
        "Memantau perubahan lingkungan strategis pertahanan, teknologi, dan regulasi",
        "Menilai dampak perubahan terhadap arsitektur",
        "Menyusun kebutuhan perubahan untuk memenuhi target kinerja",
        "Mengelola proses tata kelola perubahan",
        "Mengaktifkan proses pelaksanaan perubahan secara terkendali"
      ],
      "output": [
        "Pemutakhiran arsitektur",
        "Perubahan pada framework dan prinsip arsitektur",
        "Request for Architecture Work baru",
        "Statement of Architecture Work yang dimutakhirkan",
        "Kontrak arsitektur yang dimutakhirkan",
        "Hasil penilaian kepatuhan yang dimutakhirkan",
        "Arsitektur terbarukan dan proses manajemen perubahan"
      ]
    }
  }
];

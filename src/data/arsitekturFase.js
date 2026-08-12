// Data implementasi Bab IV — halaman Arsitektur Transformasi Digital Kemhan.
// Dihasilkan dari tesis; isi lengkap. Fase yang belum selesai: comingSoon.

import fig1 from '@/assets/images/preliminary-ruang-lingkup.drawio.svg';
import fig2 from '@/assets/images/solusi-arsitektur-target.drawio.svg';
import fig3 from '@/assets/images/struktur-organisasi-kemhan-baru.drawio.svg';
import fig4 from '@/assets/images/value-stream-kemhan.drawio.svg';
import fig5 from '@/assets/images/business-capability-map-kemhan.drawio.svg';
import fig6 from '@/assets/images/struktur-organisasi-kemhan-to-be.drawio.svg';
import fig7 from '@/assets/images/business-capability-map-kemhan-to-be.drawio.svg';
import fig8 from '@/assets/images/roadmap-implementasi-fase-business-architecture.drawio.svg';

export const phases = [
  {
    "id": "preliminary",
    "title": "Fase Preliminary",
    "intro": [
      "Fase Preliminary bertujuan untuk membangun fondasi bagi keseluruhan pengembangan arsitektur transformasi digital pertahanan. Fase ini menetapkan prinsip arsitektur yang menjadi pedoman perancangan, ruang lingkup arsitektur yang membatasi objek pengembangan, pemangku kepentingan, struktur tata kelola arsitektur (architecture governance), serta repositori arsitektur sebagai wadah penyimpanan artefak. Kelima keluaran tersebut menjadi perangkat kerja yang mengikat seluruh fase berikutnya."
    ],
    "sections": [
      {
        "no": "1",
        "title": "Penetapan Prinsip Arsitektur",
        "blocks": [
          {
            "t": "p",
            "v": "Prinsip arsitektur (architecture principles) merupakan kaidah fundamental yang mengarahkan seluruh keputusan perancangan agar konsisten antarfase dan antardomain. Prinsip yang digunakan pada implementasi ini adalah kesembilan prinsip arsitektur Pertahanan Indonesia yang telah dirumuskan pada Tabel III.4. Kesembilan prinsip tersebut dikelompokkan ke dalam enam kategori baku, yaitu prinsip arsitektur umum, prinsip bisnis, prinsip data, prinsip aplikasi, prinsip teknologi, dan prinsip keamanan, sebagaimana diperlihatkan pada Tabel IV.1."
          },
          {
            "t": "table",
            "title": "Pengelompokan Prinsip Arsitektur Pertahanan ke dalam Enam Kategori",
            "header": [
              "Prinsip",
              "Deskripsi"
            ],
            "rows": [
              [
                "A. Prinsip Arsitektur (Umum)"
              ],
              [
                "Smart Defence Oriented",
                "Transformasi digital harus mendukung konsep smart defence dan operasi multi-domain."
              ],
              [
                "Governance & Compliance",
                "Seluruh layanan digital harus sesuai dengan regulasi pertahanan, SPBE, dan ketentuan keamanan nasional."
              ],
              [
                "B. Prinsip Bisnis"
              ],
              [
                "Integrated Command & Control",
                "Mendukung sistem komando dan pengendalian terintegrasi berbasis C5ISR."
              ],
              [
                "User-Centric Service",
                "Sistem dibangun untuk meningkatkan efektivitas personel dan kualitas layanan organisasi."
              ],
              [
                "C. Prinsip Data"
              ],
              [
                "Data as Strategic Asset",
                "Data pertahanan diperlakukan sebagai aset strategis nasional untuk mendukung pengambilan keputusan."
              ],
              [
                "D. Prinsip Aplikasi"
              ],
              [
                "Interoperabilitas",
                "Seluruh sistem Kemhan dan ketiga angkatan harus dapat saling terintegrasi dan bertukar data secara real-time."
              ],
              [
                "E. Prinsip Teknologi"
              ],
              [
                "Scalability & Flexibility",
                "Arsitektur harus mampu berkembang mengikuti dinamika ancaman dan kemajuan teknologi di masa depan."
              ],
              [
                "Availability & Reliability",
                "Sistem pertahanan digital harus memiliki ketersediaan tinggi dan tahan terhadap gangguan."
              ],
              [
                "F. Prinsip Keamanan"
              ],
              [
                "Security by Design",
                "Keamanan siber menjadi bagian utama arsitektur sejak tahap perencanaan, bukan sebagai tambahan di akhir."
              ]
            ]
          }
        ]
      },
      {
        "no": "2",
        "title": "Penetapan Ruang Lingkup Arsitektur",
        "blocks": [
          {
            "t": "p",
            "v": "Ruang lingkup arsitektur menetapkan batas organisasi, unit, dan domain yang menjadi objek pengembangan. Dari sisi organisasi, ruang lingkup mencakup Kemhan RI sebagai organisasi inti, ketiga matra (TNI Angkatan Darat, Angkatan Laut, dan Angkatan Udara) sebagai entitas yang terhubung melalui interoperabilitas lintas matra, serta industri pertahanan nasional sebagai mitra ekosistem digital."
          },
          {
            "t": "p",
            "v": "Dari sisi unit organisasi, penetapan ini mengacu pada struktur terbaru Kemhan berdasarkan Peraturan Menteri Pertahanan Nomor 1 Tahun 2024 tentang Organisasi dan Tata Kerja Kementerian Pertahanan [29]. Berdasarkan peraturan tersebut, fungsi pengelolaan data dan sistem informasi kini diselenggarakan oleh Badan Informasi dan Komunikasi Pertahanan, yang membawahi Pusat Teknologi Informasi dan Komunikasi Pertahanan, Pusat Informasi Strategis Pertahanan, dan Pusat Pertahanan Siber. Unit-unit yang menjadi fokus pengembangan arsitektur meliputi Sekretariat Jenderal, Direktorat Jenderal Potensi Pertahanan, Badan Informasi dan Komunikasi Pertahanan beserta ketiga pusatnya, serta Badan Pengembangan Kebijakan dan Teknologi Pertahanan."
          },
          {
            "t": "fig",
            "src": fig1,
            "cap": "Diagram Ruang Lingkup Arsitektur"
          },
          {
            "t": "p",
            "v": "Dari sisi domain arsitektur, dilakukan pengembangan pada lima domain sesuai TOGAF Pertahanan Indonesia, yaitu Business Architecture, Data Architecture, Application Architecture, Technology Architecture, dan C5ISR Architecture. Sesuai batasan penelitian, ruang lingkup tidak mencakup aspek rahasia militer dan operasi tempur, melainkan difokuskan pada integrasi sistem informasi, keamanan data, dan tata kelola digital pertahanan. Ringkasan ketiga dimensi ruang lingkup dapat dilihat pada Gambar IV.1."
          }
        ]
      },
      {
        "no": "3",
        "title": "Identifikasi Stakeholder",
        "blocks": [
          {
            "t": "p",
            "v": "Identifikasi pemangku kepentingan (stakeholder) bertujuan mengenali pihak-pihak yang terpengaruh oleh dan atau memengaruhi arsitektur, beserta kepedulian (concern), tingkat pengaruh (influence), dan kebutuhan utamanya. Pemetaan ini menjadi dasar penyusunan rencana komunikasi dan penentuan prioritas kebutuhan pada fase Architecture Vision. Hasil pemetaan disajikan dalam matriks pemangku kepentingan pada Tabel IV.2."
          },
          {
            "t": "table",
            "title": "Matriks Pemangku Kepentingan (Stakeholder Matrix)",
            "header": [
              "No.",
              "Pemangku Kepentingan",
              "Kepedulian (Concern)",
              "Pengaruh",
              "Kebutuhan Utama"
            ],
            "rows": [
              [
                "1",
                "Menteri Pertahanan",
                "Arah strategis dan kedaulatan pertahanan",
                "Sangat Tinggi",
                "Informasi eksekutif dan keputusan berbasis data"
              ],
              [
                "2",
                "Sekretaris Jenderal",
                "Koordinasi dan tata kelola organisasi",
                "Tinggi",
                "Integrasi lintas unit dan kepatuhan SPBE"
              ],
              [
                "3",
                "Kepala Badan Informasi dan Komunikasi Pertahanan",
                "Sistem informasi, komunikasi strategis, dan pertahanan siber",
                "Sangat Tinggi",
                "Infrastruktur TIK terpadu dan keamanan siber"
              ],
              [
                "4",
                "Pusat Pertahanan Siber",
                "Keamanan siber pertahanan",
                "Tinggi",
                "Penerapan security by design dan pusat operasi keamanan"
              ],
              [
                "5",
                "Ditjen Potensi Pertahanan",
                "Potensi dan industri pertahanan",
                "Tinggi",
                "Data potensi dan kolaborasi industri pertahanan"
              ],
              [
                "6",
                "Ditjen Strategi dan Perencanaan Pertahanan",
                "Perumusan strategi dan perencanaan",
                "Tinggi",
                "Data perencanaan pertahanan yang terintegrasi"
              ],
              [
                "7",
                "TNI AD, AL, AU",
                "Operasi dan interoperabilitas lintas matra",
                "Tinggi",
                "Pertukaran data dan dukungan komando-kendali"
              ],
              [
                "8",
                "Badan Pengembangan Kebijakan dan Teknologi Pertahanan",
                "Kebijakan dan teknologi pertahanan",
                "Sedang",
                "Standar teknologi dan dukungan inovasi"
              ],
              [
                "9",
                "Industri Pertahanan Nasional",
                "Kolaborasi dan transfer teknologi",
                "Sedang",
                "Standar terbuka dan interoperabilitas"
              ],
              [
                "10",
                "Personel/Pengguna Layanan",
                "Kemudahan dan keandalan layanan",
                "Sedang",
                "Layanan digital yang user-centric"
              ]
            ]
          }
        ]
      },
      {
        "no": "4",
        "title": "Penetapan Governance",
        "blocks": [
          {
            "t": "p",
            "v": "Tata kelola arsitektur (architecture governance) menetapkan struktur pengambilan keputusan yang menjamin arsitektur dikembangkan dan dipelihara secara terkendali. Meskipun Permenhan Nomor 1 Tahun 2024 telah menaikkan fungsi data, informasi, dan siber ke tingkat Badan, mandat Badan Informasi dan Komunikasi Pertahanan bersifat pengelolaan operasional (run-the-engine), sehingga tetap diperlukan fungsi orkestrasi transformasi lintas organisasi yang diperankan oleh Chief Enterprise Architect atau Digital Transformation Officer (DTO). Struktur tata kelola arsitektur terdiri atas Architecture Board, Architecture Team, dan pemilik arsitektur (owner) sebagaimana diperlihatkan pada Tabel IV.3."
          },
          {
            "t": "table",
            "title": "Struktur Tata Kelola Arsitektur (Architecture Governance)",
            "header": [
              "No.",
              "Elemen Tata Kelola",
              "Penanggung Jawab",
              "Peran Utama"
            ],
            "rows": [
              [
                "1",
                "Architecture Board (Dewan Arsitektur)",
                "Diketuai Sekretaris Jenderal; beranggotakan Kepala Badan Informasi dan Komunikasi Pertahanan, para Direktur Jenderal terkait, dan perwakilan matra",
                "Menetapkan prinsip, menyetujui Request for Architecture Work, serta mengesahkan dan meninjau kepatuhan arsitektur"
              ],
              [
                "2",
                "Architecture Team (Tim Arsitektur)",
                "Dipimpin Chief Enterprise Architect (fungsi DTO), berkedudukan pada Badan Informasi dan Komunikasi Pertahanan",
                "Melaksanakan siklus TOGAF Pertahanan Indonesia dan merancang arsitektur pada domain bisnis, data, aplikasi, teknologi, dan C5ISR"
              ],
              [
                "3",
                "Tim Keamanan Siber",
                "Pusat Pertahanan Siber",
                "Menjamin penerapan prinsip security by design pada seluruh fase"
              ],
              [
                "4",
                "Pemilik Arsitektur (Owner)",
                "Menteri Pertahanan sebagai pemilik utama; Kepala Badan Informasi dan Komunikasi Pertahanan sebagai pemilik pelaksana",
                "Memiliki, membiayai, dan menjamin keberlanjutan arsitektur transformasi digital pertahanan"
              ]
            ]
          }
        ]
      },
      {
        "no": "5",
        "title": "Repositori Arsitekrur",
        "blocks": [
          {
            "t": "p",
            "v": "Repositori arsitektur (Architecture Repository) merupakan wadah penyimpanan seluruh artefak arsitektur agar tertata, konsisten, dan dapat ditelusuri antarfase. Repositori dipartisi menurut domain arsitektur sehingga setiap artefak tersimpan pada bagian yang sesuai. Struktur repositori beserta muatannya dapat dilihat pada Tabel IV.4."
          },
          {
            "t": "table",
            "title": "Struktur Repository Arsitektur",
            "header": [
              "Bagian Repository",
              "Muatan Utama"
            ],
            "rows": [
              [
                "Business Repository",
                "Model proses bisnis, peta kapabilitas, value stream, dan struktur organisasi pertahanan"
              ],
              [
                "Data Repository",
                "Model dan kamus data, katalog serta metadata, dan standar Satu Data Pertahanan"
              ],
              [
                "Application Repository",
                "Portofolio dan katalog aplikasi pertahanan beserta keterkaitannya"
              ],
              [
                "Technology Repository",
                "Standar teknologi, katalog infrastruktur, platform, dan protokol keamanan"
              ],
              [
                "C5ISR Repository",
                "Model arsitektur C5ISR (komando-kendali, komunikasi, komputer, siber, intelijen, surveilans, dan pengintaian), rantai sensor-to-shooter, dan common operational picture berbasis network centric warfare"
              ],
              [
                "Reference Library dan Standar",
                "Prinsip arsitektur, katalog regulasi (SPBE, Satu Data), dan model rujukan TOGAF Pertahanan Indonesia"
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "architecture-vision",
    "title": "Fase Architecture Vision",
    "intro": [
      "Fase Architecture Vision merumuskan visi, misi, dan tujuan strategis arsitektur transformasi digital pertahanan, serta memberikan gambaran tingkat tinggi mengenai kondisi target (to-be) yang ingin dicapai. Fase ini menerima masukan dari keluaran fase Preliminary ditambah kerangka regulasi nasional serta doktrin dan strategi pertahanan dan menghasilkan Dokumen Architecture Vision, tujuan strategis, penilaian kapabilitas dan kesiapan, proposisi nilai dan Statement of Architecture Work yang menjadi acuan bagi seluruh fase pengembangan domain."
    ],
    "sections": [
      {
        "no": "1",
        "title": "Visi, Misi dan Tujuan Arsitektur",
        "blocks": [
          {
            "t": "p",
            "v": "Visi arsitektur menetapkan arah jangka panjang transformasi digital pertahanan Kemhan RI yang dirumuskan sebagai berikut."
          },
          {
            "t": "p",
            "v": "Untuk mewujudkan visi tersebut, ditetapkan misi arsitektur sebagai berikut:"
          },
          {
            "t": "p",
            "v": "1. Mewujudkan interoperabilitas dan integrasi data lintas unit Kemhan dan ketiga matra;"
          },
          {
            "t": "p",
            "v": "2. Menerapkan keamanan siber sejak perancangan (security by design) pada seluruh sistem pertahanan;"
          },
          {
            "t": "p",
            "v": "3. Menyediakan layanan digital yang andal dan berorientasi pengguna bagi personel dan pimpinan;"
          },
          {
            "t": "p",
            "v": "4. Membangun fondasi kapabilitas C5ISR untuk mendukung komando dan kendali terintegrasi; dan"
          },
          {
            "t": "p",
            "v": "5. Menyelenggarakan tata kelola digital yang selaras dengan SPBE dan Satu Data Indonesia."
          },
          {
            "t": "p",
            "v": "Visi dan misi tersebut diturunkan menjadi tujuan strategis arsitektur yang masing-masing tertaut pada prinsip arsitektur pertahanan, sebagaimana disajikan pada Tabel IV.5."
          },
          {
            "t": "table",
            "title": "Tujuan Strategis Arsitektur dan Keterkaitan Prinsip",
            "header": [
              "No.",
              "Tujuan Strategis",
              "Keterkaitan Prinsip"
            ],
            "rows": [
              [
                "1",
                "Mewujudkan integrasi data dan sistem lintas Kemhan dan matra",
                "Interoperabilitas"
              ],
              [
                "2",
                "Memperkuat keamanan siber pertahanan secara menyeluruh",
                "Security by Design"
              ],
              [
                "3",
                "Mengelola data pertahanan sebagai aset strategis pengambilan keputusan",
                "Data as Strategic Asset"
              ],
              [
                "4",
                "Menyiapkan kapabilitas C5ISR dan komando-kendali terintegrasi",
                "Integrated Command & Control"
              ],
              [
                "5",
                "Meningkatkan kualitas layanan dan efektivitas personel",
                "User-Centric Service"
              ],
              [
                "6",
                "Menjamin kepatuhan tata kelola digital pertahanan",
                "Governance & Compliance"
              ]
            ]
          }
        ]
      },
      {
        "no": "2",
        "title": "Pendorong dan Kendala Transformasi",
        "blocks": [
          {
            "t": "p",
            "v": "Perumusan visi dilengkapi dengan konfirmasi pendorong (drivers) yang mendasari transformasi serta kendala (constraints) yang membatasi ruang geraknya. Keduanya menjadi konteks yang memastikan arsitektur target realistis dan selaras dengan arah kebijakan pertahanan nasional, sebagaimana dirangkum pada Tabel IV.6."
          },
          {
            "t": "table",
            "title": "Pendorong dan Kendala Transformasi Digital Pertahanan",
            "header": [
              "Aspek",
              "Uraian"
            ],
            "rows": [
              [
                "Pendorong (Drivers)",
                "Arah modernisasi pertahanan pada RPJPN 2025–2045; kebijakan SPBE dan Satu Data Indonesia; meningkatnya ancaman siber dan tuntutan operasi multi-domain; kebutuhan interoperabilitas lintas matra; serta tuntutan pengambilan keputusan berbasis data."
              ],
              [
                "Kendala (Constraints)",
                "Fragmentasi sistem dan data silo pada kondisi eksisting; keterbatasan sumber daya manusia digital; keberadaan sistem lama (legacy); aspek kerahasiaan dan keamanan pertahanan; serta keterbatasan anggaran dan waktu."
              ]
            ]
          }
        ]
      },
      {
        "no": "3",
        "title": "Penilaian Kapabilitas dan Kesiapan Transformasi",
        "blocks": [
          {
            "t": "p",
            "v": "Penilaian kapabilitas (capability assessment) dan kesiapan transformasi bertujuan mengukur sejauh mana organisasi mampu menjalankan perubahan yang diusung arsitektur target. Penilaian dilakukan terhadap faktor kepemimpinan, sumber daya manusia, data, infrastruktur, keamanan, serta regulasi, dengan hasil disajikan pada Tabel IV.7."
          },
          {
            "t": "table",
            "title": "Penilaian Kesiapan Transformasi (Readiness Assessment)",
            "header": [
              "No.",
              "Faktor Kesiapan",
              "Kondisi Saat Ini",
              "Tingkat Kesiapan"
            ],
            "rows": [
              [
                "1",
                "Kepemimpinan dan tata kelola",
                "Fungsi data dan siber telah menjadi Badan, namun mandat transformasi belum terpusat (Permenhan No. 1 Tahun 2024)",
                "Sedang"
              ],
              [
                "2",
                "Sumber daya manusia digital",
                "Kompetensi digital masih terbatas dan tersebar antarunit",
                "Rendah–Sedang"
              ],
              [
                "3",
                "Data dan interoperabilitas",
                "Data masih tersilo dan standar antarunit belum seragam",
                "Rendah"
              ],
              [
                "4",
                "Infrastruktur teknologi",
                "Infrastruktur tersedia tetapi belum sepenuhnya terpadu",
                "Sedang"
              ],
              [
                "5",
                "Keamanan siber",
                "Telah terbentuk Pusat Pertahanan Siber sebagai fondasi",
                "Sedang"
              ],
              [
                "6",
                "Regulasi dan kebijakan",
                "Dukungan SPBE, Satu Data, dan RPJPN 2025–2045",
                "Tinggi"
              ]
            ]
          }
        ]
      },
      {
        "no": "4",
        "title": "Identifikasi Risiko dan Mitigasi",
        "blocks": [
          {
            "t": "p",
            "v": "Identifikasi risiko transformasi dilakukan untuk mengantisipasi hambatan yang dapat menggagalkan pencapaian arsitektur target, disertai tindakan mitigasi bagi setiap risiko. Ringkasannya disajikan pada Tabel IV.8."
          },
          {
            "t": "table",
            "title": "Risiko Transformasi dan Mitigasi",
            "header": [
              "No.",
              "Risiko",
              "Dampak",
              "Mitigasi"
            ],
            "rows": [
              [
                "1",
                "Resistensi perubahan organisasi",
                "Adopsi arsitektur berjalan lambat",
                "Manajemen perubahan, dukungan pimpinan, dan fungsi DTO"
              ],
              [
                "2",
                "Keterbatasan SDM digital",
                "Kualitas implementasi menurun",
                "Pelatihan, rekrutmen, dan kerja sama kelembagaan"
              ],
              [
                "3",
                "Kompleksitas integrasi sistem legacy",
                "Keterlambatan dan pembengkakan biaya",
                "Pentahapan, penggunaan middleware/API, dan standar terbuka"
              ],
              [
                "4",
                "Ancaman siber selama transisi",
                "Kebocoran atau gangguan data",
                "Penerapan security by design dan penguatan Pusat Pertahanan Siber"
              ],
              [
                "5",
                "Ketergantungan pada teknologi asing",
                "Risiko terhadap kedaulatan data",
                "Mengutamakan teknologi dalam negeri dan standar terbuka"
              ],
              [
                "6",
                "Keterbatasan anggaran dan waktu",
                "Cakupan target tidak tercapai",
                "Prioritas berbasis nilai dan peta jalan bertahap"
              ]
            ]
          }
        ]
      },
      {
        "no": "5",
        "title": "Konsep Solusi",
        "blocks": [
          {
            "t": "p",
            "v": "Konsep solusi memberikan gambaran menyeluruh mengenai kondisi target arsitektur transformasi digital pertahanan. Konsep ini disusun berlapis, mulai dari infrastruktur terpadu sebagai fondasi, platform interoperabilitas dan Satu Data Pertahanan sebagai simpul integrasi, kapabilitas C5ISR sebagai inti operasional, hingga layanan digital yang melayani seluruh pemangku kepentingan. Keamanan siber berlapis (security by design) serta tata kelola & kepatuhan terhadap SPBE, Satu Data Indonesia, dan regulasi pertahanan membentang menyilang pada seluruh lapisan. Gambaran konsep solusi disajikan pada Gambar IV.2."
          },
          {
            "t": "fig",
            "src": fig2,
            "cap": "Konsep Solusi Arsitektur Target"
          }
        ]
      },
      {
        "no": "6",
        "title": "Statement of Architecture Work",
        "blocks": [
          {
            "t": "p",
            "v": "Statement of Architecture Work (SoAW) merupakan dokumen kesepakatan kerja yang menetapkan ruang lingkup, tujuan, keluaran, pelaksana, dan batasan pekerjaan arsitektur untuk memperoleh persetujuan resmi. Ringkasan SoAW disajikan pada Tabel IV.9."
          },
          {
            "t": "table",
            "title": "Ringkasan Statement of Architecture Work",
            "header": [
              "Komponen",
              "Uraian"
            ],
            "rows": [
              [
                "Nama Pekerjaan",
                "Perancangan arsitektur transformasi digital pertahanan cerdas Kemhan RI berbasis TOGAF Pertahanan Indonesia"
              ],
              [
                "Ruang Lingkup",
                "Kemhan RI, ketiga matra, dan industri pertahanan; lima domain arsitektur (bisnis, data, aplikasi, teknologi, dan C5ISR); mengecualikan rahasia militer dan operasi tempur"
              ],
              [
                "Tujuan",
                "Mewujudkan arsitektur yang terintegrasi, aman, dan berorientasi smart defence sesuai visi dan tujuan strategis"
              ],
              [
                "Keluaran (Deliverables)",
                "Arsitektur baseline dan target tiap domain, peta jalan migrasi, serta instrumen evaluasi arsitektur"
              ],
              [
                "Organisasi Pelaksana",
                "Architecture Board, Architecture Team (fungsi DTO/Chief Enterprise Architect), dan Tim Keamanan Siber"
              ],
              [
                "Prinsip dan Batasan",
                "Kesembilan prinsip arsitektur (Tabel IV.1) serta kepatuhan terhadap SPBE, Satu Data Indonesia, dan regulasi pertahanan"
              ],
              [
                "Jadwal",
                "Dilaksanakan bertahap mengikuti siklus TOGAF Pertahanan Indonesia dari fase Preliminary hingga Migration Planning"
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "business-architecture",
    "title": "Fase Business Architecture",
    "intro": [
      "Fase Business Architecture bertujuan untuk memperjelaskan visi arsitektur yang telah dirumuskan pada fase Architecture Vision menjadi rancangan proses bisnis, kapabilitas, dan struktur organisasi pertahanan. Fase ini bertitik tolak dari kondisi organisasi Kemhan RI saat ini (baseline), kemudian menyusun aliran nilai (value stream) dan peta kapabilitas sebagai representasi fungsi pertahanan yang bebas dari sekat unit, untuk selanjutnya merumuskan arsitektur bisnis target (to-be) beserta analisis kesenjangannya. Seluruh rancangan mengacu pada struktur organisasi dan tata kerja Kemhan RI sebagaimana ditetapkan dalam Peraturan Menteri Pertahanan Nomor 1 Tahun 2024 tentang Organisasi dan Tata Kerja Kementerian Pertahanan [29]."
    ],
    "sections": [
      {
        "no": "1",
        "title": "Struktur Organisasi dan Tata Kelola",
        "blocks": [
          {
            "t": "p",
            "v": "Arsitektur bisnis baseline menggambarkan struktur organisasi dan tata kelola Kemhan RI yang berjalan pada kondisi saat ini. Pemahaman dari struktur ini penting sebagai dasar untuk mengidentifikasi fungsi yang telah ada maupun fungsi yang belum memiliki penanggung jawab. Struktur organisasi Kemhan RI berdasarkan Permenhan Nomor 1 Tahun 2024 disajikan pada Gambar IV.3."
          },
          {
            "t": "fig",
            "src": fig3,
            "cap": "Struktur Organisasi dan Tata Kerja Kemhan RI"
          },
          {
            "t": "p",
            "v": "Berdasarkan Gambar IV.3, Kemhan RI dipimpin oleh Menteri Pertahanan yang dibantu oleh Wakil Menteri Pertahanan. Di bawahnya terdapat unsur pembantu pimpinan dan pelaksana, yaitu Sekretariat Jenderal, Inspektorat Jenderal, dan empat direktorat jenderal (Strategi Pertahanan, Perencanaan Pertahanan, Potensi Pertahanan, serta Kekuatan Pertahanan), yang dilengkapi unsur pendukung berupa sejumlah badan dan pusat. Fungsi dari pengelolaan data, sistem informasi, komunikasi strategis, dan pertahanan siber diselenggarakan oleh Badan Informasi dan Komunikasi Pertahanan yang membawahi Pusat Teknologi Informasi dan Komunikasi Pertahanan, Pusat Informasi Strategis Pertahanan, dan Pusat Pertahanan Siber. Fungsi utama unit organisasi Kemhan RI dirangkum pada Tabel IV.10."
          },
          {
            "t": "table",
            "title": "Fungsi Utama Unit Organisasi Kemhan RI",
            "header": [
              "No.",
              "Unit Organisasi",
              "Fungsi Utama"
            ],
            "rows": [
              [
                "1",
                "Inspektorat Jenderal",
                "Penyelenggaraan pengawasan keuangan intern di lingkungan Kemhan"
              ],
              [
                "2",
                "Sekretariat Jenderal",
                "Koordinasi pelaksanaan tugas, pembinaan, dan dukungan administrasi seluruh unsur Kemhan"
              ],
              [
                "3",
                "Staf Ahli",
                "Pemberian rekomendasi atas isu-isu strategis kepada Menteri sesuai bidang masing-masing"
              ],
              [
                "4",
                "Ditjen Strategi Pertahanan",
                "Perumusan dan pelaksanaan kebijakan di bidang strategi pertahanan"
              ],
              [
                "5",
                "Ditjen Perencanaan Pertahanan",
                "Perumusan dan pelaksanaan kebijakan di bidang perencanaan pertahanan"
              ],
              [
                "6",
                "Ditjen Potensi Pertahanan",
                "Perumusan dan pelaksanaan kebijakan di bidang potensi pertahanan, termasuk pembinaan industri pertahanan"
              ],
              [
                "7",
                "Ditjen Kekuatan Pertahanan",
                "Perumusan dan pelaksanaan kebijakan di bidang kekuatan pertahanan"
              ],
              [
                "8",
                "Badan Sarana Pertahanan",
                "Pengelolaan sarana pertahanan"
              ],
              [
                "9",
                "Badan Pengembangan Kebijakan dan Teknologi Pertahanan",
                "Pengembangan kebijakan dan teknologi di bidang pertahanan"
              ],
              [
                "10",
                "Badan Pendidikan dan Pelatihan",
                "Penyelenggaraan pendidikan dan pelatihan di bidang pertahanan"
              ],
              [
                "11",
                "Badan Informasi dan Komunikasi Pertahanan",
                "Pengelolaan sistem informasi dan komunikasi strategis pertahanan serta pertahanan siber"
              ],
              [
                "12",
                "Pusat Kelaikan",
                "Dukungan substantif di bidang sertifikasi kelaikan alat peralatan pertahanan dan keamanan, konstruksi pertahanan, satwa pertahanan, serta jaminan mutu fasilitas pertahanan"
              ],
              [
                "13",
                "Pusat Rehabilitasi",
                "Dukungan substantif di bidang rehabilitasi medik, vokasional, sosial, dan perumahsakitan"
              ],
              [
                "14",
                "Pusat Pelaporan dan Pembinaan Keuangan Pertahanan",
                "Penyelenggaraan pelaporan keuangan dan pembinaan pengelolaan keuangan pertahanan"
              ],
              [
                "15",
                "Pusat Pengelolaan Kawasan",
                "Pengelolaan pengamanan, pemeliharaan bangunan, serta pengembangan kerja sama dan instalasi di Kawasan IPSC"
              ]
            ]
          },
          {
            "t": "p",
            "v": "Dari sisi tata kelola, pengambilan keputusan pertahanan berjalan berjenjang dari Menteri Pertahanan ke unit-unit eselon I dengan Sekretariat Jenderal sebagai koordinator lintas unit. Meskipun demikian, pengelolaan teknologi informasi dan data pada kondisi baseline sebagian besar masih bersifat operasional pada masing-masing unit, sehingga proses bisnis dijalankan dengan sistem yang terfragmentasi dan data yang tersilo antarunit. Kondisi ini menunjukkan bahwa struktur eksisting belum memiliki unit yang secara khusus memegang mandat transformasi digital lintas organisasi."
          }
        ]
      },
      {
        "no": "2",
        "title": "Value Stream Kemhan RI",
        "blocks": [
          {
            "t": "fig",
            "src": fig4,
            "cap": "Value Stream Kemhan RI"
          },
          {
            "t": "p",
            "v": "Value stream kemhan RI menggambarkan rangkaian aliran nilai yang menghasilkan luaran pertahanan bagi negara, mulai dari perumusan strategi pertahanan hingga pengelolaan SDM dan aset pertahanan. Value stream dibuat untuk melihat penyelenggaraan pertahanan sebagai aliran horizontal lintas unit, sehingga membantu mengidentifikasi kapabilitas yang benar-benar ada tanpa terikat pada sekat organisasi. Value stream Kemhan RI disajikan pada Gambar IV.4.Gambar IV.4 memperlihatkan lima aliran nilai utama yang saling berurutan. Aliran pertama, Perumusan Kebijakan dan Strategi Pertahanan, berfokus untuk menetapkan arah strategis pertahanan nasional yang selaras dengan kepentingan negara dan dinamika global, mencakup penyusunan kebijakan serta perencanaan pertahanan jangka pendek, menengah, dan panjang. Aliran kedua, Pengembangan Kekuatan dan Kapabilitas Pertahanan, berfokus untuk membangun kemampuan pertahanan melalui sumber daya manusia, alutsista, dan infrastruktur strategis. Aliran ketiga, Pelaksanaan Operasional dan Dukungan Pertahanan, berfokus menjalankan kegiatan pertahanan secara efektif dan terkoordinasi dari pusat hingga daerah. Aliran keempat, Tata Kelola, Pengawasan, dan Kepatuhan, berfokus untuk menjamin akuntabilitas, transparansi, serta kepatuhan terhadap regulasi dan standar. Aliran kelima, Pengelolaan Sumber Daya dan Aset Pertahanan, berfokus untuk mengoptimalkan penggunaan sumber daya dan aset negara, termasuk pengelolaan barang milik negara dan keuangan pertahanan. Kelima aliran nilai ini menjadi dasar penurunan kapabilitas yang diperlukan pada peta kapabilitas pertahanan."
          }
        ]
      },
      {
        "no": "3",
        "title": "Peta Kapabilitas Kemhan RI",
        "blocks": [
          {
            "t": "p",
            "v": "Peta kapabilitas Kemhan RI (business capability map) menjabarkan kemampuan yang harus dimiliki organisasi untuk menjalankan kelima aliran nilai, terlepas dari unit yang melaksanakannya. Pendekatan yang digunakan berbasis kapabilitas untuk memisahkan “apa yang dilakukan” dari “siapa yang melakukannya”, sehingga arsitektur tetap stabil meskipun terjadi penataan organisasi. Peta kapabilitas Kemhan RI disajikan pada Gambar IV.5."
          },
          {
            "t": "fig",
            "src": fig5,
            "cap": "Business Capability Map Kemhan RI"
          },
          {
            "t": "p",
            "v": "Gambar IV.5 menyusun kapabilitas ke dalam tiga lapis. Lapis defining memuat kapabilitas utama yang selaras dengan kelima aliran nilai, mulai dari analisis lingkungan strategis dan perumusan kebijakan, pengelolaan alutsista dan pengembangan sumber daya manusia, pelaksanaan operasi serta manajemen komando dan koordinasi, manajemen tata kelola dan pengawasan, hingga manajemen aset, keuangan, dan logistik. Lapis shared memuat kapabilitas bersama yang digunakan lintas fungsi, yaitu manajemen sumber daya manusia, manajemen data dan informasi yang mencakup tata kelola data, kualitas data, serta integrasi dan interoperabilitas, selanjutnya ada manajemen hubungan serta komunikasi organisasi. Lapis enabling memuat kapabilitas teknologi yang menjadi fondasi, meliputi infrastruktur pusat data dan jaringan, ketersediaan tinggi dan pemulihan bencana, keamanan siber (enkripsi, manajemen insiden, pemantauan keamanan, dan manajemen identitas), serta platform pertukaran data, middleware, dan manajemen API."
          }
        ]
      },
      {
        "no": "4",
        "title": "Arsitektur Bisnis Target",
        "blocks": [
          {
            "t": "p",
            "v": "Arsitektur bisnis target menggambarkan kondisi organisasi yang dituju untuk mewujudkan visi transformasi digital pertahanan. Berdasarkan analisis atas struktur baseline, aliran nilai, dan peta kapabilitas, teridentifikasi bahwa kapabilitas yang diperlukan untuk transformasi digital (manajemen data dan informasi) pada lapis shared serta kapabilitas enabling teknologi belum memiliki pengampu yang mengoordinasikannya secara lintas organisasi. Oleh karena itu, arsitektur bisnis target berfokus pada penyesuaian struktur organisasi dengan cara penambahan fungsi yang memimpin pergerakan transformasi digital pertahanan."
          }
        ],
        "subsections": [
          {
            "no": "4.1",
            "title": "Struktur Organisasi To-Be",
            "blocks": [
              {
                "t": "p",
                "v": "Berdasarkan struktur organisasi baseline pada Gambar IV.3 dan peta kapabilitas pada Gambar IV.5, teridentifikasi bahwa belum terdapat unit kerja yang secara khusus mengemban fungsi transformasi digital pertahanan. Beberapa fungsi strategis belum memiliki penanggung jawab yang jelas, yaitu:"
              },
              {
                "t": "p",
                "v": "a. Perumusan strategi dan peta jalan (roadmap) transformasi digital pertahanan;"
              },
              {
                "t": "p",
                "v": "b. Tata kelola arsitektur enterprise (enterprise architecture) serta standardisasi sistem lintas unit dan lintas matra;"
              },
              {
                "t": "p",
                "v": "c. Koordinasi transformasi digital lintas satuan kerja dan lintas matra;"
              },
              {
                "t": "p",
                "v": "d. Tata kelola data sebagai aset strategis, yang melampaui pengumpulan dan pengelolaan data yang bersifat operasional; dan"
              },
              {
                "t": "p",
                "v": "e. Penelaahan dan adopsi teknologi baru (emerging technology), seperti kecerdasan buatan dan komputasi awan."
              },
              {
                "t": "p",
                "v": "Secara praktik, kelima fungsi tersebut umumnya diemban oleh Digital Transformation Officer (DTO) atau unit setara. DTO merupakan peran atau unit yang bertanggung jawab mengorkestrasi transformasi digital organisasi secara menyeluruh, mencakup kepemilikan strategi, arsitektur, dan manajemen perubahan, serta menjembatani kebutuhan bisnis dan teknologi. Peran ini berbeda secara mendasar dari fungsi operasional teknologi informasi pada sistem eksisting: DTO berorientasi mengubah organisasi (change-the-business), sedangkan unit operasional berorientasi menjalankan sistem yang sudah berjalan (run-the-engine). Ketiadaan fungsi DTO menyebabkan transformasi digital berisiko berjalan parsial dan bersifat teknis semata, tanpa arah strategis dan tata kelola arsitektur yang terpadu."
              },
              {
                "t": "p",
                "v": "Untuk menutup kesenjangan tersebut, diusulkan pembentukan fungsi DTO pada tingkat strategis yang bertanggung jawab langsung kepada Menteri Pertahanan, dan tidak ditempatkan di bawah unit operasional teknologi informasi. Kedudukan ini didasarkan pada tiga pertimbangan. Pertama, mandat transformasi bersifat lintas organisasi sehingga menuntut kewenangan yang setara atau berada di atas unit eselon I agar DTO dapat mengoordinasikan seluruh satuan kerja dan ketiga matra. Kedua, pemisahan DTO dari Badan Informasi dan Komunikasi Pertahanan menjaga perbedaan peran antara orkestrasi transformasi (change-the-business) dan pengelolaan operasional teknologi informasi, komunikasi, serta siber (run-the-engine). Ketiga, kedudukan strategis memungkinkan DTO berperan sebagai Chief Enterprise Architect sekaligus memimpin Architecture Board sebagaimana yang telah ditetapkan pada tata kelola arsitektur di Subbab IV.1.4."
              },
              {
                "t": "p",
                "v": "Dalam menjalankan tugasnya, DTO menetapkan arah strategi dan arsitektur, sedangkan Badan Informasi dan Komunikasi Pertahanan beserta ketiga pusatnya (Pusat Teknologi Informasi dan Komunikasi Pertahanan, Pusat Informasi Strategis Pertahanan, dan Pusat Pertahanan Siber) bertindak sebagai lengan pelaksana implementasi. Dengan demikian, kehadiran DTO memperkuat, bukan menggantikan, unit yang telah ada. Struktur organisasi target beserta kedudukan fungsi DTO diilustrasikan pada Gambar IV.6."
              },
              {
                "t": "fig",
                "src": fig6,
                "cap": "Struktur Organisasi to-be"
              },
              {
                "t": "p",
                "v": "Unit DTO dipimpin oleh seorang Chief Digital Transformation Officer yang sekaligus berperan sebagai Chief Enterprise Architect dan memimpin Architecture Board. Unit ini terdiri atas bidang-bidang berikut:a. Bidang Strategi dan roadmap Transformasi Digital, yang merumuskan strategi dan peta jalan (roadmap) transformasi digital pertahanan;"
              },
              {
                "t": "p",
                "v": "b. Bidang Arsitektur Enterprise, yang menyelenggarakan tata kelola arsitektur enterprise dan standardisasi sistem lintas unit dan lintas matra, yang berisi para arsitek tiap domain (bisnis, data, aplikasi, teknologi, dan C5ISR);"
              },
              {
                "t": "p",
                "v": "c. Bidang Koordinasi dan Manajemen Perubahan, yang mengoordinasikan pelaksanaan transformasi lintas satuan kerja dan lintas matra serta mengelola manajemen perubahan (change management);"
              },
              {
                "t": "p",
                "v": "d. Bidang Tata Kelola Data, yang menyelenggarakan tata kelola data sebagai aset strategis, mencakup kebijakan data, penetapan wali data, dan standar data;"
              },
              {
                "t": "p",
                "v": "e. Bidang Inovasi dan Teknologi Baru, yang menelaah serta menyiapkan adopsi teknologi baru (emerging technology)."
              },
              {
                "t": "p",
                "v": "Pembagian bidang tersebut menegaskan bahwa unit DTO berfokus pada orkestrasi transformasi (change-the-business) dan bukan pada operasional teknologi informasi, yang tetap menjadi ranah Badan Informasi dan Komunikasi Pertahanan (run-the-engine). Dengan struktur ini, setiap fungsi strategis transformasi digital memiliki pengampu yang jelas dan dapat dipertanggungjawabkan."
              }
            ]
          },
          {
            "no": "4.2",
            "title": "Peta Kapabilitas To-Be",
            "blocks": [
              {
                "t": "p",
                "v": "Peta kapabilitas target (to-be) merupakan pemutakhiran atas peta kapabilitas kondisi saat ini (Gambar IV.5) dengan menambahkan kapabilitas baru yang diperlukan untuk mewujudkan arsitektur bisnis target. Penambahan difokuskan pada kapabilitas manajemen yang bersifat lintas fungsi serta menjadi prasyarat keberhasilan transformasi digital, tetapi belum tersedia pada kondisi baseline. Oleh karena bersifat lintas fungsi, seluruh kapabilitas baru ditempatkan pada lapis shared, sebagaimana disajikan pada Gambar IV.7."
              },
              {
                "t": "fig",
                "src": fig7,
                "cap": "Business Capability Map Kemhan RI To-Be"
              },
              {
                "t": "p",
                "v": "Gambar IV.7 memperlihatkan tiga penambahan kapabilitas pada lapis shared yang ditandai dengan warna hijau. Pertama, kapabilitas Tata Kelola Arsitektur Enterprise, yang mencakup manajemen arsitektur enterprise, standardisasi dan integrasi sistem, serta architecture governance melalui Architecture Board. Kapabilitas ini menjaga konsistensi rancangan sistem di seluruh aliran nilai sehingga tidak terikat pada satu value stream tertentu. Kedua, kapabilitas Manajemen Perubahan, yang meliputi manajemen perubahan organisasi, adopsi dan komunikasi perubahan, serta kesiapan transformasi; kapabilitas ini menopang keberhasilan adopsi transformasi pada seluruh unit dan karenanya bersifat lintas organisasi. Ketiga, sub-kapabilitas Manajemen Talenta Digital yang disisipkan ke dalam kelompok Manajemen Sumber Daya Manusia untuk membedakannya dari manajemen talenta pertahanan yang telah ada pada lapis defining dengan penambahan ini menegaskan kebutuhan kompetensi digital yang berlaku menyeluruh di lingkungan organisasi."
              },
              {
                "t": "p",
                "v": "Ketiga kapabilitas tersebut secara langsung merupakan kapabilitas pada bidang-bidang di dalam unit Digital Transformation Officer (DTO), yaitu Bidang Arsitektur Enterprise, Bidang Koordinasi dan Manajemen Perubahan, serta dukungan pengembangan talenta digital. Penempatannya pada lapis shared menegaskan bahwa ketiganya merupakan kapabilitas manajemen berskala enterprise yang diampu oleh fungsi bermandat lintas organisasi. Kelengkapan kapabilitas pada peta target inilah yang menjadi dasar identifikasi kesenjangan arsitektur bisnis."
              }
            ]
          },
          {
            "no": "4.3",
            "title": "Analisis Kesenjangan",
            "blocks": [
              {
                "t": "p",
                "v": "Analisis kesenjangan (gap analysis) membandingkan kondisi baseline (as-is) dengan arsitektur bisnis target (to-be) untuk mengidentifikasi selisih yang harus ditutup. Hasil analisis disajikan pada Tabel IV.11."
              },
              {
                "t": "table",
                "title": "Analisis Kesenjangan Arsitektur Bisnis",
                "header": [
                  "No.",
                  "Aspek Bisnis",
                  "Kondisi Baseline (As-Is)",
                  "Kondisi Target (To-Be)",
                  "Kesenjangan dan Tindak Lanjut"
                ],
                "rows": [
                  [
                    "1",
                    "Struktur dan mandat transformasi",
                    "Belum ada unit yang memegang mandat transformasi digital lintas organisasi",
                    "Fungsi DTO pada tingkat strategis dengan struktur internal yang jelas",
                    "Pembentukan unit DTO beserta bidang-bidangnya"
                  ],
                  [
                    "2",
                    "Kapabilitas tata kelola arsitektur",
                    "Belum ada kapabilitas tata kelola arsitektur enterprise dan standardisasi lintas unit",
                    "Kapabilitas Enterprise Architecture dan Architecture Board yang melekat pada DTO",
                    "Penetapan tata kelola dan standar arsitektur"
                  ],
                  [
                    "3",
                    "Kapabilitas manajemen perubahan",
                    "Transformasi berjalan parsial tanpa pengelolaan perubahan",
                    "Kapabilitas manajemen perubahan (change management) yang terlembaga",
                    "Pembangunan kapabilitas manajemen perubahan"
                  ],
                  [
                    "4",
                    "Proses bisnis lintas unit",
                    "Proses bisnis terfragmentasi dan belum terstandar antarunit",
                    "Proses bisnis terstandar dan terintegrasi berbasis kapabilitas",
                    "Standardisasi dan integrasi proses bisnis"
                  ],
                  [
                    "5",
                    "Koordinasi dan kolaborasi lintas matra",
                    "Koordinasi antarunit dan antarmatra bersifat ad hoc",
                    "Mekanisme koordinasi transformasi lintas matra yang terlembaga",
                    "Penetapan mekanisme koordinasi lintas matra"
                  ],
                  [
                    "6",
                    "Kompetensi dan talenta digital",
                    "Kompetensi digital terbatas dan tersebar antarunit",
                    "Kapabilitas manajemen talenta digital yang memadai",
                    "Program pengembangan dan rekrutmen talenta digital"
                  ]
                ]
              }
            ]
          },
          {
            "no": "4.4",
            "title": "Roadmap Implementasi",
            "blocks": [
              {
                "t": "fig",
                "src": fig8,
                "cap": "Roadmap Implementasi Fase Business Architecture"
              },
              {
                "t": "p",
                "v": "Roadmap implementasi fase business architecture disusun berdasrkan urutan pelaksanaan inisiatif untuk menutup kesenjangan arsitektur bisnis pada Tabel IV.11. Roadmap implementasi dibagi ke dalam tiga bagian waktu sebagaimana disajikan pada Gambar IV.8 dan dirinci pada Tabel IV.12."
              },
              {
                "t": "table",
                "title": "Rincian Roadmap Implementasi Fase Business",
                "header": [
                  "Horizon Waktu",
                  "Inisiatif Bisnis",
                  "Keluaran dan Kesenjangan yang Ditutup"
                ],
                "rows": [
                  [
                    "Jangka Pendek (0–12 bulan)",
                    "Pembentukan unit DTO beserta bidang-bidangnya; penetapan Architecture Board dan tata kelola arsitektur; penetapan mandat dan kewenangan lintas organisasi",
                    "Unit DTO operasional dan tata kelola arsitektur berjalan (menutup kesenjangan 1 dan 2)"
                  ],
                  [
                    "Jangka Menengah (1–3 tahun)",
                    "Standardisasi dan integrasi proses bisnis lintas unit; penetapan mekanisme koordinasi transformasi lintas matra; pembangunan kapabilitas manajemen perubahan dan talenta digital",
                    "Proses terstandar, koordinasi lintas matra terlembaga, serta kapabilitas perubahan dan talenta (menutup kesenjangan 3, 4, 5, dan 6)"
                  ],
                  [
                    "Jangka Panjang (3–5 tahun)",
                    "Pembentukan budaya transformasi berkelanjutan; evaluasi dan penyempurnaan tata kelola arsitektur",
                    "Organisasi berbasis kapabilitas yang matang dan berkelanjutan"
                  ]
                ]
              },
              {
                "t": "p",
                "v": "Dengan demikian, fase Business Architecture menghasilkan fondasi organisasi dan tata kelola yang menjadi prasyarat bagi keberhasilan transformasi pada fase-fase teknis berikutnya."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "information-system-architecture",
    "title": "Fase Information System Architecture",
    "comingSoon": true
  },
  {
    "id": "technology-architecture",
    "title": "Fase Technology Architecture",
    "comingSoon": true
  },
  {
    "id": "c5isr-architecture",
    "title": "Fase C5ISR Architecture",
    "comingSoon": true
  },
  {
    "id": "opportunities-solutions",
    "title": "Fase Opportunities & Solutions",
    "comingSoon": true
  },
  {
    "id": "migration-planning",
    "title": "Fase Migration Planning",
    "comingSoon": true
  },
  {
    "id": "implementation-governance",
    "title": "Fase Implementation Governance",
    "comingSoon": true
  },
  {
    "id": "architecture-change-management",
    "title": "Fase Architecture Change Management",
    "comingSoon": true
  }
];

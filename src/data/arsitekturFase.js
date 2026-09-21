// Data implementasi Bab IV — halaman Arsitektur Transformasi Digital Kemhan.
// Dihasilkan dari tesis; isi lengkap. Fase yang belum selesai: comingSoon.

import fig1 from '@/assets/images/preliminary-ruang-lingkup.drawio.svg';
import fig2 from '@/assets/images/solusi-arsitektur-target.drawio.svg';
import fig3 from '@/assets/images/struktur-organisasi-kemhan-permenhan-30-2025-dan-13-2026.drawio.svg';
import fig4 from '@/assets/images/value-stream-kemhan.drawio.svg';
import fig5 from '@/assets/images/business-capability-map-kemhan.drawio.svg';
import fig6 from '@/assets/images/struktur-organisasi-kemhan-permenhan-30-2025-dan-13-2026-to-be.drawio.svg';
import fig7 from '@/assets/images/business-capability-map-kemhan-to-be.drawio.svg';
import fig8 from '@/assets/images/roadmap-implementasi-fase-business-architecture.drawio.svg';
// Fase Information System Architecture (IV.4) & Technology Architecture (IV.5)
import figISBaselineSilo from '@/assets/images/baseline-integrasi-antar-aplikasi-(silo).drawio.svg';
import figISModelTarget from '@/assets/images/model-integrasi-target-denga-rasionalisasi-aplikasi.drawio.svg';
import figTechBaseline from '@/assets/images/arsitektur-teknologi-baseline.drawio.svg';
import figTechTarget from '@/assets/images/arsitektur-teknologi-target.drawio.svg';
// Roadmap implementasi per fase & gambar C5ISR
import figISRoadmap from '@/assets/images/roadmap-implementasi-fase-information-system-architecture.drawio.svg';
import figTechRoadmap from '@/assets/images/roadmap-implementasi-fase-technology-architecture.drawio.svg';
import figC5Satelit from '@/assets/images/arsitektur-satelit.drawio.svg';

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
    "intro": [
      "Fase Information Systems Architecture menentukan arsitektur sistem informasi yang mendukung proses bisnis pertahanan, mencakup arsitektur data (data architecture) dan arsitektur aplikasi (application architecture) yang dikerjakan berurutan dengan arsitektur data didahulukan. Arsitektur data dirancang berdasarkan Peraturan Presiden Nomor 39 Tahun 2019 tentang Satu Data Indonesia dan Peraturan Menteri Pertahanan Nomor 1 Tahun 2023 tentang Satu Data Pertahanan, sehingga penataan data pertahanan selaras dengan kebijakan tata kelola data nasional maupun sektor pertahanan.",
      "Kedua sub-domain arsitektur sistem informasi bermula dari inventarisasi aplikasi Kemhan tahun 2025 yang menjadi kondisi baseline bersama. Inventaris mencatat 247 aplikasi yang terdiri atas 176 aplikasi umum dan 71 aplikasi khusus."
    ],
    "sharedBlocks": [
      {
        "t": "p",
        "v": "Rekapitulasi aplikasi baseline per satuan kerja yang menjadi dasar bersama arsitektur data dan aplikasi disajikan pada tabel berikut."
      },
      {
        "t": "table",
        "title": "Rekapitulasi Aplikasi Baseline per Satuan Kerja",
        "header": [
          "No.",
          "Satuan Kerja",
          "Umum",
          "Khusus",
          "Jumlah"
        ],
        "rows": [
          [
            "1",
            "Direktorat Jenderal Strategi Pertahanan",
            "10",
            "0",
            "10"
          ],
          [
            "2",
            "Direktorat Jenderal Perencanaan Pertahanan",
            "22",
            "0",
            "22"
          ],
          [
            "3",
            "Direktorat Jenderal Potensi Pertahanan",
            "8",
            "4",
            "12"
          ],
          [
            "4",
            "Direktorat Jenderal Kekuatan Pertahanan",
            "21",
            "0",
            "21"
          ],
          [
            "5",
            "Inspektorat Jenderal",
            "2",
            "1",
            "3"
          ],
          [
            "6",
            "Biro Perencanaan dan Keuangan",
            "2",
            "0",
            "2"
          ],
          [
            "7",
            "Biro Kepegawaian",
            "2",
            "4",
            "6"
          ],
          [
            "8",
            "Biro Hukum",
            "0",
            "1",
            "1"
          ],
          [
            "9",
            "Biro Tata Usaha dan Protokol",
            "16",
            "0",
            "16"
          ],
          [
            "10",
            "Biro Umum",
            "17",
            "0",
            "17"
          ],
          [
            "11",
            "Biro Informasi Pertahanan",
            "0",
            "2",
            "2"
          ],
          [
            "12",
            "Biro Organisasi dan Tata Laksana",
            "0",
            "1",
            "1"
          ],
          [
            "13",
            "Biro Peraturan Perundang-undangan",
            "1",
            "0",
            "1"
          ],
          [
            "14",
            "Badan Logistik Pertahanan",
            "5",
            "1",
            "6"
          ],
          [
            "15",
            "Badan Teknologi Pertahanan",
            "18",
            "1",
            "19"
          ],
          [
            "16",
            "Badan Pengembangan Sumber Daya Manusia Pertahanan",
            "0",
            "27",
            "27"
          ],
          [
            "17",
            "Pusat Data dan Informasi",
            "6",
            "8",
            "14"
          ],
          [
            "18",
            "Badan Informasi dan Komunikasi Intelijen Pertahanan",
            "0",
            "16",
            "16"
          ],
          [
            "19",
            "Pusat Kelaikan",
            "13",
            "0",
            "13"
          ],
          [
            "20",
            "Pusat Kesehatan Pertahanan",
            "14",
            "4",
            "18"
          ],
          [
            "21",
            "Pusat Pelaporan dan Pembinaan Keuangan Pertahanan",
            "12",
            "1",
            "13"
          ],
          [
            "22",
            "Universitas Pertahanan",
            "7",
            "0",
            "7"
          ],
          [
            "",
            "Total",
            "176",
            "71",
            "247"
          ]
        ]
      }
    ],
    "subDomains": [
      {
        "id": "data-architecture",
        "title": "Data Architecture",
        "intro": [
          "Arsitektur data merancang struktur definisi, klasifikasi, dan tata kelola kepemilikan Data Pertahanan. Mengacu Permenhan Nomor 1 Tahun 2023, Data Pertahanan adalah data yang dibina dan diselenggarakan oleh Kementerian Pertahanan dan Tentara Nasional Indonesia untuk kepentingan penyelenggaraan pertahanan negara. Perancangan berpedoman pada prinsip Data as Strategic Asset serta empat prinsip Satu Data Indonesia, yaitu pemenuhan standar data, metadata, kaidah interoperabilitas data, dan penggunaan kode referensi serta data induk."
        ],
        "sections": [
          {
            "no": "1",
            "title": "Arsitektur Data Baseline",
            "blocks": [
              {
                "t": "p",
                "v": "Arsitektur data baseline diturunkan dari inventarisasi aplikasi Kemhan tahun 2025 yang mencatat 247 aplikasi, terdiri atas 176 aplikasi umum dan 71 aplikasi khusus. Aplikasi umum merupakan sistem nasional yang digunakan bersama oleh banyak instansi seperti SAKTI, SIMPEG, SIRUP, KRISNA, dan OM-SPAN, sehingga Kemhan berkedudukan sebagai pengguna, bukan pemilik datanya. Data pada aplikasi umum tunduk pada tata kelola instansi penyelenggara masing-masing di tingkat nasional dan karenanya berada di luar lingkup arsitektur data Kemhan. Sebaliknya, aplikasi khusus merupakan aplikasi yang dibina dan diselenggarakan sendiri oleh Kemhan, sehingga datanya merupakan Data Pertahanan dan menjadi lingkup utama arsitektur data serta Satu Data Pertahanan."
              }
            ]
          },
          {
            "no": "2",
            "title": "Model Entitas Data Pertahanan",
            "blocks": [
              {
                "t": "p",
                "v": "Model entitas data menggambarkan objek data pokok (entitas) yang menjadi rujukan proses bisnis pertahanan beserta sumber dan pengelolanya. Entitas data diturunkan dari fungsi 71 aplikasi khusus yang menghasilkan Data Pertahanan, kemudian dikelompokkan menurut kedekatan domainnya, yaitu domain kepegawaian, hukum, dan pengawasan; layanan publik dan potensi pertahanan; pendidikan, kesehatan, litbang, dan keuangan; serta data strategis, geospasial, dan keamanan siber. Daftar entitas data utama Data Pertahanan disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Entitas Data Pertahanan",
                "header": [
                  "No.",
                  "Entitas Data",
                  "Aplikasi",
                  "Deskripsi"
                ],
                "rows": [
                  [
                    "Kepegawaian, Hukum, dan Pengawasan"
                  ],
                  [
                    "1",
                    "Data Kinerja Pegawai",
                    "E-Kinerja, E-LAPKIN",
                    "Capaian dan laporan kinerja pegawai serta kinerja organisasi"
                  ],
                  [
                    "2",
                    "Data Kompetensi & Asesmen",
                    "SIAC",
                    "Hasil asesmen kompetensi dan pemetaan talenta pegawai"
                  ],
                  [
                    "3",
                    "Data Kartu Identitas Pegawai",
                    "E-KTA, SiUdin",
                    "Identitas resmi dan kartu tanda anggota pegawai"
                  ],
                  [
                    "4",
                    "Data Perkara & Dokumentasi Hukum",
                    "Si Rokum",
                    "Perkara, pendapat hukum, dan dokumentasi produk hukum"
                  ],
                  [
                    "5",
                    "Data Pengawasan Intern",
                    "SIMWAS",
                    "Temuan, rekomendasi, dan tindak lanjut hasil pengawasan intern"
                  ],
                  [
                    "Layanan Publik dan Potensi Pertahanan"
                  ],
                  [
                    "6",
                    "Data Layanan Informasi Publik",
                    "E-PPID, Smart Mobile Reporting",
                    "Permohonan informasi publik"
                  ],
                  [
                    "7",
                    "Data Veteran",
                    "Veteran",
                    "Identitas, status, dan hak-hak veteran pertahanan negara"
                  ],
                  [
                    "8",
                    "Data Sumber Daya & Industri Pertahanan",
                    "Sisinfo Sumdahan, Daya Serap",
                    "Potensi sumber daya nasional dan kapasitas industri pertahanan"
                  ],
                  [
                    "9",
                    "Data Perizinan Pertahanan",
                    "Perizinan",
                    "Permohonan dan penerbitan izin di bidang industri pertahanan"
                  ],
                  [
                    "Pendidikan, Kesehatan, Litbang, dan Keuangan"
                  ],
                  [
                    "10",
                    "Data Peserta Didik & Akademik",
                    "Aplikasi Pengelolaan Siswa/Akademik, Sistem Layanan Diklat",
                    "Peserta didik, kurikulum, jadwal, dan nilai akademik"
                  ],
                  [
                    "11",
                    "Data Alumni",
                    "Sistem Pengelolaan Alumni",
                    "Riwayat dan penelusuran alumni pendidikan pertahanan"
                  ],
                  [
                    "12",
                    "Data Bahan Ajar & Pembelajaran Digital",
                    "Bahan Ajar Digital, VR Diklat, Sistem Pembelajaran Elektronik",
                    "Materi ajar, modul, dan konten pembelajaran digital"
                  ],
                  [
                    "13",
                    "Data Rekam Medis & Pasien",
                    "SimRS, Sismadak",
                    "Rekam medis, riwayat layanan, dan mutu pelayanan pasien"
                  ],
                  [
                    "14",
                    "Data Klaim Layanan Kesehatan",
                    "E-Klaim",
                    "Pengajuan dan verifikasi klaim layanan kesehatan"
                  ],
                  [
                    "15",
                    "Data Penelitian & Pengembangan",
                    "Data Digital Arsip Penelitian",
                    "Arsip hasil penelitian dan pengembangan pertahanan"
                  ],
                  [
                    "16",
                    "Data Pelaporan Keuangan Internal",
                    "EMINU",
                    "Pelaporan dan pemantauan keuangan internal Kemhan"
                  ],
                  [
                    "Data Strategis, Geospasial, dan Keamanan Siber"
                  ],
                  [
                    "17",
                    "Data Geospasial Wilayah Pertahanan",
                    "Peta Tematik Wilayah Pertahanan, Layanan Peta Digital, IGD Sumdahan",
                    "Peta tematik dan data spasial wilayah serta objek pertahanan"
                  ],
                  [
                    "18",
                    "Data Log & Insiden Keamanan Siber",
                    "SIEM, Splunk, Honeypot, Log Manajemen",
                    "Catatan aktivitas, deteksi, dan penanganan insiden keamanan siber"
                  ],
                  [
                    "19",
                    "Data Identitas & Kendali Akses",
                    "Single Sign On (SSO), Access Control",
                    "Identitas pengguna, hak akses, dan otentikasi sistem"
                  ],
                  [
                    "20",
                    "Data Aset & Infrastruktur TIK",
                    "Rack Management, EMS, The Dude, Cacti",
                    "Inventaris dan kondisi perangkat, jaringan, serta infrastruktur TIK"
                  ]
                ]
              }
            ]
          },
          {
            "no": "3",
            "title": "Klasifikasi Data menurut Tingkat Kerahasiaan",
            "blocks": [
              {
                "t": "p",
                "v": "Klasifikasi data menurut tingkat kerahasiaan diperlukan untuk menyeimbangkan kewajiban berbagi-pakai data dengan kewajiban kerahasiaan pertahanan. Mengacu pada Permenhan Nomor 1 Tahun 2023 tentang Satu Data Pertahanan Pasal 21, klasifikasi Data Pertahanan terdiri atas tiga tingkat, yaitu Klasifikasi Data Terbuka, Klasifikasi Data Terbatas, dan Klasifikasi Data Rahasia, sebagaimana disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Klasifikasi Data Pertahanan",
                "header": [
                  "Klasifikasi",
                  "Kriteria",
                  "Kendali Akses"
                ],
                "rows": [
                  [
                    "Data Terbuka",
                    "Data yang diperbolehkan untuk diketahui publik",
                    "Terbuka untuk publik melalui Portal Satu Data Pertahanan"
                  ],
                  [
                    "Data Terbatas",
                    "Data yang hanya dapat diakses oleh kementerian/lembaga yang diberikan akses oleh Walidata Pertahanan",
                    "Otentikasi dan hak akses berbasis izin oleh Walidata Pertahanan"
                  ],
                  [
                    "Data Rahasia",
                    "Data yang hanya dapat diakses oleh pejabat berwenang di Kemhan, Markas Besar TNI, dan Markas Besar Angkatan",
                    "Otorisasi khusus, enkripsi, dan pencatatan audit"
                  ]
                ]
              }
            ]
          },
          {
            "no": "4",
            "title": "Kamus Data dan Standar Penamaan",
            "blocks": [
              {
                "t": "p",
                "v": "Kamus data (data dictionary) dan standar penamaan disusun untuk memenuhi prinsip Satu Data Indonesia dan Satu Data Pertahanan, yaitu pemenuhan standar data, metadata, kaidah interoperabilitas, serta penggunaan kode referensi dan data induk. Tanpa definisi dan penamaan yang seragam, entitas data yang sama dapat direkam berbeda antaraplikasi khusus sehingga menghambat interoperabilitas. Standar penamaan yang ditetapkan sebagai berikut:"
              },
              {
                "t": "p",
                "v": "a. nama entitas dan atribut menggunakan bahasa Indonesia baku, deskriptif, dan tidak memakai singkatan yang ambigu;"
              },
              {
                "t": "p",
                "v": "b. penamaan atribut mengikuti pola [entitas]_[atribut] dengan huruf kecil dan pemisah garis bawah (snake_case), misalnya pegawai_nip dan veteran_nomor;"
              },
              {
                "t": "p",
                "v": "c. setiap entitas memiliki satu pengidentifikasi unik (primary key) yang baku, misalnya NIP/NRP untuk pegawai dan nomor registrasi untuk veteran;"
              },
              {
                "t": "p",
                "v": "d. setiap entitas dan atribut memiliki definisi tunggal yang disepakati dan dicatat dalam kamus data; dan"
              },
              {
                "t": "p",
                "v": "e. metadata mengikuti struktur dan format baku Satu Data Indonesia, mencakup definisi, format, satuan, klasifikasi, dan wali data."
              }
            ]
          },
          {
            "no": "5",
            "title": "Matriks Kepemilikan dan Tata Kelola Data",
            "blocks": [
              {
                "t": "p",
                "v": "Tata kelola Data Pertahanan mengikuti penyelenggara Satu Data Pertahanan sebagaimana ditetapkan Permenhan Nomor 1 Tahun 2023. Penetapan peran yang jelas menjamin setiap Data Pertahanan memiliki produsen dan wali data yang bertanggung jawab atas mutunya. Peran-peran tersebut disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Peran Penyelenggaraan Satu Data Pertahanan",
                "header": [
                  "Peran",
                  "Tugas Pokok",
                  "Pemangku Peran"
                ],
                "rows": [
                  [
                    "Pengarah",
                    "Mengoordinasikan pelaksanaan, pemantauan, evaluasi, dan pelaporan Satu Data Pertahanan kepada Menteri",
                    "Sekretaris Jenderal Kemhan"
                  ],
                  [
                    "Walidata Pertahanan",
                    "Merencanakan, mengumpulkan, memeriksa, mengelola, dan menyebarluaskan data melalui Portal Satu Data Pertahanan",
                    "Pusat Data dan Informasi"
                  ],
                  [
                    "Produsen Data Pertahanan",
                    "Menghasilkan data sesuai prinsip Satu Data serta menyampaikan data dan metadata kepada Walidata",
                    "Satuan kerja penghasil data di lingkungan Kemhan dan Mabes TNI"
                  ],
                  [
                    "Pengolah Data Pertahanan",
                    "Mendistribusikan Data Pertahanan hingga sampai kepada Walidata",
                    "Satuan kerja pengelola data di Mabes Angkatan"
                  ],
                  [
                    "Pengaman Sistem Data Pertahanan",
                    "Mengamankan, memantau, menguji, dan merespons ancaman siber terhadap sistem Satu Data Pertahanan",
                    "Bidang Pengamanan Sistem Informasi dan Persandian pada Pusat Data dan Informasi, didukung Pusat Siber dan Intelijen Teknologi Pertahanan"
                  ],
                  [
                    "Forum Satu Data Pertahanan",
                    "Wadah komunikasi dan koordinasi penyelenggaraan Satu Data Pertahanan",
                    "Walidata, Produsen, Pengolah, dan Pengaman Sistem Data"
                  ]
                ]
              },
              {
                "t": "p",
                "v": "Berdasarkan pembagian peran tersebut, setiap Data Pertahanan memiliki produsen data (satuan kerja) sebagai penghasil, sedangkan pengelolaan dan penyebarluasannya dipusatkan pada satu Walidata Pertahanan, yaitu Pusat Data dan Informasi yang menyelenggarakan manajemen Satu Data Pertahanan sesuai Permenhan Nomor 30 Tahun 2025 sebagaimana diubah dengan Permenhan Nomor 13 Tahun 2026."
              }
            ]
          },
          {
            "no": "6",
            "title": "Arsitektur Data Target",
            "blocks": [
              {
                "t": "p",
                "v": "Arsitektur data target adalah terwujudnya Satu Data Pertahanan, yaitu Data Pertahanan yang terstandar, terklasifikasi, dimiliki secara jelas, aman, dan dapat dibagipakaikan secara terkendali. Sarana teknis pewujudannya adalah Portal Satu Data Pertahanan, yaitu media bagi-pakai data yang dikelola Walidata Pertahanan dan terhubung dengan Portal Satu Data Indonesia. Arsitektur data target dibangun di atas lima komponen berikut:"
              },
              {
                "t": "p",
                "v": "a. Kamus data dan standar penamaan sebagai rujukan tunggal definisi, penamaan, dan metadata;"
              },
              {
                "t": "p",
                "v": "b. Klasifikasi dan kendali akses yang menetapkan tingkat kerahasiaan dan hak akses;"
              },
              {
                "t": "p",
                "v": "c. Tata kelola dan wali data sesuai penyelenggara Satu Data Pertahanan;"
              },
              {
                "t": "p",
                "v": "d. Portal Satu Data Pertahanan sebagai platform bagi-pakai dan penyebarluasan data, dilengkapi kode referensi dan data induk;"
              },
              {
                "t": "p",
                "v": "e. Interoperabilitas data dengan Portal Satu Data Indonesia sesuai kaidah Satu Data Indonesia."
              }
            ]
          },
          {
            "no": "7",
            "title": "Analisis Kesenjangan",
            "blocks": [
              {
                "t": "p",
                "v": "Analisis kesenjangan (gap analysis) membandingkan kondisi arsitektur data baseline (as-is) dengan arsitektur data target (to-be) untuk mengidentifikasi selisih yang harus ditutup beserta tindak lanjutnya. Analisis difokuskan pada enam aspek utama Data Pertahanan, yaitu standar dan definisi data, integrasi dan berbagi-pakai, tata kelola dan kepemilikan, klasifikasi kerahasiaan, keamanan dan akses, serta interoperabilitas. Perbandingannya disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Analisis Kesenjangan Arsitektur Data Pertahanan",
                "header": [
                  "No.",
                  "Aspek",
                  "Baseline (As-Is)",
                  "Target (To-Be)",
                  "Kesenjangan dan Tindak Lanjut"
                ],
                "rows": [
                  [
                    "1",
                    "Standar dan definisi data",
                    "Definisi dan penamaan berbeda antaraplikasi khusus",
                    "Kamus data dan standar penamaan yang seragam",
                    "Penetapan dan penerapan kamus data serta standar penamaan"
                  ],
                  [
                    "2",
                    "Integrasi dan berbagi-pakai",
                    "Data Pertahanan terkotak (silo) per aplikasi dan satker",
                    "Berbagi-pakai melalui Portal Satu Data Pertahanan",
                    "Pembangunan Portal Satu Data Pertahanan"
                  ],
                  [
                    "3",
                    "Tata kelola dan kepemilikan",
                    "Belum ada wali data dan produsen data yang baku",
                    "Walidata Pertahanan dan produsen data sesuai Permenhan 1/2023",
                    "Penetapan penyelenggara Satu Data Pertahanan"
                  ],
                  [
                    "4",
                    "Klasifikasi kerahasiaan",
                    "Belum ada klasifikasi yang tegas",
                    "Tiga tingkat klasifikasi (Terbuka, Terbatas, Rahasia)",
                    "Penetapan dan penerapan klasifikasi data"
                  ],
                  [
                    "5",
                    "Keamanan dan akses",
                    "Kendali akses parsial per aplikasi",
                    "Kendali akses berbasis klasifikasi dan pengamanan sistem",
                    "Penerapan kendali akses dan pengaman sistem data"
                  ],
                  [
                    "6",
                    "Interoperabilitas",
                    "Pertukaran data manual/terbatas",
                    "Interoperabilitas dengan Portal Satu Data Indonesia",
                    "Penetapan kode referensi, data induk, dan kaidah interoperabilitas"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "application-architecture",
        "title": "Application Architecture",
        "intro": [
          "Arsitektur aplikasi merancang portofolio aplikasi yang mendukung proses bisnis pertahanan, mencakup aplikasi yang digunakan, fungsi yang didukung, pengguna, serta keterhubungan (integrasi) antaraplikasi. Sesuai lingkup yang ditetapkan pada arsitektur data, arsitektur aplikasi difokuskan pada 71 aplikasi khusus yang dibina dan diselenggarakan sendiri oleh Kemhan."
        ],
        "sections": [
          {
            "no": "1",
            "title": "Arsitektur Aplikasi Baseline",
            "blocks": [
              {
                "t": "p",
                "v": "Arsitektur aplikasi baseline menggambarkan 71 aplikasi khusus yang digunakan Kemhan pada tahun 2025 beserta uraian dan penggunanya. Aplikasi dikelompokkan menurut domain agar mudah diteliti. Daftar aplikasi khusus disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Daftar Aplikasi Khusus (Baseline)",
                "header": [
                  "No.",
                  "Aplikasi",
                  "Uraian",
                  "Pengguna"
                ],
                "rows": [
                  [
                    "Kepegawaian"
                  ],
                  [
                    "1",
                    "E-Kinerja",
                    "Pengelolaan rencana dan capaian kinerja pegawai",
                    "Biro Kepegawaian"
                  ],
                  [
                    "2",
                    "SIAC",
                    "Pelayanan asesmen kompetensi pegawai",
                    "Biro Kepegawaian"
                  ],
                  [
                    "3",
                    "SiUdin",
                    "Pelayanan ujian dinas dan penyesuaian ijazah pegawai",
                    "Biro Kepegawaian"
                  ],
                  [
                    "4",
                    "E-KTA",
                    "Pengajuan dan pencetakan Kartu Tanda Anggota",
                    "Biro Kepegawaian"
                  ],
                  [
                    "5",
                    "E-LAPKIN",
                    "Pelaporan kinerja pegawai",
                    "Biro Ortala"
                  ],
                  [
                    "Hukum dan Pengawasan"
                  ],
                  [
                    "6",
                    "Si Rokum",
                    "Penatausahaan data penanganan perkara hukum",
                    "Biro Hukum"
                  ],
                  [
                    "7",
                    "SIMWAS Ver 2.0",
                    "Pengelolaan dokumen hasil pengawasan intern",
                    "Inspektorat Jenderal"
                  ],
                  [
                    "Informasi Publik"
                  ],
                  [
                    "8",
                    "E-PPID",
                    "Penerimaan permohonan informasi publik",
                    "Biro Informasi Pertahanan"
                  ],
                  [
                    "9",
                    "Smart Mobile Reporting",
                    "Pelaporan dan pemantauan perjalanan dinas",
                    "Biro Informasi Pertahanan"
                  ],
                  [
                    "Potensi Pertahanan"
                  ],
                  [
                    "10",
                    "Perizinan",
                    "Layanan perizinan industri pertahanan daring",
                    "Ditjen Potensi Pertahanan"
                  ],
                  [
                    "11",
                    "Veteran",
                    "Pelayanan administrasi keveteranan daring",
                    "Ditjen Potensi Pertahanan"
                  ],
                  [
                    "12",
                    "Sisinfo Sumdahan",
                    "Manajemen sumber daya pertahanan (Komcad dan Komduk)",
                    "Ditjen Potensi Pertahanan"
                  ],
                  [
                    "13",
                    "Daya Serap",
                    "Pemantauan daya serap program dan anggaran",
                    "Ditjen Potensi Pertahanan"
                  ],
                  [
                    "Sarana Pertahanan"
                  ],
                  [
                    "14",
                    "Monitoring Dokumen Elektronik",
                    "Penyimpanan dan pencarian surat secara digital",
                    "Badan Logistik Pertahanan"
                  ],
                  [
                    "Pendidikan dan Pelatihan"
                  ],
                  [
                    "15",
                    "Aplikasi Command Center",
                    "Pemantauan dan pusat kendali fasilitas diklat",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "16",
                    "Virtual Collaboration System",
                    "Aplikasi berbasis web untuk melakukan meeting di dunia maya",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "17",
                    "Security Management System",
                    "Pengenalan wajah dan keamanan fasilitas",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "18",
                    "Energy Management System",
                    "Pemantauan penggunaan listrik",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "19",
                    "Access Management System",
                    "Pengelolaan data dan akses tamu",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "20",
                    "Sistem Layanan Diklat",
                    "Layanan bantuan dan informasi diklat",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "21",
                    "Bahan Ajar Digital Diklat",
                    "Pembelajaran bahan ajar secara digital",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "22",
                    "VR Diklat Jemenhan",
                    "Bahan ajar manajemen pertahanan berbasis VR",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "23",
                    "Simulasi Manajemen Pertahanan",
                    "Familiarisasi bahan ajar melalui simulasi 3 dimensi",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "24",
                    "Sistem Informasi Badiklat",
                    "Website untuk menyampaikan informasi berkaitan dengan Badiklat dan Pusdiklat",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "25",
                    "Sistem Pengelolaan Alumni",
                    "Pemantauan dan penelusuran data alumni",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "26",
                    "Sistem Pemantauan & Pengelolaan Sisfo Diklat",
                    "Pemantauan perkembangan diklat",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "27",
                    "Sistem Dasbor Pimpinan",
                    "Ringkasan kegiatan diklat bagi pimpinan",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "28",
                    "VR Diklat Bahasa",
                    "Bahan ajar bahasa berbasis VR",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "29",
                    "Lab Bahasa",
                    "Pembelajaran laboratorium bahasa",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "30",
                    "Aplikasi Pengelolaan Siswa",
                    "Data dan pendaftaran siswa",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "31",
                    "Aplikasi Pengelolaan Akademik",
                    "Aplikasi berbasis web yang menyediakan layanan data siswa, pendaftaran online, ploting asrama, lapor datang",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "32",
                    "Sistem Pengelolaan Aset",
                    "Pengelolaan aset dan inventaris internal Tekfunghan",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "33",
                    "Ujian Berbasis Komputer",
                    "Layanan ujian berbasis komputer",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "34",
                    "Kios Siswa",
                    "Informasi bagi siswa Tekfunghan",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "35",
                    "Aplikasi Manajemen Pengajaran",
                    "Aplikasi berbasis web yang menyediakan layanan jadwal pengajaran, rekapitulasi jam pelajaran widyaiswara, catatan mengajar, perangkat mengajar, penjadwalan widyaiswara",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "36",
                    "Sistem Konferensi Kelas",
                    "Pembelajaran jarak jauh (distance learning)",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "37",
                    "VR Diklat Tekfunghan",
                    "Bahan ajar diklat Tekfunghan berbasis VR",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "38",
                    "Bahan Ajar Digital Tekfunghan",
                    "Aplikasi berbasis desktop untuk menampilkan materi pembelajaran secara interaktif di dalam kelas Tekfunghan",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "39",
                    "Sistem Pembelajaran Elektronik",
                    "Pembelajaran daring dan tatap muka",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "40",
                    "Bahan Ajar Digital Bela Negara",
                    "Pembelajaran bela negara di ruang kelas",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "41",
                    "VR Diklat Bela Negara",
                    "Bahan ajar bela negara berbasis VR",
                    "Badan Pengembangan Sumber Daya Manusia Pertahanan"
                  ],
                  [
                    "Kesehatan dan Rehabilitasi"
                  ],
                  [
                    "42",
                    "SimRS",
                    "Sistem informasi manajemen rumah sakit",
                    "Pusat Kesehatan Pertahanan"
                  ],
                  [
                    "43",
                    "Sismadak",
                    "Manajemen dan akreditasi rumah sakit",
                    "Pusat Kesehatan Pertahanan"
                  ],
                  [
                    "44",
                    "E-Klaim",
                    "Klaim layanan kesehatan secara elektronik",
                    "Pusat Kesehatan Pertahanan"
                  ],
                  [
                    "45",
                    "Website RSPPN",
                    "Situs layanan dan informasi RSPPN",
                    "Pusat Kesehatan Pertahanan"
                  ],
                  [
                    "Data Strategis dan Geospasial"
                  ],
                  [
                    "46",
                    "Big Data",
                    "Penyajian data media daring dan media sosial",
                    "Pusat Data dan Informasi"
                  ],
                  [
                    "47",
                    "Program Kerja Pusdatin",
                    "Layanan monitoring dan koordinasi pelaksanaan program kerja Pusdatin",
                    "Pusat Data dan Informasi"
                  ],
                  [
                    "48",
                    "Pusdatin Cloud",
                    "Layanan penyimpanan dokumen dan file untuk pegawai Pusdatin Kemhan",
                    "Pusat Data dan Informasi"
                  ],
                  [
                    "49",
                    "IGD Sumdahan",
                    "Layanan pendukung Defense Strategic Room Menteri Pertahanan",
                    "Pusat Data dan Informasi; pimpinan"
                  ],
                  [
                    "50",
                    "Secure Code Analyzer",
                    "Sistem untuk melakukan scanning terhadap source code aplikasi",
                    "Pusat Data dan Informasi; Bid. Sistem Aplikasi"
                  ],
                  [
                    "51",
                    "Peta Tematik Wilayah Pertahanan",
                    "Penyajian peta pertahanan dan titik strategis",
                    "Pusat Data dan Informasi"
                  ],
                  [
                    "52",
                    "Layanan Peta Digital",
                    "Analisis dan pemasangan titik (POI) pada peta",
                    "Pusat Data dan Informasi"
                  ],
                  [
                    "53",
                    "SIMONAS",
                    "Pemantauan aplikasi dan server",
                    "Pusat Data dan Informasi; Bid. Infra TIK"
                  ],
                  [
                    "Keamanan Siber dan Infrastruktur TIK"
                  ],
                  [
                    "54",
                    "The Dude",
                    "Pemantauan kondisi perangkat jaringan",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "55",
                    "Access Control Pushansiber",
                    "Pengaturan akses masuk dan keluar gedung Pushansiber",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "56",
                    "EMS",
                    "Pemantauan kondisi dan situasi lapangan (CCTV Gedung) Pushansiber",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "57",
                    "Single Sign On (SSO)",
                    "Otentikasi tunggal akses aplikasi",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "58",
                    "Rack Management",
                    "Pendataan alamat IP dan perangkat server",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "59",
                    "Cacti",
                    "Pemantauan penggunaan bandwidth perangkat",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "60",
                    "SIEM",
                    "Pemantauan anomali trafik dan event keamanan",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "61",
                    "DNS Static",
                    "Penerjemah IP menjadi domain (DNS Static)",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "62",
                    "DNS Filtering",
                    "Pencegahan akses ke situs terlarang",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "63",
                    "Log Manajemen",
                    "Pemantauan anomali/serangan melalui log",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "64",
                    "Pelaporan",
                    "Data laporan operasional siber",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "65",
                    "Honeypot",
                    "Perangkap untuk menganalisa perilaku serangan siber",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "66",
                    "Helpdesk CSIRT",
                    "Tiketing pelaporan insiden siber",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "67",
                    "Cloud Pushansiber",
                    "Penyimpanan data pertahanan siber",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "68",
                    "VAPT",
                    "Layanan pengujian keamanan sistem aplikasi",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "69",
                    "Splunk",
                    "Pemantauan anomali trafik dan syslog perangkat",
                    "Badan Informasi dan Komunikasi Intelijen Pertahanan"
                  ],
                  [
                    "Litbang dan Keuangan"
                  ],
                  [
                    "70",
                    "Data Digital Arsip Penelitian",
                    "Arsip laporan hasil penelitian",
                    "Badan Teknologi Pertahanan"
                  ],
                  [
                    "71",
                    "EMINU",
                    "Input surat-menyurat internal Puslapbinkuhan",
                    "Pusat Pelaporan dan Pembinaan Keuangan Pertahanan"
                  ]
                ]
              },
              {
                "t": "p",
                "v": "Inventarisasi memperlihatkan bahwa aplikasi khusus sebagian besar berdiri sendiri atau per satuan kerja. Hal menonjol dari inventarisasi ini yaitu:"
              },
              {
                "t": "p",
                "v": "a. Belum terdapat aplikasi yang berfungsi sebagai integrator atau portal berbagi-pakai data antaraplikasi, sehingga setiap aplikasi mengelola datanya secara terpisah."
              },
              {
                "t": "p",
                "v": "b. Belum terdapat aplikasi yang mendukung komando dan kendali lintas matra."
              },
              {
                "t": "p",
                "v": "c. Terdapat sejumlah aplikasi dengan fungsi serupa, antara lain pengelolaan kinerja, bahan ajar dan pembelajaran, serta persuratan dan penyimpanan dokumen, yang berpotensi untuk digabungkan."
              }
            ]
          },
          {
            "no": "2",
            "title": "Analisis Integrasi Antar Aplikasi",
            "blocks": [
              {
                "t": "p",
                "v": "Pada kondisi baseline, ke-71 aplikasi khusus umumnya berdiri sendiri (silo) dan dikelola per satuan kerja tanpa integrasi terpusat. Pertukaran data antaraplikasi (jika ada) dilakukan secara manual atau terbatas, sehingga data yang sama harus dimasukkan berulang dan sulit dipadankan antaraplikasi. Kondisi integrasi aplikasi baseline diilustrasikan pada Gambar IV.9."
              },
              {
                "t": "fig",
                "src": figISBaselineSilo,
                "cap": "Kondisi Integrasi Antar Aplikasi Baseline"
              },
              {
                "t": "p",
                "v": "Ketiadaan integrasi ini menimbulkan persoalan: duplikasi pemasukan data, ketiadaan otentikasi tunggal sehingga pengguna mengelola banyak akun, dan sulitnya menyajikan data terpadu bagi pimpinan. Ketiga persoalan tersebut menjadi sasaran perbaikan pada arsitektur aplikasi target."
              }
            ]
          },
          {
            "no": "3",
            "title": "Rasionalisasi Aplikasi",
            "blocks": [
              {
                "t": "p",
                "v": "Rasionalisasi aplikasi menilai setiap kelompok aplikasi untuk menentukan tindak lanjutnya, yaitu dipertahankan, diperkuat, diganti, atau dihentikan. Penilaian mempertimbangkan tumpang tindih fungsi, tingkat penggunaan, dan kesesuaian dengan kapabilitas target. Hasil rasionalisasi disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Rasionalisasi Aplikasi",
                "header": [
                  "Kelompok Aplikasi",
                  "Kondisi",
                  "Keputusan",
                  "Alasan"
                ],
                "rows": [
                  [
                    "Kepegawaian",
                    "Fungsi kinerja/administrasi tersebar (E-Kinerja, E-LAPKIN)",
                    "Digabungkan",
                    "Menyatukan aplikasi berfungsi serupa menjadi layanan kepegawaian terpadu"
                  ],
                  [
                    "Hukum dan Pengawasan",
                    "Aplikasi layanan spesifik",
                    "Dipertahankan + integrasi",
                    "Fungsi unik; dihubungkan ke platform integrasi"
                  ],
                  [
                    "Informasi Publik",
                    "Layanan informasi dan pelaporan",
                    "Dipertahankan + integrasi",
                    "Fungsi unik; dihubungkan ke platform integrasi"
                  ],
                  [
                    "Potensi Pertahanan",
                    "Aplikasi layanan spesifik per fungsi",
                    "Dipertahankan + integrasi",
                    "Fungsi unik; dihubungkan ke platform integrasi"
                  ],
                  [
                    "Sarana Pertahanan",
                    "Aplikasi persuratan/dokumen",
                    "Dipertahankan + integrasi",
                    "Fungsi unik; dihubungkan ke platform integrasi"
                  ],
                  [
                    "Pendidikan dan Pelatihan",
                    "27 aplikasi, banyak modul bahan ajar/VR terpisah",
                    "Digabungkan",
                    "Menyatukan ke platform pembelajaran (LMS) terpadu"
                  ],
                  [
                    "Kesehatan dan Rehabilitasi",
                    "Aplikasi layanan kesehatan",
                    "Dipertahankan + integrasi",
                    "Fungsi unik; dihubungkan ke platform integrasi"
                  ],
                  [
                    "Data Strategis dan Geospasial",
                    "8 aplikasi data dan geospasial",
                    "Dipertahankan + integrasi",
                    "Menjadi sumber utama Portal Satu Data Pertahanan"
                  ],
                  [
                    "Keamanan Siber dan Infrastruktur TIK",
                    "16 aplikasi teknis spesifik",
                    "Dipertahankan + integrasi",
                    "Fungsi teknis berbeda; diintegrasikan pemantauan melalui SIEM/SOC terpadu"
                  ],
                  [
                    "Litbang dan Keuangan",
                    "Aplikasi arsip dan persuratan",
                    "Dipertahankan + integrasi",
                    "Fungsi unik; dihubungkan ke platform integrasi"
                  ]
                ]
              },
              {
                "t": "p",
                "v": "Rasionalisasi ini merampingkan aplikasi dengan menggabungkan aplikasi berfungsi serupa dan mempertahankan aplikasi berfungsi khas/unik, sekaligus menyiapkan seluruh aplikasi untuk terhubung ke platform integrasi pada kondisi target. Rincian status dan tindak lanjut setiap aplikasi hasil rasionalisasi disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Daftar Aplikasi Hasil Rasionalisasi",
                "header": [
                  "No.",
                  "Aplikasi",
                  "Status"
                ],
                "rows": [
                  [
                    "Kepegawaian"
                  ],
                  [
                    "1",
                    "E-Kinerja",
                    "Digabungkan (layanan kepegawaian terpadu)"
                  ],
                  [
                    "2",
                    "SIAC",
                    "Digabungkan (layanan kepegawaian terpadu)"
                  ],
                  [
                    "3",
                    "SiUdin",
                    "Digabungkan (layanan kepegawaian terpadu)"
                  ],
                  [
                    "4",
                    "E-KTA",
                    "Digabungkan (layanan kepegawaian terpadu)"
                  ],
                  [
                    "5",
                    "E-LAPKIN",
                    "Digabungkan (layanan kepegawaian terpadu)"
                  ],
                  [
                    "Hukum dan Pengawasan"
                  ],
                  [
                    "6",
                    "Si Rokum",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "7",
                    "SIMWAS Ver 2.0",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "Informasi Publik"
                  ],
                  [
                    "8",
                    "E-PPID",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "9",
                    "Smart Mobile Reporting",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "Potensi Pertahanan"
                  ],
                  [
                    "10",
                    "Perizinan",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "11",
                    "Veteran",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "12",
                    "Sisinfo Sumdahan",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "13",
                    "Daya Serap",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "Sarana Pertahanan"
                  ],
                  [
                    "14",
                    "Monitoring Dokumen Elektronik",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "Pendidikan dan Pelatihan"
                  ],
                  [
                    "15",
                    "Aplikasi Command Center",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "16",
                    "Virtual Collaboration System",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "17",
                    "Security Management System",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "18",
                    "Energy Management System",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "19",
                    "Access Management System",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "20",
                    "Sistem Layanan Diklat",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "21",
                    "Bahan Ajar Digital Diklat",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "22",
                    "VR Diklat Jemenhan",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "23",
                    "Simulasi Manajemen Pertahanan",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "24",
                    "Sistem Informasi Badiklat",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "25",
                    "Sistem Pengelolaan Alumni",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "26",
                    "Sistem Pemantauan & Pengelolaan Sisfo Diklat",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "27",
                    "Sistem Dasbor Pimpinan",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "28",
                    "VR Diklat Bahasa",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "29",
                    "Lab Bahasa",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "30",
                    "Aplikasi Pengelolaan Siswa",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "31",
                    "Aplikasi Pengelolaan Akademik",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "32",
                    "Sistem Pengelolaan Aset",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "33",
                    "Ujian Berbasis Komputer",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "34",
                    "Kios Siswa",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "35",
                    "Aplikasi Manajemen Pengajaran",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "36",
                    "Sistem Konferensi Kelas",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "37",
                    "VR Diklat Tekfunghan",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "38",
                    "Bahan Ajar Digital Tekfunghan",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "39",
                    "Sistem Pembelajaran Elektronik",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "40",
                    "Bahan Ajar Digital Bela Negara",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "41",
                    "VR Diklat Bela Negara",
                    "Digabungkan (LMS terpadu)"
                  ],
                  [
                    "Kesehatan dan Rehabilitasi"
                  ],
                  [
                    "42",
                    "SimRS",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "43",
                    "Sismadak",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "44",
                    "E-Klaim",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "45",
                    "Website RSPPN",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "Data Strategis dan Geospasial"
                  ],
                  [
                    "46",
                    "Big Data",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "47",
                    "Program Kerja Pusdatin",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "48",
                    "Pusdatin Cloud",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "49",
                    "IGD Sumdahan",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "50",
                    "Secure Code Analyzer",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "51",
                    "Peta Tematik Wilayah Pertahanan",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "52",
                    "Layanan Peta Digital",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "53",
                    "SIMONAS",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "Keamanan Siber dan Infrastruktur TIK"
                  ],
                  [
                    "54",
                    "The Dude",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "55",
                    "Access Control",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "56",
                    "EMS",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "57",
                    "Single Sign On (SSO)",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "58",
                    "Rack Management",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "59",
                    "Cacti",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "60",
                    "SIEM",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "61",
                    "DNS Static",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "62",
                    "DNS Filtering",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "63",
                    "Log Manajemen",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "64",
                    "Pelaporan",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "65",
                    "Honeypot",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "66",
                    "Helpdesk CSIRT",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "67",
                    "Cloud Pushansiber",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "68",
                    "VAPT",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "69",
                    "Splunk",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "Litbang dan Keuangan"
                  ],
                  [
                    "70",
                    "Data Digital Arsip Penelitian",
                    "Dipertahankan + integrasi"
                  ],
                  [
                    "71",
                    "EMINU",
                    "Dipertahankan + integrasi"
                  ]
                ]
              }
            ]
          },
          {
            "no": "4",
            "title": "Arsitektur Aplikasi Target",
            "blocks": [
              {
                "t": "p",
                "v": "Arsitektur aplikasi target terdiri atas aplikasi inti yang dipertahankan hasil rasionalisasi ditambah sejumlah komponen baru yang menutup kesenjangan kapabilitas. Komponen baru tersebut meliputi:"
              },
              {
                "t": "p",
                "v": "a. Platform Integrasi Pertahanan yang menyediakan API Gateway dan mekanisme pertukaran data (data exchange) antaraplikasi;"
              },
              {
                "t": "p",
                "v": "b. Portal Satu Data Pertahanan sebagai sarana bagi-pakai dan penyebarluasan Data Pertahanan;"
              },
              {
                "t": "p",
                "v": "c. Layanan otentikasi tunggal dan manajemen identitas (Single Sign-On/IAM) tingkat enterprise;"
              },
              {
                "t": "p",
                "v": "d. Platform pembelajaran (LMS) terpadu sebagai hasil konsolidasi aplikasi kediklatan; dan"
              },
              {
                "t": "p",
                "v": "e. Portal layanan terpadu bagi pengguna internal dan publik."
              }
            ]
          },
          {
            "no": "5",
            "title": "Interoperabilitas dan Integrasi Antar Aplikasi Target",
            "blocks": [
              {
                "t": "p",
                "v": "Pada kondisi target, aplikasi tidak lagi berdiri sendiri, melainkan terhubung melalui Portal Satu Data Pertahanan sebagai platform integrasi. Pertukaran data antaraplikasi dilakukan melalui API Gateway dan mekanisme data exchange dengan otentikasi tunggal (SSO/IAM), serta dikendalikan sesuai klasifikasi data (Terbuka, Terbatas, Rahasia). Model integrasi aplikasi target diilustrasikan pada Gambar IV.10."
              },
              {
                "t": "fig",
                "src": figISModelTarget,
                "cap": "Model Integrasi Aplikasi Target"
              },
              {
                "t": "p",
                "v": "Model hub ini menggantikan pola silo pada kondisi baseline. Setiap aplikasi cukup terhubung ke platform, sehingga integrasi menjadi lebih sederhana, aman, dan mudah dikelola. Interoperabilitas ini menghubungkan arsitektur aplikasi dengan arsitektur data melalui Portal Satu Data Pertahanan, dan menjadi langkah awal dalam komando-kendali yang dirancang pada arsitektur C5ISR."
              }
            ]
          },
          {
            "no": "6",
            "title": "Analisis Kesenjangan Aplikasi",
            "blocks": [
              {
                "t": "p",
                "v": "Analisis kesenjangan membandingkan kondisi arsitektur aplikasi baseline dengan target untuk mengidentifikasi selisih yang harus ditutup beserta tindak lanjutnya, sebagaimana disajikan pada tabel berikut."
              },
              {
                "t": "table",
                "title": "Analisis Kesenjangan Arsitektur Aplikasi",
                "header": [
                  "No.",
                  "Aspek",
                  "Baseline (As-Is)",
                  "Target (To-Be)",
                  "Kesenjangan dan Tindak Lanjut"
                ],
                "rows": [
                  [
                    "1",
                    "Integrasi antaraplikasi",
                    "Aplikasi silo, pertukaran data manual",
                    "Aplikasi terhubung melalui platform integrasi",
                    "Pembangunan platform integrasi dan API Gateway"
                  ],
                  [
                    "2",
                    "Redundansi fungsi",
                    "Banyak aplikasi berfungsi serupa",
                    "Portofolio ramping dan terkonsolidasi",
                    "Konsolidasi aplikasi redundan (kepegawaian, LMS, persuratan)"
                  ],
                  [
                    "3",
                    "Otentikasi dan akses",
                    "Akun terpisah per aplikasi",
                    "Otentikasi tunggal (SSO/IAM) terpusat",
                    "Penerapan SSO/IAM enterprise"
                  ],
                  [
                    "4",
                    "Layanan bagi-pakai data",
                    "Belum ada portal bagi-pakai data",
                    "Portal Satu Data Pertahanan",
                    "Pembangunan Portal Satu Data Pertahanan"
                  ],
                  [
                    "5",
                    "Dukungan kapabilitas",
                    "Kapabilitas integrasi data dan C2 lintas matra belum didukung",
                    "Aplikasi/komponen baru sesuai kapabilitas target",
                    "Pengembangan aplikasi/komponen baru"
                  ],
                  [
                    "6",
                    "Tata kelola aplikasi",
                    "Pengelolaan aplikasi tersebar per satker",
                    "Tata kelola portofolio aplikasi terpusat",
                    "Penetapan tata kelola portofolio aplikasi (DTO)"
                  ]
                ]
              }
            ]
          }
        ]
      }
    ],
    "trailingSections": [
      {
        "no": "",
        "title": "Roadmap Implementasi Fase Information System Architecture",
        "blocks": [
          {
            "t": "fig",
            "src": figISRoadmap,
            "cap": "Roadmap Implementasi Fase Information System Architecture"
          },
          {
            "t": "p",
            "v": "Roadmap implementasi fase Information System Architecture menyusun urutan pelaksanaan inisiatif arsitektur data dan arsitektur aplikasi untuk menutup kesenjangan yang teridentifikasi pada analisis kesenjangan arsitektur data dan arsitektur aplikasi. Inisiatif dibagi ke dalam tiga horizon waktu, yaitu jangka pendek, jangka menengah, dan jangka panjang."
          },
          {
            "t": "table",
            "title": "Rincian Roadmap Implementasi Fase Information System Architecture",
            "header": [
              "Horizon Waktu",
              "Inisiatif (Data dan Aplikasi)",
              "Keluaran dan Kesenjangan yang Ditutup"
            ],
            "rows": [
              [
                "Jangka Pendek (0–12 bulan)",
                "Penetapan penyelenggara Satu Data Pertahanan (Walidata, Produsen, Pengolah, dan Pengaman Sistem); penetapan klasifikasi, kamus data, dan standar penamaan; rasionalisasi awal portofolio aplikasi",
                "Tata kelola dan standar data berjalan serta peta rasionalisasi aplikasi tersedia (menutup kesenjangan data pada aspek standar, kepemilikan, dan klasifikasi, serta kesenjangan aplikasi pada aspek redundansi)"
              ],
              [
                "Jangka Menengah (1–3 tahun)",
                "Pembangunan Portal Satu Data Pertahanan; pembangunan platform integrasi dan API Gateway; penerapan SSO/IAM enterprise; konsolidasi aplikasi redundan (kepegawaian, LMS, dan persuratan)",
                "Portal dan platform integrasi operasional, otentikasi tunggal berjalan, serta portofolio aplikasi menjadi ramping (menutup kesenjangan data pada aspek integrasi dan keamanan, serta kesenjangan aplikasi pada aspek integrasi, otentikasi, dan layanan data)"
              ],
              [
                "Jangka Panjang (3–5 tahun)",
                "Interoperabilitas penuh antaraplikasi dan dengan Portal Satu Data Indonesia; pengembangan aplikasi/komponen baru untuk kapabilitas yang belum terdukung; pelembagaan tata kelola portofolio data dan aplikasi; penyediaan layanan data dan aplikasi terpadu berorientasi pengguna",
                "Ekosistem data dan aplikasi yang terintegrasi, aman, dan berkelanjutan (menutup kesenjangan aplikasi pada aspek dukungan kapabilitas dan tata kelola)"
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "technology-architecture",
    "title": "Fase Technology Architecture",
    "intro": [
      "Fase Technology Architecture merancang infrastruktur teknologi yang menopang arsitektur data dan aplikasi, meliputi lapisan komputasi (compute), penyimpanan (storage), jaringan (network), dan keamanan (security). Perancangan berpedoman pada prinsip Availability & Reliability, Security by Design, Scalability & Flexibility, dan Interoperabilitas, serta mengacu pada Peraturan Menteri Pertahanan Nomor 34 Tahun 2025 tentang Peta Jalan Pelindungan Infrastruktur Informasi Vital Sektor Pertahanan untuk aspek keamanan."
    ],
    "sections": [
      {
        "no": "1",
        "title": "Arsitektur Teknologi Baseline",
        "blocks": [
          {
            "t": "p",
            "v": "Topologi jaringan dan infrastruktur Data Center Kemhan secara rinci tidak tersedia dalam penelitian ini. Oleh karena itu, arsitektur teknologi baseline disusun sebagai model logis berdasarkan informasi yang tersedia. Infrastruktur teknologi Kemhan berpusat pada satu Data Center yang berlokasi di Pondok Labu, Jakarta Selatan. Secara logis, infrastruktur tersebut tersusun atas empat lapisan, yaitu lapisan komputasi, penyimpanan, jaringan, dan keamanan, sebagaimana disajikan pada Gambar IV.12."
          },
          {
            "t": "fig",
            "src": figTechBaseline,
            "cap": "Arsitektur Teknologi Baseline",
            "w": "240px"
          },
          {
            "t": "p",
            "v": "Komponen pada setiap lapisan dirangkum pada tabel berikut."
          },
          {
            "t": "table",
            "title": "Komponen Arsitektur Teknologi Baseline",
            "header": [
              "Lapisan",
              "Komponen",
              "Fungsi"
            ],
            "rows": [
              [
                "Komputasi",
                "Server",
                "Menjalankan aplikasi"
              ],
              [
                "Penyimpanan",
                "Storage",
                "Menyimpan data"
              ],
              [
                "Jaringan",
                "Switch dan Router",
                "Menghubungkan perangkat dan mengatur lalu lintas jaringan"
              ],
              [
                "Keamanan",
                "Firewall",
                "Melindungi jaringan sistem"
              ]
            ]
          },
          {
            "t": "p",
            "v": "Dari kondisi baseline teridentifikasi dua karakteristik utama. Pertama, seluruh infrastruktur bertumpu pada satu Data Center tanpa Disaster Recovery Center (DRC) maupun redundansi, sehingga menjadi titik tunggal kegagalan (single point of failure) yang berisiko terhadap ketersediaan layanan pertahanan. Kedua, lapisan keamanan masih bersifat parsial dan belum diterapkan secara menyeluruh."
          }
        ]
      },
      {
        "no": "2",
        "title": "Prinsip dan Standar Teknologi",
        "blocks": [
          {
            "t": "p",
            "v": "Perancangan arsitektur teknologi target berpedoman pada sejumlah prinsip dan standar sebagaimana disajikan pada tabel berikut."
          },
          {
            "t": "table",
            "title": "Prinsip dan Standar Teknologi",
            "header": [
              "Prinsip",
              "Penerapan pada Arsitektur Teknologi"
            ],
            "rows": [
              [
                "Availability & Reliability",
                "Data Center dilengkapi DRC, redundansi, dan cadangan (backup) untuk menjamin ketersediaan layanan"
              ],
              [
                "Security by Design",
                "Keamanan diterapkan secara menyeluruh sejak perancangan pada setiap lapisan"
              ],
              [
                "Scalability & Flexibility",
                "Penggunaan virtualisasi/private cloud agar sumber daya elastis dan mudah diskalakan"
              ],
              [
                "Interoperabilitas",
                "Penggunaan standar terbuka (open standard) dan antarmuka pemrograman (API) untuk pertukaran data"
              ],
              [
                "Integrated Command & Control",
                "Jaringan lintas matra untuk mendukung komando dan kendali terpadu"
              ],
              [
                "Data as Strategic Asset",
                "Penyimpanan redundan dan cadangan terpusat untuk melindungi data pertahanan"
              ]
            ]
          }
        ]
      },
      {
        "no": "3",
        "title": "Arsitektur Teknologi Target",
        "blocks": [
          {
            "t": "p",
            "v": "Arsitektur teknologi target dirancang untuk menutup kesenjangan baseline dan menopang Platform Integrasi Pertahanan serta Portal Satu Data Pertahanan yang telah dirumuskan pada arsitektur aplikasi dan data. Arsitektur ini disusun secara berlapis, mulai dari presentation layer, security layer, integration layer, compute layer, storage layer, dan network layer yang ditopang oleh infrastruktur fisik Data Center yang redundan. Struktur arsitektur teknologi target disajikan pada Gambar IV.13."
          },
          {
            "t": "fig",
            "src": figTechTarget,
            "cap": "Arsitektur Teknologi Target"
          },
          {
            "t": "p",
            "v": "Komponen utama arsitektur teknologi target meliputi:"
          },
          {
            "t": "p",
            "v": "a. Presentation Layer sebagai antarmuka bagi pengguna, mencakup Portal Satu Data Pertahanan, antarmuka seluruh aplikasi Kemhan, serta titik akses Joint All Defense (JAD) sebagai gerbang menuju kapabilitas komando dan kendali lintas domain yang dirinci pada arsitektur C5ISR;"
          },
          {
            "t": "p",
            "v": "b. Security Layer atau lapisan keamanan yang bersifat menyeluruh, mencakup firewall, IDPS, VAPT, Cyber Threat Intelligence (CTI), dan SIEM, yang dirinci pada subbab Arsitektur Keamanan;"
          },
          {
            "t": "p",
            "v": "c. Integration Layer, lapisan yang menyediakan API Gateway, Single Sign-On/manajemen identitas (SSO/IAM), dan Data Exchange sebagai tulang punggung interoperabilitas antaraplikasi;"
          },
          {
            "t": "p",
            "v": "d. Compute Layer, lapisan yang berisi server, virtualisasi, dan kontainer (container) agar sumber daya bersifat elastis dan mudah diskalakan;"
          },
          {
            "t": "p",
            "v": "e. Storage Layer, lapisan yang terdiri atas penyimpanan utama dan cadangan (backup) untuk menjamin ketersediaan dan pelindungan data;"
          },
          {
            "t": "p",
            "v": "f. Network Layer, lapisan yang tersegmentasi dan terenkripsi (switch dan router) dengan konektivitas lintas matra (TNI AD, AL, dan AU) untuk mendukung interoperabilitas; dan"
          },
          {
            "t": "p",
            "v": "g. Infrastruktur Data Center yang redundan, terdiri atas Data Center Utama di Pusat Data dan Informasi (Pondok Labu, Jakarta Selatan) dan Disaster Recovery Center (DRC) yang diusulkan berlokasi di Kemhan IKN, Kalimantan. Kedua pusat data beroperasi dalam konfigurasi aktif-aktif (active-active) dengan replikasi data untuk menghilangkan titik tunggal kegagalan. Konfigurasi aktif-aktif memungkinkan kedua Data Center melayani beban kerja secara bersamaan sekaligus saling menjadi cadangan, sehingga apabila salah satu Data Center terganggu, layanan tetap berjalan pada Data Center lainnya tanpa gangguan yang berarti."
          }
        ]
      },
      {
        "no": "4",
        "title": "Arsitektur Keamanan (Security Layer)",
        "blocks": [
          {
            "t": "p",
            "v": "Lapisan keamanan dirancang mengacu pada Permenhan Nomor 34 Tahun 2025 tentang Peta Jalan Pelindungan Infrastruktur Informasi Vital Sektor Pertahanan, yang mengelompokkan pelindungan ke dalam empat domain, yaitu identifikasi, proteksi, deteksi, serta penanggulangan dan pemulihan. Komponen teknologi keamanan pada setiap domain disajikan pada tabel berikut."
          },
          {
            "t": "table",
            "title": "Komponen Keamanan per Domain",
            "header": [
              "Domain",
              "Komponen/Teknologi",
              "Fungsi"
            ],
            "rows": [
              [
                "Identifikasi",
                "Vulnerability Assessment & Penetration Test (VAPT)",
                "Mengidentifikasi kerentanan dan potensi risiko keamanan sistem"
              ],
              [
                "Proteksi",
                "Network security (firewall, segmentasi), Endpoint protection, IDPS",
                "Melindungi jaringan dan perangkat akhir serta mencegah serangan"
              ],
              [
                "Deteksi",
                "Cyber Threat Intelligence (CTI), SIEM",
                "Mendeteksi anomali dan peristiwa keamanan siber"
              ],
              [
                "Penanggulangan",
                "Digital forensic, SOAR, tim tanggap insiden siber (CSIRT)",
                "Merespons, menganalisis, dan menanggulangi insiden siber"
              ],
              [
                "Pemulihan",
                "Sistem cadangan (backup) dan DRC",
                "Memulihkan layanan dan sistem setelah insiden"
              ]
            ]
          },
          {
            "t": "p",
            "v": "Sesuai peta jalan tersebut, kondisi keamanan siber baseline sektor pertahanan umumnya berada pada tingkat kematangan level 1 hingga level 2. Target yang ditetapkan adalah tercapainya tingkat kematangan keamanan siber level 3 (terdefinisi) pada tahun 2029, yaitu kondisi ketika penerapan keamanan siber telah terorganisir dan terdefinisi dengan jelas, bersifat formal, dilakukan secara berulang dan konsisten, serta ditinjau secara berkala."
          }
        ]
      },
      {
        "no": "5",
        "title": "Analisis Kesenjangan Teknologi",
        "blocks": [
          {
            "t": "p",
            "v": "Analisis kesenjangan membandingkan kondisi arsitektur teknologi baseline dengan target untuk mengidentifikasi kesenjangan yang harus ditutup beserta tindak lanjutnya, sebagaimana disajikan pada tabel berikut."
          },
          {
            "t": "table",
            "title": "Analisis Kesenjangan Arsitektur Teknologi",
            "header": [
              "No.",
              "Aspek",
              "Baseline (As-Is)",
              "Target (To-Be)",
              "Kesenjangan dan Tindak Lanjut"
            ],
            "rows": [
              [
                "1",
                "Ketersediaan",
                "Satu Data Center (single point of failure)",
                "Data Center Utama dan DRC dalam konfigurasi aktif-aktif dengan replikasi",
                "Pembangunan DRC dan mekanisme replikasi aktif-aktif"
              ],
              [
                "2",
                "Komputasi",
                "Server fisik",
                "Server, virtualisasi, dan kontainer (container)",
                "Penerapan virtualisasi dan kontainerisasi"
              ],
              [
                "3",
                "Penyimpanan",
                "Storage operasional",
                "Penyimpanan utama dan cadangan (backup) redundan",
                "Penyediaan redundansi dan cadangan data"
              ],
              [
                "4",
                "Jaringan",
                "Belum tersegmentasi dan belum lintas matra",
                "Jaringan tersegmentasi, terenkripsi, dan lintas matra",
                "Penataan dan pengamanan jaringan"
              ],
              [
                "5",
                "Integrasi & Platform",
                "Belum ada lapisan platform integrasi",
                "Lapisan integrasi (API Gateway, SSO/IAM, Data Exchange) dan Portal Satu Data Pertahanan",
                "Pembangunan lapisan integrasi dan platform"
              ],
              [
                "6",
                "Keamanan (Security)",
                "Parsial (kematangan level 1-2)",
                "Menyeluruh (kematangan level 3)",
                "Penerapan komponen keamanan per domain"
              ]
            ]
          }
        ]
      },
      {
        "no": "6",
        "title": "Roadmap Implementasi Teknologi",
        "blocks": [
          {
            "t": "fig",
            "src": figTechRoadmap,
            "cap": "Roadmap Implementasi Fase Technology Architecture"
          },
          {
            "t": "p",
            "v": "Kesenjangan pada analisis kesenjangan teknologi diterjemahkan menjadi roadmap implementasi teknologi yang dibagi ke dalam tiga horizon waktu, sebagaimana disajikan pada gambar dan tabel berikut."
          },
          {
            "t": "table",
            "title": "Roadmap Implementasi Arsitektur Teknologi",
            "header": [
              "Horizon Waktu",
              "Inisiatif",
              "Keluaran"
            ],
            "rows": [
              [
                "Jangka Pendek (0–12 bulan)",
                "Pembangunan DRC dan mekanisme cadangan (backup) serta replikasi; penguatan keamanan dasar (firewall, endpoint protection, IDPS); penilaian kerentanan (VAPT)",
                "Redundansi dasar dan pengamanan dasar"
              ],
              [
                "Jangka Menengah (1–3 tahun)",
                "Penerapan virtualisasi dan kontainer; pembangunan lapisan integrasi (API Gateway, SSO/IAM, Data Exchange), Portal Satu Data Pertahanan, dan lapisan penyajian; penataan jaringan tersegmentasi; penguatan deteksi (CTI, SIEM) dan SOAR",
                "Platform integrasi dan kapabilitas pendeteksian kerentanan"
              ],
              [
                "Jangka Panjang (3–5 tahun)",
                "Interoperabilitas lintas matra penuh dan integrasi JAD; otomasi keamanan; pencapaian tingkat kematangan level 3 berdasarkan Permenhan Nomor 35 Tahun 2025; operasionalisasi Data Center Utama dan DRC dalam mode aktif-aktif",
                "Infrastruktur teknologi terintegrasi, aman, dan andal"
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "c5isr-architecture",
    "title": "Fase C5ISR Architecture",
    "intro": [
      "Fase C5ISR Architecture merancang kapabilitas komando, kendali, komunikasi, komputer, siber, intelijen, surveilans, dan pengintaian (C5ISR) sebagai inti operasional pertahanan cerdas. Fase ini menyatukan arsitektur data, aplikasi, dan teknologi untuk mendukung komando dan kendali lintas domain (multi-domain). Gambaran arsitektur C5ISR pertahanan disajikan pada gambar berikut."
    ],
    "sections": [
      {
        "no": "",
        "title": "Arsitektur C5ISR",
        "blocks": [
          {
            "t": "fig",
            "src": figC5Satelit,
            "cap": "Arsitektur C5ISR Pertahanan"
          },
          {
            "t": "p",
            "v": "Uraian lengkap fase C5ISR sedang dilengkapi dan akan ditambahkan menyusul."
          }
        ]
      }
    ]
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
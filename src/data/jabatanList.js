/**
 * Jabatan (Department) Master Data
 * This file contains the list of departments in the organization.
 * Each department has contact information and status.
 * 
 * Field Descriptions:
 * - id: Unique identifier (auto-increment)
 * - code: Department code format: JAB/XXX
 * - name: Department full name
 * - pegawai: Person in charge with honorifics
 * - email: Department email (format: [department]@mdg.gov.my)
 * - telefon: Contact number (format: XX-XXXX XXXX)
 * - aktif: Active status (true/false)
 * - status: Detailed status description
 * - description: Brief department description
 * - lokasi: Department location/branch
 * - createdAt: Record creation date (ISO format)
 * - updatedAt: Record last update date (ISO format)
 */

export const jabatanList = [
  {
    id: 1,
    code: 'JAB/001',
    name: 'Jabatan Pentadbiran',
    pegawai: 'Encik Ahmad bin Ismail',
    email: 'pentadbiran@mdg.gov.my',
    telefon: '03-8888 0001',
    aktif: true,
    status: 'Aktif',
    description: 'Menguruskan hal-hal pentadbiran dan operasi harian',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 2,
    code: 'JAB/002',
    name: 'Jabatan Kewangan',
    pegawai: 'Puan Siti Nurhaliza binti Yusof',
    email: 'kewangan@mdg.gov.my',
    telefon: '03-8888 0002',
    aktif: true,
    status: 'Aktif',
    description: 'Pengurusan kewangan, belanjawan dan perakaunan',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 3,
    code: 'JAB/003',
    name: 'Jabatan Sumber Manusia',
    pegawai: 'Encik Raju a/l Subramaniam',
    email: 'sumbermanusia@mdg.gov.my',
    telefon: '03-8888 0003',
    aktif: true,
    status: 'Aktif',
    description: 'Pengurusan sumber manusia dan pembangunan staf',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 4,
    code: 'JAB/004',
    name: 'Jabatan ICT',
    pegawai: 'Encik Lim Wei Chong',
    email: 'ict@mdg.gov.my',
    telefon: '03-8888 0004',
    aktif: true,
    status: 'Aktif',
    description: 'Teknologi maklumat dan komunikasi',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 5,
    code: 'JAB/005',
    name: 'Jabatan Latihan',
    pegawai: 'Puan Noraini binti Mohamed',
    email: 'latihan@mdg.gov.my',
    telefon: '03-8888 0005',
    aktif: true,
    status: 'Aktif',
    description: 'Program latihan dan pembangunan kemahiran',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 6,
    code: 'JAB/006',
    name: 'Jabatan Pembangunan',
    pegawai: 'Encik Mohd Firdaus bin Abdullah',
    email: 'pembangunan@mdg.gov.my',
    telefon: '03-8888 0006',
    aktif: true,
    status: 'Aktif',
    description: 'Pembangunan infrastruktur dan projek',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 7,
    code: 'JAB/007',
    name: 'Jabatan Audit',
    pegawai: 'Puan Sarah binti Tan',
    email: 'audit@mdg.gov.my',
    telefon: '03-8888 0007',
    aktif: true,
    status: 'Aktif',
    description: 'Audit dalaman dan pematuhan',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 8,
    code: 'JAB/008',
    name: 'Jabatan Perancangan',
    pegawai: 'Encik Kamal bin Hassan',
    email: 'perancangan@mdg.gov.my',
    telefon: '03-8888 0008',
    aktif: true,
    status: 'Aktif',
    description: 'Perancangan strategik dan dasar',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 9,
    code: 'JAB/009',
    name: 'Jabatan Komunikasi',
    pegawai: 'Puan Aishah binti Omar',
    email: 'komunikasi@mdg.gov.my',
    telefon: '03-8888 0009',
    aktif: true,
    status: 'Aktif',
    description: 'Komunikasi korporat dan hubungan media',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 10,
    code: 'JAB/010',
    name: 'Jabatan Hal Ehwal Antarabangsa',
    pegawai: 'Encik David Wong',
    email: 'antarabangsa@mdg.gov.my',
    telefon: '03-8888 0010',
    aktif: true,
    status: 'Aktif',
    description: 'Hubungan dan kerjasama antarabangsa',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 11,
    code: 'JAB/011',
    name: 'Jabatan Penyelidikan',
    pegawai: 'Dr. Aminah binti Yaakub',
    email: 'penyelidikan@mdg.gov.my',
    telefon: '03-8888 0011',
    aktif: true,
    status: 'Aktif',
    description: 'Penyelidikan dan pembangunan',
    lokasi: 'Pusat Penyelidikan',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 12,
    code: 'JAB/012',
    name: 'Jabatan Perhubungan Awam',
    pegawai: 'Encik Ravi a/l Krishnan',
    email: 'perhubungan@mdg.gov.my',
    telefon: '03-8888 0012',
    aktif: true,
    status: 'Aktif',
    description: 'Perhubungan awam dan kemasyarakatan',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 13,
    code: 'JAB/013',
    name: 'Jabatan Kualiti',
    pegawai: 'Puan Chan Mei Ling',
    email: 'kualiti@mdg.gov.my',
    telefon: '03-8888 0013',
    aktif: true,
    status: 'Aktif',
    description: 'Jaminan kualiti dan peningkatan berterusan',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 14,
    code: 'JAB/014',
    name: 'Jabatan Perundangan',
    pegawai: 'Tuan Haji Zainal bin Abidin',
    email: 'perundangan@mdg.gov.my',
    telefon: '03-8888 0014',
    aktif: true,
    status: 'Aktif',
    description: 'Hal ehwal undang-undang dan peraturan',
    lokasi: 'Ibu Pejabat',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  }
];

/**
 * Helper function to get active departments only
 * @returns {Array} List of active departments
 */
export const getActiveJabatan = () => {
  return jabatanList.filter(jabatan => jabatan.aktif === true);
};

/**
 * Helper function to find department by code
 * @param {string} code - Department code (e.g., 'JAB/001')
 * @returns {Object|null} Department object or null if not found
 */
export const findJabatanByCode = (code) => {
  return jabatanList.find(jabatan => jabatan.code === code) || null;
};

/**
 * Helper function to get departments by location
 * @param {string} location - Location name
 * @returns {Array} List of departments in specified location
 */
export const getJabatanByLocation = (location) => {
  return jabatanList.filter(jabatan => jabatan.lokasi === location);
};

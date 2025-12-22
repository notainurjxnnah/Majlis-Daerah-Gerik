// Application constants
export const APP_CONSTANTS = {
  // Status constants
  STATUS: {
    BELUM_DIMINIT: 'belum_diminit',
    DALAM_TINDAKAN: 'dalam_tindakan',
    SELESAI: 'selesai',
    URGENT: 'urgent',
    LEWAT: 'lewatt',
    DRAF: 'draf',
    AKAN_DATANG: 'akan_datang',
    BERLANGSUNG: 'berlangsung',
    DIBATALKAN: 'dibatalkan',
    DALAM_PROses: 'dalam_proses',
    DIHANTAR: 'dihantar',
    BATAL: 'batal'
  },
  
  // Priority constants
  PRIORITY: {
    SANGAT_URGENT: 'sangat_urgent',
    SEGERA: 'segera',
    BIASA: 'biasa'
  },
  
  // Items per page options
  ITEMS_PER_PAGE: [10, 25, 50, 100],
  
  // Date formats
  DATE_FORMAT: 'DD/MM/YYYY',
  DATE_TIME_FORMAT: 'DD/MM/YYYY HH:mm',
  
  // Storage keys
  STORAGE_KEYS: {
    LATIHAN_STATS: 'latihanStats',
    RECENT_LATIHAN: 'recentLatihan',
    JABATAN_STATS: 'jabatanStats',
    RECENT_SURAT: 'recentSurat',
    SETTINGS: 'systemSettings',
    USER_PREFERENCES: 'userPreferences'
  }
};

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Ruangan ini diperlukan',
  INVALID_EMAIL: 'Emel tidak sah',
  MIN_LENGTH: (min) => `Mesti sekurang-kurangnya ${min} aksara`,
  MAX_LENGTH: (max) => `Tidak boleh melebihi ${max} aksara`,
  PASSWORD_MISMATCH: 'Kata laluan tidak sepadan'
};

// API endpoints (example)
export const API_ENDPOINTS = {
  SURAT: '/api/surat',
  LATIHAN: '/api/latihan',
  JABATAN: '/api/jabatan',
  USERS: '/api/users'
};

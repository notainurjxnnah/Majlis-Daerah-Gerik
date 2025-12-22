// Shared status configuration for all components
export const STATUS_CONFIG = {
  // Surat statuses
  'belum_diminit': { 
    label: 'Belum Diminit', 
    className: 'badge-belong-diminit',
    color: 'blue' 
  },
  'dalam_tindakan': { 
    label: 'Dalam Tindakan', 
    className: 'badge-dalam-tindakan',
    color: 'yellow' 
  },
  'selesai': { 
    label: 'Selesai', 
    className: 'badge-selesai',
    color: 'green' 
  },
  'urgent': { 
    label: 'Urgent', 
    className: 'badge-urgent',
    color: 'red' 
  },
  'lewatt': { 
    label: 'Lewat', 
    className: 'badge-urgent',
    color: 'red' 
  },
  'draf': { 
    label: 'Draf', 
    className: 'bg-gray-100 text-gray-800',
    color: 'gray' 
  },
  
  // Latihan statuses
  'akan_datang': { 
    label: 'Akan Datang', 
    className: 'bg-blue-100 text-blue-800',
    color: 'blue' 
  },
  'berlangsung': { 
    label: 'Berlangsung', 
    className: 'bg-green-100 text-green-800',
    color: 'green' 
  },
  'dibatalkan': { 
    label: 'Dibatalkan', 
    className: 'bg-red-100 text-red-800',
    color: 'red' 
  },
  
  // Surat keluar statuses
  'dalam_proses': { 
    label: 'Dalam Proses', 
    className: 'bg-yellow-100 text-yellow-800',
    color: 'yellow' 
  },
  'dihantar': { 
    label: 'Dihantar', 
    className: 'bg-green-100 text-green-800',
    color: 'green' 
  },
  'batal': { 
    label: 'Batal', 
    className: 'bg-red-100 text-red-800',
    color: 'red' 
  }
};

export const KEUTAMAAN_CONFIG = {
  'sangat_urgent': { label: 'Sangat Urgent', className: 'badge-urgent' },
  'segera': { label: 'Segera', className: 'bg-yellow-100 text-yellow-800' },
  'biasa': { label: 'Biasa', className: 'bg-gray-100 text-gray-800' }
};

export const getStatusBadge = (status) => {
  const config = STATUS_CONFIG[status] || { 
    label: status, 
    className: 'bg-gray-100 text-gray-800' 
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

export const getPriorityBadge = (priority) => {
  const config = KEUTAMAAN_CONFIG[priority] || { 
    label: priority, 
    className: 'bg-gray-100 text-gray-800' 
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

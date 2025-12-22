import React, { useState, useEffect, useCallback } from 'react';
import CardBox from '../../components/CardBox';
import { 
  FiBook, 
  FiUsers, 
  FiCalendar, 
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiTrendingUp
} from 'react-icons/fi';
import { useToast } from '../../utils/toast';
import { getStatusBadge } from '../../utils/statusConfig';
import { formatDate } from '../../utils/format';
import { APP_CONSTANTS } from '../../utils/constants';
import LoadingSpinner from '../../components/LoadingSpinner';

const LatihanDashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalLatihan: 0,
    sedangBerlangsung: 0,
    akanDatang: 0,
    selesai: 0
  });
  const [recentLatihan, setRecentLatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load from localStorage for demo
      const savedStats = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.LATIHAN_STATS);
      const savedLatihan = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.RECENT_LATIHAN);
      
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      
      if (savedLatihan) {
        setRecentLatihan(JSON.parse(savedLatihan));
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Gagal memuatkan data. Sila cuba lagi.');
      showToast('Gagal memuatkan data latihan', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddLatihan = () => {
    showToast('Fungsi tambah latihan akan dibuka', 'info');
  };

  const handleUrusPeserta = () => {
    showToast('Fungsi urus peserta akan dibuka', 'info');
  };

  const handleJadualLatihan = () => {
    showToast('Fungsi jadual latihan akan dibuka', 'info');
  };

  const handleLaporanPrestasi = () => {
    showToast('Fungsi laporan prestasi akan dibuka', 'info');
  };

  if (loading) {
    return <LoadingSpinner message="Memuatkan dashboard latihan..." />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <FiBook className="text-red-600" size={24} />
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Cuba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, Latihan</h1>
        <p className="text-gray-600">Dashboard untuk mengurus modul latihan</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jumlah Latihan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLatihan}</p>
              <p className="text-xs text-gray-500 mt-1">Semua modul</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FiBook className="text-blue-600" size={24} />
            </div>
          </div>
        </CardBox>

        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sedang Berlangsung</p>
              <p className="text-2xl font-bold text-green-600">{stats.sedangBerlangsung}</p>
              <p className="text-xs text-gray-500 mt-1">Aktif sekarang</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FiClock className="text-green-600" size={24} />
            </div>
          </div>
        </CardBox>

        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Akan Datang</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.akanDatang}</p>
              <p className="text-xs text-gray-500 mt-1">Dalam perancangan</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <FiCalendar className="text-yellow-600" size={24} />
            </div>
          </div>
        </CardBox>

        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Selesai</p>
              <p className="text-2xl font-bold text-purple-600">{stats.selesai}</p>
              <p className="text-xs text-gray-500 mt-1">Telah tamat</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FiCheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
        </CardBox>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <CardBox title="Tindakan Pantas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleAddLatihan}
                className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Tambah Latihan"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FiBook className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Tambah Latihan</h4>
                    <p className="text-sm text-gray-600">Daftar modul latihan baru</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={handleUrusPeserta}
                className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Urus Peserta"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FiUsers className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Urus Peserta</h4>
                    <p className="text-sm text-gray-600">Senarai dan pengesahan</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={handleJadualLatihan}
                className="p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Jadual Latihan"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <FiCalendar className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Jadual Latihan</h4>
                    <p className="text-sm text-gray-600">Lihat kalendar latihan</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={handleLaporanPrestasi}
                className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Laporan Prestasi"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FiTrendingUp className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Laporan Prestasi</h4>
                    <p className="text-sm text-gray-600">Analisis prestasi peserta</p>
                  </div>
                </div>
              </button>
            </div>
          </CardBox>

          {/* Recent Latihan */}
          <CardBox title="Latihan Terkini">
            {recentLatihan.length > 0 ? (
              <div className="space-y-4" role="list">
                {recentLatihan.map((latihan, index) => (
                  <div 
                    key={`latihan-${latihan.id || index}`} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-blue-500"
                    role="listitem"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiBook className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{latihan.nama}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-600">
                            <FiCalendar className="inline mr-1" size={12} />
                            {formatDate(latihan.tarikhMula)} - {formatDate(latihan.tarikhTamat)}
                          </span>
                          <span className="text-sm text-gray-600" aria-hidden="true">•</span>
                          <span className="text-sm text-gray-600">
                            <FiUsers className="inline mr-1" size={12} />
                            {latihan.peserta} peserta
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(latihan.status)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiBook className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-600">Tiada latihan terkini</p>
                <p className="text-sm text-gray-500 mt-1">Latihan akan dipaparkan di sini</p>
              </div>
            )}
          </CardBox>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Latihan */}
          <CardBox title="Latihan Akan Datang">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-blue-600" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-900">Tiada Latihan Akan Datang</h4>
                    <p className="text-sm text-blue-700 mt-1">Semua latihan telah selesai atau sedang berlangsung</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiClock className="text-green-600" size={20} />
                  <div>
                    <h4 className="font-medium text-green-900">Status Latihan</h4>
                    <p className="text-sm text-green-700 mt-1">Tiada latihan yang memerlukan perhatian segera</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBox>

          {/* Latihan Stats */}
          <CardBox title="Statistik Latihan">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Jumlah Peserta</span>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Purata Kehadiran</span>
                <span className="text-sm font-medium text-gray-900">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Kadar Penyertaan</span>
                <span className="text-sm font-medium text-gray-900">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Penilaian Peserta</span>
                <span className="text-sm font-medium text-gray-900">-</span>
              </div>
            </div>
          </CardBox>

          {/* Quick Info */}
          <CardBox title="Maklumat Pantas">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gray-400" />
                <span className="text-sm text-gray-600">Lokasi Terbanyak</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">-</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-gray-400" />
                <span className="text-sm text-gray-600">Fasilitator Aktif</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">0</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <span className="text-sm text-gray-600">Latihan Bulan Ini</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">0</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="text-gray-400" />
                <span className="text-sm text-gray-600">Trend Penyertaan</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">Stabil</span>
              </div>
            </div>
          </CardBox>
        </div>
      </div>

      {/* Getting Started Guide */}
      <CardBox title="Panduan Pengurusan Latihan">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FiBook className="text-blue-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Daftar Latihan</h4>
            <p className="text-sm text-gray-600">
              Tambah modul latihan baru dengan maklumat lengkap.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <FiUsers className="text-green-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Urus Peserta</h4>
            <p className="text-sm text-gray-600">
              Daftar peserta dan urus kehadiran latihan.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <FiCalendar className="text-yellow-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Jadual Latihan</h4>
            <p className="text-sm text-gray-600">
              Lihat dan urus jadual latihan dalam kalendar.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <FiTrendingUp className="text-purple-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Analisis & Laporan</h4>
            <p className="text-sm text-gray-600">
              Hasilkan laporan prestasi dan analisis latihan.
            </p>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default LatihanDashboard;

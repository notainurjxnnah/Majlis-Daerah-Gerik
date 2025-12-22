import React, { useState, useCallback } from 'react';
import CardBox from '../../components/CardBox';
import Table from '../../components/Table';
import { FiEdit, FiSave, FiFileText, FiClock, FiSend, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../utils/toast';
import { getStatusBadge } from '../../utils/statusConfig';
import { formatDate } from '../../utils/format';
import LoadingSpinner from '../../components/LoadingSpinner';
import { APP_CONSTANTS } from '../../utils/constants';

const MinitSurat = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [suratData, setSuratData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(APP_CONSTANTS.ITEMS_PER_PAGE[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSurat, setActiveSurat] = useState(null);
  const [minitContent, setMinitContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data for demo
  const mockSurat = [
    {
      id: 1,
      noSurat: 'MDG/001/2024',
      tajuk: 'Permohonan Peruntukan Tahunan',
      dari: 'Jabatan Kewangan',
      tarikhTerima: '2024-01-15',
      status: APP_CONSTANTS.STATUS.BELUM_DIMINIT,
      keutamaan: APP_CONSTANTS.PRIORITY.BIASA
    },
    {
      id: 2,
      noSurat: 'MDG/002/2024',
      tajuk: 'Laporan Bulanan Prestasi',
      dari: 'Jabatan Sumber Manusia',
      tarikhTerima: '2024-01-14',
      status: APP_CONSTANTS.STATUS.BELUM_DIMINIT,
      keutamaan: APP_CONSTANTS.PRIORITY.SEGERA
    }
  ];

  React.useEffect(() => {
    // Initialize with mock data for demo
    setSuratData(mockSurat);
  }, []);

  const columns = [
    {
      header: 'No. Surat',
      accessor: 'noSurat',
      width: '140px'
    },
    {
      header: 'Tajuk Surat',
      accessor: 'tajuk',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.tajuk}</div>
          <div className="text-sm text-gray-500">Dari: {row.dari}</div>
        </div>
      )
    },
    {
      header: 'Tarikh',
      accessor: 'tarikhTerima',
      width: '120px',
      cell: (row) => (
        <div>
          <div className="text-sm">{formatDate(row.tarikhTerima)}</div>
          <div className="text-xs text-gray-500">Terima</div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '140px',
      cell: (row) => getStatusBadge(row.status)
    },
    {
      header: 'Tindakan',
      width: '120px',
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleEditMinit(row)}
            className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            title="Tulis Minit"
            aria-label={`Tulis minit untuk surat ${row.noSurat}`}
          >
            <FiEdit size={18} />
          </button>
        </div>
      )
    }
  ];

  const handleEditMinit = (surat) => {
    setActiveSurat(surat);
    setMinitContent(surat.minit || '');
  };

  const handleSaveMinit = useCallback(async () => {
    if (!activeSurat || !minitContent.trim()) {
      showToast('Sila tulis minit untuk surat ini', 'warning');
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update surat with minit
      setSuratData(prev => prev.map(s => 
        s.id === activeSurat.id 
          ? { ...s, minit: minitContent, status: APP_CONSTANTS.STATUS.DALAM_TINDAKAN }
          : s
      ));

      showToast('Minit berjaya disimpan', 'success');
      setActiveSurat(null);
      setMinitContent('');
      
    } catch (error) {
      console.error('Error saving minit:', error);
      showToast('Gagal menyimpan minit', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeSurat, minitContent, showToast]);

  const handleSendToJabatan = () => {
    if (activeSurat && minitContent.trim()) {
      navigate('/setiausaha/hantar-ke-jabatan', {
        state: { surat: activeSurat, minit: minitContent }
      });
      showToast('Surat sedang dihantar ke jabatan', 'info');
    } else {
      showToast('Sila simpan minit terlebih dahulu sebelum menghantar', 'warning');
    }
  };

  const handleSelectRow = (row) => {
    setSelectedRows(prev => {
      if (prev.includes(row.id)) {
        return prev.filter(id => id !== row.id);
      } else {
        return [...prev, row.id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === suratData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(suratData.map(row => row.id));
    }
  };

  const filteredSurat = suratData.filter(surat =>
    surat.noSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surat.tajuk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surat.dari.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Menyimpan minit..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minit Surat</h1>
          <p className="text-gray-600">Tulis dan urus minit untuk surat</p>
        </div>
        
        <div className="flex gap-3">
          {activeSurat && (
            <button 
              onClick={handleSendToJabatan}
              className="btn btn-primary"
              aria-label="Hantar minit ke jabatan"
            >
              <FiSend /> Hantar ke Jabatan
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Surat List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <CardBox>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Cari surat untuk diminit..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Cari surat"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="form-select" aria-label="Filter status">
                  <option value="">Semua Status</option>
                  <option value={APP_CONSTANTS.STATUS.BELUM_DIMINIT}>Belum Diminit</option>
                  <option value={APP_CONSTANTS.STATUS.DALAM_TINDAKAN}>Dalam Tindakan</option>
                </select>
              </div>
            </div>
          </CardBox>

          {/* Surat List */}
          <CardBox title="Senarai Surat untuk Diminit">
            {filteredSurat.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiFileText className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-600">Tiada surat ditemui</p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm ? 'Cubalah carian lain' : 'Semua surat telah diminit'}
                </p>
              </div>
            ) : (
              <Table
                columns={columns}
                data={filteredSurat}
                selectable
                selectedRows={selectedRows}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
                pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredSurat.length / itemsPerPage)}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                emptyMessage="Tiada surat ditemui"
                aria-label="Senarai surat untuk diminit"
              />
            )}
          </CardBox>
        </div>

        {/* Right Column - Minit Editor */}
        <div className="space-y-6">
          {/* Minit Editor */}
          <CardBox 
            title={activeSurat ? `Minit untuk ${activeSurat.noSurat}` : 'Editor Minit'}
            subtitle={activeSurat ? activeSurat.tajuk : 'Pilih surat untuk tulis minit'}
          >
            {activeSurat ? (
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="minit-content">Kandungan Minit</label>
                  <textarea
                    id="minit-content"
                    className="form-input min-h-[300px]"
                    placeholder="Sila tulis minit untuk surat ini..."
                    value={minitContent}
                    onChange={(e) => setMinitContent(e.target.value)}
                    aria-label="Kandungan minit"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Template Minit</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setMinitContent(prev => prev + 'Sila tindakan perkara ini dengan segera.')}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="button"
                      aria-label="Tambah template tindakan segera"
                    >
                      Tindakan Segera
                    </button>
                    <button 
                      onClick={() => setMinitContent(prev => prev + 'Sila semak dan berikan maklumbalas.')}
                      className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      type="button"
                      aria-label="Tambah template semak dan maklumbalas"
                    >
                      Semak & Maklumbalas
                    </button>
                    <button 
                      onClick={() => setMinitContent(prev => prev + 'Untuk makluman dan tindakan pihak berkenaan.')}
                      className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      type="button"
                      aria-label="Tambah template makluman"
                    >
                      Makluman
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => {
                      setActiveSurat(null);
                      setMinitContent('');
                    }}
                    className="flex-1 btn btn-outline"
                    type="button"
                    aria-label="Batal edit minit"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleSaveMinit}
                    className="flex-1 btn btn-primary"
                    type="button"
                    disabled={loading}
                    aria-label="Simpan minit"
                  >
                    <FiSave /> {loading ? 'Menyimpan...' : 'Simpan Minit'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiEdit className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-600">Pilih surat untuk tulis minit</p>
                <p className="text-sm text-gray-500 mt-1">
                  Klik ikon edit pada senarai surat untuk mula menulis minit
                </p>
              </div>
            )}
          </CardBox>

          {/* Quick Info */}
          {activeSurat && (
            <CardBox title="Maklumat Surat">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">No. Surat</span>
                  <span className="text-sm font-medium text-gray-900">{activeSurat.noSurat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dari</span>
                  <span className="text-sm font-medium text-gray-900">{activeSurat.dari}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tarikh</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(activeSurat.tarikhTerima)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-gray-900">
                    {activeSurat.status === APP_CONSTANTS.STATUS.BELUM_DIMINIT ? 'Belum Diminit' : 'Dalam Tindakan'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Keutamaan</span>
                  <span className="text-sm font-medium text-gray-900">{activeSurat.keutamaan}</span>
                </div>
              </div>
            </CardBox>
          )}

          {/* Quick Actions */}
          <CardBox title="Tindakan Pantas">
            <div className="space-y-3">
              <button className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FiFileText className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Template Minit</h4>
                    <p className="text-sm text-gray-600">Pilih template minit</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-green-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FiClock className="text-green-600" size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Tetapkan Tarikh</h4>
                    <p className="text-sm text-gray-600">Tarikh tindakan dikehendaki</p>
                  </div>
                </div>
              </button>
            </div>
          </CardBox>
        </div>
      </div>

      {/* Minit Guidelines */}
      <CardBox title="Panduan Penulisan Minit">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FiFileText className="text-blue-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Lengkap dan Jelas</h4>
            <p className="text-sm text-gray-600">
              Tulis minit yang lengkap dan jelas untuk memudahkan tindakan.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <FiClock className="text-green-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Tetapkan Tarikh</h4>
            <p className="text-sm text-gray-600">
              Nyatakan tarikh tindakan dikehendaki untuk setiap surat.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <FiEdit className="text-yellow-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Gunakan Template</h4>
            <p className="text-sm text-gray-600">
              Gunakan template untuk konsistensi dalam penulisan minit.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <FiSend className="text-purple-600" size={24} />
            </div>
            <h4 className="font-semibold text-gray-900">Hantar Tepat Masa</h4>
            <p className="text-sm text-gray-600">
              Pastikan minit dihantar kepada jabatan dengan segera.
            </p>
          </div>
        </div>
      </CardBox>

      {/* Recent Minits (Placeholder) */}
      <CardBox title="Minit Terkini">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <FiFileText className="text-gray-400" size={24} />
          </div>
          <p className="text-gray-600">Belum ada minit terkini</p>
          <p className="text-sm text-gray-500 mt-1">Minit yang ditulis akan dipaparkan di sini</p>
        </div>
      </CardBox>
    </div>
  );
};

export default MinitSurat;

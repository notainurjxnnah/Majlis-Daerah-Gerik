// ===== DATA MANAGEMENT SYSTEM =====

class DataManager {
    
    static init() {
        this.ensureDataStructure();
        this.setupDataSync();
    }
    
    static ensureDataStructure() {
        // Initialize suratList if not exists
        if (!localStorage.getItem('suratList')) {
            localStorage.setItem('suratList', JSON.stringify([]));
        }
        
        // Initialize cukaiData if not exists
        if (!localStorage.getItem('cukaiData')) {
            localStorage.setItem('cukaiData', JSON.stringify([]));
        }
        
        // Initialize jabatan mapping if not exists
        if (!localStorage.getItem('jabatanMapping')) {
            const mapping = {};
            this.senaraiJabatan.forEach(jabatan => {
                mapping[jabatan] = {
                    kod: jabatan.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                    namaPenuh: jabatan,
                    stafCount: Math.floor(Math.random() * 10) + 5,
                    lastActive: new Date().toISOString()
                };
            });
            localStorage.setItem('jabatanMapping', JSON.stringify(mapping));
        }
        
        // Initialize system settings if not exists
        if (!localStorage.getItem('systemSettings')) {
            const settings = {
                theme: 'light',
                language: 'ms',
                notifications: true,
                autoSave: true,
                exportFormat: 'csv',
                itemsPerPage: 20,
                chartColors: ['#1F6AE1', '#FACC15', '#28A745', '#DC3545', '#6F42C1', '#17A2B8'],
                lastBackup: null
            };
            localStorage.setItem('systemSettings', JSON.stringify(settings));
        }
    }
    
    static setupDataSync() {
        // Auto-save every 30 seconds
        setInterval(() => {
            if (this.shouldAutoSave()) {
                this.autoSave();
            }
        }, 30000);
        
        // Backup data on page unload
        window.addEventListener('beforeunload', () => {
            this.createBackup();
        });
    }
    
    // ===== SURAT MANAGEMENT =====
    static getSuratList(filter = {}) {
        let suratList = JSON.parse(localStorage.getItem('suratList')) || [];
        
        // Apply filters
        if (filter.type) {
            suratList = suratList.filter(s => s.type === filter.type);
        }
        
        if (filter.jabatan) {
            suratList = suratList.filter(s => 
                s.jabatan_tujuan && s.jabatan_tujuan.includes(filter.jabatan)
            );
        }
        
        if (filter.status) {
            suratList = suratList.filter(s => s.status === filter.status);
        }
        
        if (filter.search) {
            const searchTerm = filter.search.toLowerCase();
            suratList = suratList.filter(s => 
                s.rujukan.toLowerCase().includes(searchTerm) ||
                s.tajuk.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filter.dateFrom) {
            suratList = suratList.filter(s => s.tarikh >= filter.dateFrom);
        }
        
        if (filter.dateTo) {
            suratList = suratList.filter(s => s.tarikh <= filter.dateTo);
        }
        
        // Sort by date (newest first)
        suratList.sort((a, b) => new Date(b.tarikh) - new Date(a.tarikh));
        
        return suratList;
    }
    
    static addSurat(suratData) {
        const suratList = this.getSuratList();
        
        // Generate unique ID
        const id = 'SUR' + Date.now() + Math.random().toString(36).substr(2, 9);
        
        const newSurat = {
            id,
            ...suratData,
            createdAt: new Date().toISOString(),
            createdBy: localStorage.getItem('username'),
            updatedAt: new Date().toISOString(),
            updatedBy: localStorage.getItem('username'),
            version: 1
        };
        
        suratList.unshift(newSurat);
        this.saveSuratList(suratList);
        
        // Log activity
        this.logDataChange('add_surat', newSurat);
        
        return newSurat;
    }
    
    static updateSurat(id, updates) {
        const suratList = this.getSuratList();
        const index = suratList.findIndex(s => s.id === id);
        
        if (index === -1) {
            SystemUtils.showToast('Surat tidak ditemui', 'error');
            return null;
        }
        
        const oldSurat = { ...suratList[index] };
        suratList[index] = {
            ...oldSurat,
            ...updates,
            updatedAt: new Date().toISOString(),
            updatedBy: localStorage.getItem('username'),
            version: (oldSurat.version || 1) + 1
        };
        
        this.saveSuratList(suratList);
        
        // Log activity
        this.logDataChange('update_surat', { id, old: oldSurat, new: suratList[index] });
        
        return suratList[index];
    }
    
    static deleteSurat(id) {
        const suratList = this.getSuratList();
        const index = suratList.findIndex(s => s.id === id);
        
        if (index === -1) {
            SystemUtils.showToast('Surat tidak ditemui', 'error');
            return false;
        }
        
        const deletedSurat = suratList.splice(index, 1)[0];
        this.saveSuratList(suratList);
        
        // Log activity
        this.logDataChange('delete_surat', deletedSurat);
        
        // Move to trash
        this.addToTrash(deletedSurat, 'surat');
        
        return true;
    }
    
    static getSuratStats() {
        const suratList = this.getSuratList();
        
        const stats = {
            total: suratList.length,
            masuk: suratList.filter(s => s.type === 'masuk').length,
            keluar: suratList.filter(s => s.type === 'keluar').length,
            
            byStatus: {
                penting: suratList.filter(s => s.status === 'penting').length,
                tindakan: suratList.filter(s => s.status === 'tindakan').length,
                diminit: suratList.filter(s => s.status === 'diminit').length,
                selesai: suratList.filter(s => s.status === 'selesai').length
            },
            
            byMonth: this.getMonthlyStats(suratList),
            byJabatan: this.getJabatanStats(suratList),
            
            today: suratList.filter(s => {
                const today = new Date().toISOString().split('T')[0];
                return s.tarikh === today;
            }).length,
            
            thisWeek: suratList.filter(s => {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return new Date(s.tarikh) >= oneWeekAgo;
            }).length
        };
        
        return stats;
    }
    
    static getMonthlyStats(suratList) {
        const monthly = {};
        const currentYear = new Date().getFullYear();
        
        suratList.forEach(surat => {
            const date = new Date(surat.tarikh);
            if (date.getFullYear() === currentYear) {
                const month = date.getMonth() + 1;
                const key = `${currentYear}-${month.toString().padStart(2, '0')}`;
                
                if (!monthly[key]) {
                    monthly[key] = { masuk: 0, keluar: 0 };
                }
                
                monthly[key][surat.type]++;
            }
        });
        
        return monthly;
    }
    
    static getJabatanStats(suratList) {
        const jabatanStats = {};
        
        this.senaraiJabatan.forEach(jabatan => {
            jabatanStats[jabatan] = {
                total: 0,
                masuk: 0,
                keluar: 0,
                pending: 0,
                completed: 0
            };
        });
        
        suratList.forEach(surat => {
            if (surat.jabatan_tujuan) {
                surat.jabatan_tujuan.forEach(jabatan => {
                    if (jabatanStats[jabatan]) {
                        jabatanStats[jabatan].total++;
                        jabatanStats[jabatan][surat.type]++;
                        
                        if (surat.status === 'selesai') {
                            jabatanStats[jabatan].completed++;
                        } else {
                            jabatanStats[jabatan].pending++;
                        }
                    }
                });
            }
        });
        
        return jabatanStats;
    }
    
    // ===== CUKAI DATA MANAGEMENT =====
    static getCukaiData() {
        return JSON.parse(localStorage.getItem('cukaiData')) || [];
    }
    
    static addCukaiData(tahun, hasil) {
        const cukaiData = this.getCukaiData();
        
        // Check for duplicate year
        if (cukaiData.some(d => d.tahun == tahun)) {
            SystemUtils.showToast(`Data untuk tahun ${tahun} sudah wujud`, 'warning');
            return false;
        }
        
        const newData = {
            tahun: parseInt(tahun),
            hasil: parseFloat(hasil),
            createdAt: new Date().toISOString(),
            createdBy: localStorage.getItem('username')
        };
        
        cukaiData.push(newData);
        
        // Sort by year
        cukaiData.sort((a, b) => a.tahun - b.tahun);
        
        localStorage.setItem('cukaiData', JSON.stringify(cukaiData));
        
        // Log activity
        this.logDataChange('add_cukai', newData);
        
        return true;
    }
    
    static getCukaiStats() {
        const cukaiData = this.getCukaiData();
        
        if (cukaiData.length === 0) {
            return null;
        }
        
        const years = cukaiData.map(d => d.tahun);
        const amounts = cukaiData.map(d => d.hasil);
        
        const total = amounts.reduce((sum, amount) => sum + amount, 0);
        const average = total / cukaiData.length;
        const growth = cukaiData.length > 1 ? 
            ((amounts[amounts.length - 1] - amounts[0]) / amounts[0] * 100) : 0;
        
        // Predict next year
        const lastYear = cukaiData[cukaiData.length - 1];
        const predicted = lastYear ? lastYear.hasil * 1.05 : 0; // 5% growth assumption
        
        return {
            totalYears: cukaiData.length,
            latestYear: lastYear?.tahun,
            latestAmount: lastYear?.hasil,
            totalAmount: total,
            averageAmount: average,
            growthRate: growth,
            predictedNextYear: predicted,
            minAmount: Math.min(...amounts),
            maxAmount: Math.max(...amounts)
        };
    }
    
    static getCukaiForecast(yearsAhead = 5) {
        const cukaiData = this.getCukaiData();
        
        if (cukaiData.length < 2) {
            return [];
        }
        
        const forecast = [];
        const lastData = cukaiData[cukaiData.length - 1];
        
        // Simple linear regression for forecasting
        const n = cukaiData.length;
        const sumX = cukaiData.reduce((sum, d, i) => sum + i, 0);
        const sumY = cukaiData.reduce((sum, d) => sum + d.hasil, 0);
        const sumXY = cukaiData.reduce((sum, d, i) => sum + i * d.hasil, 0);
        const sumX2 = cukaiData.reduce((sum, d, i) => sum + i * i, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        for (let i = 1; i <= yearsAhead; i++) {
            const year = lastData.tahun + i;
            const predicted = intercept + slope * (cukaiData.length + i - 1);
            
            forecast.push({
                tahun: year,
                hasil: predicted,
                type: 'forecast',
                confidence: Math.max(0, 100 - i * 15) // Decrease confidence for further years
            });
        }
        
        return forecast;
    }
    
    // ===== JABATAN MANAGEMENT =====
    static getJabatanInfo(jabatanName) {
        const

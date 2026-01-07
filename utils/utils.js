// ===== SYSTEM UTILITIES =====

class SystemUtils {
    
    // ===== SESSION MANAGEMENT =====
    static getCurrentUser() {
        return {
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role'),
            loginTime: localStorage.getItem('loginTime')
        };
    }
    
    static setCurrentUser(username, role) {
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('loginTime', new Date().toISOString());
    }
    
    static clearSession() {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('loginTime');
    }
    
    static checkAuth() {
        const user = this.getCurrentUser();
        return !!(user.username && user.role);
    }
    
    static requireAuth(requiredRole = null) {
        if (!this.checkAuth()) {
            window.location.href = '../login.html';
            return false;
        }
        
        if (requiredRole) {
            const user = this.getCurrentUser();
            if (user.role !== requiredRole) {
                this.showToast('Akses dinafikan. Peranan tidak sesuai.', 'error');
                return false;
            }
        }
        
        return true;
    }
    
    // ===== NOTIFICATION SYSTEM =====
    static showToast(message, type = 'info', duration = 5000) {
        // Remove existing toast container if exists
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after duration
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, duration);
        
        return toast;
    }
    
    // ===== LOADING STATES =====
    static showLoading(container = document.body) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.id = 'global-loading';
        loadingDiv.innerHTML = `
            <div class="loading" style="width: 50px; height: 50px;"></div>
            <p style="margin-top: 1rem; color: var(--secondary-blue);">Memuatkan...</p>
        `;
        
        container.appendChild(loadingDiv);
        return loadingDiv;
    }
    
    static hideLoading() {
        const loading = document.getElementById('global-loading');
        if (loading) loading.remove();
    }
    
    // ===== FORM VALIDATION =====
    static validateForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return false;
        
        const inputs = form.querySelectorAll('[required]');
        let isValid = true;
        let firstInvalid = null;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
                
                if (!firstInvalid) firstInvalid = input;
                
                // Add error message
                let errorMsg = input.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = 'var(--status-penting)';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.style.marginTop = '0.25rem';
                    input.parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Sila isi ruangan ini';
            } else {
                input.classList.remove('invalid');
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        });
        
        if (firstInvalid) {
            firstInvalid.focus();
        }
        
        return isValid;
    }
    
    // ===== DATE & TIME UTILITIES =====
    static formatDate(date, format = 'DD/MM/YYYY') {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        
        return format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
    }
    
    static getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    static getTimeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffDays > 0) return `${diffDays} hari lepas`;
        if (diffHours > 0) return `${diffHours} jam lepas`;
        if (diffMins > 0) return `${diffMins} minit lepas`;
        return 'Baru sahaja';
    }
    
    // ===== DATA UTILITIES =====
    static saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Gagal menyimpan data:', e);
            this.showToast('Gagal menyimpan data. Storage penuh?', 'error');
            return false;
        }
    }
    
    static loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Gagal memuat data:', e);
            return null;
        }
    }
    
    static clearData(key) {
        localStorage.removeItem(key);
    }
    
    // ===== DEVICE DETECTION =====
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        };
    }
    
    // ===== NETWORK UTILITIES =====
    static async checkConnection() {
        if (!navigator.onLine) {
            return { online: false, type: 'offline' };
        }
        
        try {
            const response = await fetch('https://httpbin.org/get', { 
                method: 'HEAD',
                cache: 'no-cache',
                timeout: 5000 
            });
            
            return { 
                online: response.ok, 
                type: 'online',
                status: response.status 
            };
        } catch (error) {
            return { online: false, type: 'error', error: error.message };
        }
    }
    
    // ===== URL & ROUTING =====
    static getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });
        
        return params;
    }
    
    static updateQueryParams(params) {
        const url = new URL(window.location);
        Object.keys(params).forEach(key => {
            url.searchParams.set(key, params[key]);
        });
        window.history.pushState({}, '', url);
    }
    
    // ===== PERFORMANCE UTILITIES =====
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ===== EXPORT UTILITIES =====
    static exportToCSV(data, filename = 'data.csv') {
        if (!data || !data.length) {
            this.showToast('Tiada data untuk dieksport', 'warning');
            return;
        }
        
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => 
                    JSON.stringify(row[header])
                ).join(',')
            )
        ];
        
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = filename;
        a.click();
        
        window.URL.revokeObjectURL(url);
        this.showToast(`Data dieksport: ${filename}`, 'success');
    }
    
    static exportToJSON(data, filename = 'data.json') {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = filename;
        a.click();
        
        window.URL.revokeObjectURL(url);
        this.showToast(`Data dieksport: ${filename}`, 'success');
    }
    
    // ===== PRINT UTILITIES =====
    static printElement(elementId, title = 'Dokumen') {
        const element = document.getElementById(elementId);
        if (!element) {
            this.showToast('Elemen tidak ditemui', 'error');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        @media print {
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    ${element.innerHTML}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            };
                        };
                    <\/script>
                </body>
            </html>
        `);
        printWindow.document.close();
    }
}

// ===== GLOBAL EXPORT =====
window.SystemUtils = SystemUtils;

// ===== AUTO INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    // Add print button to all printable elements
    document.querySelectorAll('.printable').forEach(el => {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn btn-small';
        printBtn.innerHTML = '🖨️ Cetak';
        printBtn.onclick = () => SystemUtils.printElement(el.id);
        el.parentNode.insertBefore(printBtn, el);
    });
    
    // Add offline detection
    window.addEventListener('online', () => {
        SystemUtils.showToast('Sambungan internet dipulihkan', 'success');
    });
    
    window.addEventListener('offline', () => {
        SystemUtils.showToast('Anda sedang offline', 'warning');
    });
    
    // Auto logout after 60 minutes of inactivity
    let activityTimer;
    function resetActivityTimer() {
        clearTimeout(activityTimer);
        activityTimer = setTimeout(() => {
            if (SystemUtils.checkAuth()) {
                SystemUtils.clearSession();
                SystemUtils.showToast('Sesi tamat kerana tidak aktif', 'info');
                window.location.href = '../login.html';
            }
        }, 60 * 60 * 1000); // 60 minutes
    }
    
    // Reset timer on user activity
    ['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
        document.addEventListener(event, resetActivityTimer);
    });
    
    resetActivityTimer();
});

// ===== AUTHENTICATION SYSTEM =====

class AuthSystem {
    
    static init() {
        this.checkAutoLogin();
        this.setupEventListeners();
        this.enhanceFormUX();
    }
    
    static setupEventListeners() {
        // Enter key support
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.id === 'username') {
                document.getElementById('role').focus();
            }
            if (e.key === 'Enter' && e.target.id === 'role') {
                this.login();
            }
        });
        
        // Input validation on blur
        const usernameInput = document.getElementById('username');
        const roleSelect = document.getElementById('role');
        
        if (usernameInput) {
            usernameInput.addEventListener('blur', () => this.validateUsername());
        }
        
        if (roleSelect) {
            roleSelect.addEventListener('change', () => this.validateRole());
        }
    }
    
    static enhanceFormUX() {
        // Add floating labels effect
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            const label = input.previousElementSibling;
            if (label && label.classList.contains('form-label')) {
                input.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-20px)';
                    label.style.fontSize = '0.75rem';
                    label.style.color = 'var(--secondary-blue)';
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.transform = '';
                        label.style.fontSize = '';
                        label.style.color = '';
                    }
                });
            }
        });
    }
    
    static validateUsername() {
        const username = document.getElementById('username')?.value.trim() || '';
        const errorDiv = document.getElementById('username-error') || this.createErrorDiv('username');
        
        if (!username) {
            errorDiv.textContent = 'Sila masukkan username';
            return false;
        }
        
        if (username.length < 3) {
            errorDiv.textContent = 'Username mesti sekurang-kurangnya 3 aksara';
            return false;
        }
        
        errorDiv.textContent = '';
        return true;
    }
    
    static validateRole() {
        const role = document.getElementById('role')?.value || '';
        const errorDiv = document.getElementById('role-error') || this.createErrorDiv('role');
        
        if (!role) {
            errorDiv.textContent = 'Sila pilih peranan';
            return false;
        }
        
        errorDiv.textContent = '';
        return true;
    }
    
    static createErrorDiv(fieldId) {
        const input = document.getElementById(fieldId);
        if (!input) return null;
        
        const errorDiv = document.createElement('div');
        errorDiv.id = `${fieldId}-error`;
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--status-penting)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorDiv);
        return errorDiv;
    }
    
    static checkAutoLogin() {
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        
        if (username && role && window.location.pathname.includes('login.html')) {
            // User already logged in, redirect to dashboard
            this.redirectToDashboard(role);
        }
    }
    
    static async login() {
        const username = document.getElementById('username')?.value.trim() || '';
        const role = document.getElementById('role')?.value || '';
        
        // Validate inputs
        if (!this.validateUsername() || !this.validateRole()) {
            SystemUtils.showToast('Sila betulkan ralat dalam borang', 'error');
            return;
        }
        
        // Show loading state
        const loginBtn = document.getElementById('loginButton');
        const originalText = loginBtn?.innerHTML || 'Log Masuk';
        
        if (loginBtn) {
            loginBtn.innerHTML = '<span class="loading"></span> Sedang Log Masuk...';
            loginBtn.disabled = true;
        }
        
        try {
            // Simulate API call delay for demo
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Save user session
            SystemUtils.setCurrentUser(username, role);
            
            // Log login activity
            this.logActivity('login', { username, role });
            
            // Show success message
            SystemUtils.showToast(`Selamat datang, ${username}!`, 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                this.redirectToDashboard(role);
            }, 1000);
            
        } catch (error) {
            SystemUtils.showToast('Ralat semasa log masuk. Sila cuba lagi.', 'error');
            console.error('Login error:', error);
            
            if (loginBtn) {
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }
        }
    }
    
    static redirectToDashboard(role) {
        const basePath = window.location.pathname.includes('admin/') ? '../' : '';
        
        const routes = {
            'admin': 'admin/dashboard_admin.html',
            'su': 'setiausaha/dashboard_su.html',
            'jabatan': 'jabatan/dashboard_jabatan.html',
            'latihan': 'latihan/dashboard_latihan.html'
        };
        
        const targetRoute = routes[role];
        if (targetRoute) {
            window.location.href = basePath + targetRoute;
        } else {
            SystemUtils.showToast('Peranan tidak dikenali', 'error');
        }
    }
    
    static logout() {
        // Log logout activity
        const user = SystemUtils.getCurrentUser();
        this.logActivity('logout', user);
        
        // Clear session
        SystemUtils.clearSession();
        
        // Show logout message
        SystemUtils.showToast('Anda telah log keluar', 'info');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = '../login.html';
        }, 1000);
    }
    
    static logActivity(action, data) {
        const activities = JSON.parse(localStorage.getItem('activity_log') || '[]');
        activities.unshift({
            timestamp: new Date().toISOString(),
            action,
            data,
            userAgent: navigator.userAgent,
            ip: '127.0.0.1' // In real app, get from server
        });
        
        // Keep only last 100 activities
        if (activities.length > 100) {
            activities.length = 100;
        }
        
        localStorage.setItem('activity_log', JSON.stringify(activities));
    }
    
    static getActivities(limit = 10) {
        const activities = JSON.parse(localStorage.getItem('activity_log') || '[]');
        return activities.slice(0, limit);
    }
    
    // Role-based access control helpers
    static hasPermission(requiredPermission) {
        const role = localStorage.getItem('role');
        const permissions = this.getRolePermissions(role);
        return permissions.includes(requiredPermission);
    }
    
    static getRolePermissions(role) {
        const permissionMap = {
            'admin': ['view_all', 'edit_all', 'delete_all', 'export_data', 'manage_users'],
            'su': ['view_all', 'edit_surat', 'send_minit', 'export_data'],
            'jabatan': ['view_own', 'edit_own', 'send_to_latihan'],
            'latihan': ['view_assigned', 'mark_complete', 'assign_staff']
        };
        
        return permissionMap[role] || [];
    }
    
    static requirePermission(permission) {
        if (!this.hasPermission(permission)) {
            SystemUtils.showToast('Anda tidak mempunyai kebenaran untuk tindakan ini', 'error');
            return false;
        }
        return true;
    }
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    AuthSystem.init();
    
    // Add logout button to all dashboards
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('index.html')) {
        const header = document.querySelector('.header') || document.querySelector('.main-nav');
        if (header) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn btn-small';
            logoutBtn.innerHTML = '🚪 Log Keluar';
            logoutBtn.style.marginLeft = 'auto';
            logoutBtn.onclick = AuthSystem.logout;
            
            // Find a suitable place to add logout button
            const headerActions = header.querySelector('.header-actions') || header;
            if (headerActions.querySelector('.btn-back')) {
                headerActions.insertBefore(logoutBtn, headerActions.querySelector('.btn-back').nextSibling);
            } else {
                headerActions.appendChild(logoutBtn);
            }
        }
    }
});

// ===== GLOBAL EXPORT =====
window.AuthSystem = AuthSystem;

// ===== COMPATIBILITY WITH OLD CODE =====
function login() {
    AuthSystem.login();
}

function logout() {
    AuthSystem.logout();
}

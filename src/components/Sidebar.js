import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiMail, 
  FiSend, 
  FiUsers, 
  FiSettings,
  FiFileText,
  FiClock,
  FiUpload,
  FiBook,
  FiDownload,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { 
  MdDashboard,
  MdOutlineAssignment,
  MdOutlineFolderShared
} from 'react-icons/md';
import './Sidebar.css';

const Sidebar = ({ role, isMobileMenuOpen, toggleMobileMenu }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adminMenu = [
    { path: '/admin', label: 'Dashboard', icon: <FiHome /> },
    { path: '/admin/surat-masuk', label: 'Surat Masuk', icon: <FiMail /> },
    { path: '/admin/surat-keluar', label: 'Surat Keluar', icon: <FiSend /> },
    { path: '/admin/pengguna', label: 'Pengguna', icon: <FiUsers /> },
    { path: '/admin/tetapan', label: 'Tetapan', icon: <FiSettings /> }
  ];

  const suMenu = [
    { path: '/setiausaha', label: 'Dashboard', icon: <FiHome /> },
    { path: '/setiausaha/surat-untuk-diminit', label: 'Surat Untuk Diminit', icon: <FiFileText /> },
    { path: '/setiausaha/minit-surat', label: 'Minit Surat', icon: <FiClock /> },
    { path: '/setiausaha/hantar-ke-jabatan', label: 'Hantar Ke Jabatan', icon: <FiUpload /> }
  ];

  const jabatanMenu = [
    { path: '/jabatan', label: 'Dashboard', icon: <FiHome /> },
    { path: '/jabatan/senarai-surat', label: 'Senarai Surat', icon: <MdOutlineAssignment /> },
    { path: '/jabatan/lihat-surat', label: 'Lihat Surat', icon: <MdOutlineFolderShared /> }
  ];

  const latihanMenu = [
    { path: '/latihan', label: 'Dashboard', icon: <FiHome /> },
    { path: '/latihan/senarai-latihan', label: 'Senarai Latihan', icon: <FiBook /> },
    { path: '/latihan/export', label: 'Export', icon: <FiDownload /> }
  ];

  const getMenuItems = () => {
    switch(role) {
      case 'admin': return adminMenu;
      case 'setiausaha': return suMenu;
      case 'jabatan': return jabatanMenu;
      case 'latihan': return latihanMenu;
      default: return [];
    }
  };

  const menuItems = getMenuItems();

  const getRoleName = () => {
    switch(role) {
      case 'admin': return 'Pentadbir Sistem';
      case 'setiausaha': return 'Setiausaha';
      case 'jabatan': return 'Jabatan';
      case 'latihan': return 'Latihan';
      default: return '';
    }
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleMobileMenu}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          onKeyDown={(e) => e.key === 'Enter' && toggleMobileMenu()}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        aria-label="Main navigation"
      >
        {/* Mobile Header */}
        <div className="sidebar-mobile-header">
          <button 
            className="sidebar-toggle mobile"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
          <div className="sidebar-logo-mobile">
            <img src="/mdg-logo.png" alt="MDG Logo" />
            <span>Sistem Surat</span>
          </div>
        </div>

        {/* Desktop Toggle */}
        <button 
          className="sidebar-toggle desktop"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>

        {/* Logo Section */}
        <div className="sidebar-logo">
          <img src="/mdg-logo.png" alt="MDG Logo" />
          {!isCollapsed && (
            <div className="logo-text">
              <h2>Sistem Surat</h2>
              <p>MDG</p>
            </div>
          )}
        </div>

        {/* Role Badge */}
        <div className="sidebar-role">
          <div className="role-badge">
            <span className="role-icon" aria-hidden="true">
              {role === 'admin' && <FiSettings />}
              {role === 'setiausaha' && <FiFileText />}
              {role === 'jabatan' && <MdOutlineAssignment />}
              {role === 'latihan' && <FiBook />}
            </span>
            {!isCollapsed && (
              <div>
                <div className="role-name">{getRoleName()}</div>
                <div className="role-label">Peranan</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav" aria-label="Primary navigation">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleNavClick}
                  end
                >
                  <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {!isCollapsed && (
            <>
              <div className="system-info">
                <div className="info-item">
                  <span className="info-label">Versi</span>
                  <span className="info-value">1.0.0</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value online">Online</span>
                </div>
              </div>
              <div className="copyright">
                © 2024 MDG. Hak Cipta Terpelihara.
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

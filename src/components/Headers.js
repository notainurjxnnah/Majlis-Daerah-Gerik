import React, { useState, useEffect } from 'react';
import { FiBell, FiLogOut, FiUser, FiMenu, FiSearch, FiSettings } from 'react-icons/fi';
import { MdNotifications } from 'react-icons/md';
import './Header.css';

const Header = ({ user, role, toggleMobileMenu }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      // Simulate API call
      const mockNotifications = [
        { id: 1, message: 'Surat baru dari Jabatan A', time: '10 minit lalu', read: false },
        { id: 2, message: 'Minit surat perlu tindakan', time: '1 jam lalu', read: true },
        { id: 3, message: 'Latihan baru tersedia', time: '2 jam lalu', read: false },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('ms-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ms-MY', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  const getRoleDisplay = () => {
    const roles = {
      'admin': 'Pentadbir Sistem',
      'setiausaha': 'Setiausaha',
      'jabatan': 'Jabatan',
      'latihan': 'Latihan'
    };
    return roles[role] || role;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <FiMenu size={24} />
      </button>

      {/* Left Section - Search */}
      <div className="header-left">
        <div className="search-container">
          <FiSearch className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Cari surat, pengguna, atau tindakan..."
            className="search-input"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Date & Time */}
        <div className="datetime-container">
          <div className="date">{formatDate(currentTime)}</div>
          <div className="time">{formatTime(currentTime)}</div>
        </div>

        {/* Notifications */}
        <div className="notification-container">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <FiBell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Pemberitahuan</h3>
                <button 
                  className="mark-all-read"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Tandai semua sebagai dibaca
                </button>
              </div>
              <div className="notification-list">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                      onClick={() => {
                        // Mark as read when clicked
                        const updatedNotifications = notifications.map(n =>
                          n.id === notification.id ? { ...n, read: true } : n
                        );
                        setNotifications(updatedNotifications);
                      }}
                    >
                      <div className="notification-icon">
                        <MdNotifications aria-hidden="true" />
                      </div>
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="notification-empty">
                    Tiada pemberitahuan
                  </div>
                )}
              </div>
              <div className="notification-footer">
                <a href="/notifications" className="view-all">Lihat semua pemberitahuan</a>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-container">
          <button 
            className="user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            <div className="user-avatar">
              <FiUser size={20} aria-hidden="true" />
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Pengguna'}</span>
              <span className="user-role">{getRoleDisplay()}</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-dropdown-header">
                <div className="dropdown-avatar">
                  <FiUser size={24} aria-hidden="true" />
                </div>
                <div className="dropdown-user-info">
                  <div className="dropdown-name">{user?.name || 'Pengguna'}</div>
                  <div className="dropdown-email">{user?.email || 'user@example.com'}</div>
                  <div className="dropdown-role">{getRoleDisplay()}</div>
                </div>
              </div>
              <div className="user-dropdown-menu">
                <a href="/profile" className="dropdown-item">
                  <FiUser className="dropdown-icon" aria-hidden="true" />
                  <span>Profil Saya</span>
                </a>
                <a href="/settings" className="dropdown-item">
                  <FiSettings className="dropdown-icon" aria-hidden="true" />
                  <span>Pengaturan</span>
                </a>
                <div className="dropdown-divider" />
                <button onClick={handleLogout} className="dropdown-item logout">
                  <FiLogOut className="dropdown-icon" aria-hidden="true" />
                  <span>Log Keluar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

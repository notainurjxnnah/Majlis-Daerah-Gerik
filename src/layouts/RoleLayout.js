import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// User data configuration for different roles
const ROLE_CONFIG = {
  setiausaha: {
    name: 'Setiausaha MDG',
    email: 'setiausaha@mdg.gov.my',
    role: 'setiausaha'
  },
  jabatan: {
    name: 'Ketua Jabatan',
    email: 'jabatan@mdg.gov.my',
    role: 'jabatan'
  },
  latihan: {
    name: 'Pengurus Latihan',
    email: 'latihan@mdg.gov.my',
    role: 'latihan'
  },
  admin: {
    name: 'Admin MDG',
    email: 'admin@mdg.gov.my',
    role: 'admin'
  }
};

const RoleLayout = ({ role = 'admin' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const user = ROLE_CONFIG[role] || ROLE_CONFIG.admin;
  
  return (
    <div className="app-container">
      <Sidebar 
        role={role} 
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <div className="main-content">
        <Header 
          user={user}
          role={role}
          toggleMobileMenu={toggleMobileMenu}
        />
        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RoleLayout;

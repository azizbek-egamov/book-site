import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BookMarked, 
  CreditCard, 
  LayoutGrid, 
  Building2, 
  Settings, 
  ExternalLink, 
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/AdminSidebar.module.css';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/books', icon: BookOpen, label: 'Kitoblar' },
    { path: '/admin/customers', icon: Users, label: 'Mijozlar' },
    { path: '/admin/borrowed-books', icon: BookMarked, label: 'Berilgan kitoblar' },
    { path: '/admin/card', icon: CreditCard, label: 'Kutubxona kartasi' },
    { path: '/admin/categories', icon: LayoutGrid, label: 'Kategoriyalar' },
    { path: '/admin/library', icon: Building2, label: 'Kutubxona' },
    { path: '/admin/settings', icon: Settings, label: 'Sozlamalar' },
  ];

  const sidebarContent = (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoRow}>
          <span className={styles.logoIcon}>📚</span>
          <span className={styles.logoText}>Kutubxona</span>
        </div>
        <div className={styles.subtitle}>Admin Panel</div>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        )}
      </div>

      <div className={styles.separator} />

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={onClose}
            >
              <Icon size={20} className={styles.navIcon} />
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          );
        })}

        <div className={styles.separator} />

        <Link to="/" className={styles.navItem}>
          <ExternalLink size={20} className={styles.navIcon} />
          <span className={styles.navLabel}>Saytga qaytish</span>
        </Link>
        <button onClick={() => { logout(); if(onClose) onClose(); }} className={styles.navItem}>
          <LogOut size={20} className={styles.navIcon} />
          <span className={styles.navLabel}>Chiqish</span>
        </button>
      </nav>

      <div className={styles.footer}>
        <div className={styles.avatar}>A</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Administrator</span>
          <span className={styles.userRole}>Admin</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.desktopSidebar}>
        {sidebarContent}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div 
              className={styles.mobileSidebar}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;

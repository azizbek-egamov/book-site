import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/AdminHeader.module.css';

const AdminHeader = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Auto-detect page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/books')) return 'Kitoblar';
    if (path.includes('/customers')) return 'Mijozlar';
    if (path.includes('/borrowed-books')) return 'Berilgan kitoblar';
    if (path.includes('/card')) return 'Kutubxona kartasi';
    if (path.includes('/categories')) return 'Kategoriyalar';
    if (path.includes('/library')) return 'Kutubxona';
    if (path.includes('/settings')) return 'Sozlamalar';
    return 'Admin Panel';
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
      </div>

      <div className={styles.right}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Qidirish..." className={styles.searchInput} />
        </div>

        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.userMenu}>
          <button 
            className={styles.avatarBtn} 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className={styles.avatar}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </button>

          {showDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownName}>{user?.name || 'Administrator'}</span>
                <span className={styles.dropdownRole}>Admin</span>
              </div>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={logout}>
                Tizimdan chiqish
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

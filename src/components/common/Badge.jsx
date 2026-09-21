import React from 'react';
import styles from '../../styles/Badge.module.css';

const Badge = ({ children, variant = 'default' }) => {
  return (
    <span className={`${styles.badge} ${styles[variant] || ''}`}>
      {children}
    </span>
  );
};

export default Badge;

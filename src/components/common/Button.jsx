import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button', 
  disabled = false, 
  className = '', 
  icon: Icon 
}) => {
  const classes = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2, scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} className={styles.icon} />}
      {children}
    </motion.button>
  );
};

export default Button;

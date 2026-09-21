import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import styles from '../../styles/ConfirmDialog.module.css';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Tasdiqlash', 
  cancelText = 'Bekor qilish', 
  variant = 'warning' 
}) => {
  const isDanger = variant === 'danger';
  const isWarning = variant === 'warning';
  
  const Icon = isDanger || isWarning ? AlertTriangle : Info;
  const iconClass = styles[`icon${variant.charAt(0).toUpperCase() + variant.slice(1)}`];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title={title}>
      <div className={styles.content}>
        <div className={`${styles.iconContainer} ${iconClass}`}>
          <Icon size={32} />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onClose}>{cancelText}</Button>
        <Button 
          variant={isDanger ? 'danger' : 'primary'} 
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

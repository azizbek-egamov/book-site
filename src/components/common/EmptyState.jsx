import React from 'react';
import Button from './Button';
import styles from '../../styles/EmptyState.module.css';

const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <div className={styles.glow} />
        {Icon && <Icon size={48} className={styles.icon} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction} className={styles.actionButton}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

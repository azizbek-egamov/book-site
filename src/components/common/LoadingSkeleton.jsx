import React from 'react';
import styles from '../../styles/LoadingSkeleton.module.css';

export const SkeletonText = ({ width = '100%', height = '1rem', className = '' }) => (
  <div className={`${styles.skeleton} ${styles.text} ${className}`} style={{ width, height }} />
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`${styles.card} ${className}`}>
    <div className={styles.image} />
    <div className={styles.content}>
      <SkeletonText width="80%" height="1.5rem" className={styles.title} />
      <SkeletonText width="100%" />
      <SkeletonText width="60%" />
      <div className={styles.button} />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className={styles.table}>
    <div className={styles.tableHeader}>
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonText key={i} height="1.5rem" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className={styles.tableRow}>
        {Array.from({ length: columns }).map((_, j) => (
          <SkeletonText key={j} width={j === 0 ? "80%" : "60%"} />
        ))}
      </div>
    ))}
  </div>
);

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Trash2, RefreshCw, Info, Check, Shield } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import styles from '../../styles/AdminSettings.module.css';

const AdminSettings = () => {
  const { addToast } = useToast();
  const [isClearing, setIsClearing] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const handleClearData = () => {
    if (window.confirm("Barcha ma'lumotlarni o'chirishni xohlaysizmi? Bu amalni ortga qaytarib bo'lmaydi.")) {
      setIsClearing(true);
      setTimeout(() => {
        localStorage.clear();
        addToast("Barcha ma'lumotlar tozalandi. Iltimos, sahifani yangilang.", "success");
        setIsClearing(false);
      }, 1000);
    }
  };

  const handleReloadDemo = () => {
    if (window.confirm("Demo ma'lumotlarni yuklashni xohlaysizmi? Joriy ma'lumotlar o'chirilishi mumkin.")) {
      setIsReloading(true);
      setTimeout(() => {
        // Just remove specific keys so they get re-initialized on reload
        localStorage.removeItem('books');
        localStorage.removeItem('categories');
        localStorage.removeItem('customers');
        localStorage.removeItem('borrowedBooks');
        addToast("Demo ma'lumotlar qayta yuklanishi uchun tayyorlandi. Sahifa yangilanmoqda...", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }, 1000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Settings size={28} className={styles.headerIcon} />
        </div>
        <div>
          <h2 className={styles.title}>Tizim sozlamalari</h2>
          <p className={styles.subtitle}>Kutubxona tizimi parametrlarini boshqarish</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* General Settings */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.cardHeader}>
            <Settings size={20} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Umumiy</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingName}>Mavzu (Theme)</h4>
                <p className={styles.settingDesc}>Tizimning tashqi ko'rinishi</p>
              </div>
              <div className={styles.settingAction}>
                <div className={styles.themeSelector}>
                  <span className={styles.badgePremium}>
                    ✨ Dark Luxury
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingName}>Til (Language)</h4>
                <p className={styles.settingDesc}>Tizim interfeysi tili</p>
              </div>
              <div className={styles.settingAction}>
                <select className={styles.select} defaultValue="uz">
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.cardHeader}>
            <Shield size={20} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Ma'lumotlar bazasi</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.alertBox}>
              <Info size={20} className={styles.alertIcon} />
              <p>Quyidagi amallar tizimdagi barcha ma'lumotlarga ta'sir qiladi. Ehtiyotkorlik bilan foydalaning.</p>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingName}>Demo ma'lumotlar</h4>
                <p className={styles.settingDesc}>Dastlabki demo ma'lumotlarni qayta yuklash</p>
              </div>
              <div className={styles.settingAction}>
                <button 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={handleReloadDemo}
                  disabled={isReloading || isClearing}
                >
                  <RefreshCw size={16} className={isReloading ? styles.spin : ''} />
                  <span>Yuklash</span>
                </button>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingName}>Tozalash</h4>
                <p className={styles.settingDesc}>Barcha kiritilgan ma'lumotlarni o'chirish</p>
              </div>
              <div className={styles.settingAction}>
                <button 
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={handleClearData}
                  disabled={isReloading || isClearing}
                >
                  <Trash2 size={16} />
                  <span>Tozalash</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div className={`${styles.card} ${styles.fullWidth}`} variants={itemVariants}>
          <div className={styles.cardHeader}>
            <Info size={20} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Tizim haqida</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Dastur nomi:</span>
                <span className={styles.infoValue}>Kutubxona Management System</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Versiya:</span>
                <span className={styles.infoValue}>1.0.0 (Premium Edition)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Holat:</span>
                <span className={styles.infoValueStatus}>
                  <Check size={14} /> Frontend Demonstration
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Litsenziya:</span>
                <span className={styles.infoValue}>Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;

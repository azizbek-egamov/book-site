import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import styles from '../../styles/About.module.css';

const About = () => {
  const { libraryInfo } = useContext(AppContext);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className={styles.aboutPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Biz haqimizda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {libraryInfo?.name} - Bilim va nuri ziyo maskani
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.historyMissionLayout}>
            <motion.div 
              className={styles.contentBlock}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <h2>Tariximiz</h2>
              <div className={styles.divider}></div>
              <p>{libraryInfo?.history}</p>
            </motion.div>

            <motion.div 
              className={styles.contentBlock}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <h2>Bizning Missiyamiz</h2>
              <div className={styles.divider}></div>
              <p className={styles.missionText}>"{libraryInfo?.mission}"</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.infoGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconBox}><Calendar /></div>
              <h3>Tashkil etilgan</h3>
              <p>{libraryInfo?.foundedYear}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconBox}><User /></div>
              <h3>Asoschi</h3>
              <p>{libraryInfo?.founder}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconBox}><MapPin /></div>
              <h3>Manzil</h3>
              <p>{libraryInfo?.address}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconBox}><Phone /></div>
              <h3>Telefon</h3>
              <p>{libraryInfo?.phone}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconBox}><Mail /></div>
              <h3>Email</h3>
              <p>{libraryInfo?.email}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconBox}><Clock /></div>
              <h3>Ish vaqti</h3>
              <p>{libraryInfo?.workingHours}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Kutubxona Galereyasi</h2>
            <div className={styles.dividerCenter}></div>
          </div>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80" alt="Gallery 1" />
            </div>
            <div className={styles.galleryItem}>
              <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80" alt="Gallery 2" />
            </div>
            <div className={styles.galleryItem}>
              <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" alt="Gallery 3" />
            </div>
            <div className={styles.galleryItem}>
              <img src="https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80" alt="Gallery 4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

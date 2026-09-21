import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Globe, MessageCircle, Camera, Youtube } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  const context = useContext(AppContext);
  const libraryInfo = context?.libraryInfo || {};

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.logo}>
              <span className={styles.emoji}>📚</span>
              <span className={styles.logoText}>Kutubxona</span>
            </div>
            <p className={styles.description}>
              {libraryInfo.description || "Kutubxonamiz sizga eng yaxshi kitoblarni taqdim etadi. Bilimlar olamiga xush kelibsiz."}
            </p>
          </div>

          <div className={styles.col}>
            <h3 className={styles.title}>Sahifalar</h3>
            <ul className={styles.links}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/books">Kitoblar</Link></li>
              <li><Link to="/about">Biz haqimizda</Link></li>
              <li><Link to="/contact">Aloqa</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.title}>Bog'lanish</h3>
            <ul className={styles.contactList}>
              <li>
                <Phone size={18} />
                <span>{libraryInfo.phone || "+998 90 123 45 67"}</span>
              </li>
              <li>
                <Mail size={18} />
                <span>{libraryInfo.email || "info@kutubxona.uz"}</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>{libraryInfo.address || "Toshkent shahri, Amir Temur ko'chasi 1-uy"}</span>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.title}>Ish vaqti</h3>
            <div className={styles.workingHours}>
              <Clock size={18} />
              <div>
                <p>{libraryInfo.workingDays || "Dushanba - Shanba"}</p>
                <p className={styles.time}>{libraryInfo.workingHours || "09:00 - 18:00"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook"><Globe size={20} /></a>
            <a href="#" aria-label="Twitter"><MessageCircle size={20} /></a>
            <a href="#" aria-label="Instagram"><Camera size={20} /></a>
            <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
          </div>
          <p className={styles.copyright}>© {new Date().getFullYear()} Kutubxona. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

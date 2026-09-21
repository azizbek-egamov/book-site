import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, BookOpen, Hash, ArrowLeft } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import styles from '../../styles/BookDetail.module.css';

const BookDetail = () => {
  const { id } = useParams();
  const { books } = useContext(AppContext);
  
  // Find book
  const book = books?.find(b => b.id === id || b.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!book) {
    return (
      <div className={styles.emptyStateContainer}>
        <div className={styles.emptyState}>
          <BookOpen size={64} className={styles.emptyIcon} />
          <h2>Kitob topilmadi</h2>
          <p>Kechirasiz, siz qidirgan kitob tizimda mavjud emas.</p>
          <Link to="/books" className={styles.btnPrimary}>Kitoblarga qaytish</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <Link to="/books" className={styles.backLink}>
          <ArrowLeft size={20} /> Kitoblarga qaytish
        </Link>

        <div className={styles.detailLayout}>
          <motion.div 
            className={styles.imageColumn}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.imageWrapper}>
              <img src={book.coverImage} alt={book.title} />
            </div>
          </motion.div>

          <motion.div 
            className={styles.infoColumn}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.headerInfo}>
              <span className={styles.categoryBadge}>{book.category}</span>
              <div className={`${styles.statusBadge} ${book.isAvailable ? styles.available : styles.unavailable}`}>
                {book.isAvailable ? 'Mavjud' : 'Band'}
              </div>
            </div>

            <h1 className={styles.title}>{book.title}</h1>
            
            <div className={styles.authorRow}>
              <User size={20} className={styles.iconGold} />
              <span>{book.author}</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(book.price)}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.descriptionBlock}>
              <h3>Kitob haqida</h3>
              <p>{book.description}</p>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><Calendar size={20} /></div>
                <div>
                  <span className={styles.detailLabel}>Nashr yili</span>
                  <p className={styles.detailValue}>{book.publishedYear}</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><BookOpen size={20} /></div>
                <div>
                  <span className={styles.detailLabel}>Sahifalar</span>
                  <p className={styles.detailValue}>{book.pages} bet</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><Hash size={20} /></div>
                <div>
                  <span className={styles.detailLabel}>ISBN</span>
                  <p className={styles.detailValue}>{book.isbn}</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

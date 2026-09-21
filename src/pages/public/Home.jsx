import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Grid3X3, Award, CheckCircle, ChevronDown, 
  Microscope, Landmark, Sparkles, Code, TrendingUp, Brain, 
  Lightbulb, Baby, User 
} from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import styles from '../../styles/Home.module.css';

const CountUp = ({ to, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(to, 10) || 0;
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start));
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{count}</span>;
};

const getIcon = (iconName) => {
  const icons = {
    BookOpen, Microscope, Landmark, Sparkles, Code, 
    TrendingUp, Brain, Lightbulb, Baby, User
  };
  const Icon = icons[iconName] || BookOpen;
  return <Icon size={24} />;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  const { libraryInfo, libraryCard, books, categories } = useContext(AppContext);
  const popularBooks = books?.slice(0, 6) || [];

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroOverlay}></div>
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className={styles.heroBadge}>
            Zamonaviy Kutubxona Markazi
          </motion.span>
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            {libraryInfo?.name || 'Kutubxona'}
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.heroSlogan}>
            "{libraryInfo?.slogan || 'Ilm manbai'}"
          </motion.p>
          <motion.p variants={fadeInUp} className={styles.heroDesc}>
            {libraryInfo?.description?.substring(0, 150) || 'Kutubxonamizga xush kelibsiz!'}...
          </motion.p>
          <motion.div variants={fadeInUp} className={styles.heroActions}>
            <Link to="/books" className={styles.btnPrimary}>Kitoblarni ko'rish</Link>
            <Link to="/about" className={styles.btnSecondary}>Biz haqimizda</Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2>Raqamlarda biz</h2>
            <div className={styles.headerDivider}></div>
          </motion.div>
          
          <motion.div 
            className={styles.statsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className={styles.statCard}>
              <div className={styles.statIcon}><BookOpen /></div>
              <h3 className={styles.statNumber}><CountUp to={libraryInfo?.totalBooks || 5000} />+</h3>
              <p className={styles.statLabel}>Kitob</p>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.statCard}>
              <div className={styles.statIcon}><Users /></div>
              <h3 className={styles.statNumber}><CountUp to={libraryInfo?.totalMembers || 1200} />+</h3>
              <p className={styles.statLabel}>A'zolar</p>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.statCard}>
              <div className={styles.statIcon}><Grid3X3 /></div>
              <h3 className={styles.statNumber}><CountUp to={libraryInfo?.totalCategories || 15} />+</h3>
              <p className={styles.statLabel}>Kategoriya</p>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.statCard}>
              <div className={styles.statIcon}><Award /></div>
              <h3 className={styles.statNumber}><CountUp to={libraryInfo?.yearsOfExperience || 10} />+</h3>
              <p className={styles.statLabel}>Yillik Tajriba</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2>Kitob kategoriyalari</h2>
            <div className={styles.headerDivider}></div>
          </motion.div>

          <motion.div 
            className={styles.categoriesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {categories?.map((cat) => (
              <motion.div key={cat.id} variants={fadeInUp} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>{getIcon(cat.icon)}</div>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <span className={styles.categoryCount}>{cat.bookCount} kitob</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className={styles.booksSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2>Mashhur kitoblar</h2>
            <div className={styles.headerDivider}></div>
          </motion.div>

          <motion.div 
            className={styles.booksGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {popularBooks.map((book) => (
              <motion.div key={book.id} variants={fadeInUp} className={styles.bookCard}>
                <div className={styles.bookCover}>
                  <img src={book.coverImage} alt={book.title} />
                  <div className={`${styles.statusBadge} ${book.isAvailable ? styles.available : styles.unavailable}`}>
                    {book.isAvailable ? 'Mavjud' : 'Band'}
                  </div>
                </div>
                <div className={styles.bookInfo}>
                  <span className={styles.bookCategory}>{book.category}</span>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>{book.author}</p>
                  <div className={styles.bookFooter}>
                    <span className={styles.bookPrice}>{formatPrice(book.price)}</span>
                    <Link to={`/books/${book.id}`} className={styles.btnDetail}>Batafsil</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className={styles.centerAction}>
            <Link to="/books" className={styles.btnOutline}>Barcha kitoblar</Link>
          </div>
        </div>
      </section>

      {/* Library Card Section */}
      <section className={styles.cardSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2>Kutubxona kartochkasi</h2>
            <div className={styles.headerDivider}></div>
          </motion.div>

          <div className={styles.cardLayout}>
            <motion.div 
              className={styles.cardVisualContainer}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.visualCard}>
                <div className={styles.cardBgDecor}></div>
                <div className={styles.cardHeader}>
                  <h4>{libraryInfo?.name || 'Kutubxona'}</h4>
                  <Award size={24} className={styles.goldText} />
                </div>
                <div className={styles.cardChip}></div>
                <div className={styles.cardNumber}>**** **** **** 1234</div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardHolder}>
                    <span>KARTA EGASI</span>
                    <p>Mijoz Ismi</p>
                  </div>
                  <div className={styles.cardValid}>
                    <span>MUDDATI</span>
                    <p>12/26</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.cardInfoContainer}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={styles.cardTitle}>{libraryCard?.name || "Oltin A'zolik"}</h3>
              <div className={styles.cardPricing}>
                <span className={styles.priceAmount}>{formatPrice(libraryCard?.price || 150000)}</span>
                <span className={styles.priceDuration}>/ {libraryCard?.duration || "Yil"}</span>
              </div>
              <p className={styles.cardDesc}>{libraryCard?.description}</p>
              <ul className={styles.benefitsList}>
                {libraryCard?.benefits?.map((benefit, index) => (
                  <li key={index}>
                    <CheckCircle className={styles.checkIcon} size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className={styles.btnPrimary}>Batafsil Ma'lumot</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.aboutContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2>Biz haqimizda</h2>
            <div className={styles.headerDividerLeft}></div>
            <p className={styles.aboutDesc}>{libraryInfo?.description}</p>
            <div className={styles.missionBox}>
              <h4>Bizning missiyamiz</h4>
              <p>{libraryInfo?.mission}</p>
            </div>
            <Link to="/about" className={styles.btnOutline}>Ko'proq o'qish</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

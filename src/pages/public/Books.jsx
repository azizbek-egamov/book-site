import React, { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import styles from '../../styles/Books.module.css';

const Books = () => {
  const { books, categories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    
    let result = [...books];

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        b => b.title.toLowerCase().includes(lowerSearch) || 
             b.author.toLowerCase().includes(lowerSearch)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(b => b.category === selectedCategory);
    }

    // Availability
    if (availabilityFilter !== 'all') {
      const isAvail = availabilityFilter === 'available';
      result = result.filter(b => b.isAvailable === isAvail);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'a-z': return a.title.localeCompare(b.title);
        case 'z-a': return b.title.localeCompare(a.title);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    return result;
  }, [books, searchTerm, selectedCategory, availabilityFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setAvailabilityFilter('all');
    setSortBy('newest');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.booksPage}>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Kutubxona Kitoblari</h1>
          <p>Jami {filteredBooks.length} ta kitob topildi</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Kitob yoki muallif nomi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filtersGroup}>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Barcha Kategoriyalar</option>
              {categories?.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>

            <select 
              value={availabilityFilter} 
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Barcha Holat</option>
              <option value="available">Mavjud</option>
              <option value="unavailable">Band</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="newest">Eng yangilari</option>
              <option value="a-z">A-Z gacha</option>
              <option value="z-a">Z-A gacha</option>
              <option value="price-low">Arzondan qimmatga</option>
              <option value="price-high">Qimmatdan arzonga</option>
            </select>

            {(searchTerm || selectedCategory || availabilityFilter !== 'all' || sortBy !== 'newest') && (
              <button onClick={clearFilters} className={styles.btnClear}>
                <X size={18} /> Tozalash
              </button>
            )}
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <motion.div 
            className={styles.booksGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredBooks.map(book => (
              <motion.div key={book.id} variants={itemVariants} className={styles.bookCard}>
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
                  <p className={styles.bookDesc}>{book.description?.substring(0, 80)}...</p>
                  <div className={styles.bookFooter}>
                    <span className={styles.bookPrice}>{formatPrice(book.price)}</span>
                    <Link to={`/books/${book.id}`} className={styles.btnDetail}>Batafsil</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={styles.emptyState}>
            <Filter size={48} className={styles.emptyIcon} />
            <h3>Kitob topilmadi</h3>
            <p>Siz izlagan mezonlarga mos kitob afsuski yo'q.</p>
            <button onClick={clearFilters} className={styles.btnOutline}>Filtrlarni tozalash</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;

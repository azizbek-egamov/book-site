import React from 'react';
import { Search, X } from 'lucide-react';
import styles from '../../styles/SearchBar.module.css';

const SearchBar = ({ value, onChange, placeholder = "Qidirish..." }) => {
  return (
    <div className={styles.container}>
      <Search className={styles.searchIcon} size={20} />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value && (
        <button 
          className={styles.clearButton} 
          onClick={() => onChange({ target: { value: '' } })}
          aria-label="Tozalash"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

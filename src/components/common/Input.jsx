import React, { useState } from 'react';
import styles from '../../styles/Input.module.css';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  required, 
  icon: Icon, 
  name, 
  disabled, 
  as = 'input', 
  options = [], 
  rows = 4 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerClass = `${styles.container} ${error ? styles.hasError : ''} ${isFocused ? styles.isFocused : ''} ${disabled ? styles.isDisabled : ''}`;

  return (
    <div className={containerClass}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {Icon && <Icon className={styles.icon} size={20} />}
        
        {as === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${styles.input} ${Icon ? styles.withIcon : ''} ${styles.textarea}`}
          />
        ) : as === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${styles.input} ${Icon ? styles.withIcon : ''}`}
          >
            <option value="" disabled>{placeholder || 'Tanlang'}</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${styles.input} ${Icon ? styles.withIcon : ''}`}
          />
        )}
      </div>
      
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;

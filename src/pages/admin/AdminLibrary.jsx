import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { ToastContext } from '../../context/ToastContext';
import { Save } from 'lucide-react';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from '../../styles/AdminLibrary.module.css';

const AdminLibrary = () => {
  const { libraryInfo = {}, updateLibraryInfo } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    name: libraryInfo.name || '',
    address: libraryInfo.address || '',
    phone: libraryInfo.phone || '',
    email: libraryInfo.email || '',
    workingHours: libraryInfo.workingHours || '',
    about: libraryInfo.about || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLibraryInfo(formData);
    addToast('Kutubxona ma\'lumotlari yangilandi', 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Kutubxona Sozlamalari</h1>
      </div>

      <div className={styles.formCard}>
        <h2 className={styles.sectionTitle}>Umumiy ma'lumotlar</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <Input label="Kutubxona nomi" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <Input label="Manzil" name="address" value={formData.address} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <Input label="Telefon" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <Input label="Ish vaqti" name="workingHours" value={formData.workingHours} onChange={handleInputChange} placeholder="Dushanba-Juma: 09:00 - 18:00" />
            </div>
            
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Kutubxona haqida qisqacha ma'lumot</label>
              <textarea 
                className={styles.textarea}
                name="about" 
                value={formData.about} 
                onChange={handleInputChange} 
                rows={5} 
              />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" type="submit" icon={Save}>O'zgarishlarni saqlash</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLibrary;

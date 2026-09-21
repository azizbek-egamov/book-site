import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { ToastContext } from '../../context/ToastContext';
import { Save, Plus, X, Check, CreditCard } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from '../../styles/AdminCard.module.css';

const AdminCard = () => {
  const { libraryCard = {}, updateLibraryCard } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    name: libraryCard.name || 'Premium Kutubxona Kartasi',
    price: libraryCard.price || 50000,
    duration: libraryCard.duration || 30,
    description: libraryCard.description || 'Cheksiz kitob o\'qish imkoniyati',
    benefits: libraryCard.benefits || ['Bir vaqtning o\'zida 5 tagacha kitob', 'Bepul yetkazib berish']
  });

  const [newBenefit, setNewBenefit] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({ ...formData, benefits: [...formData.benefits, newBenefit.trim()] });
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index) => {
    const updated = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLibraryCard({
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration)
    });
    addToast('Karta ma\'lumotlari muvaffaqiyatli saqlandi', 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Kutubxona Kartasi Sozlamalari</h1>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Asosiy Ma'lumotlar</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <Input label="Karta nomi" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <Input label="Narxi (so'm)" type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <Input label="Muddati (kun)" type="number" name="duration" value={formData.duration} onChange={handleInputChange} required />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Tavsif</label>
                <textarea 
                  className={styles.textarea} 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={3} 
                />
              </div>
            </div>
            
            <div className={styles.benefitsSection}>
              <div className={styles.benefitsHeader}>
                <label className={styles.label}>Afzalliklar</label>
              </div>
              <ul className={styles.benefitsList}>
                {formData.benefits.length === 0 ? (
                  <div className={styles.emptyBenefits}>Hech qanday afzallik qo'shilmagan</div>
                ) : (
                  formData.benefits.map((benefit, index) => (
                    <li key={index} className={styles.benefitItem}>
                      <input 
                        type="text" 
                        value={benefit} 
                        readOnly
                        className={styles.benefitInput} 
                      />
                      <button type="button" onClick={() => handleRemoveBenefit(index)} className={styles.removeBtn}><X size={16} /></button>
                    </li>
                  ))
                )}
                <li className={styles.benefitItem} style={{ marginTop: '0.5rem' }}>
                  <input 
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                    placeholder="Yangi afzallik qo'shish..."
                    className={styles.benefitInput}
                  />
                  <button type="button" onClick={handleAddBenefit} className={styles.addBtn} style={{ padding: '0 1rem' }}><Plus size={18} /> Qo'shish</button>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" type="submit" icon={Save}>Saqlash</Button>
            </div>
          </form>
        </div>

        <div className={styles.previewSection}>
          <h2 className={styles.cardTitle}>Karta ko'rinishi (Preview)</h2>
          <div className={styles.cardPreview}>
            <div className={styles.cardPreviewInner}>
              <div className={styles.cardTop}>
                <div className={styles.cardLogo} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CreditCard size={20} /> Kutubxona Kartasi
                </div>
                <div className={styles.cardDuration}>{formData.duration} kun</div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.previewName}>{formData.name}</h3>
                <div className={styles.previewPrice}>{formatPrice(Number(formData.price || 0))}</div>
                <p className={styles.previewDesc}>{formData.description}</p>
                
                <div className={styles.cardFeatures}>
                  {formData.benefits.slice(0, 4).map((b, i) => (
                    <div key={i} className={styles.featureItem}>
                      <Check size={14} className={styles.check}/> {b}
                    </div>
                  ))}
                  {formData.benefits.length > 4 && (
                    <div className={styles.featureItem}>
                      <Check size={14} className={styles.check}/> + yana {formData.benefits.length - 4} ta
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;

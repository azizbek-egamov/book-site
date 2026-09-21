import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { ToastContext } from '../../context/ToastContext';
import { Plus, Edit2, Trash2, Folder, LayoutGrid, BookOpen, Microscope, Landmark, Sparkles, Code, TrendingUp, Brain, Lightbulb, Baby, User } from 'lucide-react';
import { generateId } from '../../utils/helpers';
import { motion } from 'framer-motion';

import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';

import styles from '../../styles/AdminCategories.module.css';

const IconMap = {
  BookOpen, Microscope, Landmark, Sparkles, Code, TrendingUp, Brain, Lightbulb, Baby, User
};

const AdminCategories = () => {
  const { categories = [], addCategory, updateCategory, deleteCategory } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', icon: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (selectedCategory) {
      updateCategory({ ...selectedCategory, ...formData });
      addToast('Kategoriya yangilandi', 'success');
    } else {
      addCategory({ id: generateId ? generateId() : Date.now().toString(), ...formData });
      addToast('Kategoriya qo\'shildi', 'success');
    }
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({ name: '', icon: '' });
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setFormData({ name: '', icon: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setSelectedCategory(cat);
    setFormData({ name: cat.name, icon: cat.icon || '' });
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
      addToast('Kategoriya o\'chirildi', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className={styles.adminCategories}>
      <div className={styles.header}>
        <h1 className={styles.title}>Kategoriyalar</h1>
        <Button variant="primary" icon={Plus} onClick={openAddModal}>Kategoriya qo'shish</Button>
      </div>

      {categories.length > 0 ? (
        <div className={styles.grid}>
          {categories.map((cat) => (
            <motion.div key={cat.id} className={styles.card}>
              <div className={styles.cardIcon}>
                {(() => {
                  if (!cat.icon) return <Folder size={24} />;
                  const IconComponent = IconMap[cat.icon];
                  if (IconComponent) return <IconComponent size={24} />;
                  return <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>;
                })()}
              </div>
              
              <div className={styles.cardInfo}>
                <h3 className={styles.cardName}>{cat.name}</h3>
              </div>

              <div className={styles.actions}>
                <button onClick={() => openEditModal(cat)} className={styles.editBtn}><Edit2 size={16} /></button>
                <button onClick={() => { setSelectedCategory(cat); setIsDeleteDialogOpen(true); }} className={styles.deleteBtn}><Trash2 size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState icon={LayoutGrid} title="Kategoriyalar topilmadi" description="Hali hech qanday kategoriya qo'shilmagan." actionText="Kategoriya qo'shish" onAction={openAddModal} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCategory ? "Kategoriyani tahrirlash" : "Yangi kategoriya"} size="md">
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <Input label="Nomi" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Masalan: Badiiy adabiyot" />
            <Input label="Ikonka (ixtiyoriy emoji yoki Lucide nomi)" name="icon" value={formData.icon} onChange={handleInputChange} placeholder="Masalan: 📚 yoki BookOpen" />
          </div>
          <div className={styles.modalActions}>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">Bekor qilish</Button>
            <Button variant="primary" type="submit">{selectedCategory ? "Yangilash" : "Saqlash"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleDelete} title="Kategoriyani o'chirish" message={`Rostdan ham "${selectedCategory?.name}" kategoriyasini o'chirmoqchimisiz?`} confirmText="O'chirish" cancelText="Bekor qilish" variant="danger" />
    </div>
  );
};

export default AdminCategories;

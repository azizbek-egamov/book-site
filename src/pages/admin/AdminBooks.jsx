import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { ToastContext } from '../../context/ToastContext';
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';
import { motion } from 'framer-motion';

import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import SearchBar from '../../components/common/SearchBar';

import styles from '../../styles/AdminBooks.module.css';

const AdminBooks = () => {
  const { books = [], categories = [], addBook, updateBook, deleteBook } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  const initialFormState = {
    title: '', author: '', category: '', price: '',
    publishedYear: '', pages: '', isbn: '', coverImage: '',
    description: '', available: true
  };
  const [formData, setFormData] = useState(initialFormState);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchQuery = book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory ? book.category === selectedCategory : true;
      const matchAvailability = selectedAvailability ? book.available.toString() === selectedAvailability : true;
      
      return matchQuery && matchCategory && matchAvailability;
    });
  }, [books, searchQuery, selectedCategory, selectedAvailability]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addBook({
      ...formData,
      price: Number(formData.price) || 0,
      publishedYear: Number(formData.publishedYear) || 0,
      pages: Number(formData.pages) || 0
    });
    addToast('Kitob muvaffaqiyatli qo\'shildi', 'success');
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateBook(selectedBook.id, {
      ...formData,
      price: Number(formData.price) || 0,
      publishedYear: Number(formData.publishedYear) || 0,
      pages: Number(formData.pages) || 0
    });
    addToast('Kitob ma\'lumotlari yangilandi', 'success');
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteBook(selectedBook.id);
    addToast('Kitob o\'chirildi', 'success');
    setIsDeleteDialogOpen(false);
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setFormData(book);
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.adminBooks}>
      <div className={styles.header} style={{ justifyContent: 'flex-end' }}>
        <Button variant="primary" icon={Plus} onClick={() => { setFormData(initialFormState); setIsAddModalOpen(true); }}>
          Kitob qo'shish
        </Button>
      </div>

      <div className={styles.filters}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Kitob yoki avtor bo'yicha qidirish..." />
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Input as="select" name="selectedCategory" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { value: '', label: 'Barcha kategoriyalar' },
              ...categories.map(c => ({ value: c.name, label: c.name }))
            ]}
          />
          <Input as="select" name="selectedAvailability" value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)}
            options={[
              { value: '', label: 'Barcha holatlar' },
              { value: 'true', label: 'Mavjud' },
              { value: 'false', label: 'Band' }
            ]}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        {filteredBooks.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Muqova</th>
                  <th>Sarlavha</th>
                  <th>Avtor</th>
                  <th>Kategoriya</th>
                  <th>Narx</th>
                  <th>Holat</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} className={styles.bookCover} />
                      ) : (
                        <div className={styles.bookCoverPlaceholder}><BookOpen size={20} /></div>
                      )}
                    </td>
                    <td className={styles.bold}>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{formatPrice(book.price)}</td>
                    <td>
                      <Badge variant={book.available ? 'success' : 'warning'}>
                        {book.available ? 'Mavjud' : 'Band'}
                      </Badge>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Button variant="ghost" size="sm" icon={Edit2} onClick={() => openEditModal(book)} />
                        <Button variant="ghost" size="sm" icon={Trash2} onClick={() => { setSelectedBook(book); setIsDeleteDialogOpen(true); }} className={styles.deleteBtn} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={BookOpen} title="Kitoblar topilmadi" description="Qidiruv so'rovingiz bo'yicha hech qanday kitob topilmadi." />
        )}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Yangi kitob qo'shish" size="lg">
        <form onSubmit={handleAddSubmit}>
          <div className={styles.formGrid}>
            <Input label="Sarlavha" name="title" value={formData.title} onChange={handleInputChange} required />
            <Input label="Avtor" name="author" value={formData.author} onChange={handleInputChange} required />
            <Input as="select" label="Kategoriya" name="category" value={formData.category} onChange={handleInputChange} required
              options={[
                { value: '', label: 'Tanlang' },
                ...categories.map(c => ({ value: c.name, label: c.name }))
              ]}
            />
            <Input label="Narx" type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            <Input label="Nashr yili" type="number" name="publishedYear" value={formData.publishedYear} onChange={handleInputChange} />
            <Input label="Sahifalar soni" type="number" name="pages" value={formData.pages} onChange={handleInputChange} />
            <Input label="ISBN" name="isbn" value={formData.isbn} onChange={handleInputChange} />
            <Input label="Muqova rasmi (URL)" name="coverImage" value={formData.coverImage} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup} style={{ marginBottom: '1.25rem' }}>
            <label className={styles.label}>Tavsif</label>
            <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleInputChange} rows={4} />
          </div>
          <div className={styles.checkboxGroup} style={{ marginBottom: '1.5rem' }}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} />
              Mavjud (kitob band emas)
            </label>
          </div>
          <div className={styles.modalActions}>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} type="button">Bekor qilish</Button>
            <Button variant="primary" type="submit">Saqlash</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Kitobni tahrirlash" size="lg">
        <form onSubmit={handleEditSubmit}>
          <div className={styles.formGrid}>
            <Input label="Sarlavha" name="title" value={formData.title} onChange={handleInputChange} required />
            <Input label="Avtor" name="author" value={formData.author} onChange={handleInputChange} required />
            <Input as="select" label="Kategoriya" name="category" value={formData.category} onChange={handleInputChange} required
              options={[
                { value: '', label: 'Tanlang' },
                ...categories.map(c => ({ value: c.name, label: c.name }))
              ]}
            />
            <Input label="Narx" type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            <Input label="Nashr yili" type="number" name="publishedYear" value={formData.publishedYear} onChange={handleInputChange} />
            <Input label="Sahifalar soni" type="number" name="pages" value={formData.pages} onChange={handleInputChange} />
            <Input label="ISBN" name="isbn" value={formData.isbn} onChange={handleInputChange} />
            <Input label="Muqova rasmi (URL)" name="coverImage" value={formData.coverImage} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup} style={{ marginBottom: '1.25rem' }}>
            <label className={styles.label}>Tavsif</label>
            <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleInputChange} rows={4} />
          </div>
          <div className={styles.checkboxGroup} style={{ marginBottom: '1.5rem' }}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} />
              Mavjud (kitob band emas)
            </label>
          </div>
          <div className={styles.modalActions}>
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)} type="button">Bekor qilish</Button>
            <Button variant="primary" type="submit">Yangilash</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog 
        isOpen={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)} 
        onConfirm={handleDelete} 
        title="Kitobni o'chirish" 
        message={`Rostdan ham "${selectedBook?.title}" kitobini o'chirmoqchimisiz?`} 
        confirmText="O'chirish" 
        cancelText="Bekor qilish" 
        variant="danger" 
      />
    </div>
  );
};

export default AdminBooks;

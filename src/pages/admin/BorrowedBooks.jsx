import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { ToastContext } from '../../context/ToastContext';
import { Trash2, Search, BookMarked, CheckCircle } from 'lucide-react';
import { formatDate, formatDateTime } from '../../utils/helpers';

import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import Input from '../../components/common/Input';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Badge from '../../components/common/Badge';

import styles from '../../styles/BorrowedBooks.module.css';

const BorrowedBooks = () => {
  const { borrowedBooks = [], updateBorrowedBook, deleteBorrowedBook, books = [], updateBook } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredRecords = useMemo(() => {
    return borrowedBooks.filter(record => {
      const matchesSearch = record.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            record.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter ? record.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [borrowedBooks, searchQuery, statusFilter]);

  const handleStatusChange = (record, newStatus) => {
    updateBorrowedBook({ ...record, status: newStatus });
    if (newStatus === 'Returned') {
      const book = books.find(b => b.id === record.bookId);
      if (book) {
        updateBook({ ...book, available: true });
      }
    }
    addToast('Holat yangilandi', 'success');
  };

  const handleDelete = () => {
    if (selectedRecord) {
      deleteBorrowedBook(selectedRecord.id);
      addToast('Yozuv o\'chirildi', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedRecord(null);
    }
  };

  return (
    <div className={styles.borrowedBooks}>
      <div className={styles.header}>
        <h1 className={styles.title}>Berilgan Kitoblar</h1>
      </div>

      <div className={styles.filters}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Mijoz yoki kitob bo'yicha qidirish..." />
        <div className={styles.filterGroup}>
          <Input 
            as="select" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'Barcha holatlar' },
              { value: 'Reading', label: 'O\'qilmoqda' },
              { value: 'Returned', label: 'Qaytarilgan' },
              { value: 'Overdue', label: 'Muddati o\'tgan' }
            ]}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        {filteredRecords.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mijoz</th>
                <th>Telefon</th>
                <th>Kitob</th>
                <th>Kategoriya</th>
                <th>Berilgan sana</th>
                <th>Qaytarish sanasi</th>
                <th>Holat</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.customerName}</td>
                  <td>{record.customerPhone}</td>
                  <td>{record.bookTitle}</td>
                  <td>{record.category}</td>
                  <td>{formatDateTime(record.givenDate)}</td>
                  <td>{formatDateTime(record.returnDate)}</td>
                  <td>
                    <Input 
                      as="select"
                      value={record.status}
                      onChange={(e) => handleStatusChange(record, e.target.value)}
                      options={[
                        { value: 'Reading', label: 'O\'qilmoqda' },
                        { value: 'Returned', label: 'Qaytarilgan' },
                        { value: 'Overdue', label: 'Muddati o\'tgan' }
                      ]}
                      className={styles.statusSelect}
                    />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      {record.status !== 'Returned' && (
                        <Button variant="ghost" size="sm" icon={CheckCircle} onClick={() => handleStatusChange(record, 'Returned')} title="Qaytarildi qilish" />
                      )}
                      <Button variant="ghost" size="sm" icon={Trash2} onClick={() => { setSelectedRecord(record); setIsDeleteDialogOpen(true); }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState icon={BookMarked} title="Yozuvlar topilmadi" description="Qidiruv natijalariga mos keladigan berilgan kitoblar yo'q." />
        )}
      </div>

      <ConfirmDialog 
        isOpen={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)} 
        onConfirm={handleDelete} 
        title="Yozuvni o'chirish" 
        message="Rostdan ham bu yozuvni o'chirmoqchimisiz?" 
        confirmText="O'chirish" 
        cancelText="Bekor qilish" 
        variant="danger" 
      />
    </div>
  );
};

export default BorrowedBooks;

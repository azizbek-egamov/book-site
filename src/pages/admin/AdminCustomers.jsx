import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { ToastContext } from '../../context/ToastContext';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import SearchBar from '../../components/common/SearchBar';

import styles from '../../styles/AdminCustomers.module.css';

const AdminCustomers = () => {
  const { customers = [], addCustomer, updateCustomer, deleteCustomer } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const initialFormState = {
    firstName: '',
    lastName: '',
    phone: '',
    cardNumber: '',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormState);

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchQuery = customer.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         customer.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone?.includes(searchQuery) ||
                         customer.cardNumber?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter ? customer.status === statusFilter : true;
      
      return matchQuery && matchStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addCustomer(formData);
    addToast('Mijoz muvaffaqiyatli qo\'shildi', 'success');
    setIsAddModalOpen(false);
    setFormData(initialFormState);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateCustomer(selectedCustomer.id, formData);
    addToast('Mijoz ma\'lumotlari yangilandi', 'success');
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleDelete = () => {
    deleteCustomer(selectedCustomer.id);
    addToast('Mijoz o\'chirildi', 'success');
    setIsDeleteDialogOpen(false);
    setSelectedCustomer(null);
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setFormData(customer);
    setIsEditModalOpen(true);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'warning';
      case 'Blocked': return 'error';
      default: return 'primary';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'Active': return 'Faol';
      case 'Inactive': return 'Nofaol';
      case 'Blocked': return 'Bloklangan';
      default: return status;
    }
  };

  return (
    <div className={styles.adminCustomers}>
      <div className={styles.header} style={{ justifyContent: 'flex-end' }}>
        <Button variant="primary" icon={Plus} onClick={() => { setFormData(initialFormState); setIsAddModalOpen(true); }}>
          Mijoz qo'shish
        </Button>
      </div>

      <div className={styles.filters}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Ism, telefon yoki karta raqami..." />
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Input as="select" name="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'Barcha holatlar' },
              { value: 'Active', label: 'Faol' },
              { value: 'Inactive', label: 'Nofaol' },
              { value: 'Blocked', label: 'Bloklangan' }
            ]}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        {filteredCustomers.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>F.I.SH</th>
                  <th>Telefon</th>
                  <th>Karta raqami</th>
                  <th>A'zo bo'lgan sana</th>
                  <th>Holat</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className={styles.bold}>{customer.firstName} {customer.lastName}</td>
                    <td>{customer.phone}</td>
                    <td><span className={styles.cardNumber}>{customer.cardNumber}</span></td>
                    <td>{formatDate(customer.joinDate)}</td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(customer.status)}>
                        {getStatusText(customer.status)}
                      </Badge>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Button variant="ghost" size="sm" icon={Edit2} onClick={() => openEditModal(customer)} />
                        <Button variant="ghost" size="sm" icon={Trash2} onClick={() => { setSelectedCustomer(customer); setIsDeleteDialogOpen(true); }} className={styles.deleteBtn} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={Users} title="Mijozlar topilmadi" description="Qidiruv so'rovingiz bo'yicha hech qanday mijoz topilmadi." />
        )}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Yangi mijoz" size="md">
        <form onSubmit={handleAddSubmit}>
          <div className={styles.formGrid}>
            <Input label="Ism" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            <Input label="Familiya" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            <Input label="Telefon" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
            <Input label="Karta raqami" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
            <Input as="select" label="Holat" name="status" value={formData.status} onChange={handleInputChange}
              options={[
                { value: 'Active', label: 'Faol' },
                { value: 'Inactive', label: 'Nofaol' },
                { value: 'Blocked', label: 'Bloklangan' }
              ]}
            />
            <Input label="Ro'yxatdan o'tgan sana" type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} required />
          </div>
          <div className={styles.modalActions}>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} type="button">Bekor qilish</Button>
            <Button variant="primary" type="submit">Saqlash</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Mijozni tahrirlash" size="md">
        <form onSubmit={handleEditSubmit}>
          <div className={styles.formGrid}>
            <Input label="Ism" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            <Input label="Familiya" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            <Input label="Telefon" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
            <Input label="Karta raqami" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
            <Input as="select" label="Holat" name="status" value={formData.status} onChange={handleInputChange}
              options={[
                { value: 'Active', label: 'Faol' },
                { value: 'Inactive', label: 'Nofaol' },
                { value: 'Blocked', label: 'Bloklangan' }
              ]}
            />
            <Input label="Ro'yxatdan o'tgan sana" type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} required />
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
        title="Mijozni o'chirish" 
        message={`Rostdan ham "${selectedCustomer?.firstName} ${selectedCustomer?.lastName}"ni o'chirmoqchimisiz?`} 
        confirmText="O'chirish" 
        cancelText="Bekor qilish" 
        variant="danger" 
      />
    </div>
  );
};

export default AdminCustomers;

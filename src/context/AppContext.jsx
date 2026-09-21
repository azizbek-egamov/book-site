import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/helpers';
import { 
  initialBooks, 
  initialCustomers, 
  initialBorrowedBooks, 
  initialCategories, 
  initialLibraryInfo, 
  initialLibraryCard 
} from '../data/initialData';

export const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export function AppProvider({ children }) {
  const [books, setBooks] = useLocalStorage('kutubxona_books', initialBooks || []);
  const [customers, setCustomers] = useLocalStorage('kutubxona_customers', initialCustomers || []);
  
  React.useEffect(() => {
    const brokenImageUrl = "https://images.unsplash.com/photo-1553729459-uj00vbfc5giz?w=400&h=600&fit=crop";
    const fixedImageUrl = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=600&fit=crop";
    
    if (books.some(b => b.coverImage === brokenImageUrl)) {
      setBooks(books.map(b => b.coverImage === brokenImageUrl ? { ...b, coverImage: fixedImageUrl } : b));
    }
  }, [books, setBooks]);
  const [borrowedBooks, setBorrowedBooks] = useLocalStorage('kutubxona_borrowedBooks', initialBorrowedBooks || []);
  const [categories, setCategories] = useLocalStorage('kutubxona_categories', initialCategories || []);
  const [libraryInfo, setLibraryInfo] = useLocalStorage('kutubxona_libraryInfo', initialLibraryInfo || {});
  const [libraryCard, setLibraryCard] = useLocalStorage('kutubxona_libraryCard', initialLibraryCard || {});

  // Books CRUD
  const addBook = (bookData) => {
    const newBook = { ...bookData, id: generateId() };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, bookData) => {
    setBooks(books.map(b => b.id === id ? { ...b, ...bookData } : b));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const getBookById = (id) => books.find(b => b.id === id);

  // Customers CRUD
  const addCustomer = (customerData) => {
    const newCustomer = { ...customerData, id: generateId() };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id, customerData) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...customerData } : c));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const getCustomerById = (id) => customers.find(c => c.id === id);

  // BorrowedBooks CRUD
  const addBorrowedBook = (borrowData) => {
    const newRecord = { ...borrowData, id: generateId() };
    setBorrowedBooks([...borrowedBooks, newRecord]);
  };

  const updateBorrowedBook = (id, borrowData) => {
    setBorrowedBooks(borrowedBooks.map(bb => bb.id === id ? { ...bb, ...borrowData } : bb));
  };

  const deleteBorrowedBook = (id) => {
    setBorrowedBooks(borrowedBooks.filter(bb => bb.id !== id));
  };

  // Categories CRUD
  const addCategory = (categoryData) => {
    const newCategory = { ...categoryData, id: generateId() };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id, categoryData) => {
    setCategories(categories.map(c => c.id === id ? { ...c, ...categoryData } : c));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Stats
  const totalBooks = books.length;
  // availableBooks could be computed by checking which books aren't currently borrowed,
  // or assuming each book object has a `quantity` / `available` property.
  // Assuming a simple setup where a book can be borrowed by one person:
  const borrowedBookIds = borrowedBooks.filter(bb => bb.status === 'Reading' || bb.status === 'Overdue').map(bb => bb.bookId);
  const availableBooks = books.filter(b => !borrowedBookIds.includes(b.id)).length;
  const totalCustomers = customers.length;
  const totalBorrowed = borrowedBooks.length;

  return (
    <AppContext.Provider value={{
      books, addBook, updateBook, deleteBook, getBookById,
      customers, addCustomer, updateCustomer, deleteCustomer, getCustomerById,
      borrowedBooks, addBorrowedBook, updateBorrowedBook, deleteBorrowedBook,
      categories, addCategory, updateCategory, deleteCategory,
      libraryInfo, updateLibraryInfo: setLibraryInfo,
      libraryCard, updateLibraryCard: setLibraryCard,
      totalBooks, availableBooks, totalCustomers, totalBorrowed
    }}>
      {children}
    </AppContext.Provider>
  );
}

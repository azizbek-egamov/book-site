import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import Books from './pages/public/Books';
import BookDetail from './pages/public/BookDetail';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminBooks from './pages/admin/AdminBooks';
import AdminCustomers from './pages/admin/AdminCustomers';
import BorrowedBooks from './pages/admin/BorrowedBooks';
import AdminCard from './pages/admin/AdminCard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminLibrary from './pages/admin/AdminLibrary';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            
            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/books" element={<AdminBooks />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/borrowed-books" element={<BorrowedBooks />} />
              <Route path="/admin/card" element={<AdminCard />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/library" element={<AdminLibrary />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;

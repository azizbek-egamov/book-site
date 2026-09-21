import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';
import { User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from '../../styles/AdminLogin.module.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      addToast('Iltimos barcha maydonlarni to\'ldiring', 'error');
      return;
    }
    const success = login(username.trim(), password.trim());
    if (success) {
      addToast('Tizimga muvaffaqiyatli kirdingiz', 'success');
      navigate('/admin/dashboard');
    } else {
      addToast('Login yoki parol noto\'g\'ri', 'error');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <motion.div 
        className={styles.loginCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.header}>
          <span className={styles.icon}>📚</span>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.subtitle}>Tizimga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            icon={User}
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="primary" fullWidth className={styles.submitBtn}>
            Kirish
          </Button>
        </form>

        <div className={styles.hint}>
          Demo: admin / admin123
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

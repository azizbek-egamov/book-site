import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BookOpen, BookCheck, Users, BookMarked, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { formatPrice, formatDate } from '../../utils/helpers';
import Badge from '../../components/common/Badge';
import { motion } from 'framer-motion';
import styles from '../../styles/Dashboard.module.css';

const COLORS = ['#d4a853', '#8b9dc3', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
const PIE_COLORS = ['#d4a853', '#2a3b5c'];

const Dashboard = () => {
  const { books = [], customers = [], borrowedBooks = [], libraryCard = {}, categories = [] } = useContext(AppContext);

  const totalBooks = books.length;
  const availableBooks = books.filter(b => b.available).length;
  const totalCustomers = customers.length;
  const totalBorrowed = borrowedBooks.length;

  const booksByCategory = categories.map(cat => ({
    name: cat.name,
    count: books.filter(b => b.category === cat.name).length
  }));

  const bookStatusData = [
    { name: 'Mavjud', value: availableBooks },
    { name: 'Band', value: totalBooks - availableBooks }
  ];

  const readingCount = borrowedBooks.filter(b => b.status === 'Reading').length;
  const returnedCount = borrowedBooks.filter(b => b.status === 'Returned').length;
  const overdueCount = borrowedBooks.filter(b => b.status === 'Overdue').length;

  const borrowedStatsData = [
    { name: "O'qilmoqda", value: readingCount },
    { name: "Qaytarilgan", value: returnedCount },
    { name: "Muddati o'tgan", value: overdueCount }
  ];

  const monthlyData = [
    { name: 'Yan', customers: 4, borrowed: 12 },
    { name: 'Fev', customers: 6, borrowed: 18 },
    { name: 'Mar', customers: 8, borrowed: 25 },
    { name: 'Apr', customers: 5, borrowed: 20 },
    { name: 'May', customers: 9, borrowed: 30 },
    { name: 'Iyun', customers: 12, borrowed: 40 },
  ];

  const recentActivity = [...borrowedBooks].slice(-5).reverse();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <div className={styles.statsGrid}>
        <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
          <div className={styles.statIcon}><BookOpen size={24} /></div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Jami Kitoblar</p>
            <h3 className={styles.statValue}>{totalBooks}</h3>
          </div>
        </motion.div>
        
        <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
          <div className={styles.statIcon} style={{ color: 'var(--success)' }}><BookCheck size={24} /></div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Mavjud Kitoblar</p>
            <h3 className={styles.statValue}>{availableBooks}</h3>
          </div>
        </motion.div>
        
        <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
          <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Users size={24} /></div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Mijozlar</p>
            <h3 className={styles.statValue}>{totalCustomers}</h3>
          </div>
        </motion.div>
        
        <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
          <div className={styles.statIcon} style={{ color: 'var(--warning)' }}><BookMarked size={24} /></div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Berilgan Kitoblar</p>
            <h3 className={styles.statValue}>{totalBorrowed}</h3>
          </div>
        </motion.div>
        
        <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
          <div className={styles.statIcon} style={{ color: 'var(--primary)' }}><CreditCard size={24} /></div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Karta Narxi</p>
            <h3 className={styles.statValue}>{formatPrice(libraryCard?.price || 0)}</h3>
          </div>
        </motion.div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Kategoriyalar bo'yicha kitoblar</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={booksByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Kitob holati</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bookStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ color: 'var(--text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid} style={{ marginTop: '1.5rem' }}>
        <div className={`${styles.chartCard} ${styles.fullWidth}`}>
          <h3 className={styles.chartTitle}>Oylik statistika</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="customers" name="Yangi mijozlar" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="borrowed" name="Berilgan kitoblar" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Kitoblar holati statistikasi</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={borrowedStatsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {borrowedStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ color: 'var(--text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.activitySection}>
        <h3 className={styles.sectionTitle}>So'nggi faollik</h3>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mijoz</th>
                <th>Kitob</th>
                <th>Sana</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.length > 0 ? recentActivity.map((activity) => {
                const book = books.find(b => b.id === activity.bookId) || { title: activity.bookTitle || 'Noma\'lum kitob' };
                return (
                  <tr key={activity.id}>
                    <td>{activity.customerName}</td>
                    <td>{book.title}</td>
                    <td>{formatDate(activity.givenDate)}</td>
                    <td>
                      <Badge 
                        variant={activity.status === 'Reading' ? 'warning' : activity.status === 'Returned' ? 'success' : 'error'}
                      >
                        {activity.status === 'Reading' ? 'O\'qilmoqda' : activity.status === 'Returned' ? 'Qaytarilgan' : 'Muddati o\'tgan'}
                      </Badge>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="4" className={styles.emptyCell}>Ma'lumot topilmadi</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

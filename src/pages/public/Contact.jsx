import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import styles from '../../styles/Contact.module.css';

// Using a basic mock ToastContext since it might not exist yet
const Contact = () => {
  const { libraryInfo } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Biz bilan bog'laning</h1>
          <p>Savollaringiz bo'lsa bizga yozing, tez orada javob beramiz</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contactLayout}>
          {/* Info Column */}
          <motion.div 
            className={styles.infoColumn}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconWrapper}><MapPin /></div>
              <div>
                <h3>Manzil</h3>
                <p>{libraryInfo?.address}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconWrapper}><Phone /></div>
              <div>
                <h3>Telefon</h3>
                <p>{libraryInfo?.phone}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconWrapper}><Mail /></div>
              <div>
                <h3>Email</h3>
                <p>{libraryInfo?.email}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.infoCard}>
              <div className={styles.iconWrapper}><Clock /></div>
              <div>
                <h3>Ish vaqti</h3>
                <p>{libraryInfo?.workingHours}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            className={styles.formColumn}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.formCard}>
              <h2>Xabar yuborish</h2>
              {showSuccess && (
                <div className={styles.successMessage}>
                  Xabaringiz muvaffaqiyatli yuborildi! Rahmat.
                </div>
              )}
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Ismingiz</label>
                  <input 
                    type="text" id="name" name="name" 
                    required placeholder="Masalan: Alisher"
                    value={formData.name} onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" id="email" name="email" 
                    required placeholder="email@manzil.uz"
                    value={formData.email} onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Mavzu</label>
                  <input 
                    type="text" id="subject" name="subject" 
                    required placeholder="Murojaat mavzusi"
                    value={formData.subject} onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Xabar</label>
                  <textarea 
                    id="message" name="message" rows="5" 
                    required placeholder="Xabaringizni yozing..."
                    value={formData.message} onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Yuborilmoqda...' : (
                    <>Yuborish <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          className={styles.mapSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.mapPlaceholder}>
            <MapPin size={48} className={styles.mapIcon} />
            <h3>Xarita</h3>
            <p>Xarita moduli shu yerga joylashtiriladi</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

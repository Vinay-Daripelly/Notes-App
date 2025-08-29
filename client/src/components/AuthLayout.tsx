import React from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {children}
      </div>
      <div className={styles.imageContainer}>
        <img src="/background.jpg" alt="Decorative background" className={styles.image} />
      </div>
    </div>
  );
};

export default AuthLayout;
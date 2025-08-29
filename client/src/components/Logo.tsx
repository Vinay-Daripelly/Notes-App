import React from 'react';
import logoImage from '../assets/logo.png'; 
import styles from './Logo.module.css';     

const Logo: React.FC = () => {
  // 3. Render a standard img tag
  return (
    <img 
      src={logoImage} 
      alt="HD Logo" 
      className={styles.logo} 
    />
  );
};

export default Logo;
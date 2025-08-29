// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './Header.module.css';

// const Header: React.FC = () => {
//   const [userName, setUserName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userInfo = localStorage.getItem('userInfo');
//     if (userInfo) {
//       setUserName(JSON.parse(userInfo).name);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     navigate('/');
//   };

//   return (
//     <header className={styles.header}>
//       <h1 className={styles.userName}>{userName}</h1>
//       <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUserName(JSON.parse(userInfo).name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully!'); 
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.userName}>{userName}</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

interface SignUpFormProps {
  toggleForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    try {
      const { data } = await registerUser({ name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Sign up</h2>
      <p className={styles.subtitle}>Start your free trial to get started</p>
      
      {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
      
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input type="text" id="name" className={styles.input} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input type="email" id="email" className={styles.input} placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input type="password" id="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <button type="submit" className={styles.button}>Sign up</button>

      <p className={styles.toggleText}>
        Already have an account? <button type="button" onClick={toggleForm} className={styles.toggleLink}>Sign in</button>
      </p>
    </form>
  );
};

export default SignUpForm;
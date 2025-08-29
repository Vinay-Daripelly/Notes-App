import React from 'react';
import styles from './Form.module.css';
import Logo from './Logo';
import GoogleLoginButton from './GoogleLoginButton';
interface Props {
  isLogin: boolean;
  isLoading: boolean;
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  handleSubmitEmail: (e: React.FormEvent) => void;
  toggleForm: () => void;
}

const EnterEmailStep: React.FC<Props> = ({ isLogin, email, setEmail, name, setName, handleSubmitEmail, toggleForm ,isLoading}) => {
  return (
    <form className={`${styles.form} ${isLogin ? styles.loginCard : styles.signupCard}`} onSubmit={handleSubmitEmail}>
        <div className={styles.titleHeader}>
        <Logo />
        </div>
        <h2 className={styles.title}>{isLogin ? 'Sign in' : 'Sign up'}</h2>
      <p className={styles.subtitle}>{isLogin ? 'Please enter your email to receive an OTP' : 'Create an account to get started'}</p>
      
      {!isLogin && (
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" id="name" className={styles.input} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input type="email" id="email" className={styles.input} placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}> {isLoading ? 'Sending...' : 'Get OTP'}</button>
      <GoogleLoginButton />
      <p className={styles.toggleText}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button type="button" onClick={toggleForm} className={styles.toggleLink}>
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </form>
  );
};

export default EnterEmailStep;
import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';

interface Props {
  otp: string;
  setOtp: (otp: string) => void;
  handleSubmitOtp: (e: React.FormEvent) => void;
  onResendOtp: () => void;
  isLogin: boolean;
  isLoading: boolean;
}

const EnterOtpStep: React.FC<Props> = ({ otp, setOtp, handleSubmitOtp, onResendOtp,isLogin ,isLoading}) => {
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendClick = () => {
    onResendOtp();     
    setCountdown(60);  
  };

  return (
    <form className={`${styles.form} ${isLogin ? styles.loginCard : styles.signupCard}`} onSubmit={handleSubmitOtp}>
      <h2 className={styles.title}>Enter OTP</h2>
      <p className={styles.subtitle}>A 6-digit OTP has been sent to your email.</p>
      
      <div className={styles.inputGroup}>
        <label htmlFor="otp" className={styles.label}>OTP</label>
        <input type="text" id="otp" className={styles.input} value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={6} />
      </div>

      <div className={styles.resendContainer}>
        <button 
          type="button" 
          onClick={handleResendClick} 
          className={styles.toggleLink}
          disabled={countdown > 0} // Disable button while countdown is active
        >
          Resend OTP
        </button>
        {countdown > 0 && (
          <span className={styles.timerText}>in {countdown}s</span>
        )}
      </div>

      <button type="submit" className={styles.button}disabled={isLoading}>
  {isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
    </form>
  );
};

export default EnterOtpStep;
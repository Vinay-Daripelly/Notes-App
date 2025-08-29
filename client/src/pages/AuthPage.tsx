import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import EnterEmailStep from '../components/EnterEmailStep';
import EnterOtpStep from '../components/EnterOtpStep';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import {  requestOtp, verifyOtp } from '../services/api';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<'enterDetails' | 'enterOtp'>('enterDetails');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(prevState => !prevState);
    setError('');
  };

// const handleGetOtp = async (e?: React.FormEvent) => {
//     if (e) {
//       e.preventDefault(); 
//     }
//     setError('');
//     try {
//       if (!isLogin) {
//         await registerUser({ name, email });
//       }
//       await requestOtp({ email });
//       setStep('enterOtp');
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };
  
const handleGetOtp = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      setLoading(true);
    }
    setError('');

    try {
      // One single API call for both sign-in and sign-up!
      const userData = isLogin ? { email } : { email, name };
      await requestOtp(userData);
      setStep('enterOtp');
    } catch (err: any) {
      console.error("Authentication Error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
    finally {
      setLoading(false); 
    }
  };

const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setError('');
    try {
      const { data } = await verifyOtp({ email, otp });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
    finally {
      setLoading(false); 
    }
  };
  
  return (
    <AuthLayout>
      {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
      {step === 'enterDetails' ? (
        <EnterEmailStep 
          isLogin={isLogin} 
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          handleSubmitEmail={handleGetOtp}
          toggleForm={toggleForm}
          isLoading={loading} 
        />
      ) : (
        <EnterOtpStep 
          otp={otp}
          setOtp={setOtp}
          handleSubmitOtp={handleSubmitOtp}
          onResendOtp={handleGetOtp} 
          isLogin={isLogin}
          isLoading={loading}
        />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
        console.log("Authorization Code:", codeResponse.code);
      try {
        const { data } = await API.post('/users/google', {
          code: codeResponse.code,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/dashboard');
      } catch (error) {
        toast.error('Google login failed. Please try again.');
        console.error(error);
      }
    },
    onError: () => {
      toast.error('Google login failed. Please try again.');
    },
    flow: 'auth-code', // This is important for backend handling
  });

  return (
    <button onClick={() => 
    {console.log('Google button clicked!'); 
    login()}} type="button" className="google-btn">
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" />
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Interceptor to add the token to every request
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

// NEW Auth API calls
export const requestOtp = (userData: { email: string; name?: string }) => API.post('/users/request-otp', userData);
export const verifyOtp = (userData: { email: string; otp: string }) => API.post('/users/verify-otp', userData);

// Notes API calls
export const getNotes = () => API.get('/notes');
export const createNote = (newNote: any) => API.post('/notes', newNote);
export const deleteNote = (id: string) => API.delete(`/notes/${id}`);
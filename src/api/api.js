import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercept requests to include token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const register = (userData) => api.post('account/register/', userData);

export const login = async (credentials) => {
  const res = await api.post('account/login/', credentials);
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const logout = async () => {
  await api.post('/logout/');
  localStorage.removeItem('token');
  window.location.href = '/'; // Redirect to home and refresh
};

export const fetchUsers = () => api.get('/show/');

export const getUserDetail = (userId) => api.get(`/${userId}/show/`);

export const updateUser = (userId, updateData) => api.put(`/${userId}/update/`, updateData);

export const deleteUser = (userId) => api.delete(`/${userId}/delete/`);

export const approveUser = (userId) => api.post(`/${userId}/approve/`);

export const resetPassword = (email) => api.post('/password/reset/', { email });

export const confirmReset = (data) => api.post('/password/reset/confirm/', data);

export const getResetToken = (data) => api.post('/password/reset-token/', data);

export const requestCode = () => api.post('/request-code/');

export const verifyCode = (data) => api.post('/verify-code/', data);

export const profileOnboarding = (userId, profileData) =>
  api.post(`/${userId}/profileonboarding/`, profileData);

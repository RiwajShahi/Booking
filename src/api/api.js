import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Create the Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercept requests to include token if available
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Explicitly set token in default headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Optional: export token getter
export const getAuthToken = getToken;

// Register new user
export const register = async ({ username, email, password }) => {
  // Don't attach token here
  try {
    const response = await axios.post(`${API_BASE}/account/register/`, {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};
// Log in existing user
export const login = async (credentials) => {
  try {
    const res = await api.post('account/login/', credentials);
    const token = res.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token); // ✅ Set token in Axios
    return res.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.post('/logout/'); // Optional: depends on your backend
  } catch (error) {
    console.warn("Logout request failed (ignored):", error.message);
  } finally {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to home
  }
};

// ========================
// User Management APIs
// ========================

export const fetchUsers = () => api.get('/show/');
export const getUserDetail = (userId) => api.get(`/${userId}/show/`);
export const updateUser = (userId, updateData) => api.put(`/${userId}/update/`, updateData);
export const deleteUser = (userId) => api.delete(`/${userId}/delete/`);
export const approveUser = (userId) => api.post(`/${userId}/approve/`);

// ========================
// Password Reset APIs
// ========================

export const resetPassword = (email) => api.post('/password/reset/', { email });
export const confirmReset = (data) => api.post('/password/reset/confirm/', data);
export const getResetToken = (data) => api.post('/password/reset-token/', data);

// ========================
// Verification Code APIs
// ========================

export const requestCode = () => api.post('/request-code/');
export const verifyCode = (data) => api.post('/verify-code/', data);

// ========================
// Onboarding API
// ========================

export const profileOnboarding = (id, formData) => {
  return api.post(`account/${id}/profileonboarding/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

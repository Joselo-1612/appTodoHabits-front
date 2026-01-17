import axios, { AxiosRequestConfig } from 'axios';

export const tokenItem: string | null = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenItem}`
  }
};

export const clientAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL
});

export const clientAuth = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  headers: config.headers
});

clientAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
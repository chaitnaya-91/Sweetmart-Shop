import axios from 'axios';
export const BaseUrl = 'http://localhost:4000';

const instance = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});

export const get = (url: string, params?: any) => instance.get(url, { params });
export const post = (url: string, data?: any) => instance.post(url, data);
export const put = (url: string, data?: any) => instance.put(url, data);
export const delet = (url: string) => instance.delete(url);
export const patch = (url: string, data?: any) => instance.patch(url, data);

// Interceptors (optional, but helpful for logging)
instance.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

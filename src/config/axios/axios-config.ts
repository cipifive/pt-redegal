import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
}); 

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiKey = import.meta.env.VITE_API_KEY; 
    const defaultParam = `apikey=${apiKey}`;

    if (config.url) {
      
      if (config.url.includes('?')) {
        config.url += `&${defaultParam}`;
      } else {
        config.url += `?${defaultParam}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
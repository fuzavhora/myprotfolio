import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
  });
  

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage, or Redux state
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

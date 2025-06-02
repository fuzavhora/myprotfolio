// Remove the static Authorization header from axios.create()
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || "https://portfolio-server-sr3n.onrender.com/project",
  baseURL: process.env.REACT_APP_API_URL ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// ✅ Add interceptor to fetch token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // or SecureStore/AsyncStorage in React Native
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;

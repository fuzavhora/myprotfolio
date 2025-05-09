import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
  });
  

// Add a request interceptor to include the token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // or sessionStorage, or Redux state
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;

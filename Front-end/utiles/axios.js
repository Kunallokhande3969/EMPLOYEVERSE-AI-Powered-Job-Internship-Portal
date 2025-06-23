import axios from "axios";

// Create an Axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/", // Use environment variable
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    "Content-Type": "application/json", // Default content type
    Accept: "application/json", // Accept JSON responses
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // You can add authorization tokens here if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";



const instance = axios.create({
  baseURL: "https://carreerhub.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: guard localStorage access so this file is safe during SSR
instance.interceptors.request.use(
  (config) => {
    // Rely on httpOnly cookie auth set by backend. Do NOT read localStorage here to avoid
    // header-vs-cookie mismatch and SSR issues.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    var status = error && error.response && error.response.status;
    if (status === 401) {
      if (typeof window !== "undefined") {
        console.warn("Unauthorized response (401).");

      }
    }
    return Promise.reject(error);
  }
);

export default instance;

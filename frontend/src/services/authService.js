import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // 🔹 Apne backend ka URL daalna

// 🟢 User Register
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed!";
  }
};

// 🟢 User Login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data.user;
  } catch (error) {
    throw error.response?.data?.message || "Login failed!";
  }
};

// 🟢 User Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// 🟢 Get Current User
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// 🟢 Get Auth Token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// 🟢 Setup Axios Auth Header
export const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

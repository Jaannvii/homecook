import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const register = (data) => axios.post(`${API_URL}/auth/register`, data);
const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export { register, login };

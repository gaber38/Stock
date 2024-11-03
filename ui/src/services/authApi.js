import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export const API_URL = 'http://localhost:8080'; 

export const register = async (data) => {
    return await axios.post(`${API_URL}/auth/register`, data);
};

export const login = async (data) => {
    return await axios.post(`${API_URL}/auth/login`, data);
};

export const getAuthConfig = () => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};

export const logout = async () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    return await axios.post(`${API_URL}/logout`, {}, config);
  };

  export const changePassword = async (data, accessToken) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.put(`${API_URL}/auth/change-password`, data, config);
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to change password');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};
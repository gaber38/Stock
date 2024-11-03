import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_URL = 'http://localhost:8080'; 

const api = axios.create({
    baseURL: API_URL,
});


export const register = async (data) => {
    return await axios.post(`${API_URL}/auth/register`, data);
};

export const login = async (data) => {
    return await axios.post(`${API_URL}/auth/login`, data);
};

export const fetchStockExchanges = async () => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.get(`${API_URL}/stockexchange/list`, config);
        return response.data; 
    } 
    catch (error) {
        console.error('Error fetching stock exchanges:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to fetch data');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};
  
export const createStockExchange = async (data) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log(config);
        const response = await axios.post(`${API_URL}/stockExchange/create`, data, config);
        return response.data; 
    } catch (error) {
        console.error('Error creating stock exchange:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to create stock exchange');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};


export const updateStockExchange = async (id, data) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.patch(`${API_URL}/stockexchange/update/${id}`, data, config);
        return response.data; 
    } catch (error) {
        console.error('Error updating stock exchange:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to update stock exchange');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};



export const deleteStockExchange = async (id) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.delete(`${API_URL}/stockexchange/delete/${id}`, config);
        return response.data; 
    } catch (error) {
        console.error('Error deleting stock exchange:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to delete stock exchange');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};



export const addStock = async (id, stockId) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const requestBody = { stockId }; // The request body contains the stockId
        const response = await axios.post(`${API_URL}/stockexchange/add_stock/${id}`, requestBody, config);
        return response.data; 
    } catch (error) {
        console.error('Error adding stock:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to add stock');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};

export const removeStock = async (id, stockId) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const requestBody = { stockId };
        const response = await axios.post(`${API_URL}/stockexchange/remove_stock/${id}`, requestBody, config);
        return response.data; 
    } catch (error) {
        console.error('Error removing stock:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to remove stock');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};


export const fetchStocks = async () => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.get(`${API_URL}/stocks/list`, config); 
        return response.data; 
    } 
    catch (error) {
        console.error('Error fetching stocks:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to fetch data');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};


export const deleteStock = async (id) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.delete(`${API_URL}/stock/delete/${id}`, config);
        return response.data; 
    } catch (error) {
        console.error('Error deleting stock:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to delete stock');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};
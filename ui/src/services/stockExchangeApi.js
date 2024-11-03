import axios from 'axios';
import { API_URL, getAuthConfig } from './authApi'; 

export const fetchStockExchanges = async (page, sortField, sortOrder) => {
    try {
        const config = getAuthConfig();
        const response = await axios.get(`${API_URL}/stockexchanges/list`, {
            params: {
                sortField: sortField,
                sortOrder: sortOrder,
                page: page
            },
            ...config
        }); 

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
        const config = getAuthConfig();
        const response = await axios.post(`${API_URL}/stockExchanges/create`, data, config);
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
        const config = getAuthConfig();

        const response = await axios.put(`${API_URL}/stockexchanges/update/${id}`, data, config);
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
        const config = getAuthConfig();

        const response = await axios.delete(`${API_URL}/stockexchanges/delete/${id}`, config);
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


export const fetchStockExchangeById = async (id) => {
    try {
        const config = getAuthConfig();

        const response = await axios.get(`${API_URL}/stockexchanges/${id}`, config);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching stock exchange:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to fetch data');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};



export const addStock = async (id, stockId) => {
    try {
        const config = getAuthConfig();
        const requestBody = { stockId }; 
        const response = await axios.post(`${API_URL}/stockexchanges/add_stock/${id}`, requestBody, config);
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
        const config = getAuthConfig();

        const requestBody = { stockId };
        const response = await axios.post(`${API_URL}/stockexchanges/remove_stock/${id}`, requestBody, config);
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


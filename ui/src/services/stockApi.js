import axios from 'axios';
import { API_URL, getAuthConfig } from './authApi';


export const fetchStocks = async (page, sortField, sortOrder) => {
    try {
        const config = getAuthConfig();

        const response = await axios.get(`${API_URL}/stocks/list`, {
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


export const createStock = async (data) => {
    try {
        const config = getAuthConfig();
        const response = await axios.post(`${API_URL}/stocks/create`, data, config);
        return response.data; 
    } catch (error) {
        console.error('Error creating stock:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to create stock');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};

export const updateStock = async (id, data) => {
    try {
        const config = getAuthConfig();
        const response = await axios.put(`${API_URL}/stocks/update/${id}`, data, config);
        return response.data; 
    } catch (error) {
        console.error('Error updating stock:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to update stock');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Network error or server is down');
        }
    }
};

export const fetchStockById = async (id) => {
    try {
        const config = getAuthConfig();

        const response = await axios.get(`${API_URL}/stocks/${id}`, config);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching stock:', error);
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
        const config = getAuthConfig();

        const response = await axios.delete(`${API_URL}/stocks/delete/${id}`, config);
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
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addStock } from '../../services/api'; 
import { Alert, Button, Form } from 'react-bootstrap';

const AddStock = () => {
    const { id } = useParams(); 
    const [stockId, setStockId] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addStock(id, stockId); 
            setMessage(response.message); 
            navigate('/stock-exchanges');
        } catch (error) {
            setError(error.response?.data.message || 'An error occurred while adding stock.');
        }
    };

    return (
        <div className="container">
            <h2>Add Stock to Stock Exchange {id}</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="stockId">
                    <Form.Label>Stock ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Stock ID"
                        value={stockId}
                        onChange={(e) => setStockId(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Stock
                </Button>
                <Button variant="secondary" onClick={() => navigate('/')} className="ms-2">
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default AddStock;

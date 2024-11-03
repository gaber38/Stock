import React, { useState } from 'react';
import { createStock } from '../../services/stockApi'; 
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StockCreate = () => {
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStock({
            ...stock,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStock(stock);
            navigate('/stocks/1');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className="my-4">
            <h2>Create Stock</h2>
            {error && <div className="text-danger">Error: {error}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter stock name"
                        name="name"
                        value={stock.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter stock description"
                        name="description"
                        value={stock.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCurrentPrice">
                    <Form.Label>Current Price</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01" 
                        placeholder="Enter current stock price"
                        name="currentPrice"
                        value={stock.currentPrice}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Create</Button>
                <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default StockCreate;

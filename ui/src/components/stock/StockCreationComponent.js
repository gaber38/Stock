import React, { useState } from 'react';
import { createStock } from '../../services/api'; // Ensure this function exists
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StockCreate = () => {
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        name: '',
        description: '',
        currentPrice: 0,
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStock({
            ...stock,
            [name]: name === 'currentPrice' ? parseFloat(value) : value, // Parse current price as a float
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStock(stock); // Ensure this function is implemented
            navigate('/stocks'); // Adjust the navigation path
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
                        placeholder="Enter current price"
                        name="currentPrice"
                        value={stock.currentPrice}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </Container>
    );
};

export default StockCreate;

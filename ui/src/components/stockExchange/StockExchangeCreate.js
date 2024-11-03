import React, { useState } from 'react';
import { createStockExchange } from '../../services/stockExchangeApi'; 
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StockExchangeCreate = () => {
    const navigate = useNavigate();
    const [stockExchange, setStockExchange] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setStockExchange({
            ...stockExchange,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStockExchange(stockExchange);
            navigate('/stock-exchanges/1');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className="my-4">
            <h2>Create Stock Exchange</h2>
            {error && <div className="text-danger">Error: {error}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter stock exchange name"
                        name="name"
                        value={stockExchange.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter stock exchange description"
                        name="description"
                        value={stockExchange.description}
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

export default StockExchangeCreate;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import { updateStockExchange, fetchStockExchanges } from '../../services/api';
import { Container, Form, Button } from 'react-bootstrap';

const StockExchangeUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [stockExchange, setStockExchange] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStockExchange = async () => {
            try {
                const data = await fetchStockExchanges();
                const exchange = data.data.find((ex) => ex.id === parseInt(id));
                if (exchange) {
                    setStockExchange(exchange);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        getStockExchange();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStockExchange({
            ...stockExchange,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStockExchange(id, stockExchange);
            navigate('/stock-exchanges');
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <Container className="my-4">
            <h2>Update Stock Exchange</h2>
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
                
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    );
};

export default StockExchangeUpdate;
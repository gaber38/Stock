import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import { updateStock, fetchStockById } from '../../services/stockApi';
import { Container, Form, Button } from 'react-bootstrap';

const StockUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [stock, setStock] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStock = async () => {
            try {
                const data = await fetchStockById(id);
                setStock(data);
            } catch (error) {
                setError(error.message);
            }
        };

        getStock();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStock({
            ...stock,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStock(id, stock);
            navigate('/stocks/1');
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <Container className="my-4">
            <h2>Update Stock</h2>
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
                        placeholder="Enter stock price"
                        name="currentPrice"
                        value={stock.currentPrice}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Update</Button>
                <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default StockUpdate;
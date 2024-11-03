import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateStock, fetchStocks } from '../../services/api'; // Ensure these functions exist
import { Container, Form, Button } from 'react-bootstrap';

const StockUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        name: '',
        description: '',
        currentPrice: 0,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStock = async () => {
            try {
                const data = await fetchStocks(); // Fetch all stocks
                const foundStock = data.data.find((s) => s.id === parseInt(id));
                if (foundStock) {
                    setStock(foundStock);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        getStock();
    }, [id]);

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
            await updateStock(id, stock); // Ensure this function is implemented
            navigate('/stocks'); // Adjust the navigation path
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
                        placeholder="Enter current price"
                        name="currentPrice"
                        value={stock.currentPrice}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    );
};

export default StockUpdate;

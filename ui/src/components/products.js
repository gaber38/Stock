import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <h1>Welcome Back to the Stock Management App</h1>
            <p>Please select an option to proceed:</p>
            <Button 
                variant="primary" 
                onClick={() => navigate('/stock-exchanges/1')}  
                className="me-3"
            >
                Stock Exchange List
            </Button>
            <Button 
                variant="secondary" 
                onClick={() => navigate('/stocks/1')}  
            >
                Stock List
            </Button>
        </Container>
    );
};

export default Products;
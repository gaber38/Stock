import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteStockExchange } from '../../services/api';
import { Container, Button } from 'react-bootstrap';

const StockExchangeDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteStockExchange(id);
            setConfirmation(true);
            setTimeout(() => {
                navigate('/stock-exchanges');
            }, 2000);
        } catch (error) {
            setError(error.message || 'Failed to delete stock exchange.');
        }
    };


    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <Container className="my-4">
            <h2>Delete Stock Exchange</h2>
            {confirmation ? (
                <div className="text-success">Stock Exchange deleted successfully!</div>
            ) : (
                <>
                    <p>Are you sure you want to delete the stock exchange with ID: {id}?</p>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => navigate('/stock-exchanges')}>Cancel</Button>
                </>
            )}
        </Container>
    );
};

export default StockExchangeDelete;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteStock } from '../../services/api';
import { Container, Button } from 'react-bootstrap';

const StockDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteStock(id);
            setConfirmation(true);
            setTimeout(() => {
                navigate('/stocks');
            }, 2000);
        } catch (error) {
            setError(error.message || 'Failed to delete stock.');
        }
    };


    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <Container className="my-4">
            <h2>Delete Stock</h2>
            {confirmation ? (
                <div className="text-success">Stock deleted successfully!</div>
            ) : (
                <>
                    <p>Are you sure you want to delete the stock with ID: {id}?</p>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => navigate('/stocks')}>Cancel</Button>
                </>
            )}
        </Container>
    );
};

export default StockDelete;
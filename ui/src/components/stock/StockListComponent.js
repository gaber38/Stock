import React, { useEffect, useState } from 'react';
import { fetchStocks, deleteStock } from '../../services/api'; // Ensure these functions exist
import { Table, Pagination, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stocksPerPage] = useState(10);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getStocks = async () => {
            try {
                const data = await fetchStocks(); // Fetch the list of stocks
                setStocks(data.data); // Adjust based on your response structure
            } catch (error) {
                setError(error.message);
            }
        };

        getStocks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this stock?")) {
            try {
                await deleteStock(id); // Ensure this function exists
                setStocks(stocks.filter(stock => stock.id !== id)); // Update local state
                setMessage('Stock deleted successfully');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    // Calculate current stocks
    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

    // Pagination logic
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(stocks.length / stocksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Stocks</h2>
                <Button
                    variant="success"
                    onClick={() => navigate('/create-stock')}
                >
                    Create Stock
                </Button>
            </div>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped bordered hover className="mb-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Current Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStocks.map(stock => (
                        <tr key={stock.id}>
                            <td>{stock.id}</td>
                            <td>{stock.name}</td>
                            <td>{stock.description}</td>
                            <td>{stock.currentPrice.toFixed(2)}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/update-stock/${stock.id}`)}
                                    className="ms-2"
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(stock.id)}
                                    className="ms-2"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                {pageNumbers.map(number => (
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default StockList;

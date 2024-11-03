import React, { useEffect, useState } from 'react';
import { fetchStockExchanges, deleteStockExchange } from '../../services/api';
import { Table, Pagination, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StockExchangeList = () => {
    const [stockExchanges, setStockExchanges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stocksPerPage] = useState(10);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getStockExchanges = async () => {
            try {
                const data = await fetchStockExchanges();
                setStockExchanges(data.data); // Adjust based on your response structure
            } catch (error) {
                setError(error.message);
            }
        };

        getStockExchanges();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteStockExchange(id);
            setStockExchanges(stockExchanges.filter(exchange => exchange.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) return <div>Error: {error}</div>;

    // Calculate current stocks
    const indexOfLastExchange = currentPage * stocksPerPage;
    const indexOfFirstExchange = indexOfLastExchange - stocksPerPage;
    const currentExchanges = stockExchanges.slice(indexOfFirstExchange, indexOfLastExchange);

    // Pagination logic
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(stockExchanges.length / stocksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container className="mt-5"> {/* Add margin from top */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Stock Exchanges</h2>
                <Button
                    variant="success"
                    onClick={() => navigate('/create-stock-exchange')}
                >
                    Create Stock Exchange
                </Button>
            </div>
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Table striped bordered hover className="mb-3"> {/* Add margin at the bottom */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Live in Market</th>
                        <th>Stocks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExchanges.map(exchange => (
                        <tr key={exchange.id}>
                            <td>{exchange.id}</td>
                            <td>{exchange.name}</td>
                            <td>{exchange.description}</td>
                            <td>{exchange.liveInMarket ? 'Yes' : 'No'}</td>
                            <td>{exchange.stocks.length}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/update-stock-exchange/${exchange.id}`)}
                                    className="ms-2"
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(exchange.id)}
                                    className="ms-2"
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => navigate(`/add-stock/${exchange.id}`)}
                                    className="ms-2"
                                >
                                    Add Stock
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => navigate(`/remove-stock/${exchange.id}`)}
                                    className="ms-2"
                                >
                                    Remove Stock
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

export default StockExchangeList;

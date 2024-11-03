import React, { useEffect, useState } from 'react';
import { fetchStockExchanges, deleteStockExchange } from '../../services/stockExchangeApi'; 
import { Table, Pagination, Button, Alert, Container, Dropdown } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const StockExchangeList = () => {
    const navigate = useNavigate();
    const { pageNumber } = useParams(); // Get the page number from the URL
    const [stockExchanges, setStockExchanges] = useState([]);
    const [stocksPerPage] = useState(10);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [sortField, setSortField] = useState('id'); // Default sort field
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

    // Default page number to 1 if pageNumber is null or invalid
    const currentPage = parseInt(pageNumber) > 0 ? parseInt(pageNumber) : 1;

    useEffect(() => {
        const getStockExchanges = async () => {
            try {
                const data = await fetchStockExchanges(currentPage, sortField, sortOrder);
                setStockExchanges(data.data); // Adjust based on your response structure
            } catch (error) {
                setError(error.message);
            }
        };

        getStockExchanges();
    }, [currentPage, sortField, sortOrder]); // Add sortField and sortOrder to dependencies

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this stock exchange?")) {
            try {
                await deleteStockExchange(id);
                setStockExchanges(stockExchanges.filter(exchange => exchange.id !== id));
                setMessage('Stock exchange deleted successfully');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    // Calculate total pages based on your API response
    const totalPages = Math.ceil(stockExchanges.length / stocksPerPage);

    const handlePageChange = (newPage) => {
        navigate(`/stock-exchanges/${newPage}`);
    };

    return (
        <Container className="mt-5">
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

            <div className="mb-3">
                <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Sort by: {sortField} ({sortOrder})
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setSortField('id'); setSortOrder('asc'); }}>ID Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSortField('id'); setSortOrder('desc'); }}>ID Descending</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSortField('name'); setSortOrder('asc'); }}>Name Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSortField('name'); setSortOrder('desc'); }}>Name Descending</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSortField('liveInMarket'); setSortOrder('asc'); }}>Live in Market Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSortField('liveInMarket'); setSortOrder('desc'); }}>Live in Market Descending</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <Table striped bordered hover className="mb-3">
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
                    {stockExchanges.map(exchange => (
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
                                    className="ms-2">
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(exchange.id)}
                                    className="ms-2">
                                    Delete
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => navigate(`/add-stock/${exchange.id}`)}
                                    className="ms-2">
                                    Add Stock
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => navigate(`/remove-stock/${exchange.id}`)}
                                    className="ms-2">
                                    Remove Stock
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default StockExchangeList;

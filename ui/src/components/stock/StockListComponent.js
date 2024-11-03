import React, { useEffect, useState } from 'react';
import { fetchStocks, deleteStock } from '../../services/stockApi'; 
import { Table, Pagination, Button, Alert, Container, Dropdown } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const StockList = () => {
    const navigate = useNavigate();
    const { pageNumber } = useParams();
    const [stocks, setStocks] = useState([]);
    const [stocksPerPage] = useState(10);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    const currentPage = parseInt(pageNumber) > 0 ? parseInt(pageNumber) : 1;

    useEffect(() => {
        const getStocks = async () => {
            try {
                const data = await fetchStocks(currentPage, sortField, sortOrder);
                setStocks(data.data);
            } catch (error) {
                setError(error.message);
            }
        };

        getStocks();
    }, [currentPage, sortField, sortOrder]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this stock?")) {
            try {
                await deleteStock(id);
                setStocks(stocks.filter(stock => stock.id !== id));
                setMessage('Stock deleted successfully');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    const totalPages = Math.ceil(stocks.length / stocksPerPage);

    const handlePageChange = (newPage) => {
        navigate(`/stocks/${newPage}`);
    };

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
                        <Dropdown.Item onClick={() => { setSortField('currentPrice'); setSortOrder('asc'); }}>Price Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSortField('currentPrice'); setSortOrder('desc'); }}>Price Descending</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

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
                    {stocks.map(stock => (
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

export default StockList;

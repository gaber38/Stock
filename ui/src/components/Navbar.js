import React from 'react';
import { Navbar as BootstrapNavbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { authData, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/'); // Redirect to home after logout
    };

    return (
        <BootstrapNavbar bg="light" expand="lg" className="mb-4">
            <BootstrapNavbar.Brand className="ms-3" href="/">Stock Management</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {/* Show Home button only if user is not logged in */}
                {!authData.accessToken && (
                    <Button variant="secondary" className="me-3" onClick={() => navigate('/')}>
                        Home
                    </Button>
                )}
                {/* Show Products and Logout buttons only if user is logged in */}
                {authData.accessToken && (
                    <>
                        <Button variant="secondary" className="me-3" onClick={() => navigate('/products')}>
                            Products
                        </Button>
                        <Button variant="secondary" className="me-3" onClick={() => navigate('/changepassword')}>
                            change password
                        </Button>
                        <Button variant="secondary" className="me-3" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;

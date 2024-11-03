import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <h1>Welcome to Our Application</h1>
            <p>Please select an option to proceed:</p>
            <Button 
                variant="primary" 
                onClick={() => navigate('/register')} 
                className="me-3"
            >
                Register
            </Button>
            <Button 
                variant="secondary" 
                onClick={() => navigate('/login')}
            >
                Login
            </Button>
        </Container>
    );
};

export default AuthPage;

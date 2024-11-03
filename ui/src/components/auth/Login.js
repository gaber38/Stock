import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { login as loginApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Forms/LoginForm'; 
import { Container, Row, Col } from 'react-bootstrap'; 

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(credentials);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Call the login function to update context or state
      login(accessToken, refreshToken);

      // Redirect to the desired page
      navigate('/stock-exchanges');
    } catch (error) {
      console.error('Login error:', error.response.data); // Log the full error for debugging
      if (error.response) {
        const { message, code, errors } = error.response.data;
        // Handle the error response appropriately
        setErrorMessage(errors?.detailed_message || message || 'Login failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5 ms-5"> {/* Add top and left margin */}
      <h2 className="text-center">Login</h2>
      <LoginForm 
        credentials={credentials} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        errorMessage={errorMessage} 
      />
    </Container>
  );
};

export default Login;

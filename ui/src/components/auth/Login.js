import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { login as loginApi } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Forms/LoginForm';
import { Container } from 'react-bootstrap';

const Login = () => {
  const { authData, login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authData.accessToken) {
      navigate('/products'); // Redirect to products if already logged in
    }
  }, [authData, navigate]);

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

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      login(accessToken, refreshToken);
      navigate('/products');
    } catch (error) {
      console.error('Login error:', error.response.data);
      if (error.response) {
        const { message, errors } = error.response.data;
        setErrorMessage(errors?.detailed_message || message || 'Login failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5 ms-5">
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

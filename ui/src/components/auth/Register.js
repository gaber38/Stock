import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { register as registerApi } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../Forms/RegisterForm'; 
import { Container } from 'react-bootstrap'; 

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { authData, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authData.accessToken) {
      navigate('/products'); // Redirect to products if already logged in
    }
  }, [authData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await registerApi(formData);
      const { accessToken, refreshToken } = response.data;
      login(accessToken, refreshToken);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        const { message, errors } = error.response.data;
        setErrorMessage(errors?.detailed_message || message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5 ms-5"> {/* Add top and left margin */}
      <h2 className="text-center">Register</h2>
      <RegisterForm 
        formData={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        errorMessage={errorMessage} 
      />
    </Container>
  );
};

export default Register;

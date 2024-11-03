import React, { useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { logout as logoutApi } from '../../services/authApi';

const Logout = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutApi(); 
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('refreshToken');
        logout(); 
        navigate('/'); 
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    performLogout();
  }, [logout, navigate]); 

  return (
    <Container className="mt-5">
      <h2 className="text-center">Logging Out...</h2>
      <Alert variant="info">You have been logged out successfully.</Alert>
    </Container>
  );
};

export default Logout;

import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { changePassword } from '../../services/authApi';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const ChangePassword = () => {
  const { authData } = useAuth();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmationPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmationPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        confirmationPassword: passwords.confirmationPassword
      }, authData.accessToken);

      setSuccessMessage("Password changed successfully.");
      setErrorMessage('');
      setPasswords({ currentPassword: '', newPassword: '', confirmationPassword: '' });
    } catch (error) {
      console.error('Change password error:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Change Password</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCurrentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmationPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmationPassword"
            value={passwords.confirmationPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Change Password
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;

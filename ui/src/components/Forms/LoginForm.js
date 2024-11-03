import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = ({ credentials, handleChange, handleSubmit, errorMessage }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>

      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>} {/* Display error message */}
    </Form>
  );
};

export default LoginForm;

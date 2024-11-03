import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = ({ formData, handleChange, handleSubmit, errorMessage }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstname">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
      </Form.Group>

      <Form.Group controlId="formLastname">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </Form.Group>

      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Register
      </Button>

      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>} {/* Display error message */}
    </Form>
  );
};

export default RegisterForm;

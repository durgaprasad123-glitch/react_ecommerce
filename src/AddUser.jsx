// src/AddUser.jsx
import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.get('http://localhost:8000/api/get-csrf-token/', {
        withCredentials: true,
      });

      const response = await axios.post(
        'http://localhost:8000/api/register/',
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': document.cookie
              .match(/csrftoken=([^;]+)/)?.[1] || '',
          },
        }
      );
      setSuccess('User added successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add user');
    }
  };

  return (
    <Container className="my-5">
      <h2>Add User</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </Container>
  );
}

export default AddUser;
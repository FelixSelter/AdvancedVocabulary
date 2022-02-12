import React from 'react';
import { Form, Button } from 'react-bootstrap';

/**
 * The login form
 * @return {JSX.Element} login form
 */
export default function Login() {
  return (
    <Form>
      <div className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Email address" size="lg" />
        <Form.Text className="text-muted">
          We will never share your email with anyone else
        </Form.Text>
      </div>

      <div className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" size="lg" />
      </div>

      <div className="mb-4">
        <Form.Label>Repeat your password</Form.Label>
        <Form.Control type="password" placeholder="Password" size="lg" />
      </div>

      <div className="mb-1 d-flex justify-content-around">
        <Button type="submit" variant="primary">
          Create a new account
        </Button>
      </div>
    </Form>
  );
}

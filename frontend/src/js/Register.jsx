import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

/**
 * The login form
 * @return {JSX.Element} login form
 */
export default function Login() {
  /**
   * If the user filled out the form correctly
   * and the request can be send to the server
   * @type {Boolean}
   */
  const [validated, setValidated] = useState(false);

  /**
   * Validates the form so custom visual feedback can be applied
   * @param {MouseEvent} event ClickEvent
   */
  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // display the highlights
    setValidated(true);
  }

  /**
   * @param {Event} event ChangeEvent
   */
  function ensurePasswordsMatch(event) {
    document.getElementById('repeatPassword').pattern = event.target.value;
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Email address"
          size="lg"
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          <p>
            Please specify an actual email address.
            <br />
            We will send you a confirmation email
          </p>
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          We will never share your email with anyone else
        </Form.Text>
      </div>

      <div className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          size="lg"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          onChange={ensurePasswordsMatch}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          <p>
            Your password needs to contain at least 8 characters, a number,
            <br /> a special character, an upper and a lower case letter.
          </p>
        </Form.Control.Feedback>
      </div>

      <div className="mb-4">
        <Form.Label>Repeat your password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          size="lg"
          id="repeatPassword"
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          <p>Your passwords needs to match.</p>
        </Form.Control.Feedback>
      </div>

      <div className="mb-1 d-flex justify-content-around">
        <Button type="submit" variant="primary">
          Create a new account
        </Button>
      </div>
    </Form>
  );
}

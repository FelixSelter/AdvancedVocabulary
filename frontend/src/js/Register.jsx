import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * The login form
 * @return {JSX.Element} login form
 */
export default function Login() {
  /**
   * @type {function} translates the given key
   */
  const { t } = useTranslation();

  /**
   * @type {function} Used to navigate to / after Register is complete
   */
  const redirect = useNavigate();

  /**
   * If the user filled out the form correctly
   * and the request can be send to the server
   * @type {Boolean}
   */
  const [validated, setValidated] = useState(false);

  /**
   * The email address inside the form
   * @type {String}
   */
  const [email, setEmail] = useState('');

  /**
   * The email address inside the form
   * @type {String}
   */
  const [usernameComment, setUsernameComment] = useState(null);

  /**
   * The password inside the form
   * @type {String}
   */
  const [password, setPassword] = useState('');

  /**
   * Validates the form so custom visual feedback can be applied
   * @param {MouseEvent} event ClickEvent
   * @param {Object} redirect The useNavigate() object from the react router lib
   */
  async function handleSubmit(event, redirect) {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.checkValidity()) {
      try {
        await axios.post(
          process.env.REACT_APP_BACKEND + 'register',
          { email, password },
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        );

        redirect('/');
      } catch (error) {
        // The only error can be username taken
        // password and email validity is checked by the form so they are correct for sure
        setUsernameComment(t('email_taken'));
      }
    }

    // display the highlights
    setValidated(true);
  }

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={(event) => {
        handleSubmit(event, redirect);
      }}
      action=""
    >
      <div className="mb-3">
        <Form.Label> {t('email_address')}</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder={t('email_address')}
          size="lg"
          onChange={(event) => setEmail(event.target.value)}
        />

        <Form.Control.Feedback type="valid">
          {t('positive_feedback')}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          <p>{t('email_specify')}</p>
        </Form.Control.Feedback>
        <Form.Text className="text-muted">{t('email_disclaimer')}</Form.Text>
        {usernameComment !== null && (
          <Alert variant="danger">{usernameComment}</Alert>
        )}
      </div>

      <div className="mb-3">
        <Form.Label> {t('password')}</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder={t('password')}
          size="lg"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          onChange={(event) => {
            document.getElementById('repeatPassword').pattern =
              event.target.value;
            setPassword(event.target.value);
          }}
        />
        <Form.Control.Feedback type="valid">
          {' '}
          {t('positive_feedback')}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          <p>{t('password_requirements')}</p>
        </Form.Control.Feedback>
      </div>

      <div className="mb-4">
        <Form.Label> {t('password_repeat')}</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          size="lg"
          id="repeatPassword"
        />
        <Form.Control.Feedback type="valid">
          {t('positive_feedback')}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          <p> {t('password_match')}</p>
        </Form.Control.Feedback>
      </div>

      <div className="mb-1 d-flex justify-content-around">
        <Button type="submit" variant="primary">
          {t('account_create')}
        </Button>
      </div>
    </Form>
  );
}

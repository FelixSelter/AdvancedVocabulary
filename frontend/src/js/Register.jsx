import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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
        <Form.Label> {t('email_address')}</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder={t('email_address')}
          size="lg"
        />
        <Form.Control.Feedback type="valid">
          {t('positive_feedback')}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          <p>{t('email_specify')}</p>
        </Form.Control.Feedback>
        <Form.Text className="text-muted">{t('email_disclaimer')}</Form.Text>
      </div>

      <div className="mb-3">
        <Form.Label> {t('password')}</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder=" {t('password')}"
          size="lg"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          onChange={ensurePasswordsMatch}
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
          {' '}
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

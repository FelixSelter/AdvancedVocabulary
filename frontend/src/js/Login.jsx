import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form, Button, Popover, OverlayTrigger, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * The login form
 * @param {Object} props
 * @param {String} props.tab The currently active tab (login or register)
 * @return {JSX.Element} login form
 */
export default function Login(props) {
  /**
   * @type {function} translates the given key
   */
  const { t } = useTranslation();

  /**
   * @type {function} Used to navigate to / after Register is complete
   */
  const redirect = useNavigate();

  /**
   * An error message that gets displayed when set
   * @type {String}
   */
  const [statusInfo, setStatusInfo] = useState(null);

  /**
   * If the guest info is active or not
   * @type {Boolean}
   */
  const [showGuestInfo, setShowGuestInfo] = useState(false);

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
   * The password inside the form
   * @type {String}
   */
  const [password, setPassword] = useState('');

  /**
   * The popover that shows information about the guest login
   * @type {JSX.Element}
   */
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="d-flex flex-column">
        <p>{t('guest_info')}</p>
        <div className="d-flex justify-content-around">
          <Button variant="primary" className="text-center" size="sm">
            {t('guest_create')}
          </Button>
          <Button variant="danger" className="text-center" size="sm">
            {t('guest_close')}
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  /**
   * Validates the form so custom visual feedback can be applied
   * @param {MouseEvent} event ClickEvent
   */
  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.checkValidity()) {
      try {
        await axios.post(
          process.env.REACT_APP_BACKEND + 'login',
          { email, password },
          {
            withCredentials: true,
            headers: {
              'content-type': 'application/json',
            },
          }
        );

        redirect('/');
      } catch (error) {
        // Acount information is wrong
        setStatusInfo(t('auth_failed'));
      }
    }
    // display the highlights
    setValidated(true);
  }

  // hide the popover if login is not active
  // TODO: If the popover is active and the tab is switched,
  // it appears at the top left before closing
  if (showGuestInfo === true && props.tab !== 'login') setShowGuestInfo(false);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="mb-3">
        <Form.Label>{t('email_address')}</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder={t('email_address')}
          size="lg"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Form.Text className="text-muted">{t('email_disclaimer')}</Form.Text>
        {statusInfo !== null && <Alert variant="danger">{statusInfo}</Alert>}
      </div>

      <div className="mb-1">
        <Form.Label>{t('password')}</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder={t('password')}
          size="lg"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <a className="underlineHover" href="#">
          {t('forgot_password')}
        </a>
      </div>

      <div className="mb-1 d-flex justify-content-around">
        <Button type="submit" variant="primary">
          {t('login')}
        </Button>

        <OverlayTrigger
          show={showGuestInfo}
          placement="right"
          overlay={popover}
        >
          <Button
            variant="secondary"
            onClick={() => setShowGuestInfo(!showGuestInfo)}
          >
            {t('guest_login')}
          </Button>
        </OverlayTrigger>
      </div>
    </Form>
  );
}
Login.propTypes = {
  tab: PropTypes.string.isRequired,
};

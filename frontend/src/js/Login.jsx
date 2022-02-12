import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

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
  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
        />
        <Form.Text className="text-muted">{t('email_disclaimer')}</Form.Text>
      </div>

      <div className="mb-1">
        <Form.Label>{t('password')}</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder={t('password')}
          size="lg"
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

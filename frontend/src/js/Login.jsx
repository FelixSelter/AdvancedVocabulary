import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

/**
 * The popover that shows information about the guest login
 * @type {JSX.Element}
 */
const popover = (
  <Popover id="popover-basic">
    <Popover.Body className="d-flex flex-column">
      <p>
        You can try our website as a Guest. However your Account will be deleted
        after 48 hours. You can migrate your Guest Account to an actual one at
        any time!
      </p>
      <div className="d-flex justify-content-around">
        <Button variant="primary" className="text-center" size="sm">
          Create a Guest Account
        </Button>
        <Button variant="danger" className="text-center" size="sm">
          Close
        </Button>
      </div>
    </Popover.Body>
  </Popover>
);

/**
 * The login form
 * @param {Object} props
 * @param {String} props.tab The currently active tab (login or register)
 * @return {JSX.Element} login form
 */
export default function Login(props) {
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
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Email address"
          size="lg"
        />
        <Form.Text className="text-muted">
          We will never share your email with anyone else
        </Form.Text>
      </div>

      <div className="mb-1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          size="lg"
        />
      </div>

      <div className="mb-4">
        <a className="underlineHover" href="#">
          Forgot Password?
        </a>
      </div>

      <div className="mb-1 d-flex justify-content-around">
        <Button type="submit" variant="primary">
          Log in
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
            Log in as Guest
          </Button>
        </OverlayTrigger>
      </div>
    </Form>
  );
}
Login.propTypes = {
  tab: PropTypes.string.isRequired,
};

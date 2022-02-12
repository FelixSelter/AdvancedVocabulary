import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Login from './Login';
import Register from './Register';

import '../css/Auth.css';

/**
 * This Component handles login and registration
 * @return {JSX.Element} Auth Component
 */
export default function Auth() {
  /**
   * The currently active tab
   * Needed so it can be passed down to login so it can hide the guest popover
   * @type {String}
   */
  const [tab, setTab] = useState('login');

  return (
    <div
      className="
      auth-container
      vh-100 d-flex
      justify-content-center
      align-items-center"
    >
      <div className="auth">
        <Tabs
          defaultActiveKey="login"
          className="mb-3"
          activeKey={tab}
          onSelect={(tab) => setTab(tab)}
        >
          <Tab eventKey="login" title="Login">
            <Login tab={tab} />
          </Tab>

          <Tab eventKey="register" title="Register">
            <Register />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

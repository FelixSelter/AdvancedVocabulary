import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

/**
 * A component that redirects in case the user is not or is authenticated
 * @param {Boolean} shouldBeAuthenticated If true the content reders when authenticated. If false the content renders when not authenticated
 * @return {JSX.Element}
 */
export default function RouteProtector({ shouldBeAuthenticated, redirectTo }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(async () => {
    try {
      await axios.get(process.env.REACT_APP_BACKEND + 'AuthCheck', {
        withCredentials: true, // This is important else it wont send the session cookie
      });
      setAuthenticated(true); // The user is authenticated
    } catch (error) {
      setAuthenticated(false); // the user is not authenticated
    }
  });

  switch (authenticated) {
    case null: {
      return <p>Loading</p>;
    }
    case shouldBeAuthenticated: {
      return <Outlet />;
    }
    default: {
      return <Navigate to={redirectTo} />;
    }
  }
}
RouteProtector.propTypes = {
  shouldBeAuthenticated: PropTypes.bool,
  redirectTo: PropTypes.string,
};

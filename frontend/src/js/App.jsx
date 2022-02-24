import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './Auth.jsx';
import Home from './Home.jsx';
import RouteProtector from './RouteProtector.jsx';

/**
 * The Root component of the application.
 * Handles the routing
 * @return {JSX.Element} Root component
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteProtector
              shouldBeAuthenticated={true}
              redirectTo={'/login'}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          path="/"
          element={
            <RouteProtector shouldBeAuthenticated={false} redirectTo={'/'} />
          }
        >
          <Route path="/login" element={<Auth />} />
        </Route>
      </Routes>
      )
    </BrowserRouter>
  );
}

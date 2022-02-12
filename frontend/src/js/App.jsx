import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './Auth';

/**
 * The Root component of the application.
 * Handles the routing
 * @return {JSX.Element} Root component
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>home</p>} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

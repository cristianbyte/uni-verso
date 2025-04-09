import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>Page not found</h2>
      
      <div className="navigation">
        <Link to="/" className="nav-link">Back to home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
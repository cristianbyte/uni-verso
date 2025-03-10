import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Parece que la canción que buscas no está en nuestra playlist.</p>
      
      <div className="error-image">
        <span className="emoji">🎵❓</span>
      </div>
      
      <div className="navigation">
        <Link to="/" className="nav-link">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
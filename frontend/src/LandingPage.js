import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to 3MTT Movie App</h1>
      <p className="landing-description">
        Discover, search, and save your favorite movies. Sign up or log in to get started!
      </p>
      <div className="landing-buttons">
        <Link to="/login" className="landing-btn">Login</Link>
        <Link to="/register" className="landing-btn">Register</Link>
      </div>
    </div>
  );
}

export default LandingPage;
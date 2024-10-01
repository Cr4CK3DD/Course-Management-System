import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" style={{ marginTop: '20px', textDecoration: 'none', color: '#007bff' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;

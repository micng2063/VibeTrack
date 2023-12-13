import React from 'react';
import { Link } from 'react-router-dom';
import '../css/notfound.css';

const NotFound = () => {
  return (
    <div  style={{backgroundImage:'url(https://i.imgur.com/A6SE0q4.png)',  backgroundPosition: 'left', backgroundSize: 'cover', height: '60vh'}}>
      <div className="not-found-container" style={{margin: '20vh 60vw'}}>
      <h2 className="not-found-title">404 Not Found</h2>
      <p className="not-found-message">Oops! Looks like you followed a bad link. If you think this is a problem with us, please let us know.</p>
      <Link to="/">
        <button className="not-found-button">Return to Homepage</button>
      </Link>
    </div>
    </div>
  );
};

export default NotFound; 
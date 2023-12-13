import React from 'react';
import { Link } from 'react-router-dom';
import '../css/notfound.css'; 

const NetworkError = () => {
  return (
    <div  style={{backgroundImage:'url(https://i.imgur.com/VO79Out.png)',  backgroundPosition: 'right', backgroundSize: 'cover', height: '60vh'}}>
    <div className="not-found-container" style={{margin:'20vh 10vw'}}>
      <h2 className="not-found-title">Network Error</h2>
      <p className="not-found-message">Oops! It seems there was a problem connecting to the network, try reloading the page.</p>
      <Link to="/">
        <button className="not-found-button">Return to Homepage</button>
      </Link>
    </div>
    </div>
  );
};

export default NetworkError;


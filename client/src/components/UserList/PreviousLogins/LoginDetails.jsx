import React from 'react';
import './model.css';

function LoginDetails({ logins, closeModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2>Previous Logins</h2>
        <ul className="login-list">
          {logins.length > 0 ? (
            logins.map((date, index) => (
              <li key={index}>{new Date(date).toLocaleString()}</li>
            ))
          ) : (
            <li>No previous logins available.</li>
          )}
        </ul>
        <button className="close-button" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default LoginDetails;

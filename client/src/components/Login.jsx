import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

const Login = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find((user) => user.email === email);

    if (user) {
      if (user.isBlocked) {
        setErrorMessage('Your account is blocked. Please contact support.');
      } else if (user.password === password) {
        user.previousLogins.push(new Date().toISOString());
        localStorage.setItem('users', JSON.stringify(users)); // Update local storage

        navigate('/user-list');
      } else {
        setErrorMessage('Incorrect password.');
      }
    } else {
      setErrorMessage('User not found.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>

        <button type="submit">Login</button>
      </form>

  
      <p className="redirect-text">
        Don't have an account?{' '}
        <Link to="/" className="redirect-link">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;

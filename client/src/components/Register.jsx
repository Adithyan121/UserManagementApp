import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ addUser }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setErrorMessage('Email is already in use.');
      return;
    }

    if (!isPasswordValid(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.'
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      age,
      designation,
      email,
      password,
      isBlocked: false,
      previousLogins: [],
    };

    addUser(newUser);
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleRegister}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label>Designation:</label>
        <input
          type="text"
          placeholder="Enter your designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
      
      
      <p className="redirect-text">
        Already have an account?{' '}
        <Link to="/login" className="redirect-link">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserLists from './components/UserList/UserLists';
import './styles.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register addUser={addUser} />} />
          <Route path="/user-list" element={<UserLists users={users} setUsers={setUsers} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

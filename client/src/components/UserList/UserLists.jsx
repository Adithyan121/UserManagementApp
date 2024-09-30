import React, { useState } from 'react';
import './style.css';
import LoginDetails from './PreviousLogins/LoginDetails';

function UserList({ users, setUsers }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const handleAction = (id, action) => {
    let updatedUsers;

    switch (action) {
      case 'toggleBlock':
        updatedUsers = users.map((user) =>
          user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        break;

      case 'remove':
        updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        break;

      case 'update':
        const name = prompt('Enter new name:');
        const age = prompt('Enter new age:');
        const designation = prompt('Enter new designation:');

        if (name && age && designation) {
          updatedUsers = users.map((user) =>
            user.id === id ? { ...user, name, age, designation } : user
          );
          setUsers(updatedUsers);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
        break;

      case 'previousLogins':
        const user = users.find((user) => user.id === id);
        if (user && Array.isArray(user.previousLogins)) {
          setModalContent(user.previousLogins);
          setShowModal(true);
        }
        break;

      case 'add':
        const newName = prompt('Enter name:');
        const newAge = prompt('Enter age:');
        const newDesignation = prompt('Enter designation:');
        const newEmail = prompt('Enter email:');
        const newPassword = prompt('Enter password:');

        if (newName && newAge && newDesignation && newEmail && newPassword) {
          const newUser = {
            id: Date.now(),
            name: newName,
            age: newAge,
            designation: newDesignation,
            email: newEmail,
            password: newPassword,
            isBlocked: false,
            previousLogins: [],
          };

          updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className={`user-item ${user.isBlocked ? 'blocked' : ''}`}>
              <span className="user-info">
                {user.name} ({user.age} years, {user.designation}, {user.email})
                {user.isBlocked && <span className="blocked-label"> (Blocked)</span>}
              </span>
              <div className="action-buttons">
                <button
                  onClick={() => handleAction(user.id, 'toggleBlock')}
                  className={user.isBlocked ? 'unblock-button' : 'block-button'}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
                <button onClick={() => handleAction(user.id, 'previousLogins')} className="logins-button">
                  Previous Logins
                </button>
                <button onClick={() => handleAction(user.id, 'update')} className="update-button">
                  Update
                </button>
                <button onClick={() => handleAction(user.id, 'remove')} className="remove-button">
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No users available.</li>
        )}
      </ul>
      <button onClick={() => handleAction(null, 'add')} className="add-button">
        Add User
      </button>

      
      {showModal && (
        <LoginDetails logins={modalContent} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default UserList;

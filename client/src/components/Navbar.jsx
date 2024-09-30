import React from 'react';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div>
      <h1>User Management App</h1>
      {isLoggedIn && <button onClick={() => setIsLoggedIn(false)}>Logout</button>}
    </div>
  );
}

export default Navbar;

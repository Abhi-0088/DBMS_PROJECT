import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout button triggered")
    localStorage.removeItem("token"); // Clear the token
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav style={navStyles.nav}>
      <Link to="/dashboard" style={navStyles.link}>Dashboard</Link>
      {isAdmin && <Link to="/clubmanagement" style={navStyles.link}>Club Management</Link>}
      {isAdmin && <Link to="/createElection" style={navStyles.link}>Create Election</Link>}
      <button onClick={handleLogout} style={navStyles.button}>Logout</button>
    </nav>
  );
}

export default NavBar;

const navStyles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#007bff',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0 10px',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
};

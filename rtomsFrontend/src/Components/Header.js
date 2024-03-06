import React from 'react';
import Logo from '../Assets/RTOMSimages/logo.webp';
const Header = () => {
  return (
    <header className="App-header">
      <div>
      <img src={Logo} className="logo" alt="Logo"/>

      </div>
      <div className="container">
        <h1>RTO Management System</h1>
        </div>
    </header>
    
  );
}

export default Header;

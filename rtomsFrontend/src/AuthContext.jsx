import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if authToken exists in sessionStorage
    const isLoggedIn = !!sessionStorage.authToken;
  
    
    setIsLoggedIn(isLoggedIn);
  }, []);

  const handleLogin = () => {
    // Your logic for handling successful login
    const isLoggedIn = !!sessionStorage.authToken;
    setIsLoggedIn(isLoggedIn);

  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setIsLoggedIn(false);
    history.push('/'); // Redirect to user dashboard

  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

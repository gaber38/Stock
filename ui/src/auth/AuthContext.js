import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    accessToken: null,
    refreshToken: null,
  });

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    
    if (storedAccessToken && storedRefreshToken) {
      setAuthData({
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
      });
    }
  }, []);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuthData({ accessToken, refreshToken });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthData({ accessToken: null, refreshToken: null });
  };

  const isAuthenticated = !!authData.accessToken; // Derive the authentication state

  return (
    <AuthContext.Provider value={{ authData, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

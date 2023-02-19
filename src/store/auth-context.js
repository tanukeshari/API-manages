import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});



export const AuthContextProvider = (props) => {
 
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    
  };

  const logoutHandler = (id) =>{
    setToken(null)
    localStorage.removeItem('token');
  }

  
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout:logoutHandler,
    
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
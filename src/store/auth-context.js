import React, { useState } from 'react';



const AuthContext = React.createContext({
  token: '',
  // user:'',
  isLoggedIn: '',
  login: (token) => {},
  logout: () => {},
});



export const AuthContextProvider = (props) => {
  
  const [token, setToken] = useState(null);
  //const[isLoggedIn,setIsLoggedIn] = useState(false)
  // const {user,setUser}= useState(null);

  const userIsLoggedIn = !!(localStorage.getItem('token'));

  // const addUser =(email)=>{
  //   setUser(email)
  // }

  const loginHandler = (token) => {
    setToken(token);
   
    localStorage.setItem('token', token);
    
  };

  const logoutHandler = (id) =>{
    setToken(null)
    
    localStorage.removeItem('token');
    //localStorage.removeItem('kodurusravani813@gmail.com')
  }

  
  const contextValue = {
    token: token,
    // user:addUser,
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
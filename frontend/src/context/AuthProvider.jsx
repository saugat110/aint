import React, { useEffect, useState } from 'react'
import { AuthContext } from './authContext.js'
import { useLocation } from 'react-router'

const AuthProvider = ({children}) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("agent"));

  useEffect(() => {
    setIsLoggedIn (!!localStorage.getItem("agent") );
  }, [location]); // check localStorage on every route change

  return (
    <AuthContext.Provider value={{isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
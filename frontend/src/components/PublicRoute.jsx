import React from 'react'
import { useAuthContext } from '../context/authContext'
import { Navigate } from 'react-router';

const PublicRoute = ({children}) => {
  const {isLoggedIn} = useAuthContext();
  console.log("Is logged in: ", isLoggedIn);

  return  !isLoggedIn ? children : <Navigate  to='/dashboard' />
}

export default PublicRoute
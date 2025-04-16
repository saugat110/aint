import React from 'react'
import { Navigate } from 'react-router'
import { useAuthContext } from '../context/authContext'


const ProtectedRoute = ({children}) => {
  const {isLoggedIn} = useAuthContext();
  return (
    isLoggedIn ? children: <Navigate to='/' />
  )
}

export default ProtectedRoute
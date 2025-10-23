import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
  const user= true;
    return user ? children : <Navigate to={'/login'}/>
}

export default PrivateRoutes
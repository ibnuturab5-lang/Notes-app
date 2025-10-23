import React from 'react'
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({children}) => {
    const isAdmin =true;
  return isAdmin ? children : <Navigate to={'/login'}/>
}

export default AdminRoutes
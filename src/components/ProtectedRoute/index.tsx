import React from 'react'
import { ProtectedRouteType } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ element, requiredRole }) => {
    const { user ,isAuthenticated, role } = useAuth();

    console.log("Auth state: ", isAuthenticated);
    if(!isAuthenticated && !user) {
        return <Navigate to="/login" />
    }
    
    if(requiredRole && role !== requiredRole) {
        return <Navigate to="/login" />
    }

    return <>{ element }</>;           
}

export default ProtectedRoute
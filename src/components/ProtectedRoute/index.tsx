import React from 'react'
import { ProtectedRouteType } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ element, requiredRole }) => {
    const { isAuthenticated, role } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login"/>
    }
    
    if(requiredRole && role !== requiredRole) {
        return <Navigate to="/login"/>
    }

    return <>{ element }</>;           
}

export default ProtectedRoute
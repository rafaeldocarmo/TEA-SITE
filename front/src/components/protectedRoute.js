import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authProvider';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;

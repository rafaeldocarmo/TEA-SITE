import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authProvider';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            setTimeout(() => {
                navigate('/login');
            }, 5000)
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {!isAuthenticated && 
                <div style={{
                    height: "70vh",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '24px',
                    color: '#0A6894'
                }}>
                    Você precisa estar logado para acessar esta página. Em 5 segundos vai ser redirecionado à página de login.
                </div>
            }
            {isAuthenticated ? children : null}
        </>
    );
};

export default ProtectedRoute;

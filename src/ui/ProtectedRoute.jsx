import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const { isPending, user } = useUser();
    const navigate = useNavigate();

    // if no user - redirect to login page
    useEffect(() => {
        if (user?.role !== 'authenticated' && !isPending) {
            navigate('/login');
        }
    }, [isPending, navigate, user]);

    if (isPending)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // otherwise render the app just to prevent any issues
    if (user) return children;

    return null;
}

export default ProtectedRoute;

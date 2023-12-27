import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

interface AuthRouteProps {
  children: ReactNode,
}

export const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const navigate = useNavigate();
  const { children } = props;
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if  (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated])

  return (
    <>
      { children }
    </>
  );
}

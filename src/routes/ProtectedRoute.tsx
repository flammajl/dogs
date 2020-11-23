import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactElement | null;
  path?: string;
}

const ProtectedRoute: React.FC<RouteProps> = ({ ...rest }) => {
  const { login } = useAuth();

  if (login) return <Route {...rest} />;
  if (!login) return <Navigate to="/login" />;
  return null;
};

export default ProtectedRoute;

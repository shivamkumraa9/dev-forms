import { Navigate, Outlet } from 'react-router-dom';
import { useAuthToken } from '../../utils/authContext';

export function OnlyAllowLoggedInUsers() {
  const token = useAuthToken();

  if (!token) return <Navigate to="/login" />;

  return (
    <Outlet />
  );
}

export function OnlyAllowNonLoggedInUsers() {
  const token = useAuthToken();

  if (token) return <Navigate to="/forms" />;

  return (
    <Outlet />
  );
}

import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthTokenDispatch } from '../utils/authContext';

export default function Logout() {
  const authDispatch = useAuthTokenDispatch();

  useEffect(() => {
    authDispatch({ type: 'logout' });
  }, []);

  return (<Navigate to="/" />);
}

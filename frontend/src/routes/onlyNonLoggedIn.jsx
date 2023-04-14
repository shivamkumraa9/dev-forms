import { OnlyAllowNonLoggedInUsers } from '../pages/components/RoutesProtection';

import Register from '../pages/Register';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import PerformResetPassword from '../pages/PerformResetPassword';

export default {
  element: <OnlyAllowNonLoggedInUsers />,
  children: [
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'reset-password',
      element: <ResetPassword />,
    },
    {
      path: 'reset-password/:id',
      element: <PerformResetPassword />,
    },
  ],
};

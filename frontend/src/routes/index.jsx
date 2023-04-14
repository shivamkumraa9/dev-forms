import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../pages/ErrorPage';
import BaseLayout from '../pages/layouts/BaseLayout';

import loggedInUsersRoutes from './onlyLoggedIn';
import nonLoggedInUsersRoutes from './onlyNonLoggedIn';
import publicRoutes from './public';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...publicRoutes,
      nonLoggedInUsersRoutes,
      loggedInUsersRoutes,
    ],
  },
]);

export default router;

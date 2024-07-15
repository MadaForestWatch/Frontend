import { RouteObject } from 'react-router-dom';

import AuthRoutesLayout from './layouts/AuthRoutesLayout';
import RootLayout from './layouts/RootLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ZonePage from './pages/ZonePage';
import ZonesPage from './pages/ZonesPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'auth',
        element: <AuthRoutesLayout />,
        children: [
          {
            path: 'signin',
            element: <SignInPage />,
          },
          {
            path: 'signup',
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: 'zones',
        children: [
          {
            index: true,
            element: <ZonesPage />,
          },
          {
            path: ':zoneId',
            element: <ZonePage />,
          },
        ],
      },
    ],
  },
];

export default routes;

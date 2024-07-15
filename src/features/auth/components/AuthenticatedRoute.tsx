import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { SIGNIN_ROUTE_PATH } from '../auth.constants';
import { useAuthStore } from '../auth.store';

type HistoryState = {
  from?: string;
};

export type AuthenticatedRouteProps = PropsWithChildren<{
  inverse?: boolean;
  replace?: boolean;
}>;

export default function AuthenticatedRoute({
  inverse = false,
  replace = false,
  children,
}: AuthenticatedRouteProps) {
  const { pathname, state } = useLocation();

  const { isAuthenticated } = useAuthStore();

  const isAllowed = (isAuthenticated && !inverse) || (!isAuthenticated && inverse);

  if (!isAllowed) {
    const to = inverse ? ((state as HistoryState).from ?? '/') : SIGNIN_ROUTE_PATH;
    return <Navigate to={to} replace={replace} state={{ from: pathname }} />;
  }

  return children;
}

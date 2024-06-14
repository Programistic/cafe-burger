import { shallowEqual } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/hooks';

interface IProtectedRouteProps {
  element: JSX.Element;
  isAuthAccess: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ element, isAuthAccess }) => {

  const { loggedIn } = useAppSelector((store) => ({ loggedIn: store.flag.loggedIn }), shallowEqual);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (isAuthAccess && loggedIn) {
    return <Navigate to={ from } />;
  };

  if (!isAuthAccess && !loggedIn) {
    return <Navigate to="/login" state={{ from: location}} />;
  };

  return element;
};

export default ProtectedRoute;

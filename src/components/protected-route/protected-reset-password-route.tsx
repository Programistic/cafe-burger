import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { FC } from 'react';

interface IProtectedResetPasswordRouteProps {
  element: JSX.Element;
}

const ProtectedResetPasswordRoute: FC<IProtectedResetPasswordRouteProps> = ({ element }) => {

  const { isPasswordResetRequest } = useAppSelector((store) => ({ isPasswordResetRequest: store.flag.isPasswordResetRequest }), shallowEqual);
  const location = useLocation();

  return (
    isPasswordResetRequest ? element : <Navigate to="/login" state={{ from: location}} />
  );
};

export default ProtectedResetPasswordRoute;

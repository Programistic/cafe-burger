import { shallowEqual } from "react-redux";
import { useState } from "react";
import { logout } from "../../services/actions/actions";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import styles from './profile.module.css';

function Profile() {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => ({user: store.user.user} as any), shallowEqual);
  const { pathname } = useLocation();
  const supportText = pathname === '/profile' ? 'изменить свои персональные данные' : 'посмотреть свою историю заказов';

  const [state, setState] = useState({
    name: user.name,
    email: user.email,
    password: '',
    isSuccess: false,
  });

  const handleLinkClick = () => {
    dispatch(logout(state, setState) as string & boolean);
  };

  const params = useParams();

  if (params?.number) {
    return (
      <div className={styles.outlet}>
        <Outlet />
      </div>
    );
  };

  return (
    <>
      { state.isSuccess && <Navigate to="/login" replace={true} /> }
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink to='/profile' end className={
                ({isActive}) => isActive ? `${styles.menuItem__link} ${styles.active}` : styles.menuItem__link
              }>Профиль
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to='/profile/orders' className={
              ({isActive}) => isActive ? `${styles.menuItem__link} ${styles.active}` : styles.menuItem__link
              }>История заказов
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to='/login' className={styles.menuItem__link} onClick={handleLinkClick}>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={styles.supportText}>
           {`В этом разделе вы можете ${supportText}`}
        </p>
        <Outlet />
      </div>
    </>
  )
};

export default Profile;

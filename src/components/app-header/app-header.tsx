import HeaderMenu from '../header-menu/header-menu';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <HeaderMenu />
        <Link to={'/'} className={styles.logo}>
          <Logo />
        </Link>
        <NavLink to={'/profile'} className={styles.profileLink} >
          {({isActive}) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span className={isActive ? `${styles.profileLinkText} ${styles.active}` : styles.profileLinkText}>Личный&nbsp;кабинет</span>
            </>
          )}
        </NavLink>
      </nav> 
    </header>
  );
}

export default AppHeader;

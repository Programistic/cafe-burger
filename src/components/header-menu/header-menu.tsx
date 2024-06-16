import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './header-menu.module.css';

function HeaderMenu() {
  return (
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <NavLink to={'/'} className={styles.menuItem__link}>
          {({isActive}) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <span className={isActive ? `${styles.menuItem__text} ${styles.activ}` : styles.menuItem__text}>Конструктор</span>
            </>
          )}
        </NavLink>
      </li>
      <li className={styles.menuItem}>
        <NavLink to={'/feed'} className={styles.menuItem__link}>
          {({isActive}) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <span className={isActive ? `${styles.menuItem__text} ${styles.activ}` : styles.menuItem__text}>Лента&nbsp;заказов</span>
            </>
          )}
        </NavLink>
      </li>
    </ul>
  );
}

export default HeaderMenu;

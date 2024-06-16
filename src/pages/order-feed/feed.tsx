import { Outlet } from 'react-router-dom';
import styles from './order-feed.module.css'

function Feed() {
  return (
    <div className={styles.outlet}>
      <Outlet />
    </div>
  );
}

export default Feed;

import { Outlet } from "react-router-dom";
import styles from './order.module.css';

function Orders() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )
};

export default Orders;

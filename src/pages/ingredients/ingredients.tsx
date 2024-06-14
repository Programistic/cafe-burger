import { Outlet } from "react-router-dom";
import styles from './ingredients.module.css';

function Ingredients() {
  return(
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Ingredients;

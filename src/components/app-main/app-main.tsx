import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from "react";
import styles from './app-main.module.css';

interface IAppMainProps {
  onButtonMakeOrderClick: () => void;
}

const AppMain: FC<IAppMainProps> = ({ onButtonMakeOrderClick }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onButtonMakeOrderClick={onButtonMakeOrderClick} />
        </DndProvider>
      </div>
    </main>
  );
}

export default AppMain;

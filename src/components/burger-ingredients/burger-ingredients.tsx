import TabContent from "../tab-content/tab-content";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {

  const [tab, setTab] = useState('bun');

  const handleClick = (value: string) => {
    setTab(value);
  };

  return (
    <section className={styles.ingredients}>
      <div className={styles.menu}>
        <Tab value={'bun'} active={tab === 'bun'} onClick={handleClick}>
          Булки
        </Tab>
        <Tab value={'sauce'} active={tab === 'sauce'} onClick={handleClick}>
          Соусы
        </Tab>
        <Tab value={'main'} active={tab === 'main'} onClick={handleClick}>
          Начинки
        </Tab>
      </div>
      <TabContent onSetTab={setTab} />
    </section>
  );
}

export default BurgerIngredients;

import { useAppSelector } from '../../hooks/hooks';
import { shallowEqual } from 'react-redux';
import { TIngredient } from '../../types/ingredient';
import { FC } from 'react';
import styles from './order-info.module.css'

interface IIngredientInfoProps {
  id: string;
  count: number;
}

const IngredientInfo: FC<IIngredientInfoProps> = ({ id, count }) => {;

  const { ingredients } = useAppSelector(store => ({ingredients: store.data.data}), shallowEqual);
  const ingredient = ingredients.find((item: TIngredient) => item._id === id);
  const isVisible = ingredient !== undefined;

  return (
    <>
      { isVisible &&
        <li className={styles.ingredientsListItem}>
          <div className={styles.imageContainer}>
            <img src={ingredient.image} className={styles.image} alt={ingredient.name}></img>
          </div>
          <p className={styles.ingredientName}>{ingredient.name}</p>
          <div className={styles.priceContainer}>
            <span className={styles.productPrice}>{`${count} X ${ingredient.price}`}</span>
            <div className={styles.currencyIconLarge}></div>
          </div>
        </li>
      }
    </>
  );
};

export default IngredientInfo;

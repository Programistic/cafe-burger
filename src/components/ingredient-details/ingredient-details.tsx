import { useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { TIngredient } from "../../types/ingredient";
import { useAppSelector } from "../../hooks/hooks";
import styles from './ingredient-details.module.css';

function IngredientDetails() {

  let {id}  = useParams();

  const { ingredients } = useAppSelector((store) => ({ingredients: store.data.data}), shallowEqual);
  const ingredient = ingredients.find((item: TIngredient) => item._id === id);
  const isModalVisible = ingredient ? true : false;

  return (
    <>
      { isModalVisible &&
        <div className={styles.container}>
          <h2 className={styles.cardTitle}>Детали ингредиента</h2>
          <img src={ingredient.image_large} className={styles.image} alt={ingredient.name}></img>
          <p className={styles.ingredientName}>
            {ingredient.name}
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <h3 className={styles.itemHeading}>Калории, ккал</h3>
              <span className={styles.itemValue}>{ingredient.calories}</span>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.itemHeading}>Белки, г</h3>
              <span className={styles.itemValue}>{ingredient.proteins}</span>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.itemHeading}>Жиры, г</h3>
              <span className={styles.itemValue}>{ingredient.fat}</span>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.itemHeading}>Углеводы, г</h3>
              <span className={styles.itemValue}>{ingredient.carbohydrates}</span>
            </li>
          </ul>
        </div>
      }
    </>
  );
};

export default IngredientDetails;

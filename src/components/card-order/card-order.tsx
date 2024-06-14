import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/hooks';
import { shallowEqual } from 'react-redux';
import { TIngredient } from '../../types/ingredient';
import uuid from 'react-uuid';
import { TOrder } from '../../types/order';
import styles from './card-order.module.css';

interface ICardOrderProps {
  order: TOrder;
  path: string;
}

const CardOrder: FC<ICardOrderProps> = ({ order, path }) => {

  const {_id, name, ingredients, status, number, createdAt} = {...order};
  const orderNumber = '#' + String(number);
  const location = useLocation();
  const { ingredientsArr } = useAppSelector(store => ({ingredientsArr: store.data.data}), shallowEqual);

  let totalCost = 0;

  ingredients.forEach(id => {
    const ingredient = ingredientsArr.find((item: TIngredient) => item._id === id);
    if (ingredient) {
      totalCost = totalCost + ingredient.price;
    };
  });

  let statusColor = 'f2f2f3';
  let statusOrder;

  if (status === ('done' || 'created')) {
    statusColor = '#00cccc';
    statusOrder = 'Готов';
  } else if (status === 'pending') {
    statusOrder = 'Готовится';
  } else if (status === 'none') {
    statusOrder = '';
  } else {
    statusColor = '#e52b1a';
    statusOrder = 'Отменён';
  };

  let index = 0;

  const ingredientPreviewList = ingredients.map(id => {
    if (index < 6) {
      return (
        <IngredientPreview
          id={id}
          key={uuid()}
          index={index++}
          count={ingredients.length-1}
        />
      )
    };
    return null;
  });

  return (
    <Link to={`${path}/:${number}`} key={_id} state={{background: location}} className={styles.orderLink}>
      <li className={styles.card}>
        <div className={styles.innerContainer}>
          <span className={styles.orderNumber}>{orderNumber}</span>
          <FormattedDate date={new Date(createdAt)} className={styles.orderDate} />
        </div>
        <h2 className={styles.orderName}>{name}</h2>
        <span className={styles.orderStatus} style={{'--color': statusColor} as string & number}>{statusOrder}</span>
        <div className={styles.innerContainer}>
          <ul className={styles.ingredientsList}>
            {ingredientPreviewList}
          </ul>
          <div className={styles.priceContainer}>
            <span className={styles.productPrice}>{totalCost}</span>
            <div className={styles.currencyIconLarge}></div>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default CardOrder;

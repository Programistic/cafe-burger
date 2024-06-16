import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientInfo from "./ingredient-info";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { shallowEqual } from "react-redux";
import { TIngredient } from "../../types/ingredient";
import { useMemo } from "react";
import { getOrder } from "../../services/actions/actions";
import { useAppDispatch } from "../../hooks/hooks";
import { useEffect } from "react";
import styles from './order-info.module.css';

const OrderInfo = () => {

  const dispatch = useAppDispatch()
  const params = useParams();

  const number = params.number;
  const orderNumber = number !== undefined ? number.slice(1) : '00000';
  let statusColor = 'f2f2f3';
  let statusOrder: string;
  let ingredientInfoList;

  const { ingredientsArr, order } = useAppSelector(store => ({ingredientsArr: store.data.data, order: store.order.orders[0]}), shallowEqual);

  useEffect(() => { 
    dispatch(getOrder(number?.slice(1)) as any);
  }, [dispatch, number]);
  
  const isVisible = order !== undefined;

  const { items, totalCost } = useMemo(() => {
    let totalCost = 0;
    const uniqId = Array.from(new Set(order?.ingredients));
    const items = uniqId.reduce((prevIngredientsArr: TIngredient[], id) => {
      const count = order?.ingredients.filter(item => item === id).length || 0;
      const filteredIngredient = ingredientsArr.find((item: TIngredient) => item._id === id);
      const nextIngredient = { ...filteredIngredient, count };
      totalCost += count * nextIngredient.price;
      prevIngredientsArr.push(nextIngredient);
      return prevIngredientsArr;
    }, []);
    return {items, totalCost };
  }, [ingredientsArr, order?.ingredients]);
  
  if (order?.ingredients) {
    ingredientInfoList = items.map((item: TIngredient) => {
      return (
        <IngredientInfo
          key={item._id}
          id={item._id}
          count={item.count}
        />
      )
    });
  };

  if (order?.status === ('done' || 'created')) {
    statusColor = '#00cccc';
    statusOrder = 'Готов';
  } else if (order?.status === 'pending') {
    statusOrder = 'Готовится';
  } else if (order?.status === 'none') {
    statusOrder = '';
  } else {
    statusColor = '#e52b1a';
    statusOrder = 'Отменён';
  };

  return (
    <>
      {isVisible &&
        <div className={styles.container}>
          <span className={styles.orderNumber}>{'#' + orderNumber}</span>
          <h2 className={styles.orderName}>{order?.name}</h2>
          <span className={styles.orderStatus} style={{'--color': statusColor} as string & number}>{statusOrder}</span>
          <h3 className={styles.orderContentHeading}>Состав:</h3>
          <ul className={styles.ingredientsList}>
            {ingredientInfoList}
          </ul>
          <div className={styles.innerContainer}>
            <FormattedDate date={new Date(order?.createdAt)} className={styles.orderDate} />
            <div className={styles.priceContainer}>
              <span className={styles.productPrice}>{totalCost}</span>
              <div className={styles.currencyIconLarge}></div>
            </div>
          </div>
        </div>
      }
    </>
  );
};


export default OrderInfo;

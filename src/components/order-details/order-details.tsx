import { shallowEqual } from "react-redux";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import styles from './order-details.module.css';

interface IOrderDetailsProps {
  onOrderDetailsOkButtonClick: () => void;
}

const OrderDetails: FC<IOrderDetailsProps> = ({ onOrderDetailsOkButtonClick }) => {

  const { orderNumber } = useAppSelector((store) => ({orderNumber: store.order.orderNumber}), shallowEqual);

  return (
    <div className={styles.container}>
      <span className={styles.orderNumber}>{orderNumber}</span>
      <p className={styles.text}>идентификатор заказа</p>
      <button type="button" className={styles.button} aria-label="Ok" onClick={onOrderDetailsOkButtonClick} />
      <p className={styles.message}>
        Ваш заказ начали готовить
      </p>
      <p className={styles.message}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;

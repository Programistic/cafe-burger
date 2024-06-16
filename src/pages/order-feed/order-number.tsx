import { FC } from 'react';
import styles from './order-feed.module.css'

interface OrderNumberProps {
  orderNumber: string,
  orderStatus: string,
}

const OrderNumber: FC<OrderNumberProps> = ({ orderNumber, orderStatus }) => {

  let statusColor = 'f2f2f3';

  if (orderStatus === ('done' || 'created')) {
    statusColor = '#00cccc';
  };

  return (
    <span className={styles.orderNumber} style={{'--color': statusColor} as string & number}>{orderNumber}</span>
  )
};

export default OrderNumber;

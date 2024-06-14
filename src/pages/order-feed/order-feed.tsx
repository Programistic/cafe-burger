import CardOrder from '../../components/card-order/card-order';
import OrderNumber from './order-number';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/hooks';
import { shallowEqual } from 'react-redux';
import { wsInit, wsClose } from '../../services/actions/ws-actions';
import { useLocation } from 'react-router-dom';
import Preloader from '../../components/preloader/preloader';
import { wsAllOrderUrl } from '../../utils/ws-constants';
import styles from './order-feed.module.css';

function OrderFeed() {

  const location = useLocation();
  const path = location.pathname;

  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(wsInit(wsAllOrderUrl));
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  const { messages } = useAppSelector((store) => ({messages: store.ws.messages}), shallowEqual);
  const message = messages[0];

  let isVisible = false;
  let cardOrderList;
  let orderNumberListIsReady;
  let orderNumberListInProgress;

  if (message !== undefined) {
    isVisible = true;
    cardOrderList = message.orders.map(order => {
      return (
        <CardOrder
          key={order._id}
          order={order}
          path={path}
        />
      )
    });

    const orderIsReady = message.orders.filter(order => order.status === 'done');
    orderNumberListIsReady = orderIsReady.map(order => {
      return (
        <OrderNumber
          key={order._id}
          orderNumber={String(order.number)}
          orderStatus={'done'}
        />
      )
    });

    const orderInProgress = message.orders.filter(order => order.status !== 'done');
    orderNumberListInProgress = orderInProgress.map(order => {
      return (
        <OrderNumber
          key={order._id}
          orderNumber={String(order.number)}
          orderStatus={'pending'}
        />
      )
    });
  };

  return (
    <section>
      <div className={styles.container}>
        { isVisible ?
          <>
            <h1 className={styles.title}>Лента заказов</h1>
            <ul className={styles.cardsOrderList}>
              {cardOrderList}
            </ul>
            <div className={styles.orderInfo}>
              <div className={styles.orderStatus}>
                <div className={styles.orderNumberContainer}>
                  <h3 className={styles.heading}>Готовы:</h3>
                  <div className={styles.orderNumberList}>
                    {orderNumberListIsReady}
                  </div>
                </div>
                <div className={styles.orderNumberContainer}>
                  <h3 className={styles.heading}>В работе:</h3>
                  <div className={styles.orderNumberList}>
                    {orderNumberListInProgress}
                  </div>
                </div>
              </div>
              <h3 className={styles.quantityHeading}>Выполнено за все время:</h3>
              <p className={styles.orderQuantity}>{message.total}</p>
              <h3 className={styles.quantityHeading}>Выполнено за сегодня:</h3>
              <p className={styles.orderQuantity}>{message.totalToday}</p>
            </div>
          </>
          : <Preloader />
        }
      </div>
    </section>
  )
};

export default OrderFeed;

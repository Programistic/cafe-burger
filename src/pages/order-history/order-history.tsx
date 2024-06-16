import CardOrder from '../../components/card-order/card-order';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { wsInit, wsClose } from '../../services/actions/ws-actions';
import { wsOrderUrl } from '../../utils/ws-constants';
import Preloader from '../../components/preloader/preloader';
import styles from './order-history.module.css';

function OrderHistory() {

  const location = useLocation();
  const path = location.pathname;

  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');
  
  useEffect(()=> {
    const wsUrl = new URL(wsOrderUrl);
    if (accessToken) {
      wsUrl.searchParams.set(
        'token',
        accessToken.replace('Bearer ', '')
      );
      dispatch(wsInit(wsUrl.toString()));
    };
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, accessToken]);

  const { messages } = useAppSelector((store) => ({messages: store.ws.messages}), shallowEqual);
  const message = messages[messages.length-1];

  let isVisible = false;
  let cardOrderList;

  if (message !== undefined && message.orders !== undefined) {
    isVisible = true;
    cardOrderList = message.orders.map(order => {
      return (
        <CardOrder
          key={order._id}
          order={order}
          path={path}
        />
      )
    }).reverse();
  };

  return (
    <ul className={styles.cardsOrderList}>
      {isVisible ? cardOrderList : <Preloader />}
    </ul>
  )
};

export default OrderHistory;

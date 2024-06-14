import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/root-reducer';
import { enhancer } from '../../utils/constants';
import { thunk } from 'redux-thunk';
import { socketMiddleware } from '../middleware/socket-middleware';
import { TWSStoreActions } from '../../types/ws';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../actions/ws-actions'

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  wsOpen: WS_CONNECTION_SUCCESS,
  wsClose: WS_CONNECTION_CLOSED,
  wsError: WS_CONNECTION_ERROR,
  wsGetMessage: WS_GET_MESSAGE
};

export const store = createStore(
  rootReducer,
  enhancer(applyMiddleware(thunk, socketMiddleware(wsActions)))
);

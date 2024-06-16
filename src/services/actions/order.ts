import type { TOrder } from "../../types/order";

export const SET_ORDER_REQUEST: 'SET_ORDER/REQUEST' = 'SET_ORDER/REQUEST';
export const SET_ORDER_SUCCESS: 'SET_ORDER/SUCCESS' = 'SET_ORDER/SUCCESS';
export const SET_ORDER_FAILED: 'SET_ORDER/FAILED' = 'SET_ORDER/FAILED';
export const GET_ORDER_REQUEST: 'GET_ORDER/REQUEST' = 'GET_ORDER/REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER/SUCCESS' = 'GET_ORDER/SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER/FAILED' = 'GET_ORDER/FAILED';

interface ISetOrderRequestAction {
  readonly type: typeof SET_ORDER_REQUEST;
}

export const setOrderRequest = (): ISetOrderRequestAction => ({
  type: SET_ORDER_REQUEST,
});

interface ISetOrderSuccessAction {
  readonly type: typeof SET_ORDER_SUCCESS;
  payload: string;
}

export const setOrderSuccess = (item: string): ISetOrderSuccessAction => ({
  type: SET_ORDER_SUCCESS,
  payload: item,
});

interface ISetOrderFailedAction {
  readonly type: typeof SET_ORDER_FAILED;
  payload: string;
}

export const setOrderFailed = (item: string): ISetOrderFailedAction => ({
  type: SET_ORDER_FAILED,
  payload: item,
});

interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export const getOrderRequest = (): IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST,
});

interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: TOrder[];
}

export const getOrderSuccess = (item: TOrder[]): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload: item,
});

interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
  payload: string;
}

export const getOrderFailed = (item: string): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
  payload: item,
});

export type TOrderActions =
  ISetOrderRequestAction
  | ISetOrderSuccessAction
  | ISetOrderFailedAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

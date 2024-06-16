import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
 } from "../services/actions/ws-actions";

export interface IMessage {
  success: boolean;
  orders: [
    {
      _id?: string | undefined,
      ingredients: string[],
      status: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      number: number,
    }
  ];
  total: number;
  totalToday: number;
}

export interface ISendMessage {
  message: string;
  success: boolean;
}

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsOpen: typeof WS_CONNECTION_SUCCESS;
  wsError: typeof WS_CONNECTION_ERROR;
  wsClose: typeof WS_CONNECTION_CLOSED;
  wsGetMessage: typeof WS_GET_MESSAGE;
  wsSendMessage: typeof WS_SEND_MESSAGE;
};

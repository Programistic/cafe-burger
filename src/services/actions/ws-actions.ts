import { IMessage, ISendMessage } from "../../types/ws";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  payload: string;
}

export const wsInit = (url: string): IWSConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: url,
});

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload: Event,
}

export const wsOpen = (item: Event): IWSConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS,
  payload: item,
})

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export const wsError = (item: Event): IWSConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload: item,
})

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export const wsClose = (): IWSConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED,
});

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IMessage;
}

export const wsGetMessage = (item: IMessage): IWSGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload: item,
});

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export const wsSendMessage = (item: ISendMessage): IWSSendMessageAction => ({
  type: WS_SEND_MESSAGE,
  payload: item,
});

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction;

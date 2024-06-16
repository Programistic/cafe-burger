export const SET_LOGGED_IN: 'SET_LOGGED_IN' = 'SET_LOGGED_IN';
export const RESET_LOGGED_IN: 'RESET_LOGGED_IN' = 'RESET_LOGGED_IN';
export const SET_IS_PASSWORD_RESET_REQUEST: 'SET_IS_PASSWORD_RESET_REQUEST' = 'SET_IS_PASSWORD_RESET_REQUEST';
export const RESET_IS_PASSWORD_RESET_REQUEST: 'RESET_IS_PASSWORD_RESET_REQUEST' = 'RESET_IS_PASSWORD_RESET_REQUEST';

interface ISetLoggedInAction {
  readonly type: typeof SET_LOGGED_IN;
}

export const setLoggedIn = (): ISetLoggedInAction => ({
  type: SET_LOGGED_IN,
});

interface IResetLoggedInAction {
  readonly type: typeof RESET_LOGGED_IN;
}

export const resetLoggedIn = (): IResetLoggedInAction => ({
  type: RESET_LOGGED_IN,
});

interface ISetIsPasswordResetRequestAction {
  readonly type: typeof SET_IS_PASSWORD_RESET_REQUEST;
}

export const setIsPasswordResetRequest = (): ISetIsPasswordResetRequestAction => ({
  type: SET_IS_PASSWORD_RESET_REQUEST,
});

interface IResetIsPasswordResetRequest {
  readonly type: typeof RESET_IS_PASSWORD_RESET_REQUEST;
}

export const resetIsPasswordResetRequest = (): IResetIsPasswordResetRequest => ({
  type: RESET_IS_PASSWORD_RESET_REQUEST,
});

export type TFlagActions =
  ISetLoggedInAction
  | IResetLoggedInAction
  | ISetIsPasswordResetRequestAction
  | IResetIsPasswordResetRequest;
  
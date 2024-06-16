import { TUser } from "../../types/user";

export const SET_USER: 'SET_USER' = 'SET_USER';
export const RESET_USER: 'RESET_USER' = 'RESET_USER';

interface ISetUserAction {
  readonly type: typeof SET_USER;
  payload: TUser;
}

export const setUser = (item: TUser): ISetUserAction => ({
  type: SET_USER,
  payload: item,
});

interface IResetUserAction {
  readonly type: typeof RESET_USER;
}

export const resetUser = (): IResetUserAction => ({
  type: RESET_USER,
});

export type TUserActions =
  ISetUserAction
  | IResetUserAction;

export const SET_ERROR: 'SET_ERROR' = 'SET_ERROR';
export const RESET_ERROR: 'RESET_ERROR' = 'RESET_ERROR';

interface ISetErrorAction {
  readonly type: typeof SET_ERROR;
  payload: number;
}

export const setError = (item: number): ISetErrorAction => ({
  type: SET_ERROR,
  payload: item,
});

interface IResetErrorAction {
  readonly type: typeof RESET_ERROR;
}

export const resetError = (): IResetErrorAction => ({
  type: RESET_ERROR,
});

export type TErrorActions =
  ISetErrorAction
  | IResetErrorAction;
  
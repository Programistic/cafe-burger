import { TIngredient } from "../../types/ingredient";

export const GET_DATA_REQUEST: 'GET_DATA/REQUEST' = 'GET_DATA/REQUEST';
export const GET_DATA_SUCCESS: 'GET_DATA/SUCCESS' = 'GET_DATA/SUCCESS';
export const GET_DATA_FAILED: 'GET_DATA/FAILED' = 'GET_DATA/FAILED';
export const INC_COUNTER: 'INC_COUNTER' = 'INC_COUNTER';
export const DEC_COUNTER: 'DEC_COUNTER' = 'DEC_COUNTER';
export const RESET_COUNTER: 'RESET_COUNTER' = 'RESET_COUNTER';

interface IGetDataRequestAction {
  readonly type: typeof GET_DATA_REQUEST;
}

export const getDataRequest = (): IGetDataRequestAction => ({
  type: GET_DATA_REQUEST,
});

interface IGetDataSuccessAction {
  readonly type: typeof GET_DATA_SUCCESS;
  payload: TIngredient[];
}

export const getDataSuccess = (item: TIngredient[]): IGetDataSuccessAction => ({
  type: GET_DATA_SUCCESS,
  payload: [...item],
});

interface IGetDataFailedAction {
  readonly type: typeof GET_DATA_FAILED;
  payload: string;
}

export const getDataFailed = (item: string): IGetDataFailedAction => ({
  type: GET_DATA_FAILED,
  payload: item,
});

interface IIncCounterAction {
  readonly type: typeof INC_COUNTER;
  payload: TIngredient;
}

export const incCounter = (item: TIngredient): IIncCounterAction => ({
  type: INC_COUNTER,
  payload: item,
});

interface IDecCounterAction {
  readonly type: typeof DEC_COUNTER;
  payload: TIngredient;
}

export const decCounter = (item: TIngredient): IDecCounterAction => ({
  type: DEC_COUNTER,
  payload: item,
});

interface IResetCounterAction {
  readonly type: typeof RESET_COUNTER;
}

export const resetCounter = (): IResetCounterAction => ({
  type: RESET_COUNTER,
});

export type TAllIngredientsActions =
  IGetDataRequestAction
  | IGetDataSuccessAction
  | IGetDataFailedAction
  | IIncCounterAction
  | IDecCounterAction
  | IResetCounterAction;
  
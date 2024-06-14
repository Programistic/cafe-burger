import uuid from "react-uuid";
import { TIngredient } from "../../types/ingredient";

export const CONSTRUCTOR_ADD_BUN: 'CONSTRUCTOR/ADD_BUN' = 'CONSTRUCTOR/ADD_BUN';
export const CONSTRUCTOR_ADD_INGREDIENT: 'CONSTRUCTOR/ADD_INGREDIENT' = 'CONSTRUCTOR/ADD_INGREDIENT';
export const CONSTRUCTOR_UPDATE: 'CONSTRUCTOR/UPDATE' = 'CONSTRUCTOR/UPDATE';
export const CONSTRUCTOR_DELETE_INGREDIENT: 'CONSTRUCTOR/DELETE_INGREDIENT' = 'CONSTRUCTOR/DELETE_INGREDIENT';
export const CONSTRUCTOR_SAVE_ORDER: 'CONSTRUCTOR/SAVE_ORDER' = 'CONSTRUCTOR/SAVE_ORDER';
export const CONSTRUCTOR_DELETE_ORDER: 'CONSTRUCTOR/DELETE_ORDER' = 'CONSTRUCTOR/DELETE_ORDER';

interface IAddIngredientAction {
  readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
  payload: {
    item?: TIngredient,
    uniqueId: string,
  };
}

export const addIngredient = (item: TIngredient): IAddIngredientAction => ({
  type: CONSTRUCTOR_ADD_INGREDIENT,
  payload: {
    ...item,
    uniqueId: uuid(),
  }
});

interface IAddBunAction {
  readonly type: typeof CONSTRUCTOR_ADD_BUN;
  payload: TIngredient;
}

export const addBun = (item: TIngredient): IAddBunAction => ({
  type: CONSTRUCTOR_ADD_BUN,
  payload: {
    ...item,
  }
});

interface IUpdateConstructorAction {
  readonly type: typeof CONSTRUCTOR_UPDATE;
  payload: TIngredient[];
}

export const updateConstructor = (item: TIngredient[]): IUpdateConstructorAction => ({
  type: CONSTRUCTOR_UPDATE,
  payload: [...item],
});

interface IDeleteIngredientAction {
  readonly type: typeof CONSTRUCTOR_DELETE_INGREDIENT;
  payload: string;
}

export const deleteIngredient = (item: string): IDeleteIngredientAction => ({
  type: CONSTRUCTOR_DELETE_INGREDIENT,
  payload: item,
});

interface ISetOrderAction {
  readonly type: typeof CONSTRUCTOR_SAVE_ORDER;
  payload: string[];
}

export const saveOrder = (item: string[]): ISetOrderAction => ({
  type: CONSTRUCTOR_SAVE_ORDER,
  payload: [...item],
});

interface IDeleteOrderAction {
  readonly type: typeof CONSTRUCTOR_DELETE_ORDER;
}

export const deleteOrder = (): IDeleteOrderAction => ({
  type: CONSTRUCTOR_DELETE_ORDER,
});

export type TConstructorIngredientsActions = 
  IAddIngredientAction
  | IAddBunAction
  | IUpdateConstructorAction
  | IDeleteIngredientAction
  | ISetOrderAction
  | IDeleteOrderAction;

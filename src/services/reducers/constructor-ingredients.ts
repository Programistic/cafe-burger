import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_UPDATE,
  CONSTRUCTOR_DELETE_INGREDIENT,
  CONSTRUCTOR_SAVE_ORDER,
  CONSTRUCTOR_DELETE_ORDER
} from "../actions/constructor-ingredients";
import { TIngredient } from "../../types/ingredient";
import { TConstructorIngredientsActions } from "../actions/constructor-ingredients";

type TConstructorIngredientsState = {
  bun: TIngredient | null,
  ingredients: TIngredient[],
  orderIdArray: string[],
};

const initialState: TConstructorIngredientsState = {
  bun: null,
  ingredients: [],
  orderIdArray: [],
};

export const constructorReducer = (state = initialState, action: TConstructorIngredientsActions): TConstructorIngredientsState => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case CONSTRUCTOR_ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload] as any,
      };
    }
    case CONSTRUCTOR_UPDATE: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }
    case CONSTRUCTOR_DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients.filter((item) => item.uniqueId !== action.payload)]
      };
    }
    case CONSTRUCTOR_SAVE_ORDER: {
      return {
        ...state,
        orderIdArray: action.payload,
      };
    }
    case CONSTRUCTOR_DELETE_ORDER: {
      return {
        ...state,
        bun: null,
        ingredients: [],
      };
    }
    default:
      return state;
  }
};

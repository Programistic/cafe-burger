import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  INC_COUNTER,
  DEC_COUNTER,
  RESET_COUNTER,
} from "../actions/all-ingredients";
import { TIngredient } from "../../types/ingredient";
import { TAllIngredientsActions } from "../actions/all-ingredients";

type TAllIngredientsState = {
  isSuccess: boolean,
  isLoading: boolean,
  isError: boolean,
  data: any,
  bun: any,
  ingredients: any,
  error: string,
}

const initialState: TAllIngredientsState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  data: [],
  bun: [],
  ingredients: [],
  error: '',
}

export const dataReducer = (state = initialState, action: TAllIngredientsActions): TAllIngredientsState => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        bun: action.payload.filter((item: TIngredient) => (item.type === 'bun')).forEach((item: TIngredient) => {item.count = 0}),
        ingredients: action.payload.filter((item: TIngredient) => (item.type !== 'bun')).forEach((item: TIngredient) => {item.count = 0}),
        isSuccess: true,
        isLoading: false,
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        error: action.payload,
      };
    }
    case INC_COUNTER: {
      const ingId = action.payload._id;
      const isBun = action.payload.type === 'bun';
      isBun && state.data.filter((item: TIngredient) => (item.type === 'bun')).forEach((item: TIngredient) => {item.count = 0})
      state.data.map((item: TIngredient) => {
        if (isBun && (item._id === ingId)) {
          state.data = [...state.data, item.count = 2];
        }
        if (!isBun && (item._id === ingId)) {
          state.data = [...state.data, item.count = item.count + 1];
        }
        return 0;
      }) 
      return {
        ...state,
      };
    }
    case DEC_COUNTER: {
      const ingId = action.payload._id;
      state.data.map((item: TIngredient) => { 
        if (item._id === ingId) {
          state.data = [...state.data, item.count = item.count - 1];
        }
        return 0;
      })
      
      return {
        ...state,
      };
    }
    case RESET_COUNTER: {
      state.data.map((item: TIngredient) => { 
        if (item.count != null) {
          state.data = [...state.data, item.count = 0];
        };
        return 0;
      })
      
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

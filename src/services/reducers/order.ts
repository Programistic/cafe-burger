import {
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from "../actions/order";
import { TOrderActions } from "../actions/order";
import type { TOrder } from "../../types/order";

type TOrderState = {
  isSuccess: boolean,
  isLoading: boolean,
  isError: boolean,
  orders: TOrder[] | [],
  orderNumber: string,
  error: string,
}

const initialState: TOrderState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  orders: [],
  orderNumber: '',
  error: '',
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case SET_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        isSuccess: true,
        isLoading: false,
      };
    }
    case SET_ORDER_FAILED: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        error: action.payload,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
        isSuccess: true,
        isLoading: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

import { SET_ERROR, RESET_ERROR } from "../actions/error";
import { TErrorActions } from "../actions/error";

type TErrorState = {
  isError: boolean,
  error: number,
}

const initialState: TErrorState = {
  isError: false,
  error: 400,
};

export const errorReducer = (state = initialState, action: TErrorActions): TErrorState => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        isError: true,
        error: action.payload,
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        isError: false,
      };
    }
    default:
      return state;
  }
};

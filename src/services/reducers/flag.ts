import {
  SET_LOGGED_IN,
  RESET_LOGGED_IN,
  SET_IS_PASSWORD_RESET_REQUEST,
  RESET_IS_PASSWORD_RESET_REQUEST,
} from "../actions/flag";
import { TFlagActions } from "../actions/flag";

type TFlagState = {
  loggedIn: boolean,
  isPasswordResetRequest: boolean,
}

const initialState: TFlagState = {
  loggedIn: false,
  isPasswordResetRequest: false,
};

export const flagReducer = (state = initialState, action: TFlagActions): TFlagState => {
  switch (action.type) {
    case SET_LOGGED_IN: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case RESET_LOGGED_IN: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case SET_IS_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        isPasswordResetRequest: true,
      };
    }
    case RESET_IS_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        isPasswordResetRequest: false,
      };
    }
    default:
      return state;
  }
};

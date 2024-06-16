import { SET_USER, RESET_USER } from "../actions/user";
import { TUserActions } from "../actions/user";
import { TUser } from "../../types/user";

type TUserState = {
  isSuccess: boolean,
  user: TUser,
}

const initialState: TUserState = {
  isSuccess: false,
  user: {},
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        isSuccess: true,
        user: action.payload.user as TUser,
      };
    }
    case RESET_USER: {
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
};

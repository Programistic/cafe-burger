import { combineReducers } from "redux";
import { dataReducer } from "./all-ingredients";
import { orderReducer } from "./order";
import { modalReducer } from "./modal";
import { constructorReducer } from "./constructor-ingredients";
import { errorReducer } from "./error";
import { userReducer } from "./user";
import { flagReducer } from "./flag";
import { wsReducer } from "./ws-reducer";

export const rootReducer = combineReducers({
  data: dataReducer,
  order: orderReducer,
  modal: modalReducer,
  ingredients: constructorReducer,
  error: errorReducer,
  user: userReducer,
  flag: flagReducer,
  ws: wsReducer,
});

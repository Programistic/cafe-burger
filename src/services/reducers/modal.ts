import { OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL, CLOSE_MODAL } from "../actions/modal";
import { TModalActions } from "../actions/modal";

type TModalState = {
  isModalVisible: boolean,
  isIngredientDetailsVisible: boolean,
  isOrderDetailsVisible: boolean,
  orderNumber: string,
};

const initialState: TModalState = {
  isModalVisible: false,
  isIngredientDetailsVisible: false,
  isOrderDetailsVisible: false,
  orderNumber: '',
}

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        isModalVisible: true,
        isIngredientDetailsVisible: true,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isModalVisible: true,
        isOrderDetailsVisible: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalVisible: false,
        isIngredientDetailsVisible: false,
        isOrderDetailsVisible: false,
        orderNumber: '',
      };
    }
    default:
      return state;
  }
};

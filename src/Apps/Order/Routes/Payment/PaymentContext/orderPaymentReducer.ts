import {
  OrderPaymentState,
  OrderPaymentAction,
  OrderPaymentActions,
} from "./OrderPaymentContext"

export const orderPaymentReducer = (
  state: OrderPaymentState,
  action: OrderPaymentAction
) => {
  switch (action.type) {
    case OrderPaymentActions.SET_SELECTED_BANK_ACCOUNT_ID: {
      return {
        ...state,
        selectedBankAccountId: action.payload,
      }
    }
    case OrderPaymentActions.SET_SELECTED_PAYMENT_METHOD: {
      return {
        ...state,
        selectedPaymentMethod: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

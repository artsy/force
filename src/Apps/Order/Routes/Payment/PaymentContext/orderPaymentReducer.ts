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
    case OrderPaymentActions.SET_BALANCE_CHECK_COMPLETE: {
      return {
        ...state,
        balanceCheckComplete: action.payload,
      }
    }
    case OrderPaymentActions.SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS: {
      return {
        ...state,
        bankAccountHasInsufficientFunds: action.payload,
      }
    }
    case OrderPaymentActions.SET_STRIPE_CLIENT_SECRET: {
      return {
        ...state,
        stripeClientSecret: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

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
    case OrderPaymentActions.SET_BANK_ACCOUNT_SELECTION: {
      return {
        ...state,
        bankAccountSelection: action.payload,
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
    case OrderPaymentActions.SET_STRIPE_CLIENT: {
      return {
        ...state,
        stripeClient: action.payload,
      }
    }
    case OrderPaymentActions.SET_IS_SAVING_PAYMENT: {
      return {
        ...state,
        isSavingPayment: action.payload,
      }
    }
    case OrderPaymentActions.SET_IS_STRIPE_PAYMENT_ELEMENT_LOADING: {
      return {
        ...state,
        isStripePaymentElementLoading: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

import { PaymentState, PaymentAction, PaymentActions } from "./types"

export const paymentReducer = (state: PaymentState, action: PaymentAction) => {
  switch (action.type) {
    case PaymentActions.SET_SELECTED_BANK_ACCOUNT_ID:
      return {
        ...state,
        selectedBankAccountId: action.payload,
      }
    case PaymentActions.SET_SELECTED_PAYMENT_METHOD:
      return {
        ...state,
        selectedPaymentMethod: action.payload,
      }
    default:
      return state
  }
}

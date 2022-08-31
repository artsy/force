import { PaymentState, PaymentAction, PaymentActions } from "./types"

export const paymentReducer = (state: PaymentState, action: PaymentAction) => {
  switch (action.type) {
    case PaymentActions.SET_SELECTED_BANK_ACCOUNT_ID:
      return {
        ...state,
        selectedBankAccountId: action.payload,
      }
    default:
      return state
  }
}

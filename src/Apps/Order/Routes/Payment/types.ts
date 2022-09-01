import { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"

export type PaymentState = {
  selectedBankAccountId: string
  selectedPaymentMethod: CommercePaymentMethodEnum | string
}

export enum PaymentActions {
  SET_SELECTED_BANK_ACCOUNT_ID = "SET_SELECTED_BANK_ACCOUNT_ID",
  SET_SELECTED_PAYMENT_METHOD = "SET_SELECTED_PAYMENT_METHOD",
}

export type PaymentAction = ActionMap<PaymentActionsPayload>[keyof ActionMap<
  PaymentActionsPayload
>]

type PaymentActionsPayload = {
  [PaymentActions.SET_SELECTED_BANK_ACCOUNT_ID]: string
  [PaymentActions.SET_SELECTED_PAYMENT_METHOD]: CommercePaymentMethodEnum
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

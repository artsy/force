export type PaymentState = {
  selectedBankAccountId: string
}

export enum PaymentActions {
  SET_SELECTED_BANK_ACCOUNT_ID = "SET_SELECTED_BANK_ACCOUNT_ID",
}

export type PaymentAction = ActionMap<PaymentActionsPayload>[keyof ActionMap<
  PaymentActionsPayload
>]

type PaymentActionsPayload = {
  [PaymentActions.SET_SELECTED_BANK_ACCOUNT_ID]: string
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

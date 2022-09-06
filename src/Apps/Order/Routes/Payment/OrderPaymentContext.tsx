import React, { useReducer, createContext, Dispatch } from "react"
import { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import { orderPaymentReducer } from "./orderPaymentReducer"
import createLogger from "Utils/logger"

const logger = createLogger("[dev: OrderPaymentContext] state:")

/* ACTIONS ------------------------------------------------------------------ */
export enum OrderPaymentActions {
  SET_SELECTED_BANK_ACCOUNT_ID = "SET_SELECTED_BANK_ACCOUNT_ID",
  SET_SELECTED_PAYMENT_METHOD = "SET_SELECTED_PAYMENT_METHOD",
}

type OrderPaymentActionsPayload = {
  [OrderPaymentActions.SET_SELECTED_BANK_ACCOUNT_ID]: string
  [OrderPaymentActions.SET_SELECTED_PAYMENT_METHOD]: CommercePaymentMethodEnum
}

export type OrderPaymentAction = ActionMap<
  OrderPaymentActionsPayload
>[keyof ActionMap<OrderPaymentActionsPayload>]

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

/* STATE -------------------------------------------------------------------- */
export type OrderPaymentState = {
  selectedBankAccountId: string
  selectedPaymentMethod: CommercePaymentMethodEnum | string
}

const initialOrderPaymentState = {
  selectedBankAccountId: "",
  selectedPaymentMethod: "",
}

/* CONTEXT ------------------------------------------------------------------ */
const OrderPaymentContext = createContext<{
  state: OrderPaymentState
  dispatch: Dispatch<OrderPaymentAction>
}>({
  state: initialOrderPaymentState,
  dispatch: () => null,
})

/* PROVIDER ----------------------------------------------------------------- */
const OrderPaymentProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    orderPaymentReducer,
    initialOrderPaymentState
  )

  // for developers' convenience only
  if (process.env.NODE_ENV === "development") {
    logger.log(state)
  }

  return (
    <OrderPaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderPaymentContext.Provider>
  )
}

export { OrderPaymentContext, OrderPaymentProvider }

import React, { useReducer, useContext, createContext, Dispatch } from "react"
import { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import { orderPaymentReducer } from "./orderPaymentReducer"
import createLogger from "Utils/logger"

const logger = createLogger("[dev: OrderPaymentContext] state:")

/**
 * Actions
 */

export enum OrderPaymentActions {
  SET_SELECTED_BANK_ACCOUNT_ID = "SET_SELECTED_BANK_ACCOUNT_ID",
  SET_SELECTED_PAYMENT_METHOD = "SET_SELECTED_PAYMENT_METHOD",
  SET_BALANCE_CHECK_COMPLETE = "SET_BALANCE_CHECK_COMPLETE",
  SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS = "SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS",
  SET_STRIPE_CLIENT_SECRET = "SET_STRIPE_CLIENT_SECRET",
  SET_IS_SAVING_PAYMENT = "SET_IS_SAVING_PAYMENT",
}

type OrderPaymentActionsPayload = {
  [OrderPaymentActions.SET_SELECTED_BANK_ACCOUNT_ID]: string
  [OrderPaymentActions.SET_SELECTED_PAYMENT_METHOD]: CommercePaymentMethodEnum
  [OrderPaymentActions.SET_BALANCE_CHECK_COMPLETE]: boolean
  [OrderPaymentActions.SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS]: boolean
  [OrderPaymentActions.SET_STRIPE_CLIENT_SECRET]: null | string
  [OrderPaymentActions.SET_IS_SAVING_PAYMENT]: boolean
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

/**
 * State
 */

export type OrderPaymentState = {
  selectedBankAccountId: string
  selectedPaymentMethod: CommercePaymentMethodEnum | string
  balanceCheckComplete: boolean
  bankAccountHasInsufficientFunds: boolean
  stripeClientSecret: null | string
  isSavingPayment: boolean
}

const initialOrderPaymentState = {
  selectedBankAccountId: "",
  selectedPaymentMethod: "",
  balanceCheckComplete: false,
  bankAccountHasInsufficientFunds: false,
  stripeClientSecret: null,
  isSavingPayment: false,
}

/**
 * Context
 */

const OrderPaymentContext = createContext<{
  state: OrderPaymentState
  dispatch: Dispatch<OrderPaymentAction>
}>({
  state: initialOrderPaymentState,
  dispatch: () => null,
})

/**
 * Provider
 */

export const OrderPaymentContextProvider: React.FC = ({ children }) => {
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

/**
 * Hook
 */

export const useOrderPaymentContext = () => {
  const { state, dispatch } = useContext(OrderPaymentContext)

  const setSelectedBankAccountId = payload =>
    dispatch({
      type: OrderPaymentActions.SET_SELECTED_BANK_ACCOUNT_ID,
      payload,
    })

  const setSelectedPaymentMethod = payload =>
    dispatch({
      type: OrderPaymentActions.SET_SELECTED_PAYMENT_METHOD,
      payload,
    })

  const setBalanceCheckComplete = payload =>
    dispatch({
      type: OrderPaymentActions.SET_BALANCE_CHECK_COMPLETE,
      payload,
    })

  const setBankAccountHasInsufficientFunds = payload =>
    dispatch({
      type: OrderPaymentActions.SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS,
      payload,
    })

  const setStripeClientSecret = payload =>
    dispatch({
      type: OrderPaymentActions.SET_STRIPE_CLIENT_SECRET,
      payload,
    })

  const setIsSavingPayment = payload =>
    dispatch({
      type: OrderPaymentActions.SET_IS_SAVING_PAYMENT,
      payload,
    })

  return {
    ...state,
    setSelectedBankAccountId,
    setSelectedPaymentMethod,
    setBalanceCheckComplete,
    setBankAccountHasInsufficientFunds,
    setStripeClientSecret,
    setIsSavingPayment,
  }
}

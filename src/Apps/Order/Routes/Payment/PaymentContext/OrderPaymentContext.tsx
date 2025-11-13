import type { BankAccountSelection } from "Apps/Order/Routes/Payment/index"
import createLogger from "Utils/logger"
import type { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import type React from "react"
import { createContext, type Dispatch, useContext, useReducer } from "react"
import { orderPaymentReducer } from "./orderPaymentReducer"

const logger = createLogger("[dev: OrderPaymentContext] state:")

/**
 * Actions
 */

export enum OrderPaymentActions {
  SET_SELECTED_BANK_ACCOUNT_ID = "SET_SELECTED_BANK_ACCOUNT_ID",
  SET_BANK_ACCOUNT_SELECTION = "SET_BANK_ACCOUNT_SELECTION",
  SET_SELECTED_PAYMENT_METHOD = "SET_SELECTED_PAYMENT_METHOD",
  SET_BALANCE_CHECK_COMPLETE = "SET_BALANCE_CHECK_COMPLETE",
  SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS = "SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS",
  SET_STRIPE_CLIENT = "SET_STRIPE_CLIENT",
  SET_IS_SAVING_PAYMENT = "SET_IS_SAVING_PAYMENT",
  SET_IS_STRIPE_PAYMENT_ELEMENT_LOADING = "SET_IS_STRIPE_PAYMENT_ELEMENT_LOADING",
  SET_IS_LOADING = "SET_IS_LOADING",
}

type OrderPaymentActionsPayload = {
  [OrderPaymentActions.SET_SELECTED_BANK_ACCOUNT_ID]: string
  [OrderPaymentActions.SET_BANK_ACCOUNT_SELECTION]: BankAccountSelection | null
  [OrderPaymentActions.SET_SELECTED_PAYMENT_METHOD]: CommercePaymentMethodEnum
  [OrderPaymentActions.SET_BALANCE_CHECK_COMPLETE]: boolean
  [OrderPaymentActions.SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS]: boolean
  [OrderPaymentActions.SET_STRIPE_CLIENT]: null | string
  [OrderPaymentActions.SET_IS_SAVING_PAYMENT]: boolean
  [OrderPaymentActions.SET_IS_STRIPE_PAYMENT_ELEMENT_LOADING]: boolean
  [OrderPaymentActions.SET_IS_LOADING]: boolean
}

export type OrderPaymentAction =
  ActionMap<OrderPaymentActionsPayload>[keyof ActionMap<OrderPaymentActionsPayload>]

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
  bankAccountSelection: BankAccountSelection | null
  selectedPaymentMethod: CommercePaymentMethodEnum | string
  balanceCheckComplete: boolean
  bankAccountHasInsufficientFunds: boolean
  stripeClient: null | string
  isSavingPayment: boolean
  isStripePaymentElementLoading: boolean
  isLoading: boolean
}

const initialOrderPaymentState = {
  selectedBankAccountId: "",
  bankAccountSelection: null,
  selectedPaymentMethod: "",
  balanceCheckComplete: false,
  bankAccountHasInsufficientFunds: false,
  stripeClient: null,
  isSavingPayment: false,
  isStripePaymentElementLoading: true,
  isLoading: true,
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

export const OrderPaymentContextProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
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

  const setStripeClient = payload =>
    dispatch({
      type: OrderPaymentActions.SET_STRIPE_CLIENT,
      payload,
    })

  const setIsSavingPayment = payload =>
    dispatch({
      type: OrderPaymentActions.SET_IS_SAVING_PAYMENT,
      payload,
    })

  const setBankAccountSelection = payload =>
    dispatch({
      type: OrderPaymentActions.SET_BANK_ACCOUNT_SELECTION,
      payload,
    })

  const setIsStripePaymentElementLoading = payload =>
    dispatch({
      type: OrderPaymentActions.SET_IS_STRIPE_PAYMENT_ELEMENT_LOADING,
      payload,
    })

  const setIsLoading = payload =>
    dispatch({
      type: OrderPaymentActions.SET_IS_LOADING,
      payload,
    })

  return {
    ...state,
    setSelectedBankAccountId,
    setBankAccountSelection,
    setSelectedPaymentMethod,
    setBalanceCheckComplete,
    setBankAccountHasInsufficientFunds,
    setStripeClient,
    setIsSavingPayment,
    setIsStripePaymentElementLoading,
    setIsLoading,
  }
}

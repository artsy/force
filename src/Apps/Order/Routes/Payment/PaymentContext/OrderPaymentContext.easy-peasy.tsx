import { createContextStore, Action, action } from "easy-peasy"
import type { BankAccountSelection } from "Apps/Order/Routes/Payment/index"
import createLogger from "Utils/logger"
import type { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import type React from "react"
import { useContext, createContext } from "react"

const logger = createLogger("[dev: OrderPaymentContext] state:")

// Easy-peasy store model interface
interface OrderPaymentStoreModel {
  // State
  selectedBankAccountId: string
  bankAccountSelection: BankAccountSelection | null
  selectedPaymentMethod: CommercePaymentMethodEnum | string
  balanceCheckComplete: boolean
  bankAccountHasInsufficientFunds: boolean
  stripeClient: null | string
  isSavingPayment: boolean
  isStripePaymentElementLoading: boolean
  isLoading: boolean

  // Actions
  setSelectedBankAccountId: Action<OrderPaymentStoreModel, string>
  setBankAccountSelection: Action<
    OrderPaymentStoreModel,
    BankAccountSelection | null
  >
  setSelectedPaymentMethod: Action<
    OrderPaymentStoreModel,
    CommercePaymentMethodEnum
  >
  setBalanceCheckComplete: Action<OrderPaymentStoreModel, boolean>
  setBankAccountHasInsufficientFunds: Action<OrderPaymentStoreModel, boolean>
  setStripeClient: Action<OrderPaymentStoreModel, null | string>
  setIsSavingPayment: Action<OrderPaymentStoreModel, boolean>
  setIsStripePaymentElementLoading: Action<OrderPaymentStoreModel, boolean>
  setIsLoading: Action<OrderPaymentStoreModel, boolean>
}

// Create the context store
export const OrderPaymentStore = createContextStore<OrderPaymentStoreModel>(
  runtimeModel => ({
    // State
    selectedBankAccountId: runtimeModel?.selectedBankAccountId || "",
    bankAccountSelection: runtimeModel?.bankAccountSelection || null,
    selectedPaymentMethod: runtimeModel?.selectedPaymentMethod || "",
    balanceCheckComplete: runtimeModel?.balanceCheckComplete || false,
    bankAccountHasInsufficientFunds:
      runtimeModel?.bankAccountHasInsufficientFunds || false,
    stripeClient: runtimeModel?.stripeClient || null,
    isSavingPayment: runtimeModel?.isSavingPayment || false,
    isStripePaymentElementLoading:
      runtimeModel?.isStripePaymentElementLoading ?? true,
    isLoading: runtimeModel?.isLoading ?? true,

    // Actions
    setSelectedBankAccountId: action((state, payload) => {
      state.selectedBankAccountId = payload
    }),

    setBankAccountSelection: action((state, payload) => {
      state.bankAccountSelection = payload
    }),

    setSelectedPaymentMethod: action((state, payload) => {
      state.selectedPaymentMethod = payload
    }),

    setBalanceCheckComplete: action((state, payload) => {
      state.balanceCheckComplete = payload
    }),

    setBankAccountHasInsufficientFunds: action((state, payload) => {
      state.bankAccountHasInsufficientFunds = payload
    }),

    setStripeClient: action((state, payload) => {
      state.stripeClient = payload
    }),

    setIsSavingPayment: action((state, payload) => {
      state.isSavingPayment = payload
    }),

    setIsStripePaymentElementLoading: action((state, payload) => {
      state.isStripePaymentElementLoading = payload
    }),

    setIsLoading: action((state, payload) => {
      state.isLoading = payload
    }),
  }),
)

/**
 * Provider component with backward compatibility
 */
export const OrderPaymentContextProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const state = OrderPaymentStore.useStoreState(state => state)

  // for developers' convenience only
  if (process.env.NODE_ENV === "development") {
    logger.log(state)
  }

  return (
    <OrderPaymentStore.Provider>
      <OrderPaymentContextProviderWrapper>
        {children}
      </OrderPaymentContextProviderWrapper>
    </OrderPaymentStore.Provider>
  )
}

// Internal wrapper to provide legacy context
const OrderPaymentContextProviderWrapper: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const state = OrderPaymentStore.useStoreState(state => state)
  const actions = OrderPaymentStore.useStoreActions(actions => actions)

  // Legacy dispatch function for backward compatibility
  const dispatch = (action: any) => {
    switch (action.type) {
      case "SET_SELECTED_BANK_ACCOUNT_ID":
        actions.setSelectedBankAccountId(action.payload)
        break
      case "SET_BANK_ACCOUNT_SELECTION":
        actions.setBankAccountSelection(action.payload)
        break
      case "SET_SELECTED_PAYMENT_METHOD":
        actions.setSelectedPaymentMethod(action.payload)
        break
      case "SET_BALANCE_CHECK_COMPLETE":
        actions.setBalanceCheckComplete(action.payload)
        break
      case "SET_BANK_ACCOUNT_HAS_INSUFFICIENT_FUNDS":
        actions.setBankAccountHasInsufficientFunds(action.payload)
        break
      case "SET_STRIPE_CLIENT":
        actions.setStripeClient(action.payload)
        break
      case "SET_IS_SAVING_PAYMENT":
        actions.setIsSavingPayment(action.payload)
        break
      case "SET_IS_STRIPE_PAYMENT_ELEMENT_LOADING":
        actions.setIsStripePaymentElementLoading(action.payload)
        break
      case "SET_IS_LOADING":
        actions.setIsLoading(action.payload)
        break
    }
  }

  return (
    <OrderPaymentLegacyContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderPaymentLegacyContext.Provider>
  )
}

// Legacy context for backward compatibility
export type OrderPaymentState = ReturnType<
  typeof OrderPaymentStore.useStoreState
>

const OrderPaymentLegacyContext = createContext<{
  state: OrderPaymentState
  dispatch: (action: any) => void
}>({
  state: {} as OrderPaymentState,
  dispatch: () => null,
})

/**
 * Backward compatible hook
 */
export const useOrderPaymentContext = () => {
  const { state, dispatch } = useContext(OrderPaymentLegacyContext)
  const actions = OrderPaymentStore.useStoreActions(actions => actions)

  return {
    ...state,
    setSelectedBankAccountId: actions.setSelectedBankAccountId,
    setBankAccountSelection: actions.setBankAccountSelection,
    setSelectedPaymentMethod: actions.setSelectedPaymentMethod,
    setBalanceCheckComplete: actions.setBalanceCheckComplete,
    setBankAccountHasInsufficientFunds:
      actions.setBankAccountHasInsufficientFunds,
    setStripeClient: actions.setStripeClient,
    setIsSavingPayment: actions.setIsSavingPayment,
    setIsStripePaymentElementLoading: actions.setIsStripePaymentElementLoading,
    setIsLoading: actions.setIsLoading,
  }
}

// Export original context name for migration compatibility
export const OrderPaymentContext = OrderPaymentStore

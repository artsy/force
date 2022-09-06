import React, { useReducer, createContext, Dispatch } from "react"
import { paymentReducer } from "./reducer"
import { PaymentAction, PaymentState } from "./types"
import createLogger from "Utils/logger"

const logger = createLogger("[dev: OrderPaymentContext] state:")

const initialPaymentState = {
  selectedBankAccountId: "",
  selectedPaymentMethod: "",
}

const PaymentContext = createContext<{
  state: PaymentState
  dispatch: Dispatch<PaymentAction>
}>({
  state: initialPaymentState,
  dispatch: () => null,
})

const PaymentProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState)

  // for developers' convenience only
  if (process.env.NODE_ENV === "development") {
    logger.log(state)
  }

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  )
}

export { PaymentContext, PaymentProvider }

import React, { useReducer, createContext, Dispatch } from "react"
import { paymentReducer } from "./reducer"
import { PaymentAction, PaymentState } from "./types"

const initialPaymentState = {
  selectedBankAccountId: "",
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
    console.log({ paymentState: state })
  }

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  )
}

export { PaymentContext, PaymentProvider }

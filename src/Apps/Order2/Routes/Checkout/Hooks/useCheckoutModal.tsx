import type { CheckoutModalError } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { createContext, useContext, useState } from "react"

interface CheckoutModalContextValue {
  checkoutModalError: CheckoutModalError | null
  setCheckoutModalError: (error: CheckoutModalError | null) => void
}

const CheckoutModalContext = createContext<CheckoutModalContextValue | null>(
  null,
)

export const CheckoutModalProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [checkoutModalError, setCheckoutModalError] =
    useState<CheckoutModalError | null>(null)

  return (
    <CheckoutModalContext.Provider
      value={{ checkoutModalError, setCheckoutModalError }}
    >
      {children}
    </CheckoutModalContext.Provider>
  )
}

export const useCheckoutModal = (): CheckoutModalContextValue => {
  const context = useContext(CheckoutModalContext)

  if (!context) {
    throw new Error(
      "useCheckoutModal must be used within a CheckoutModalProvider",
    )
  }

  return context
}

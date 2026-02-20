import type { CheckoutModalError } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { createContext, useCallback, useContext, useState } from "react"

interface CheckoutModalContextValue {
  checkoutModalError: CheckoutModalError | null
  checkoutModalTitle?: string
  checkoutModalDescription?: string
  showCheckoutErrorModal: (params: {
    error: CheckoutModalError
    title?: string
    description?: string
    onClose?: () => void
  }) => void
  dismissCheckoutErrorModal: () => void
}

const CheckoutModalContext = createContext<CheckoutModalContextValue | null>(
  null,
)

export const CheckoutModalProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [checkoutModalError, setCheckoutModalError] =
    useState<CheckoutModalError | null>(null)
  const [checkoutModalTitle, setCheckoutModalTitle] = useState<
    string | undefined
  >()
  const [checkoutModalDescription, setCheckoutModalDescription] = useState<
    string | undefined
  >()
  const [onClose, setOnClose] = useState<(() => void) | undefined>()

  const showCheckoutErrorModal = useCallback(
    (params: {
      error: CheckoutModalError
      title?: string
      description?: string
      onClose?: () => void
    }) => {
      setCheckoutModalError(params.error)
      setCheckoutModalTitle(params.title)
      setCheckoutModalDescription(params.description)
      setOnClose(() => params.onClose)
    },
    [],
  )

  const dismissCheckoutErrorModal = useCallback(() => {
    onClose?.()
    setCheckoutModalError(null)
    setCheckoutModalTitle(undefined)
    setCheckoutModalDescription(undefined)
    setOnClose(undefined)
  }, [onClose])

  return (
    <CheckoutModalContext.Provider
      value={{
        checkoutModalError,
        checkoutModalTitle,
        checkoutModalDescription,
        showCheckoutErrorModal,
        dismissCheckoutErrorModal,
      }}
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

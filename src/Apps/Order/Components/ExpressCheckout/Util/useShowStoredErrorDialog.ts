import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { useEffect } from "react"

interface ErrorDetails {
  title?: string
  message?: string
}

export const useShowStoredErrorDialog = () => {
  const shippingContext = useShippingContext()

  useEffect(() => {
    if (!shippingContext?.actions?.dialog?.showErrorDialog) {
      return
    }

    const storedError = sessionStorage.getItem("expressCheckoutError")
    if (storedError) {
      const errorDetails: ErrorDetails = JSON.parse(storedError)

      setTimeout(() => {
        shippingContext.actions.dialog.showErrorDialog(errorDetails)
        sessionStorage.removeItem("expressCheckoutError")
      }, 2000)
    }
  }, [shippingContext.actions.dialog.showErrorDialog])
}

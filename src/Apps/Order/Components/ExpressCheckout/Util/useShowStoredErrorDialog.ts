import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { useEffect } from "react"

export const useShowStoredErrorDialog = () => {
  const shippingContext = useShippingContext()

  useEffect(() => {
    const storedError = sessionStorage.getItem("expressCheckoutError")
    if (storedError) {
      const errorDetails = JSON.parse(storedError)

      setTimeout(() => {
        shippingContext.actions.dialog.showErrorDialog(errorDetails)
        sessionStorage.removeItem("expressCheckoutError")
      }, 1000)
    }
  }, [shippingContext.actions.dialog.showErrorDialog])
}

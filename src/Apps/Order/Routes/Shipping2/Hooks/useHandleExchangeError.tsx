import { Dialog } from "Apps/Order/Dialogs"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { ComputedOrderData } from "Apps/Order/Routes/Shipping2/Utils/computeOrderData"
import {
  ArtaErrorDialogMessage,
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import createLogger from "Utils/logger"

interface UseHandleExchangeErrorProps {
  dialog: Dialog
  isArtsyShipping: boolean
  orderData: ComputedOrderData
}

export const useHandleExchangeError = ({
  dialog,
  isArtsyShipping,
  orderData,
}: UseHandleExchangeErrorProps) => {
  const orderTracking = useOrderTracking()

  const handleExchangeError = (
    error: { code: string; data: string | null | undefined },
    logger: ReturnType<typeof createLogger>
  ) => {
    logger.error(error)

    const parsedData = error.data ? JSON.parse(error.data) : {}

    if (
      error.code === "missing_region" ||
      error.code === "missing_country" ||
      error.code === "missing_postal_code"
    ) {
      orderTracking.errorMessageViewed({
        error_code: error.code,
        title: "Invalid address",
        message:
          "There was an error processing your address. Please review and try again.",
        flow: "user submits a shipping option",
      })

      dialog.showErrorDialog({
        title: "Invalid address",
        message:
          "There was an error processing your address. Please review and try again.",
      })
    } else if (
      error.code === "unsupported_shipping_location" &&
      parsedData.failure_code === "domestic_shipping_only"
    ) {
      orderTracking.errorMessageViewed({
        error_code: error.code,
        title: "Can't ship to that address",
        message: "This work can only be shipped domestically.",
        flow: "user submits a shipping option",
      })

      dialog.showErrorDialog({
        title: "Can't ship to that address",
        message: "This work can only be shipped domestically.",
      })
    } else if (error.code === "destination_could_not_be_geocoded") {
      const { title, message, formattedMessage } = getErrorDialogCopy(
        ErrorDialogs.DestinationCouldNotBeGeocoded
      )

      orderTracking.errorMessageViewed({
        error_code: error.code,
        title: title,
        message: message,
        flow: "user submits a shipping option",
      })

      dialog.showErrorDialog({
        title,
        message: formattedMessage,
      })
    } else if (isArtsyShipping && !orderData.selectedShippingQuoteID) {
      orderTracking.errorMessageViewed({
        error_code: null,
        title: "An error occurred",
        message:
          "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
        flow: "user submits a shipping option",
      })

      dialog.showErrorDialog({
        message: <ArtaErrorDialogMessage />,
      })
    } else {
      orderTracking.errorMessageViewed({
        error_code: error.code,
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net.",
        flow: "user submits a shipping option",
      })

      dialog.showErrorDialog()
    }
  }

  return {
    handleExchangeError,
  }
}

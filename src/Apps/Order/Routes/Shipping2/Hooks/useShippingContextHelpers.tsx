import { useCallback, useContext, useState } from "react"
import { FormikProps } from "formik"
import { ParsedOrderData } from "Apps/Order/Routes/Shipping2/Hooks/useParseOrderData"
import {
  ShippingContext,
  ShippingStage,
} from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"
import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { useOrderTracking } from "Apps/Order/Utils/useOrderTracking"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import { Dialog } from "Apps/Order/Dialogs"
import { ArtaErrorDialogMessage } from "Apps/Order/Routes/Shipping2/ArtaErrorDialogMessage"

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

type FulfillmentHelpers = Pick<
  FormikProps<FulfillmentValues>,
  "submitForm" | "isValid" | "values"
>

export interface ShippingContextHelpers {
  dialog: Dialog
  orderTracking: ReturnType<typeof useOrderTracking>
  fulfillmentDetails: Pick<
    FormikProps<FulfillmentValues>,
    "submitForm" | "isValid" | "values"
  > & {
    setFulfillmentFormHelpers: (helpers: FulfillmentHelpers) => void
  }
  handleExchangeError: (
    error: {
      code: string
      data: string | null | undefined
    },
    logger: ReturnType<typeof createLogger>
  ) => void
  setSelectedShippingQuote: (payload: string | null) => void
  setNewSavedAddressId: (payload: string | null) => void
  setStage: (payload: ShippingStage) => void
}

export const useShippingContextHelpers = (
  parsedOrderData: ParsedOrderData,
  dialog: Dialog,
  dispatch: (action: any) => void
): ShippingContextHelpers => {
  /**
   * Because there is a single button for both fulfillment details and
   * shipping quote steps (and duplicated in the sidebar)
   * we need to hack some formik values UP from the fulfillment details form.
   *
   * Currently we need to pass up:
   */
  const [fulfillmentFormHelpers, setFulfillmentFormHelpers] = useState<
    Pick<FormikProps<FulfillmentValues>, "submitForm" | "isValid" | "values">
  >({
    // Used to submit the form
    submitForm: () => Promise.reject(new Error("form not loaded")),
    // Used to disable the button
    isValid: false,
    // Used to get the form values for un-saving the address if the user
    // unchecks it after saving it in the fulfillment details step.
    values: ({
      attributes: {
        saveAddress: false,
      },
    } as unknown) as FulfillmentValues,
  })
  const fulfillmentDetails = {
    ...fulfillmentFormHelpers,
    setFulfillmentFormHelpers,
  }

  const orderTracking = useOrderTracking()
  const isArtsyShipping = !!parsedOrderData.savedFulfillmentDetails
    ?.isArtsyShipping

  const handleExchangeError = useCallback(
    (
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
      } else if (isArtsyShipping && !parsedOrderData.selectedShippingQuoteId) {
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
    },
    [
      isArtsyShipping,
      parsedOrderData.selectedShippingQuoteId,
      orderTracking,
      dialog,
    ]
  )

  return {
    setSelectedShippingQuote: (payload: string | null) =>
      dispatch({ type: "SET_SELECTED_SHIPPING_QUOTE", payload }),
    setNewSavedAddressId: (payload: string | null) =>
      dispatch({ type: "SET_NEW_SAVED_ADDRESS_ID", payload }),
    setStage: (payload: ShippingStage) => {
      dispatch({ type: "SET_STAGE", payload })
    },
    handleExchangeError,
    orderTracking,
    fulfillmentDetails,
    dialog,
  }
}

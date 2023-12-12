import { createContext, FC } from "react"
import {
  ParsedOrderData,
  parseOrderData,
} from "Apps/Order/Routes/Shipping2/Utils/ShippingContext/parseOrderData"
import { useReducer } from "react"
import { ShippingProps, ShippingStage } from "Apps/Order/Routes/Shipping2"
import { useState } from "react"
import { FormikProps } from "formik"
import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { useOrderTracking } from "Apps/Order/Utils/useOrderTracking"
import {
  ArtaErrorDialogMessage,
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import { Dialog } from "Apps/Order/Dialogs"

export interface State {
  newSavedAddressId: string | null
  selectedShippingQuoteId: string | null
  stage: ShippingStage
}

type FulfillmentHelpers = Pick<
  FormikProps<FulfillmentValues>,
  "submitForm" | "isValid" | "values"
>

interface ShippingContextHelpers {
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

export interface ShippingContextProps {
  state: State
  parsedOrderData: ParsedOrderData
  helpers: ShippingContextHelpers
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const ShippingContextProvider: FC<Pick<
  ShippingProps,
  "order" | "me" | "dialog"
>> = props => {
  const parsedOrderData = parseOrderData(props.order, props.me)
  const orderTracking = useOrderTracking()

  const isArtsyShipping = !!parsedOrderData.savedFulfillmentDetails
    ?.isArtsyShipping

  const initialState: State = {
    newSavedAddressId: null,
    selectedShippingQuoteId: parsedOrderData.selectedShippingQuoteId ?? null,
    stage: isArtsyShipping ? "refresh_shipping_quotes" : "fulfillment_details",
  }

  /*
    *******
    Helpers
    *******
  */

  const [state, dispatch] = useReducer(shippingStateReducer, initialState)
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

  const fulfillmentDetailsHelpers = {
    ...fulfillmentFormHelpers,
    setFulfillmentFormHelpers,
  }

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

      props.dialog.showErrorDialog({
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

      props.dialog.showErrorDialog({
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

      props.dialog.showErrorDialog({
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

      props.dialog.showErrorDialog({
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

      props.dialog.showErrorDialog()
    }
  }

  const helpers = {
    setSelectedShippingQuote: (payload: string | null) =>
      dispatch({ type: "SET_SELECTED_SHIPPING_QUOTE", payload }),
    setNewSavedAddressId: (payload: string | null) =>
      dispatch({ type: "SET_NEW_SAVED_ADDRESS_ID", payload }),
    setStage: (payload: ShippingStage) => {
      dispatch({ type: "SET_STAGE", payload })
    },
    handleExchangeError,
    orderTracking,
    fulfillmentDetails: fulfillmentDetailsHelpers,
    dialog: props.dialog,
  }

  const context = {
    state,
    parsedOrderData,
    helpers,
  }

  return (
    <ShippingContext.Provider value={context}>
      {props.children}
    </ShippingContext.Provider>
  )
}

export type Action =
  | { type: "SET_SELECTED_SHIPPING_QUOTE"; payload: string | null }
  | { type: "SET_NEW_SAVED_ADDRESS_ID"; payload: string | null }
  | { type: "SET_STAGE"; payload: ShippingStage }

const shippingStateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELECTED_SHIPPING_QUOTE":
      return { ...state, selectedShippingQuoteId: action.payload }
    case "SET_NEW_SAVED_ADDRESS_ID":
      return { ...state, newSavedAddressId: action.payload }
    case "SET_STAGE":
      return { ...state, stage: action.payload }
    default:
      return state
  }
}

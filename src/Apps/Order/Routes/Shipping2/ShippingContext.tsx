import { createContext, FC } from "react"
import {
  ComputedOrderData,
  computeOrderData,
} from "Apps/Order/Routes/Shipping2/Utils/computeOrderData"
import { useReducer } from "react"
import { ShippingProps, ShippingStage } from "Apps/Order/Routes/Shipping2"
import { FormikProps } from "formik"
import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { Dialog } from "Apps/Order/Dialogs"
import { useHandleExchangeError } from "Apps/Order/Routes/Shipping2/Hooks/useHandleExchangeError"

export interface State {
  formHelpers: FormHelpers
  newSavedAddressId: string | null
  selectedShippingQuoteId: string | null
  stage: ShippingStage
  isPerformingOperation: boolean
  isArtsyShipping: boolean
}

interface Actions {
  dialog: Dialog
  handleExchangeError: (
    error: {
      code: string
      data: string | null | undefined
    },
    logger: ReturnType<typeof createLogger>
  ) => void
  setFormHelpers: (payload: FormHelpers) => void
  setSelectedShippingQuote: (payload: string | null) => void
  setNewSavedAddressId: (payload: string | null) => void
  setIsPerformingOperation: (payload: boolean) => void
  setStage: (payload: ShippingStage) => void
}

export interface ShippingContextProps {
  actions: Actions
  state: State
  orderData: ComputedOrderData
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const ShippingContextProvider: FC<Pick<
  ShippingProps,
  "order" | "me" | "dialog"
>> = props => {
  const orderData = computeOrderData(props.order, props.me)

  const isArtsyShipping = !!orderData.savedFulfillmentDetails?.isArtsyShipping

  const initialState: State = {
    /**
     * Because there is a single button for both fulfillment details and
     * shipping quote steps (and duplicated in the sidebar)
     * we need to hack some formik values UP from the fulfillment details form.
     */
    formHelpers: {
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
    },
    isArtsyShipping,
    isPerformingOperation: false,
    newSavedAddressId: null,
    selectedShippingQuoteId: orderData.selectedShippingQuoteId ?? null,
    stage: isArtsyShipping ? "refresh_shipping_quotes" : "fulfillment_details",
  }

  const [state, dispatch] = useReducer(shippingStateReducer, initialState)

  const { handleExchangeError } = useHandleExchangeError({
    dialog: props.dialog,
    isArtsyShipping,
    orderData,
  })

  const actions = {
    setFormHelpers: (formHelpers: FormHelpers) => {
      dispatch({ type: "SET_FORM_HELPERS", payload: formHelpers })
    },
    setSelectedShippingQuote: (payload: string | null) => {
      dispatch({ type: "SET_SELECTED_SHIPPING_QUOTE", payload })
    },
    setNewSavedAddressId: (payload: string | null) => {
      dispatch({ type: "SET_NEW_SAVED_ADDRESS_ID", payload })
    },
    setStage: (payload: ShippingStage) => {
      dispatch({ type: "SET_STAGE", payload })
    },
    setIsPerformingOperation: (payload: boolean) => {
      dispatch({ type: "SET_IS_PERFORMING_OPERATION", payload })
    },
    handleExchangeError,
    dialog: props.dialog,
  }

  const contextProps = {
    state,
    orderData,
    actions,
  }

  return (
    <ShippingContext.Provider value={contextProps}>
      {props.children}
    </ShippingContext.Provider>
  )
}

type FormHelpers = Pick<
  FormikProps<FulfillmentValues>,
  "submitForm" | "isValid" | "values"
>

export type Action =
  | {
      type: "SET_FORM_HELPERS"
      payload: Pick<
        FormikProps<FulfillmentValues>,
        "submitForm" | "isValid" | "values"
      >
    }
  | { type: "SET_SELECTED_SHIPPING_QUOTE"; payload: string | null }
  | { type: "SET_NEW_SAVED_ADDRESS_ID"; payload: string | null }
  | { type: "SET_STAGE"; payload: ShippingStage }
  | { type: "SET_IS_PERFORMING_OPERATION"; payload: boolean }

const shippingStateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FORM_HELPERS": {
      return {
        ...state,
        formHelpers: action.payload,
      }
    }
    case "SET_SELECTED_SHIPPING_QUOTE": {
      return {
        ...state,
        selectedShippingQuoteId: action.payload,
      }
    }
    case "SET_NEW_SAVED_ADDRESS_ID": {
      return {
        ...state,
        newSavedAddressId: action.payload,
      }
    }
    case "SET_STAGE": {
      return {
        ...state,
        stage: action.payload,
      }
    }
    case "SET_IS_PERFORMING_OPERATION": {
      return {
        ...state,
        isPerformingOperation: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

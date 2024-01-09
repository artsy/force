import React, { createContext, FC, useMemo, useReducer, useRef } from "react"
import {
  ComputedOrderData,
  computeOrderData,
} from "Apps/Order/Routes/Shipping2/Utils/computeOrderData"
import { compact } from "lodash"
import { extractNodes } from "Utils/extractNodes"
import { ShippingProps, ShippingStage } from "Apps/Order/Routes/Shipping2"
import { FormikProps } from "formik"
import {
  FulfillmentValues,
  SavedAddressType,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { Dialog } from "Apps/Order/Dialogs"
import { useHandleExchangeError } from "Apps/Order/Routes/Shipping2/Hooks/useHandleExchangeError"

export interface State {
  fulfillmentDetailsCtx: FormikProps<FulfillmentValues>
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
  setFulfillmentDetailsCtx: (payload: FormikProps<FulfillmentValues>) => void
  setSelectedShippingQuote: (payload: string | null) => void
  setNewSavedAddressId: (payload: string | null) => void
  setIsPerformingOperation: (payload: boolean) => void
  setStage: (payload: ShippingStage) => void
}

export interface ShippingContextProps {
  actions: Actions
  state: State
  orderData: ComputedOrderData
  meData: {
    addressList: SavedAddressType[]
  }
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const ShippingContextProvider: FC<Pick<
  ShippingProps,
  "order" | "me" | "dialog"
>> = props => {
  const meData = useMemo(
    () => ({
      addressList: compact<SavedAddressType>(
        extractNodes(props.me?.addressConnection) ?? []
      ),
    }),
    [props.me.addressConnection]
  )
  const orderData = computeOrderData(props.order, meData)

  const isArtsyShipping = !!orderData.savedFulfillmentDetails?.isArtsyShipping

  /*
   * Because there is a single button for both fulfillment details and
   * shipping quote steps (and duplicated in the sidebar)
   * we need to hack some formik values UP from the fulfillment details form.
   */
  const fulfillmentFormikRef = useRef<FormikProps<FulfillmentValues>>(({
    // Used to submit the form
    submitForm: () => Promise.reject(new Error("form not loaded")),
    // Used to disable the button
    isValid: false,
    // Used to get the form values for un-saving the address if the user
    // unchecks it after saving it in the fulfillment details step.
    values: {
      attributes: {
        saveAddress: false,
      },
    },
  } as unknown) as FormikProps<FulfillmentValues>)

  const initialState: State = {
    fulfillmentDetailsCtx: fulfillmentFormikRef.current,
    isArtsyShipping,
    isPerformingOperation: false,
    newSavedAddressId: null,
    selectedShippingQuoteId: orderData.selectedShippingQuoteId ?? null,
    stage: "fulfillment_details",
  }

  const [state, dispatch] = useReducer(shippingStateReducer, initialState)

  const { handleExchangeError } = useHandleExchangeError({
    dialog: props.dialog,
    isArtsyShipping,
    orderData,
  })

  const actions = {
    setFulfillmentDetailsCtx: (formHelpers: FormikProps<FulfillmentValues>) => {
      dispatch({ type: "SET_FULFILLMENT_DETAILS_CTX", payload: formHelpers })
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
    actions,
    meData,
    orderData,
    state,
  }

  return (
    <ShippingContext.Provider value={contextProps}>
      {props.children}
    </ShippingContext.Provider>
  )
}

export type Action =
  | {
      type: "SET_FULFILLMENT_DETAILS_CTX"
      payload: FormikProps<FulfillmentValues>
    }
  | { type: "SET_SELECTED_SHIPPING_QUOTE"; payload: string | null }
  | { type: "SET_NEW_SAVED_ADDRESS_ID"; payload: string | null }
  | { type: "SET_STAGE"; payload: ShippingStage }
  | { type: "SET_IS_PERFORMING_OPERATION"; payload: boolean }

const shippingStateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FULFILLMENT_DETAILS_CTX": {
      return {
        ...state,
        fulfillmentDetailsCtx: action.payload,
      }
    }
    case "SET_IS_PERFORMING_OPERATION": {
      return {
        ...state,
        isPerformingOperation: action.payload,
      }
    }
    case "SET_NEW_SAVED_ADDRESS_ID": {
      return {
        ...state,
        newSavedAddressId: action.payload,
      }
    }
    case "SET_SELECTED_SHIPPING_QUOTE": {
      return {
        ...state,
        selectedShippingQuoteId: action.payload,
      }
    }
    case "SET_STAGE": {
      return {
        ...state,
        stage: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

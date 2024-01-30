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
  // Form state for fulfillment details
  fulfillmentDetailsCtx: FormikProps<FulfillmentValues>
  // Presence of this value indicates that the user has saved their first address
  newSavedAddressID: string | null
  // Form state for saved address radio buttons
  selectedSavedAddressID: string | null
  // Form state for shipping quote radio buttons
  selectedShippingQuoteID: string | null
  // Stage of the shipping flow the user is in
  stage: ShippingStage
  // Manually set & unset when performing mutations
  isPerformingOperation: boolean
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
  setNewSavedAddressID: (payload: string | null) => void
  setSelectedSavedAddressID: (payload: string | null) => void
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
    isPerformingOperation: false,
    newSavedAddressID: null,
    selectedShippingQuoteID: orderData.selectedShippingQuoteID ?? null,
    stage: "fulfillment_details",
    selectedSavedAddressID:
      orderData.savedFulfillmentDetails?.selectedSavedAddressID ?? null,
  }

  const [state, dispatch] = useReducer(shippingStateReducer, initialState)

  const { handleExchangeError } = useHandleExchangeError({
    dialog: props.dialog,
    isArtsyShipping:
      orderData.savedFulfillmentDetails?.isArtsyShipping ?? false,
    orderData,
  })

  const actions = {
    setFulfillmentDetailsCtx: (formHelpers: FormikProps<FulfillmentValues>) => {
      dispatch({ type: "SET_FULFILLMENT_DETAILS_CTX", payload: formHelpers })
    },
    setSelectedShippingQuote: (payload: string | null) => {
      dispatch({ type: "SET_SELECTED_SHIPPING_QUOTE", payload })
    },
    setSelectedSavedAddressID: (payload: string | null) => {
      dispatch({ type: "SET_SELECTED_SAVED_ADDRESS_ID", payload })
    },
    setNewSavedAddressID: (payload: string | null) => {
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
  | { type: "SET_SELECTED_SAVED_ADDRESS_ID"; payload: string | null }
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
        newSavedAddressID: action.payload,
      }
    }
    case "SET_SELECTED_SHIPPING_QUOTE": {
      return {
        ...state,
        selectedShippingQuoteID: action.payload,
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

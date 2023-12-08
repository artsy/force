import { useContext, useReducer } from "react"
import { ShippingProps } from "Apps/Order/Routes/Shipping2"
import { useParseOrderData } from "Apps/Order/Routes/Shipping2/Hooks/useParseOrderData"
import {
  ShippingContext,
  ShippingContextProps,
  ShippingStage,
  State,
} from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"
import { useShippingContextHelpers } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContextHelpers"

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

/**
 * Load the full shipping context from its top-level route using relay props.
 */
export const useComputeShippingContext = (
  props: ShippingProps
): ShippingContextProps => {
  const parsedOrderData = useParseOrderData(props.order, props.me)

  const initialState: State = {
    newSavedAddressId: null,
    selectedShippingQuoteId: parsedOrderData.selectedShippingQuoteId ?? null,
    stage: parsedOrderData.savedFulfillmentDetails?.isArtsyShipping
      ? "refresh_shipping_quotes"
      : "fulfillment_details",
  }
  const [state, dispatch] = useReducer(shippingStateReducer, initialState)

  const helpers = useShippingContextHelpers(
    parsedOrderData,
    props.dialog,
    dispatch
  )

  return {
    state,
    parsedOrderData,
    helpers,
  }
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

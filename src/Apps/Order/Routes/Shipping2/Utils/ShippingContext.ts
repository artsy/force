import { createContext, useContext } from "react"
import { ParsedOrderData } from "Apps/Order/Routes/Shipping2/Hooks/useParseOrderData"
import { ShippingContextHelpers } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContextHelpers"

export type ShippingStage =
  | "fulfillment_details"
  | "shipping_quotes"
  | "refresh_shipping_quotes"

export interface State {
  newSavedAddressId: string | null
  selectedShippingQuoteId: string | null
  stage: ShippingStage
}

export interface ShippingContextProps {
  state: State
  parsedOrderData: ParsedOrderData
  helpers: ShippingContextHelpers
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

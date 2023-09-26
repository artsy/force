import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { createContext, useContext } from "react"

export interface ShippingContextProps {
  lockShippingCountryTo: "EU" | string | null
  shipsFrom: string
  availableShippingCountries: string[]
  requiresArtsyShippingTo: (shipTo: string) => boolean
  selectedSavedAddressId: string | null
  fulfillmentDetails: FulfillmentValues["attributes"] | null
  fulfillmentType: FulfillmentValues["fulfillmentType"] | null
  isArtsyShipping?: boolean
  shippingQuotes?: Array<{ id: string; isSelected: boolean }>
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

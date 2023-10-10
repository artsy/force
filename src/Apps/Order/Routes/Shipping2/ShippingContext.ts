import { ShippingProps } from "Apps/Order/Routes/Shipping2"
// FIXME: Duplicate sources of truth in country lists
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"
import { COUNTRIES_IN_EUROPEAN_UNION } from "@artsy/commerce_helpers"
import { extractNodes } from "Utils/extractNodes"
import { createContext, useContext, useMemo } from "react"

export interface ShippingContextProps {
  isArtsyShipping?: boolean
  lockShippingCountryTo: "EU" | string | null
  shipsFrom: string
  availableShippingCountries: string[]
  requiresArtsyShippingTo: (shipTo: string) => boolean
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

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

const orderRequiresArtsyShippingFactory = (
  order: ShippingProps["order"]
): ((shipToCountry: string) => boolean) => {
  // technically if pickup is not available, and the address limitations
  // require artsy shipping, then it requires artsy shipping. But we don't
  // need that today... Do we? TODO

  const orderArtwork = order.lineItems?.edges?.[0]?.node?.artwork
  const artworkCountry = orderArtwork?.shippingCountry

  return (shipToCountry: string) => {
    const isDomesticOrder =
      (shipToCountry && shipToCountry === artworkCountry) ||
      (COUNTRIES_IN_EUROPEAN_UNION.includes(shipToCountry) &&
        COUNTRIES_IN_EUROPEAN_UNION.includes(artworkCountry))
    // Shipping is set on the order and it needs to use Artsy shipping

    const requiresArtsyShipping =
      (isDomesticOrder && !!orderArtwork?.processWithArtsyShippingDomestic) ||
      (!isDomesticOrder && !!orderArtwork?.artsyShippingInternational)
    return requiresArtsyShipping
  }
}

export const useLoadOrderContext = (order: ShippingProps["order"]) => {
  const firstArtwork = extractNodes(order.lineItems)[0]!.artwork!
  const isArtsyShipping =
    order.requestedFulfillment?.__typename === "CommerceShipArta"

  return useMemo<ShippingContextProps>(() => {
    const shipsFrom = firstArtwork.shippingCountry!
    const domesticOnly = !!firstArtwork.onlyShipsDomestically
    const euOrigin = !!firstArtwork.euShippingOrigin

    const lockShippingCountryTo = domesticOnly
      ? euOrigin
        ? "EU"
        : shipsFrom
      : null

    const availableShippingCountries = !!lockShippingCountryTo
      ? lockShippingCountryTo === "EU"
        ? EU_COUNTRY_CODES
        : [lockShippingCountryTo]
      : ALL_COUNTRY_CODES
    return {
      isArtsyShipping,
      lockShippingCountryTo,
      shipsFrom,
      availableShippingCountries,
      requiresArtsyShippingTo: orderRequiresArtsyShippingFactory(order),
    }
    // Assume artwork will not be updated during the order flow
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstArtwork.slug!, isArtsyShipping])
}

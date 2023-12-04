import { ShippingProps } from "Apps/Order/Routes/Shipping2"
import {
  FulfillmentType,
  PickupValues,
  ShippingAddressFormValues,
  addressWithFallbackValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"
import { extractNodes } from "Utils/extractNodes"
import { useCallback, useMemo } from "react"

export interface ParsedOrderData {
  lockShippingCountryTo: "EU" | string | null
  shipsFrom: string
  availableShippingCountries: string[]
  requiresArtsyShippingTo: (shipTo: string) => boolean
  selectedShippingQuoteId?: string
  savedFulfillmentData: SavedFulfillmentData
  shippingQuotes?: Array<{ id: string; isSelected: boolean }>
}
// Compute and memoize data from the saved order.
export const useParseOrderData = (props: ShippingProps): ParsedOrderData => {
  const { me, order } = props
  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstLineItem = extractNodes(order.lineItems)[0]!
  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstArtwork = firstLineItem.artwork!
  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const artworkCountry = firstArtwork?.shippingCountry!
  const savedFulfillmentData = useSavedFulfillmentData(order, me)

  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shipsFrom = firstArtwork.shippingCountry!
  const domesticOnly = !!firstArtwork.onlyShipsDomestically
  const euOrigin = !!firstArtwork.euShippingOrigin

  const lockShippingCountryTo = domesticOnly
    ? euOrigin
      ? "EU"
      : shipsFrom
    : null

  const availableShippingCountries = !lockShippingCountryTo
    ? ALL_COUNTRY_CODES
    : lockShippingCountryTo === "EU"
    ? EU_COUNTRY_CODES
    : [lockShippingCountryTo]

  // todo: Should this be moved into ShippingContext.helpers? It relies on several
  // intermediate values we don't expose.
  const requiresArtsyShippingTo = useCallback(
    (shipToCountry: string) => {
      const isDomesticShipping =
        (shipToCountry && shipToCountry === artworkCountry) ||
        (EU_COUNTRY_CODES.includes(shipToCountry) &&
          EU_COUNTRY_CODES.includes(artworkCountry))

      const requiresArtsyShipping =
        (isDomesticShipping &&
          firstArtwork?.processWithArtsyShippingDomestic) ||
        (!isDomesticShipping && !!firstArtwork?.artsyShippingInternational)
      return requiresArtsyShipping
    },
    [
      artworkCountry,
      firstArtwork.artsyShippingInternational,
      firstArtwork.processWithArtsyShippingDomestic,
    ]
  )

  const shippingQuotes = extractNodes(firstLineItem.shippingQuoteOptions) ?? []
  const selectedShippingQuoteId = shippingQuotes.find(quote => quote.isSelected)
    ?.id

  return {
    savedFulfillmentData,
    shippingQuotes,
    availableShippingCountries,
    lockShippingCountryTo,
    requiresArtsyShippingTo,
    selectedShippingQuoteId,
    shipsFrom,
  }
}

type SavedFulfillmentData =
  | {
      fulfillmentType: FulfillmentType.PICKUP
      isArtsyShipping: false
      fulfillmentDetails: PickupValues["attributes"]
      selectedSavedAddressId: null
    }
  | {
      fulfillmentType: FulfillmentType.SHIP
      isArtsyShipping: boolean
      fulfillmentDetails: ShippingAddressFormValues
      selectedSavedAddressId: string | null
    }
  | null

const useSavedFulfillmentData = (
  order: ShippingProps["order"],
  me: ShippingProps["me"]
): SavedFulfillmentData => {
  const fulfillmentTypeName = order.requestedFulfillment?.__typename

  return useMemo(() => {
    if (fulfillmentTypeName) {
      if (fulfillmentTypeName === "CommercePickup") {
        return {
          fulfillmentType: FulfillmentType.PICKUP,
          isArtsyShipping: false,
          fulfillmentDetails: {
            phoneNumber: order.requestedFulfillment.phoneNumber ?? "",
            name: "",
          },
          selectedSavedAddressId: null,
        }
      } else if (
        ["CommerceShip", "CommerceShipArta"].includes(fulfillmentTypeName)
      ) {
        return {
          fulfillmentType: FulfillmentType.SHIP,
          isArtsyShipping: fulfillmentTypeName === "CommerceShipArta",
          fulfillmentDetails: addressWithFallbackValues(
            order.requestedFulfillment
          ),
          selectedSavedAddressId: null,
        }
      }
    }
    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fulfillmentTypeName, JSON.stringify(order.requestedFulfillment)])
}

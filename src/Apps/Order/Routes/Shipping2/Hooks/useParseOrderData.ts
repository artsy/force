import { ShippingProps } from "Apps/Order/Routes/Shipping2"
import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import {
  FulfillmentType,
  SavedAddressType,
  ShippingAddressFormValues,
  addressWithFallbackValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"
import { extractNodes } from "Utils/extractNodes"
import { useCallback } from "react"

export interface ParsedOrderData {
  lockShippingCountryTo: "EU" | string | null
  shipsFrom: string
  availableShippingCountries: string[]
  requiresArtsyShippingTo: (shipTo: string) => boolean
  selectedSavedAddressId: string | null
  selectedShippingQuoteId?: string
  fulfillmentDetails: FulfillmentValues["attributes"] | null
  fulfillmentType: FulfillmentValues["fulfillmentType"] | null
  isArtsyShipping?: boolean
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
  const savedFulfillmentData = getSavedFulfillmentData(order, me)

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
    fulfillmentDetails: savedFulfillmentData?.fulfillmentDetails || null,
    fulfillmentType: savedFulfillmentData?.fulfillmentType || null,
    selectedSavedAddressId:
      savedFulfillmentData?.selectedSavedAddressId || null,
    isArtsyShipping: savedFulfillmentData?.isArtsyShipping,
    shippingQuotes,
    availableShippingCountries,
    lockShippingCountryTo,
    requiresArtsyShippingTo,
    selectedShippingQuoteId,
    shipsFrom,
  }
}

const matchAddressFields = (...addressPair: [object, object]) => {
  const [a1, a2] = addressPair.map(a => addressWithFallbackValues(a))
  return (
    a1.addressLine1 === a2.addressLine1 &&
    a1.addressLine2 === a2.addressLine2 &&
    a1.city === a2.city &&
    a1.country === a2.country &&
    a1.name === a2.name &&
    a1.phoneNumber === a2.phoneNumber &&
    a1.postalCode === a2.postalCode &&
    a1.region === a2.region
  )
}

const getSavedFulfillmentData = (
  order: ShippingProps["order"],
  me: ShippingProps["me"]
): {
  fulfillmentType: FulfillmentType
  isArtsyShipping: boolean
  fulfillmentDetails: FulfillmentValues["attributes"]
  selectedSavedAddressId: string | null
} | null => {
  if (
    !order.requestedFulfillment ||
    Object.keys(order.requestedFulfillment).length === 0
  ) {
    return null
  }

  const requestedFulfillmentType = order.requestedFulfillment.__typename
  if (requestedFulfillmentType === "CommercePickup") {
    // FIXME: Non-null assertion
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const phoneNumber = order.requestedFulfillment.phoneNumber!
    return {
      fulfillmentType: FulfillmentType.PICKUP,
      isArtsyShipping: false,
      // TODO: [When things are working again]
      // figure out what `name` is used for w/ pickup, where to get it from
      fulfillmentDetails: { phoneNumber } as FulfillmentValues["attributes"],
      selectedSavedAddressId: null,
    }
  }
  const fulfillmentDetails: ShippingAddressFormValues = addressWithFallbackValues(
    order.requestedFulfillment
  )

  const addressList =
    extractNodes(me?.addressConnection) ??
    ([] as SavedAddressType[]).filter(a => !!a)

  // we don't store the address id on exchange orders, so we need to match every field
  const selectedSavedAddressId =
    addressList.find(node => matchAddressFields(node, fulfillmentDetails))
      ?.internalID || null

  if (requestedFulfillmentType === "CommerceShipArta") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: true,
      fulfillmentDetails,
      selectedSavedAddressId,
    }
  }
  if (requestedFulfillmentType === "CommerceShip") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: false,
      fulfillmentDetails,
      selectedSavedAddressId,
    }
  }
  // Should never happen. Log it?
  return null
}

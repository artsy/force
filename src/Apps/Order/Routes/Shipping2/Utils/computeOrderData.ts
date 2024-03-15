import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import {
  FulfillmentType,
  PickupValues,
  ShippingAddressFormValues,
  addressWithFallbackValues,
  matchAddressFields,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"
import { extractNodes } from "Utils/extractNodes"
import { ShippingContext_order$data } from "__generated__/ShippingContext_order.graphql"

export interface ComputedOrderData {
  internalID: string
  availableShippingCountries: string[]
  lockShippingCountryTo: "EU" | string | null
  requiresArtsyShippingTo: (shipTo: string) => boolean
  savedFulfillmentDetails: SavedFulfillmentData
  savedShippingQuoteData: SavedShippingQuoteData
  selectedShippingQuoteID?: string
  shippingQuotes?: Array<{ id: string; isSelected: boolean }>
  shipsFrom: string
}

type SavedFulfillmentData =
  | {
      fulfillmentType: FulfillmentType.PICKUP
      isArtsyShipping: false
      attributes: PickupValues["attributes"]
      selectedSavedAddressID: null
    }
  | {
      fulfillmentType: FulfillmentType.SHIP
      isArtsyShipping: boolean
      attributes: ShippingAddressFormValues
      selectedSavedAddressID: string | null
    }
  | null

type SavedShippingQuoteData = {
  selectedShippingQuoteID: string | null
  shippingQuotes: Array<{ id: string; isSelected: boolean }>
} | null

export const computeOrderData = (
  order: ShippingContext_order$data,
  meData: ShippingContextProps["meData"]
): ComputedOrderData => {
  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstLineItem = extractNodes(order.lineItems)[0]!
  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstArtwork = firstLineItem.artwork!
  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const artworkCountry = firstArtwork?.shippingCountry!
  const savedFulfillmentDetails = getSavedFulfillmentDetails(order, meData)
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

  // todo: Should this be moved into shippingContext.actions? It relies on several
  // intermediate values we don't expose.
  const requiresArtsyShippingTo = (shipToCountry: string) => {
    const isDomesticShipping =
      (shipToCountry && shipToCountry === artworkCountry) ||
      (EU_COUNTRY_CODES.includes(shipToCountry) &&
        EU_COUNTRY_CODES.includes(artworkCountry))

    const requiresArtsyShipping =
      (isDomesticShipping && firstArtwork?.processWithArtsyShippingDomestic) ||
      (!isDomesticShipping && !!firstArtwork?.artsyShippingInternational)

    return requiresArtsyShipping
  }

  const shippingQuotes = extractNodes(firstLineItem.shippingQuoteOptions) ?? []

  const selectedShippingQuoteID =
    shippingQuotes.find(quote => quote.isSelected)?.id ?? null

  return {
    internalID: order.internalID,
    savedFulfillmentDetails,
    savedShippingQuoteData: {
      selectedShippingQuoteID,
      shippingQuotes,
    },
    shippingQuotes,
    availableShippingCountries,
    lockShippingCountryTo,
    requiresArtsyShippingTo,
    shipsFrom,
  }
}

const getSavedFulfillmentDetails = (
  order: ShippingContext_order$data,
  meData: ShippingContextProps["meData"]
): SavedFulfillmentData => {
  const fulfillmentTypeName = order.requestedFulfillment?.__typename

  if (fulfillmentTypeName) {
    if (fulfillmentTypeName === "CommercePickup") {
      return {
        fulfillmentType: FulfillmentType.PICKUP,
        isArtsyShipping: false,
        attributes: {
          phoneNumber: order.requestedFulfillment.phoneNumber ?? "",
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          region: "",
          country: "",
          postalCode: "",
        },
        selectedSavedAddressID: null,
      }
    } else if (
      ["CommerceShip", "CommerceShipArta"].includes(fulfillmentTypeName)
    ) {
      const fulfillmentDetails = addressWithFallbackValues(
        order.requestedFulfillment
      )
      // TODO: can this logic be colocated with other areas, like FulfillmentDetails' getInitialValues?
      const selectedSavedAddressID =
        (fulfillmentDetails &&
          meData.addressList.find(node =>
            matchAddressFields(node, fulfillmentDetails)
          )?.internalID) ??
        null

      return {
        fulfillmentType: FulfillmentType.SHIP,
        isArtsyShipping: fulfillmentTypeName === "CommerceShipArta",
        attributes: addressWithFallbackValues(order.requestedFulfillment),
        selectedSavedAddressID: selectedSavedAddressID,
      }
    }
  }
  return null
}

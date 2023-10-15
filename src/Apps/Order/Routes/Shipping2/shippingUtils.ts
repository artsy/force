import { ShippingProps } from "Apps/Order/Routes/Shipping2"
import { pick, omitBy, isNil, compact } from "lodash"
import { useCallback } from "react"
import { Shipping2_order$data } from "__generated__/Shipping2_order.graphql"
import { extractNodes } from "Utils/extractNodes"
import { COUNTRIES_IN_EUROPEAN_UNION } from "@artsy/commerce_helpers"
// TODO: Duplicated list ^
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"

import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"

export enum FulfillmentType {
  SHIP = "SHIP",
  PICKUP = "PICKUP",
}

export interface ShippingAddressFormValues {
  name: string
  phoneNumber: string
  addressLine1: string
  addressLine2?: string
  city: string
  region: string
  country: string
  postalCode: string
}

const ORDER_EMPTY_ADDRESS: ShippingAddressFormValues = {
  name: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  country: "",
  postalCode: "",
}
const onlyAddressValues = (values: any) => {
  return pick<ShippingAddressFormValues>(
    values,
    Object.keys(ORDER_EMPTY_ADDRESS)
  )
}
export const addressWithFallbackValues = (
  address: any
): ShippingAddressFormValues => ({
  ...ORDER_EMPTY_ADDRESS,
  ...omitBy<ShippingAddressFormValues>(onlyAddressValues(address), isNil),
})

export type SavedAddressType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<ShippingProps["me"]["addressConnection"]>["edges"]
    >[number]
  >["node"]
>

type ShippingQuotesConnectionEdges = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<Shipping2_order$data["lineItems"]>["edges"]
          >[number]
        >
      >["node"]
    >["shippingQuoteOptions"]
  >["edges"]
>

export const getDefaultUserAddress = (addressList: SavedAddressType[]) => {
  const items = compact(addressList)

  if (!items || items.length == 0) {
    return
  }

  return items.find(node => node.isDefault) || items[0]
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

// Interface to separate local values from what we want to expose
// in the react context.
interface OrderData extends ShippingContextProps {
  shippingQuotesEdges: ShippingQuotesConnectionEdges
  selectedShippingQuoteId?: string
}

// Compute and memoize data from the saved order.
export const useLoadComputedData = (props: ShippingProps): OrderData => {
  const { me, order } = props
  const firstArtwork = extractNodes(order.lineItems)[0]!.artwork!
  const artworkCountry = firstArtwork?.shippingCountry
  const savedFulfillmentData = getSavedFulfillmentData(order, me)

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

  const requiresArtsyShippingTo = useCallback(
    (shipToCountry: string) => {
      const isDomesticShipping =
        (shipToCountry && shipToCountry === artworkCountry) ||
        (COUNTRIES_IN_EUROPEAN_UNION.includes(shipToCountry) &&
          COUNTRIES_IN_EUROPEAN_UNION.includes(artworkCountry))

      const requiresArtsyShipping =
        (isDomesticShipping &&
          firstArtwork?.processWithArtsyShippingDomestic) ||
        (!isDomesticShipping && firstArtwork?.artsyShippingInternational)
      return requiresArtsyShipping
    },
    [
      artworkCountry,
      firstArtwork.artsyShippingInternational,
      firstArtwork.processWithArtsyShippingDomestic,
    ]
  )
  const shippingQuotesEdges: ShippingQuotesConnectionEdges =
    (order?.lineItems?.edges &&
      order.lineItems.edges[0]?.node?.shippingQuoteOptions?.edges) ||
    (([] as unknown) as ShippingQuotesConnectionEdges)

  const selectedShippingQuote =
    shippingQuotesEdges.find(quote => quote?.node?.isSelected) || null

  return {
    fulfillmentDetails: savedFulfillmentData?.fulfillmentDetails || null,
    fulfillmentType: savedFulfillmentData?.fulfillmentType || null,
    selectedSavedAddressId:
      savedFulfillmentData?.selectedSavedAddressId || null,
    isArtsyShipping: savedFulfillmentData?.isArtsyShipping,
    selectedShippingQuoteId: selectedShippingQuote?.node?.id,
    shippingQuotesEdges,
    availableShippingCountries,
    lockShippingCountryTo,
    requiresArtsyShippingTo,
    shipsFrom,
  }
}

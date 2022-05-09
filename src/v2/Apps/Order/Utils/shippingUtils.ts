import { Address, emptyAddress } from "v2/Components/AddressForm"
import { Shipping_me } from "v2/__generated__/Shipping_me.graphql"
import { Shipping_order } from "v2/__generated__/Shipping_order.graphql"
import { pick, omit, compact } from "lodash"
import {
  UpdateUserAddressMutationResponse,
  UserAddressAttributes,
} from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { NEW_ADDRESS } from "../Components/SavedAddresses"
import {
  CommerceOrderFulfillmentTypeEnum,
  SetShippingMutationResponse,
} from "v2/__generated__/SetShippingMutation.graphql"

export type SavedAddressType = NonNullable<
  NonNullable<
    NonNullable<NonNullable<Shipping_me["addressConnection"]>["edges"]>[number]
  >["node"]
>

export type ShippingQuotesType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<
              SetShippingMutationResponse["commerceSetShipping"]
            >["orderOrError"]["order"]
          >["lineItems"]
        >["edges"]
      >[number]
    >["node"]
  >["shippingQuoteOptions"]
>["edges"]

export const defaultShippingAddressIndex = (
  me: Shipping_me,
  order: Shipping_order
): string => {
  const addressList = me.addressConnection?.edges

  if (addressList && addressList.length > 0) {
    let defaultAddressID: string

    if (
      order.requestedFulfillment &&
      (order.requestedFulfillment.__typename === "CommerceShip" ||
        order.requestedFulfillment.__typename === "CommerceShipArta")
    ) {
      const {
        addressLine1,
        addressLine2,
        city,
        country,
        name,
        phoneNumber,
        postalCode,
        region,
      } = order.requestedFulfillment
      defaultAddressID = addressList?.find(
        address =>
          address?.node?.addressLine1 == addressLine1 &&
          address?.node?.addressLine2 == addressLine2 &&
          address?.node?.city == city &&
          address?.node?.country == country &&
          address?.node?.name == name &&
          address?.node?.postalCode == postalCode &&
          address?.node?.region == region &&
          address?.node?.phoneNumber == phoneNumber
      )?.node?.internalID!
    } else {
      defaultAddressID = addressList.find(address => address?.node?.isDefault)
        ?.node?.internalID!
    }

    return defaultAddressID
      ? defaultAddressID
      : addressList[0]?.node?.internalID!
  } else {
    return NEW_ADDRESS
  }
}

export const startingPhoneNumber = (me: Shipping_me, order: Shipping_order) => {
  return order.requestedFulfillment &&
    (order.requestedFulfillment.__typename === "CommerceShip" ||
      order.requestedFulfillment.__typename === "CommerceShipArta" ||
      order.requestedFulfillment.__typename === "CommercePickup")
    ? order.requestedFulfillment.phoneNumber!
    : ""
}

export const startingAddress = (me: Shipping_me, order: Shipping_order) => {
  const initialAddress = {
    ...emptyAddress,
    country: order.lineItems?.edges?.[0]?.node?.artwork?.shippingCountry!,

    // We need to pull out _only_ the values specified by the Address type,
    // since our state will be used for Relay variables later on. The
    // easiest way to do this is with the emptyAddress.
    ...pick(order.requestedFulfillment, Object.keys(emptyAddress)),
  }
  return initialAddress
}

type MutationAddressResponse = NonNullable<
  UpdateUserAddressMutationResponse["updateUserAddress"]
>["userAddressOrErrors"]

// Gravity address has isDefault and addressLine3 but exchange does not
export const convertShippingAddressForExchange = (
  address: SavedAddressType | MutationAddressResponse
): Address => {
  return Object.assign(
    {},
    emptyAddress,
    omit(address, ["id", "isDefault", "internalID", "addressLine3", "errors"])
  )
}

export const convertShippingAddressToMutationInput = (
  address: SavedAddressType
): UserAddressAttributes => {
  return omit(
    {
      ...address,
      name: address?.name || "",
    },
    ["isDefault", "internalID", "id", "__typename"]
  )
}

export const getShippingOption = (requestedFulfillmentType?: string) => {
  let result: CommerceOrderFulfillmentTypeEnum

  switch (requestedFulfillmentType) {
    case "CommercePickup":
      result = "PICKUP"
      break
    case "CommerceShip":
    default:
      result = "SHIP"
      break
  }

  return result
}

export const getDefaultShippingQuoteId = (order: Shipping_order) => {
  const shippingQuotes =
    order.lineItems?.edges &&
    order.lineItems?.edges[0]?.node?.shippingQuoteOptions

  const cleanQuotes = compact(shippingQuotes?.edges?.map(quote => quote?.node))

  return cleanQuotes ? cleanQuotes[0].id : undefined
}

export const getSelectedShippingQuoteId = (order: Shipping_order) => {
  const shippingQuotes =
    order.lineItems?.edges &&
    order.lineItems?.edges[0]?.node?.shippingQuoteOptions
  return shippingQuotes
    ? shippingQuotes.edges?.find(quote => quote?.node?.isSelected)?.node?.id
    : undefined
}

export const getShippingQuotes = (
  order:
    | Shipping_order
    | NonNullable<
        SetShippingMutationResponse["commerceSetShipping"]
      >["orderOrError"]["order"]
) => {
  const shippingQuotes =
    order?.lineItems?.edges &&
    order?.lineItems?.edges[0]?.node?.shippingQuoteOptions
  return shippingQuotes?.edges ? compact(shippingQuotes?.edges) : null
}

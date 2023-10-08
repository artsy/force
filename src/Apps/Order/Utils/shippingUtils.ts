import { emptyAddress } from "Components/Address/AddressForm"
import { Shipping_me$data } from "__generated__/Shipping_me.graphql"
import { Shipping_order$data } from "__generated__/Shipping_order.graphql"
import { pick, omit, compact, isNil, omitBy } from "lodash"
import {
  UpdateUserAddressMutation$data,
  UserAddressAttributes,
} from "__generated__/UpdateUserAddressMutation.graphql"
import { NEW_ADDRESS } from "Apps/Order/Components/SavedAddresses"
import { SetShippingMutation$data } from "__generated__/SetShippingMutation.graphql"
import { AddressType, EMPTY_ADDRESS } from "Components/Address/utils"
import { extractNodes } from "Utils/extractNodes"
import {
  FulfillmentDetailsFormProps,
  FulfillmentValues,
} from "Apps/Order/Routes/Shipping/FulfillmentDetailsForm"
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"
import { ShippingProps } from "Apps/Order/Routes/Shipping"

export enum FulfillmentType {
  SHIP = "SHIP",
  PICKUP = "PICKUP",
}

export type SavedAddressType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<Shipping_me$data["addressConnection"]>["edges"]
    >[number]
  >["node"]
>

export type ShippingQuotesType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<
              SetShippingMutation$data["commerceSetShipping"]
            >["orderOrError"]["order"]
          >["lineItems"]
        >["edges"]
      >[number]
    >["node"]
  >["shippingQuoteOptions"]
>["edges"]

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

// Form values with nulls, phoneNumberCountryCode and addressLine3 removed
// TODO: Check line 2 special handling in exchange/gravity: does
// it matter if we send null/""?
export const ORDER_EMPTY_ADDRESS: ShippingAddressFormValues = omit(
  EMPTY_ADDRESS,
  "addressLine3",
  "phoneNumberCountryCode"
)

// Select Shipping address form values from any object and replace
// missing values with the empty defaults
export const addressWithFallbackValues = (
  address: any
): ShippingAddressFormValues => ({
  ...ORDER_EMPTY_ADDRESS,
  ...omitBy<ShippingAddressFormValues>(
    pick(address, Object.keys(EMPTY_ADDRESS)),
    isNil
  ),
})

export const getDefaultUserAddress = (addressList: SavedAddressType[]) => {
  const items = compact(addressList)

  if (!items || items.length == 0) {
    return
  }

  return items.find(node => node.isDefault) || items[0]
}

export const getShippingOption = (
  // TODO: If this needs to stay in the utils file lets just write
  // a type for it maybe?
  order: {
    requestedFulfillment?: Shipping_order$data["requestedFulfillment"]
  }
): FulfillmentType => {
  const orderFulfillmentType = order.requestedFulfillment?.__typename

  switch (orderFulfillmentType) {
    case "CommercePickup":
      return FulfillmentType.PICKUP
    case "CommerceShip":
    default:
      return FulfillmentType.SHIP
  }
}

export type MutationAddressResponse = NonNullable<
  UpdateUserAddressMutation$data["updateUserAddress"]
>["userAddressOrErrors"]

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

export const getDefaultShippingQuoteId = (order: Shipping_order$data) => {
  const shippingQuotes =
    order.lineItems?.edges &&
    order.lineItems?.edges[0]?.node?.shippingQuoteOptions

  const cleanQuotes = compact(shippingQuotes?.edges?.map(quote => quote?.node))

  return cleanQuotes[0] ? cleanQuotes[0].id : undefined
}

export const getSelectedShippingQuoteId = (order: Shipping_order$data) => {
  const shippingQuotes =
    order.lineItems?.edges &&
    order.lineItems?.edges[0]?.node?.shippingQuoteOptions
  return shippingQuotes
    ? shippingQuotes.edges?.find(quote => quote?.node?.isSelected)?.node?.id
    : undefined
}

export const getShippingQuotes = (
  order:
    | Shipping_order$data
    | NonNullable<
        SetShippingMutation$data["commerceSetShipping"]
      >["orderOrError"]["order"]
) => {
  const shippingQuotes =
    order?.lineItems?.edges &&
    order?.lineItems?.edges[0]?.node?.shippingQuoteOptions
  return shippingQuotes?.edges ? compact(shippingQuotes?.edges) : null
}

import { Address, emptyAddress } from "v2/Components/AddressForm"
import { Shipping_me } from "v2/__generated__/Shipping_me.graphql"
import { Shipping_order } from "v2/__generated__/Shipping_order.graphql"
import { pick, omit } from "lodash"
import {
  UpdateUserAddressMutationResponse,
  UserAddressAttributes,
} from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { NEW_ADDRESS } from "../Components/SavedAddresses"

export type SavedAddressType = Shipping_me["addressConnection"]["edges"][number]["node"]

export const defaultShippingAddressIndex = (me: Shipping_me): string => {
  const addressList = me.addressConnection.edges
  if (addressList.length > 0) {
    const defaultAddressIndex =
      addressList.findIndex(address => address.node.isDefault) || 0
    return String(defaultAddressIndex)
  } else {
    return NEW_ADDRESS
  }
}

export const startingPhoneNumber = (me: Shipping_me, order: Shipping_order) => {
  return order.requestedFulfillment &&
    (order.requestedFulfillment.__typename === "CommerceShip" ||
      order.requestedFulfillment.__typename === "CommercePickup")
    ? order.requestedFulfillment.phoneNumber
    : ""
}

export const startingAddress = (me: Shipping_me, order: Shipping_order) => {
  const initialAddress = {
    ...emptyAddress,
    country: order.lineItems.edges[0].node.artwork.shippingCountry,

    // We need to pull out _only_ the values specified by the Address type,
    // since our state will be used for Relay variables later on. The
    // easiest way to do this is with the emptyAddress.
    ...pick(order.requestedFulfillment, Object.keys(emptyAddress)),
  }
  return initialAddress
}

type MutationAddressResponse = UpdateUserAddressMutationResponse["updateUserAddress"]["userAddressOrErrors"]

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
  return omit(address, ["isDefault", "internalID", "id"])
}

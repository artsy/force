import { emptyAddress } from "v2/Components/AddressForm"
import { Shipping_me } from "v2/__generated__/Shipping_me.graphql"
import { Shipping_order } from "v2/__generated__/Shipping_order.graphql"
import { pick, omit } from "lodash"

export type SavedAddressType = Shipping_me["addressConnection"]["edges"][number]["node"]

/**
 * Extracts
 * @param me relay Me object including addressConnection
 */
const defaultShippingAddress = (me: Shipping_me): SavedAddressType | null => {
  const addressList = me.addressConnection.edges
  if (addressList.length > 0) {
    const defaultAddress =
      addressList.find(address => address.node.isDefault)?.node ||
      addressList[0].node
    return defaultAddress
  } else {
    return null
  }
}

export const startingPhoneNumber = (me: Shipping_me, order: Shipping_order) => {
  const defaultSavedPhoneNumber = defaultShippingAddress(me)?.phoneNumber
  if (defaultSavedPhoneNumber) {
    return defaultSavedPhoneNumber
  } else {
    return order.requestedFulfillment &&
      (order.requestedFulfillment.__typename === "CommerceShip" ||
        order.requestedFulfillment.__typename === "CommercePickup")
      ? order.requestedFulfillment.phoneNumber
      : ""
  }
}

export const startingAddress = (me: Shipping_me, order: Shipping_order) => {
  const defaultSavedAddress = defaultShippingAddress(me)
  if (defaultSavedAddress) {
    const startingAddress = convertShippingAddressForExchange(
      defaultSavedAddress
    )
    return startingAddress
  } else {
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
}

// Gravity address has isDefault and addressLine3 but exchange does not
export const convertShippingAddressForExchange = (
  address: SavedAddressType
): Omit<SavedAddressType, "addressLine3" | "isDefault"> => {
  return omit(address, ["isDefault", "addressLine3"])
}

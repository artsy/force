import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { extractNodes } from "Utils/extractNodes"
import { Shipping2_me$data } from "__generated__/Shipping2_me.graphql"

export interface ParsedUserData {
  savedAddresses: SavedAddressType[]
}
export const useParseUserData = (me: Shipping2_me$data): ParsedUserData => {
  const savedAddresses = extractNodes(me.addressConnection)
  return { savedAddresses }
}

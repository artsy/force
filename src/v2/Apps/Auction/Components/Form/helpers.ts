import { Address } from "v2/Components/AddressForm"

export const toStripAddress = (address: Address): stripe.TokenOptions => {
  return {
    name: address.name,
    address_line1: address.addressLine1,
    address_line2: address.addressLine2,
    address_country: address.country,
    address_city: address.city,
    address_state: address.region,
    address_zip: address.postalCode,
  }
}

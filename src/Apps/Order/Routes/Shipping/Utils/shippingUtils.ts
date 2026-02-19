import type { AddressVerifiedBy } from "Apps/Order/Components/AddressVerificationFlow"
import { postalCodeValidator } from "Components/Address/utils"
import type { ShippingContext_me$data } from "__generated__/ShippingContext_me.graphql"
import { isEqual, isNil, omitBy } from "es-toolkit"
import { pick } from "es-toolkit/compat"
import * as Yup from "yup"

export enum FulfillmentType {
  SHIP = "SHIP",
  PICKUP = "PICKUP",
}

export interface PickupValues {
  fulfillmentType: FulfillmentType.PICKUP
  attributes: {
    name: ""
    phoneNumber: string
    // Even though these don't appear on the form
    // we want values to not mess with the controlled/
    // uncontrolled component state
    addressLine1: ""
    addressLine2: ""
    city: ""
    region: ""
    country: ""
    postalCode: ""
  }
  meta: FormMetaValues
}

export interface ShipValues {
  fulfillmentType: FulfillmentType.SHIP
  attributes: ShippingAddressFormValues
  meta: FormMetaValues
}

interface FormMetaValues {
  // Address was verified (in this flow instance)
  addressVerifiedBy?: AddressVerifiedBy | null
  // User saved an address within the lifecycle of this form
  newSavedAddressID?: string
  // Address should be saved (create/update) to user's address book
  saveAddress?: boolean
  // Address should be set as default in user's address book
  setAddressAsDefault?: boolean
}

export type FulfillmentValues = ShipValues | PickupValues

export interface ShippingAddressFormValues {
  name: string
  phoneNumber: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  country: string
  postalCode: string
}

// TODO: Replace with what we use in SettingsShippingAddressForm when we have
// a rich phone input
export const BASIC_PHONE_VALIDATION_SHAPE = {
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[+\-\(\)\d\s]+$/, "Please enter a valid phone number"),
}

export const ADDRESS_VALIDATION_SHAPE = {
  ...BASIC_PHONE_VALIDATION_SHAPE,
  name: Yup.string().required("Full name is required"),
  addressLine1: Yup.string().required("Street address is required"),
  addressLine2: Yup.string().nullable(),
  city: Yup.string().required("City is required"),
  postalCode: postalCodeValidator,
  region: Yup.string().when("country", {
    is: country => ["US", "CA"].includes(country),
    then: Yup.string().required("State is required"),
    otherwise: Yup.string(),
  }),
  country: Yup.string().required("Country is required"),
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

export const onlyAddressValues = (values: any) => {
  return pick<ShippingAddressFormValues>(
    values,
    Object.keys(ORDER_EMPTY_ADDRESS),
  )
}

/**
 * Takes an address object and returns a new address object with all the
 * non-null values from the original address object. Useful for converting
 * a SavedAddress from relay to a ShippingAddressFormValues object.
 */
export const addressWithFallbackValues = (
  address: any,
): ShippingAddressFormValues => ({
  ...ORDER_EMPTY_ADDRESS,
  ...omitBy(onlyAddressValues(address), (value): boolean => isNil(value)),
})

export type SavedAddressType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<ShippingContext_me$data["addressConnection"]>["edges"]
    >[number]
  >["node"]
>

export const getAddressByID = (
  addressList: SavedAddressType[],
  addressID: string,
) => {
  return addressList.find(node => node.internalID === addressID)
}

// Get the user's default address, optionally filtering by a list of countries.
export const getDefaultUserAddress = (
  savedAddresses: SavedAddressType[],
  filterCountries?: string[],
) => {
  const shippableAddresses = savedAddresses.filter(node => {
    if (!Boolean(node)) return false
    if (!filterCountries) return true
    return filterCountries.includes(node.country)
  })

  if (shippableAddresses.length === 0) {
    return null
  }

  return (
    shippableAddresses.find(node => node.isDefault) || shippableAddresses[0]
  )
}

export const getInitialShippingValues = (
  savedAddresses: SavedAddressType[],
  defaultCountry,
  defaultName,
  filterCountries?: string[],
): ShipValues => {
  const defaultUserAddress = getDefaultUserAddress(
    savedAddresses,
    filterCountries,
  )

  // The default ship-to address should be the first one that
  // can be shipped-to, preferring the default address if it exists.
  const attributesFromDefaultAddress: ShipValues["attributes"] =
    addressWithFallbackValues(defaultUserAddress)
  if (defaultUserAddress) {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      attributes: attributesFromDefaultAddress,
      meta: {
        saveAddress: false,
        addressVerifiedBy: null,
      },
    }
  }

  // The user doesn't have a valid ship-to address, so we'll return empty values.
  const initialFulfillmentValues: ShipValues["attributes"] =
    addressWithFallbackValues({
      country: defaultCountry,
      name: defaultName,
    })

  return {
    fulfillmentType: FulfillmentType.SHIP,
    attributes: initialFulfillmentValues,
    meta: {
      addressVerifiedBy: null,
      saveAddress: true,
    },
  }
}

export const matchAddressFields = (...addressPair: [object, object]) => {
  const [a1, a2] = addressPair.map(a => addressWithFallbackValues(a))

  const fields: Array<keyof ShippingAddressFormValues> = [
    "addressLine1",
    "addressLine2",
    "city",
    "country",
    "name",
    "phoneNumber",
    "postalCode",
    "region",
  ]

  const differences = fields.filter(field => !isEqual(a1[field], a2[field]))

  return differences.length === 0
}

import { Address } from "v2/Components/AddressForm"
import { isEmpty } from "lodash"

export const validatePresence = (value: string): string | null => {
  if (value == undefined || isEmpty(value.trim())) {
    return "This field is required"
  }
  return null
}

export const validateAddress = (address: Address) => {
  const { name, addressLine1, city, region, country, postalCode } = address
  const usOrCanada = country === "US" || country === "CA"
  const errors = {
    name: validatePresence(name),
    addressLine1: validatePresence(addressLine1),
    city: validatePresence(city),
    region: usOrCanada && validatePresence(region),
    country: validatePresence(country),
    postalCode: usOrCanada && validatePresence(postalCode),
  }
  const hasErrors = Object.keys(errors).filter(key => errors[key]).length > 0

  return {
    errors,
    hasErrors,
  }
}

export const validatePhoneNumber = (phoneNumber: string) => {
  const error = validatePresence(phoneNumber)
  const hasError = error !== null

  return {
    error,
    hasError,
  }
}

/**
 * Removes attributes with empty value:
 * `{name: null, address: 'invalid'} => {address: 'invalid'}`
 */
export const removeEmptyKeys = obj => {
  return Object.entries(obj)
    .filter(([_, v]) => v != null && v !== false)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
}

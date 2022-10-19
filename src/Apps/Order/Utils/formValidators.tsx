import { Address } from "Components/AddressForm"
import { isEmpty } from "lodash"

export const validatePresence = (value: string): string | null => {
  if (value == undefined || isEmpty(value.trim())) {
    return "This field is required"
  }
  return null
}

export const validatePostalCode = (postalCode: string, countryCode: string) => {
  let postalCodeRegex: RegExp =
    countryCode === "US"
      ? /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/
      : /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/

  return postalCodeRegex.test(postalCode)
    ? null
    : "Please enter a valid zip/postal code for your region"
}

export const validateAddress = (address: Address) => {
  const { name, addressLine1, city, region, country, postalCode } = address
  const usOrCanada = country === "US" || country === "CA"

  let postalCodeValidationResult: string | null = null
  // check presence and check correctness if present
  if (usOrCanada) {
    postalCodeValidationResult = validatePresence(postalCode)

    if (postalCodeValidationResult === null) {
      postalCodeValidationResult = validatePostalCode(postalCode, country)
    }
  }

  const errors = {
    name: validatePresence(name),
    addressLine1: validatePresence(addressLine1),
    city: validatePresence(city),
    region: usOrCanada && validatePresence(region),
    country: validatePresence(country),
    postalCode: postalCodeValidationResult,
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

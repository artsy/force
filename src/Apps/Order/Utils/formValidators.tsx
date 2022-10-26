import { Address } from "Components/Address/AddressForm2"
import { isEmpty } from "lodash"

export const validatePresence = (value: string): string | null => {
  if (value == undefined || isEmpty(value.trim())) {
    return "This field is required"
  }
  return null
}

const isValidPhoneNumber = phone => {
  if (!phone.isValid) {
    return "Please enter a valid phone number"
  }
  return null
}

export const validateAddress = (address: Address) => {
  const {
    name,
    addressLine1,
    city,
    region,
    country,
    postalCode,
    phone,
  } = address
  const usOrCanada = country === "US" || country === "CA"
  const errors = {
    name: validatePresence(name),
    addressLine1: validatePresence(addressLine1),
    city: validatePresence(city),
    region: usOrCanada && validatePresence(region),
    country: validatePresence(country),
    postalCode: usOrCanada && validatePresence(postalCode),
    phone: isValidPhoneNumber(phone),
  }
  const hasErrors = Object.keys(errors).filter(key => errors[key]).length > 0

  return {
    errors,
    hasErrors,
  }
}

export const validatePhoneNumber = (phone: {
  international: string
  isValid: boolean
  originalNumber?: string
  national?: string
}) => {
  const error = isValidPhoneNumber(phone)
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

/**
 * Filters an array of countries to only include those whose `value`
 * matches one of the available shipping country codes.
 *
 */

import { COUNTRIES, type CountryData } from "Utils/countries"

export function getShippableCountries(
  availableShippingCountries: ReadonlyArray<string>,
): CountryData[] {
  const lowercaseCountryCodes = availableShippingCountries.map(code =>
    code.toLowerCase(),
  )
  return COUNTRIES.filter(country =>
    lowercaseCountryCodes.includes(country.value),
  )
}

export const isShippableAddress = (
  address: { country: string },
  availableShippingCountries: ReadonlyArray<string>,
): boolean => {
  if (!address || !address.country) {
    return false
  }
  return availableShippingCountries
    .map(code => code.toLowerCase())
    .includes(address.country.toLowerCase())
}

export const countryCodePrefix = (alpha2Code: string): string => {
  const country = COUNTRIES.find(
    country => country.value.toLowerCase() === alpha2Code.toLowerCase(),
  )
  return country?.countryCode ? `+${country.countryCode}` : ""
}

export const formatPhoneNumber = (address: {
  phoneNumber?: string | null
  phoneNumberCountryCode?: string | null
}) => {
  const { phoneNumber, phoneNumberCountryCode } = address
  if (!phoneNumber || !phoneNumberCountryCode) {
    return ""
  }

  const prefix = countryCodePrefix(phoneNumberCountryCode)
  if (prefix) {
    return `${prefix} ${phoneNumber}`
  }
  return phoneNumber
}

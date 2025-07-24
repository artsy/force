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

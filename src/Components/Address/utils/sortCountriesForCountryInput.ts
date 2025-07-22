import type { countries as countryPhoneOptions } from "Utils/countries"
import { sortBy } from "lodash"

type CountryData = (typeof countryPhoneOptions)[number]

/**
 * Helper function to sort countries for country input dropdown
 * @param unsorted - Array of country data
 * @param firstCode - Country code to appear first (default: "us")
 * @returns Sorted array of country options
 */

export const sortCountriesForCountryInput = (
  unsorted: typeof countryPhoneOptions,
  firstCode: CountryData["value"] = "us",
): Array<{ text: string; value: string }> => {
  const BLANK_COUNTRY = { text: "", value: "" }

  const sortedCountries = sortBy(unsorted, [
    country => country.value !== firstCode,
    "name",
  ])

  const options = [
    BLANK_COUNTRY,
    ...sortedCountries.map(countryData => {
      return {
        text: countryData.name,
        value: countryData.value.toUpperCase(),
      }
    }),
  ]

  return options
}

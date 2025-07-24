import { useUserLocation } from "Utils/Hooks/useUserLocation"
import { countries as countryPhoneOptions } from "Utils/countries"

interface InitialAddressValues {
  selectedCountry?: string
  phoneNumberCountryCode?: string
}

/**
 * Helper function to get initial values for country and phone number country code
 * based on user's location data.
 *
 * @param countryInputOptions - Array of country options for the country select
 * @returns Object with selectedCountry and phoneNumberCountryCode
 */

export const getInitialLocationValues = (
  countryInputOptions: Array<{ text: string; value: string }>,
): InitialAddressValues => {
  const { location, loading } = useUserLocation()

  if (loading || !location?.country) {
    return {}
  }

  let selectedCountry = countryInputOptions[1]?.value

  const matchingCountry = countryInputOptions.find(
    country =>
      location.country &&
      country.text.toLowerCase().includes(location.country.toLowerCase()),
  )

  if (matchingCountry) {
    selectedCountry = matchingCountry.value
  }

  const result: InitialAddressValues = {
    selectedCountry,
  }

  if (selectedCountry) {
    const matchingPhoneCountry = countryPhoneOptions.find(
      country => country.value.toLowerCase() === selectedCountry.toLowerCase(),
    )
    if (matchingPhoneCountry) {
      result.phoneNumberCountryCode = matchingPhoneCountry.value
    }
  }

  return result
}

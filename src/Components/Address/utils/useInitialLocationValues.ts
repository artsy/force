import { countries as countryPhoneOptions } from "Utils/countries"
import { useUserLocation } from "Utils/Hooks/useUserLocation"
import { useMemo } from "react"

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

export const useInitialLocationValues = (
  countryInputOptions?: Array<{ text: string; value: string }>
): InitialAddressValues => {
  const { location, loading } = useUserLocation()

  return useMemo(() => {
    if (loading || !location?.country) {
      return {}
    }

    // If no countryInputOptions provided, only return phoneNumberCountryCode
    if (!countryInputOptions) {
      const matchingPhoneCountry = countryPhoneOptions.find(
        country =>
          location.country &&
          (country.value.toLowerCase() === location.country.toLowerCase() ||
            country.name.toLowerCase().includes(location.country.toLowerCase()))
      )

      return {
        phoneNumberCountryCode: matchingPhoneCountry?.value,
      }
    }

    let selectedCountry = countryInputOptions[1]?.value

    const matchingCountry = countryInputOptions.find(
      country =>
        location.country &&
        country.text.toLowerCase().includes(location.country.toLowerCase())
    )

    if (matchingCountry) {
      selectedCountry = matchingCountry.value
    }

    const result: InitialAddressValues = {
      selectedCountry,
    }

    if (selectedCountry) {
      const matchingPhoneCountry = countryPhoneOptions.find(
        country => country.value.toLowerCase() === selectedCountry.toLowerCase()
      )
      if (matchingPhoneCountry) {
        result.phoneNumberCountryCode = matchingPhoneCountry.value
      }
    }

    return result
  }, [loading, location, countryInputOptions])
}

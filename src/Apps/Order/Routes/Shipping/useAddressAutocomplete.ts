import { AutocompleteInputOptionType } from "@artsy/palette"
import { Address } from "Components/AddressForm"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useDebounce } from "Utils/Hooks/useDebounce"
import { getENV } from "Utils/getENV"
import { useCallback, useState } from "react"

// NOTE: Due to the format of this key (a long string of numbers that cannot be parsed as json)
// This key must be set in the env as a json string like SMARTY_EMBEDDED_KEY_JSON_JSON='{ "key": "xxxxxxxxxxxxxxxxxx" }'
const smartyCreds = getENV("SMARTY_EMBEDDED_KEY_JSON") || { key: "" }
const apiKey = smartyCreds.key

export type ProviderSuggestion = {
  city: string
  entries: number
  secondary: string
  state: string
  street_line: string
  zipcode: string
  source?: "postal" | "other"
}

export interface AddressSuggestion extends AutocompleteInputOptionType {
  address: Omit<Address, "name">
  entries: number
}

export const useAddressAutocomplete = () => {
  const [result, setResult] = useState<ProviderSuggestion[]>([])
  // Add feature flag checks including country, etc here later

  const isAPIKeyPresent = !!apiKey
  const isFeatureFlagEnabled = !!useFeatureFlag("address_autocomplete_us")
  const isFeatureEnabled = isAPIKeyPresent && isFeatureFlagEnabled

  const fetchSuggestions = useCallback(
    async (searchParam: string, selectedParam?: string) => {
      if (!apiKey) return null
      let url = `https://us-autocomplete-pro.api.smarty.com/lookup?key=${encodeURIComponent(
        apiKey
      )}&prefer_ratio=3&search=${encodeURIComponent(searchParam)}`

      if (selectedParam) {
        url += `&selected=${encodeURIComponent(selectedParam)}`
      }

      console.log({ url })
      const response = await fetch(url, {
        headers: {
          Host: "us-autocomplete-pro.api.smartystreets.com",
        },
      })
      console.log({ response })
      const json = await response.json()
      return json
    },
    []
  )

  const fetchForAutocomplete = useCallback(
    // these are the parameters to the Smarty API call
    async (searchParam: string, selectedParam?: string) => {
      if (searchParam.length < 5) {
        console.log("type more...")
        setResult([])
        return
      }

      try {
        const result = await fetchSuggestions(searchParam, selectedParam)

        console.log({ result })
        setResult(result.suggestions)
      } catch (e) {
        console.error(e)
      }
    },
    [fetchSuggestions]
  )

  // debounce requests
  const debouncedFetchForAutocomplete = useDebounce({
    // high debounce for testing to not eat up our credits
    delay: 700,
    callback: fetchForAutocomplete,
  })

  const buildAddressText = (suggestion: ProviderSuggestion): string => {
    let whiteSpace = ""
    let secondaryExtraInformation = ""
    if (suggestion.secondary) {
      if (suggestion.entries > 1) {
        secondaryExtraInformation = " (" + suggestion.entries + " entries)"
      }
      whiteSpace = " "
    }
    return (
      suggestion.street_line +
      whiteSpace +
      suggestion.secondary +
      secondaryExtraInformation +
      " " +
      suggestion.city +
      ", " +
      suggestion.state +
      " " +
      suggestion.zipcode
    )
  }

  const autocompleteOptions: Array<AddressSuggestion> = result.map(
    suggestion => {
      const text = buildAddressText(suggestion)
      return {
        text,
        value: text,
        entries: suggestion.entries,
        address: {
          addressLine1: suggestion.street_line,
          addressLine2: suggestion.secondary,
          city: suggestion.city,
          region: suggestion.state,
          postalCode: suggestion.zipcode,
          country: "US",
        },
      }
    }
  )

  return {
    autocompleteOptions,
    suggestions: result,
    fetchForAutocomplete: debouncedFetchForAutocomplete,
    isFeatureEnabled,
  }
}

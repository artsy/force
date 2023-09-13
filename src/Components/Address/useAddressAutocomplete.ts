import { AutocompleteInputOptionType } from "@artsy/palette"
import { Address } from "Components/Address/AddressForm"
import { useFeatureFlag } from "System/useFeatureFlag"
import { getENV } from "Utils/getENV"
import { useCallback, useEffect, useState } from "react"
import { throttle } from "lodash"

const THROTTLE_DELAY = 500

export type ProviderSuggestion = {
  city: string
  entries: number
  secondary: string
  state: string
  street_line: string
  zipcode: string
  source?: "postal" | "other"
}

export interface AddressAutocompleteSuggestion
  extends AutocompleteInputOptionType {
  address: Omit<Address, "name">
  entries: number
}

export const useAddressAutocomplete = (
  address: Partial<Address> & { country: Address["country"] }
): {
  autocompleteOptions: AddressAutocompleteSuggestion[]
  suggestions: ProviderSuggestion[]
  fetchForAutocomplete: (args: { search: string; selected?: string }) => void
  isAddressAutocompleteEnabled: boolean
  fetchSecondarySuggestions: (
    search: string,
    option: AddressAutocompleteSuggestion
  ) => void
} => {
  const [result, setResult] = useState<ProviderSuggestion[]>([])

  // NOTE: Due to the format of this key (a long string of numbers that cannot be parsed as json)
  // This key must be set in the env as a json string like SMARTY_EMBEDDED_KEY_JSON={ "key": "xxxxxxxxxxxxxxxxxx" }
  const { key: apiKey } = getENV("SMARTY_EMBEDDED_KEY_JSON") || { key: "" }

  const isUSAddress = address.country === "US"
  const isAPIKeyPresent = !!apiKey
  const isFeatureFlagEnabled = !!useFeatureFlag("address_autocomplete_us")
  const isAddressAutocompleteEnabled =
    isAPIKeyPresent && isFeatureFlagEnabled && isUSAddress

  // reset suggestions if the country changes
  useEffect(() => {
    if (result.length > 0 && !isUSAddress) {
      setResult([])
    }
  }, [isUSAddress, result.length])

  const fetchSuggestions = useCallback(
    async ({ search, selected }: { search: string; selected?: string }) => {
      const params = {
        key: apiKey,
        search: search,
      }

      if (selected) {
        params["selected"] = selected
      }

      if (!apiKey) return null
      let url =
        "https://us-autocomplete-pro.api.smarty.com/lookup?" +
        new URLSearchParams(params).toString()

      const response = await fetch(url)
      const json = await response.json()
      return json
    },
    [apiKey]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledFetchSuggestions = useCallback(
    throttle(fetchSuggestions, THROTTLE_DELAY, {
      leading: true,
      trailing: true,
    }),
    []
  )

  const fetchForAutocomplete = useCallback(
    // these are the parameters to the Smarty API call
    async ({ search, selected }: { search: string; selected?: string }) => {
      if (!isAddressAutocompleteEnabled) return

      if (search.length < 3) {
        setResult([])
        return
      }

      try {
        const response = await throttledFetchSuggestions({ search, selected })

        setResult(response.suggestions)
      } catch (e) {
        console.error(e)
      }
    },
    [throttledFetchSuggestions, isAddressAutocompleteEnabled]
  )

  const fetchSecondarySuggestions = useCallback(
    async (search: string, option: AddressAutocompleteSuggestion) => {
      const selectedParam = `${option.address.addressLine1} ${option.address.addressLine2} (${option.entries}) ${option.address.city} ${option.address.region} ${option.address.postalCode}`
      fetchForAutocomplete({ search, selected: selectedParam })
    },
    [fetchForAutocomplete]
  )

  const buildAddressText = (suggestion: ProviderSuggestion): string => {
    let buildingAddress = suggestion.street_line
    if (suggestion.secondary) buildingAddress += ` ${suggestion.secondary}`
    if (suggestion.entries > 1)
      buildingAddress += ` (${suggestion.entries} entries)`

    return [
      `${buildingAddress}, ${suggestion.city}`,
      suggestion.state,
      suggestion.zipcode,
    ].join(" ")
  }

  const autocompleteOptions = result.map(
    (suggestion: ProviderSuggestion): AddressAutocompleteSuggestion => {
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
    fetchForAutocomplete,
    isAddressAutocompleteEnabled,
    fetchSecondarySuggestions,
  }
}

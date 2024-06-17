import { AutocompleteInputOptionType } from "@artsy/palette"
import { Address } from "Components/Address/AddressForm"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { getENV } from "Utils/getENV"
import { useCallback, useEffect, useMemo, useState } from "react"
import { throttle, uniqBy } from "lodash"
import { useTracking } from "react-tracking"
import {
  ActionType,
  AddressAutoCompletionResult,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

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
  // entries are null if secondary suggestions are not enabled
  entries: number | null
}

interface ServiceAvailability {
  loaded: boolean
  enabled?: boolean
}

/**
 * @deprecated - Use AddressAutocompleteInput instead
 */
export const useAddressAutocomplete = (
  address: Partial<Address> & { country: Address["country"] },
  {
    enableSecondarySuggestions = false,
  }: { enableSecondarySuggestions?: boolean } = {}
): ServiceAvailability & {
  autocompleteOptions: AddressAutocompleteSuggestion[]
  suggestions: ProviderSuggestion[]
  fetchForAutocomplete: (args: { search: string; selected?: string }) => void
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
  const isFeatureFlagEnabled = !!useFeatureFlag("address_autocomplete_us")
  const { trackEvent } = useTracking()
  const { contextPageOwnerId } = useAnalyticsContext()

  const [serviceAvailability, setServiceAvailability] = useState<
    ServiceAvailability
  >({
    loaded: false,
  })

  const { enabled: isAddressAutocompleteEnabled } = serviceAvailability

  useEffect(() => {
    const isAPIKeyPresent = !!apiKey
    const enabled = isAPIKeyPresent && isFeatureFlagEnabled && isUSAddress
    setServiceAvailability({
      loaded: true,
      enabled,
    })
  }, [apiKey, isFeatureFlagEnabled, isUSAddress])

  // reset suggestions if the country changes
  useEffect(() => {
    if (result.length > 0 && !isUSAddress) {
      setResult([])
    }
  }, [isUSAddress, result.length])

  const fetchSuggestions = useMemo(() => {
    const throttledFetch = throttle(
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
      THROTTLE_DELAY,
      {
        leading: true,
        trailing: true,
      }
    )
    return throttledFetch
  }, [apiKey])

  const buildAddressText = useCallback(
    (suggestion: ProviderSuggestion): string => {
      let buildingAddress = suggestion.street_line
      if (suggestion.secondary) buildingAddress += ` ${suggestion.secondary}`
      if (enableSecondarySuggestions && suggestion.entries > 1)
        buildingAddress += ` (${suggestion.entries} entries)`

      return [
        `${buildingAddress}, ${suggestion.city}`,
        suggestion.state,
        suggestion.zipcode,
      ].join(" ")
    },
    [enableSecondarySuggestions]
  )
  const filterSecondarySuggestions = useCallback(
    (suggestions: ProviderSuggestion[]) => {
      if (enableSecondarySuggestions) return suggestions
      const noSecondaryData = suggestions.map(
        ({ secondary, ...suggestion }) => ({
          ...suggestion,
          secondary: "",
        })
      )
      return uniqBy(noSecondaryData, (suggestion: ProviderSuggestion) =>
        buildAddressText(suggestion)
      )
    },
    [buildAddressText, enableSecondarySuggestions]
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
        const response = await fetchSuggestions({ search, selected })
        const finalSuggestions = enableSecondarySuggestions
          ? response.suggestions
          : filterSecondarySuggestions(response.suggestions)

        setResult(finalSuggestions.slice(0, 5))

        const event: AddressAutoCompletionResult = {
          action: ActionType.addressAutoCompletionResult,
          context_module: ContextModule.ordersShipping,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: contextPageOwnerId,
          input: search,
          suggested_addresses_results: finalSuggestions.length,
        }

        trackEvent(event)
      } catch (e) {
        console.error(e)
      }
    },
    [
      contextPageOwnerId,
      enableSecondarySuggestions,
      fetchSuggestions,
      filterSecondarySuggestions,
      isAddressAutocompleteEnabled,
      trackEvent,
    ]
  )

  const fetchSecondarySuggestions = useCallback(
    async (search: string, option: AddressAutocompleteSuggestion) => {
      if (!enableSecondarySuggestions) {
        return
      }
      const selectedParam = `${option.address.addressLine1} ${option.address.addressLine2} (${option.entries}) ${option.address.city} ${option.address.region} ${option.address.postalCode}`
      fetchForAutocomplete({ search, selected: selectedParam })
    },
    [fetchForAutocomplete, enableSecondarySuggestions]
  )

  const autocompleteOptions = result.map(
    (suggestion: ProviderSuggestion): AddressAutocompleteSuggestion => {
      const text = buildAddressText(suggestion)

      return {
        text,
        value: text,
        entries: enableSecondarySuggestions ? suggestion.entries : null,
        address: {
          addressLine1: suggestion.street_line,
          addressLine2: suggestion.secondary || "",
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
    fetchSecondarySuggestions,
    ...serviceAvailability,
  }
}

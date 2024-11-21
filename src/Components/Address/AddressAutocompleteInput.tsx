import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
  Input,
  usePrevious,
} from "@artsy/palette"
import { Address } from "Components/Address/utils"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { getENV } from "Utils/getENV"
import { useCallback, useEffect, useMemo, useState } from "react"
import { throttle, uniqBy } from "lodash"
import { useTracking } from "react-tracking"
import {
  ActionType,
  AddressAutoCompletionResult,
  ContextModule,
  PageOwnerType,
  SelectedItemFromAddressAutoCompletion,
} from "@artsy/cohesion"

const THROTTLE_DELAY = 500

interface AutocompleteTrackingValues {
  contextPageOwnerId: string
  contextOwnerType: PageOwnerType
  contextModule: ContextModule
}

export interface AddressAutocompleteInputProps
  extends Partial<AutocompleteInputProps<AddressAutocompleteSuggestion>> {
  /* The address [including at least a country] to use for autocomplete suggestions */
  address: Partial<Address> & { country: Address["country"] }

  disableAutocomplete?: boolean
  onSelect: NonNullable<
    AutocompleteInputProps<AddressAutocompleteSuggestion>["onSelect"]
  >
  onClear: NonNullable<
    AutocompleteInputProps<AddressAutocompleteSuggestion>["onClear"]
  >
  onChange: NonNullable<
    AutocompleteInputProps<AddressAutocompleteSuggestion>["onChange"]
  >
  "data-testid"?: string

  trackingValues: AutocompleteTrackingValues
}

type ProviderSuggestion = {
  city: string
  entries: number
  secondary: string
  state: string
  street_line: string
  zipcode: string
  source?: "postal" | "other"
}

interface AddressAutocompleteSuggestion extends AutocompleteInputOptionType {
  address: Omit<Address, "name">
  // entries are null if secondary suggestions are not enabled
  entries: number | null
}

interface ServiceAvailability {
  loading: boolean
  enabled?: boolean
  fetching: boolean
}

/**
 * A wrapper around the Palette AutocompleteInput that handles efficiently
 * fetching address suggestions from an autocomplete provider. Use the
 * `useAddressAutocompleteTracking` hook to get pre-loaded tracking helpers.
 * See AddressAutocompleteInput.jest.tsx for implementation examples.
 */
export const AddressAutocompleteInput = ({
  address,
  disableAutocomplete = false,
  tabIndex,
  value = "",
  error,
  id,
  name,
  placeholder,
  title,
  onChange,
  onClear,
  onSelect,
  "data-testid": dataTestId,
  trackingValues,
  ...autocompleteProps
}: AddressAutocompleteInputProps) => {
  const [providerSuggestions, setProviderSuggestions] = useState<
    ProviderSuggestion[]
  >([])
  const [fetching, setFetching] = useState(false)

  // NOTE: Due to the format of this key (a long string of numbers that cannot be parsed as json)
  // This key must be set in the env as a json string like SMARTY_EMBEDDED_KEY_JSON={ "key": "xxxxxxxxxxxxxxxxxx" }
  const { key: apiKey } = getENV("SMARTY_EMBEDDED_KEY_JSON") || { key: "" }

  const isUSAddress = address.country === "US"
  const isFeatureFlagEnabled = !!useFeatureFlag("address_autocomplete_us")

  const [serviceAvailability, setServiceAvailability] = useState<
    ServiceAvailability
  >({
    loading: true,
    fetching: false,
  })

  const { trackEvent } = useTracking()

  const trackReceivedAutocompleteResult = (
    input: string,
    resultCount: number
  ) => {
    const event: AddressAutoCompletionResult = {
      action: ActionType.addressAutoCompletionResult,
      context_module: trackingValues.contextModule,
      context_owner_type: trackingValues.contextOwnerType,
      context_owner_id: trackingValues.contextPageOwnerId,
      input,
      suggested_addresses_results: resultCount,
    }

    trackEvent(event)
  }

  const trackSelectedAutocompletedAddress = (
    option: AddressAutocompleteSuggestion,
    input: string
  ) => {
    const event: SelectedItemFromAddressAutoCompletion = {
      action: ActionType.selectedItemFromAddressAutoCompletion,
      context_module: trackingValues.contextModule,
      context_owner_type: trackingValues.contextOwnerType,
      context_owner_id: trackingValues.contextPageOwnerId,
      input: input,
      item: option.value,
    }

    trackEvent(event)
  }

  useEffect(() => {
    const isAPIKeyPresent = !!apiKey
    const enabled = isAPIKeyPresent && isFeatureFlagEnabled && isUSAddress
    if (enabled !== serviceAvailability.enabled) {
      setServiceAvailability({
        fetching,
        loading: false,
        enabled,
      })
    }
  }, [
    apiKey,
    isFeatureFlagEnabled,
    isUSAddress,
    fetching,
    serviceAvailability.enabled,
  ])

  // reset suggestions if the country changes
  useEffect(() => {
    if (providerSuggestions.length > 0 && !isUSAddress) {
      setProviderSuggestions([])
    }
  }, [isUSAddress, providerSuggestions.length])

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

        setFetching(true)
        const response = await fetch(url)
        setFetching(false)
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

      return [
        `${buildingAddress}, ${suggestion.city}`,
        suggestion.state,
        suggestion.zipcode,
      ].join(" ")
    },
    []
  )

  const filterSecondarySuggestions = useCallback(
    (suggestions: ProviderSuggestion[]) => {
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
    [buildAddressText]
  )

  const fetchForAutocomplete = useCallback(
    // these are the parameters to the Smarty API call
    async ({ search, selected }: { search: string; selected?: string }) => {
      if (!serviceAvailability.enabled) return

      if (search.length < 3) {
        setProviderSuggestions([])
        return
      }

      try {
        const response = await fetchSuggestions({ search, selected })
        const finalSuggestions = filterSecondarySuggestions(
          response.suggestions
        )

        setProviderSuggestions(finalSuggestions.slice(0, 5))
      } catch (e) {
        console.error(e)
      }
    },
    [fetchSuggestions, filterSecondarySuggestions, serviceAvailability.enabled]
  )

  const autocompleteOptions = providerSuggestions.map(
    (suggestion: ProviderSuggestion): AddressAutocompleteSuggestion => {
      const text = buildAddressText(suggestion)

      return {
        text,
        value: text,
        entries: null,
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

  const definitelyDisabled =
    disableAutocomplete ||
    (!serviceAvailability.loading && !serviceAvailability.enabled)

  const previousOptions = usePrevious(autocompleteOptions)
  const serializedOptions = JSON.stringify(autocompleteOptions)
  const serializedPreviousOptions = JSON.stringify(previousOptions)

  useEffect(() => {
    if (
      serviceAvailability.enabled &&
      serializedOptions !== serializedPreviousOptions
    ) {
      trackReceivedAutocompleteResult(
        value as string,
        providerSuggestions.length
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    serviceAvailability.enabled,
    serializedOptions,
    serializedPreviousOptions,
  ])

  if (definitelyDisabled) {
    return (
      <Input
        tabIndex={tabIndex}
        id={id}
        name={name}
        placeholder={placeholder}
        title={title}
        value={value}
        onChange={onChange}
        error={error}
        data-testid={dataTestId}
      />
    )
  }

  return (
    <AutocompleteInput<AddressAutocompleteSuggestion>
      data-testid={dataTestId}
      tabIndex={tabIndex}
      id={id}
      name={name}
      placeholder={placeholder}
      loading={serviceAvailability.loading || serviceAvailability.fetching}
      options={autocompleteOptions}
      title="Address line 1"
      value={value}
      error={error}
      onChange={event => {
        onChange(event)
        fetchForAutocomplete({ search: event.target.value })
      }}
      onClear={() => {
        onClear()
        fetchForAutocomplete({ search: "" })
      }}
      onSelect={(option, index) => {
        trackSelectedAutocompletedAddress(option, value as string)
        onSelect(option, index)
      }}
      {...autocompleteProps}
    />
  )
}

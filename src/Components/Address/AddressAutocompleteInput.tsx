import type { Address } from "Components/Address/utils"
import { useFlag } from "System/FeatureFlags/useFlag"
import { getENV } from "Utils/getENV"
import {
  ActionType,
  type AddressAutoCompletionResult,
  type ContextModule,
  type PageOwnerType,
  type SelectedItemFromAddressAutoCompletion,
} from "@artsy/cohesion"
import {
  AutocompleteInput,
  type AutocompleteInputOptionType,
  type AutocompleteInputProps,
  Input,
  usePrevious,
} from "@artsy/palette"
import { throttle, uniqBy } from "lodash"
import { useCallback, useEffect, useReducer } from "react"
import { useTracking } from "react-tracking"

// NOTE: Due to the format of this key (a long string of numbers that cannot be parsed as json)
// This key must be set in the env as a json string like SMARTY_EMBEDDED_KEY_JSON={ "key": "xxxxxxxxxxxxxxxxxx" }
const { key: API_KEY } = getENV("SMARTY_EMBEDDED_KEY_JSON") || { key: "" }

const THROTTLE_DELAY = 500

interface AutocompleteTrackingValues {
  contextPageOwnerId: string
  contextOwnerType: PageOwnerType
  contextModule: ContextModule
}

export interface AddressAutocompleteInputProps
  extends Omit<
    Partial<AutocompleteInputProps<AddressAutocompleteSuggestion>>,
    "onBlur"
  > {
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

type ServiceAvailability =
  | {
      enabled: true
      apiKey: string
    }
  | {
      enabled: false
    }

interface State {
  loading: boolean
  fetching: boolean
  serviceAvailability: ServiceAvailability | null
  providerSuggestions: ProviderSuggestion[]
}

const initialState: State = {
  loading: true,
  serviceAvailability: null,
  fetching: false,
  providerSuggestions: [],
}

type Action =
  | { type: "SET_AVAILABILITY"; serviceAvailability: ServiceAvailability }
  | { type: "FETCHING_STARTED" }
  | { type: "FETCHING_COMPLETE" }
  | { type: "SET_SUGGESTIONS"; providerSuggestions: ProviderSuggestion[] }
  | { type: "RESET_SUGGESTIONS" }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_AVAILABILITY": {
      return {
        ...state,
        loading: false,
        serviceAvailability: {
          ...action.serviceAvailability,
        },
      }
    }
    case "FETCHING_STARTED": {
      return {
        ...state,
        fetching: true,
      }
    }
    case "FETCHING_COMPLETE": {
      return {
        ...state,
        fetching: false,
      }
    }
    case "SET_SUGGESTIONS": {
      return {
        ...state,
        providerSuggestions: action.providerSuggestions,
      }
    }
    case "RESET_SUGGESTIONS": {
      return {
        ...initialState,
        providerSuggestions: [],
      }
    }
    default: {
      return state
    }
  }
}

/**
 * A wrapper around the Palette AutocompleteInput that handles efficiently
 * fetching address suggestions from an autocomplete provider.
 * See AddressAutocompleteInput.jest.tsx for implementation examples.
 *
 * *note: The onBlur prop is disabled because it causes issues with keyboard
 * navigation. see https://github.com/artsy/force/pull/14963 for more info.*
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
  const [state, dispatch] = useReducer(reducer, initialState)

  const { serviceAvailability, providerSuggestions } = state
  const isUSAddress = address.country === "US"

  const isFeatureFlagEnabled = !!useFlag("address_autocomplete_us")

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

  // Load service availaibilty when country changes
  useEffect(() => {
    const isAPIKeyPresent = !!API_KEY
    const enabled = isAPIKeyPresent && isFeatureFlagEnabled && isUSAddress
    if (enabled !== serviceAvailability?.enabled) {
      dispatch({
        type: "SET_AVAILABILITY",
        serviceAvailability: enabled
          ? { enabled: true, apiKey: API_KEY }
          : { enabled: false },
      })
    }
  }, [isFeatureFlagEnabled, isUSAddress, serviceAvailability])

  // reset suggestions if the country changes
  useEffect(() => {
    if (providerSuggestions.length > 0 && !isUSAddress) {
      dispatch({ type: "RESET_SUGGESTIONS" })
    }
  }, [isUSAddress, providerSuggestions.length])

  const fetchForAutocomplete = useCallback(
    // these are the parameters to the Smarty API call
    async ({ search, selected }: { search: string; selected?: string }) => {
      if (!serviceAvailability?.enabled) return

      if (search.length < 3) {
        dispatch({ type: "RESET_SUGGESTIONS" })
        return
      }

      try {
        dispatch({ type: "FETCHING_STARTED" })

        const response = await fetchSuggestionsWithThrottle({
          search,
          selected,
          apiKey: serviceAvailability.apiKey,
        })

        dispatch({ type: "FETCHING_COMPLETE" })
        const finalSuggestions = filterSecondarySuggestions(
          response.suggestions
        )

        dispatch({
          type: "SET_SUGGESTIONS",
          providerSuggestions: finalSuggestions.slice(0, 5),
        })
      } catch (e) {
        console.error(e)
        dispatch({ type: "RESET_SUGGESTIONS" })
        dispatch({ type: "FETCHING_COMPLETE" })
        // Disable autocomplete into some error state?
      }
    },
    [serviceAvailability]
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
    disableAutocomplete || (!state.loading && !serviceAvailability?.enabled)

  const previousOptions = usePrevious(autocompleteOptions)
  const serializedOptions = JSON.stringify(autocompleteOptions)
  const serializedPreviousOptions = JSON.stringify(previousOptions)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Tracking dependencies handled with serialized comparison
  useEffect(() => {
    if (
      serviceAvailability?.enabled &&
      serializedOptions !== serializedPreviousOptions
    ) {
      trackReceivedAutocompleteResult(
        value as string,
        providerSuggestions.length
      )
    }
  }, [serviceAvailability, serializedOptions, serializedPreviousOptions])

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
        required={!!autocompleteProps.required}
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
      loading={state.loading || state.fetching}
      options={autocompleteOptions}
      title="Street address"
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

const fetchSuggestionsWithThrottle = throttle(
  async ({
    search,
    selected,
    apiKey,
  }: {
    search: string
    selected?: string
    apiKey: string
  }) => {
    const params = {
      key: apiKey,
      search: search,
    }

    if (selected) {
      params["selected"] = selected
    }

    const url = `https://us-autocomplete-pro.api.smarty.com/lookup?${new URLSearchParams(params).toString()}`

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

const buildAddressText = (suggestion: ProviderSuggestion): string => {
  let buildingAddress = suggestion.street_line
  if (suggestion.secondary) buildingAddress += ` ${suggestion.secondary}`

  return [
    `${buildingAddress}, ${suggestion.city}`,
    suggestion.state,
    suggestion.zipcode,
  ].join(" ")
}

const filterSecondarySuggestions = (suggestions: ProviderSuggestion[]) => {
  const noSecondaryData = suggestions.map(({ secondary, ...suggestion }) => ({
    ...suggestion,
    secondary: "",
  }))
  return uniqBy(noSecondaryData, (suggestion: ProviderSuggestion) =>
    buildAddressText(suggestion)
  )
}

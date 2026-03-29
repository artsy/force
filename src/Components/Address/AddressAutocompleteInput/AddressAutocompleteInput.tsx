import {
  ActionType,
  type AddressAutoCompletionResult,
  type SelectedItemFromAddressAutoCompletion,
} from "@artsy/cohesion"
import { AutocompleteInput, Input, usePrevious } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import * as IntlAutocomplete from "Components/Address/AddressAutocompleteInput/internationalAddressAutocomplete"
import * as USAutocomplete from "Components/Address/AddressAutocompleteInput/USAddressAutocomplete"
import {
  API_KEY,
  type AddressAutocompleteInputProps,
  type AddressAutocompleteSuggestion,
  initialState,
  reducer,
} from "Components/Address/AddressAutocompleteInput/types"
import { useCallback, useEffect, useReducer } from "react"
import { useTracking } from "react-tracking"

export type { AddressAutocompleteInputProps }
export { IntlAutocomplete, USAutocomplete }

export const SUPPORTED_INTERNATIONAL_COUNTRY_CODES =
  IntlAutocomplete.SUPPORTED_COUNTRIES

/**
 * Resets throttle state between tests so stale results from a previous test
 * don't bleed into the next one. Only call this from test setup code.
 */
export const _cancelThrottlesForTest = () => {
  USAutocomplete.fetchSuggestions.cancel()
  IntlAutocomplete.fetchSuggestions.cancel()
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

  const { serviceAvailability, suggestions } = state
  const isUSAddress = address.country === "US"

  const isUSFeatureFlagEnabled = !!useFlag("address_autocomplete_us")
  const isInternationalFeatureFlagEnabled = !!useFlag(
    "emerald_address-autocomplete-international",
  )

  const { trackEvent } = useTracking()

  const trackReceivedAutocompleteResult = (
    input: string,
    resultCount: number,
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
    input: string,
  ) => {
    const event: SelectedItemFromAddressAutoCompletion = {
      action: ActionType.selectedItemFromAddressAutoCompletion,
      context_module: trackingValues.contextModule,
      context_owner_type: trackingValues.contextOwnerType,
      context_owner_id: trackingValues.contextPageOwnerId,
      input,
      item: option.value,
    }
    trackEvent(event)
  }

  // Load service availability when country or flags change
  useEffect(() => {
    const isAPIKeyPresent = !!API_KEY
    const enabled =
      isAPIKeyPresent &&
      ((isUSFeatureFlagEnabled && isUSAddress) ||
        (isInternationalFeatureFlagEnabled &&
          !isUSAddress &&
          IntlAutocomplete.SUPPORTED_COUNTRIES.has(address.country)))

    if (enabled !== serviceAvailability?.enabled) {
      dispatch({
        type: "SET_AVAILABILITY",
        serviceAvailability: enabled
          ? { enabled: true, apiKey: API_KEY }
          : { enabled: false },
      })
    }
  }, [
    isUSFeatureFlagEnabled,
    isInternationalFeatureFlagEnabled,
    isUSAddress,
    address.country,
    serviceAvailability,
  ])

  // Reset suggestions when the country changes (not on initial mount)
  const previousCountry = usePrevious(address.country)
  useEffect(() => {
    if (previousCountry !== undefined && previousCountry !== address.country) {
      dispatch({ type: "RESET_SUGGESTIONS" })
    }
  }, [previousCountry, address.country])

  const fetchForAutocomplete = useCallback(
    async ({ search }: { search: string }) => {
      if (!serviceAvailability?.enabled) return

      if (search.length < 3) {
        dispatch({ type: "RESET_SUGGESTIONS" })
        return
      }

      try {
        dispatch({ type: "FETCHING_STARTED" })

        const results = isUSAddress
          ? await USAutocomplete.fetchSuggestions({
              search,
              apiKey: serviceAvailability.apiKey,
            })
          : await IntlAutocomplete.fetchSuggestions({
              search,
              apiKey: serviceAvailability.apiKey,
              country: address.country,
            })

        dispatch({ type: "FETCHING_COMPLETE" })
        dispatch({ type: "SET_SUGGESTIONS", suggestions: results })
      } catch (e) {
        console.error(e)
        dispatch({ type: "FETCHING_COMPLETE" })
        dispatch({ type: "RESET_SUGGESTIONS" })
      }
    },
    [serviceAvailability, isUSAddress, address.country],
  )

  const definitelyDisabled =
    disableAutocomplete || (!state.loading && !serviceAvailability?.enabled)

  const previousOptions = usePrevious(suggestions)
  const serializedOptions = JSON.stringify(suggestions)
  const serializedPreviousOptions = JSON.stringify(previousOptions)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      serviceAvailability?.enabled &&
      serializedOptions !== serializedPreviousOptions
    ) {
      trackReceivedAutocompleteResult(value as string, suggestions.length)
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

  const handleSelect = async (
    option: AddressAutocompleteSuggestion,
    index: number,
  ) => {
    if (!isUSAddress && serviceAvailability?.enabled) {
      const enriched = await IntlAutocomplete.enrichSuggestion(
        option,
        serviceAvailability.apiKey,
        address.country,
      )
      trackSelectedAutocompletedAddress(enriched, value as string)
      onSelect(enriched, index)
      return
    }
    trackSelectedAutocompletedAddress(option, value as string)
    onSelect(option, index)
  }

  return (
    <AutocompleteInput<AddressAutocompleteSuggestion>
      data-testid={dataTestId}
      tabIndex={tabIndex}
      id={id}
      name={name}
      placeholder={placeholder}
      loading={state.loading || state.fetching}
      options={suggestions}
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
      onSelect={handleSelect}
      {...autocompleteProps}
    />
  )
}

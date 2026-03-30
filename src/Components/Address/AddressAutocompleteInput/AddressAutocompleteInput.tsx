import {
  ActionType,
  type AddressAutoCompletionResult,
  type SelectedItemFromAddressAutoCompletion,
} from "@artsy/cohesion"
import {
  type AutocompleteInputHandle,
  AutocompleteInput,
  Flex,
  Input,
  Text,
  usePrevious,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import * as IntlAutocomplete from "Components/Address/AddressAutocompleteInput/internationalAddressAutocomplete"
import type { IntlProviderSuggestion } from "Components/Address/AddressAutocompleteInput/internationalAddressAutocomplete"
import * as USAutocomplete from "Components/Address/AddressAutocompleteInput/USAddressAutocomplete"
import {
  API_KEY,
  type AddressAutocompleteInputProps,
  type AddressAutocompleteSuggestion,
  initialState,
  reducer,
} from "Components/Address/AddressAutocompleteInput/types"
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react"
import { useTracking } from "react-tracking"

export type { AddressAutocompleteInputProps }
export { IntlAutocomplete, USAutocomplete }

type SecondaryMode =
  | { active: false }
  | {
      active: true
      kind: "intl"
      allSuggestions: AddressAutocompleteSuggestion[]
    }

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

  // Imperative handle for the underlying AutocompleteInput
  const controlRef = useRef<AutocompleteInputHandle>(null)

  // Tracks whether we're in secondary-unit selection mode and what data to use
  const secondaryModeRef = useRef<SecondaryMode>({ active: false })

  // Reset suggestions and secondary mode when the country changes (not on initial mount)
  const previousCountry = usePrevious(address.country)
  useEffect(() => {
    if (previousCountry !== undefined && previousCountry !== address.country) {
      secondaryModeRef.current = { active: false }
      dispatch({ type: "RESET_SUGGESTIONS" })
    }
  }, [previousCountry, address.country])

  const fetchForAutocomplete = useCallback(
    async ({ search }: { search: string }) => {
      if (!serviceAvailability?.enabled) return

      if (search.length < 3) {
        secondaryModeRef.current = { active: false }
        dispatch({ type: "RESET_SUGGESTIONS" })
        return
      }

      const sm = secondaryModeRef.current

      if (sm.active) {
        // International secondary mode: filter the already-fetched candidates client-side
        const filtered = sm.allSuggestions.filter(s =>
          s.text.toLowerCase().includes(search.toLowerCase()),
        )
        dispatch({ type: "SET_SUGGESTIONS", suggestions: filtered })
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
    // secondaryModeRef is a ref — reads .current directly, no dep needed
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
    const { entries, providerSuggestion } = option

    // International multi-entry: fetch sub-address candidates and enter secondary mode
    if (
      !isUSAddress &&
      entries !== null &&
      entries > 1 &&
      serviceAvailability?.enabled
    ) {
      const prov = providerSuggestion as IntlProviderSuggestion
      try {
        dispatch({ type: "FETCHING_STARTED" })
        const results = await IntlAutocomplete.fetchSecondarySuggestions({
          addressId: prov.address_id,
          apiKey: serviceAvailability.apiKey,
          country: address.country,
          search: option.text,
        })
        dispatch({ type: "FETCHING_COMPLETE" })
        secondaryModeRef.current = {
          active: true,
          kind: "intl",
          allSuggestions: results,
        }
        dispatch({ type: "SET_SUGGESTIONS", suggestions: results })
        controlRef.current?.open()
        controlRef.current?.setQuery(option.text)
        // Update the external controlled value (Formik field) to match the
        // building text, so it overrides the original query in the input display
        onChange({
          target: { value: option.text, name: name ?? "" },
          currentTarget: { value: option.text, name: name ?? "" },
        } as ChangeEvent<HTMLInputElement>)
        controlRef.current?.focus()
      } catch (e) {
        console.error(e)
        dispatch({ type: "FETCHING_COMPLETE" })
      }
      return
    }

    // International single-entry: enrich with structured components (billed)
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

    // US single address (entries 0 or 1)
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
      controlRef={controlRef}
      onChange={event => {
        onChange(event)
        fetchForAutocomplete({ search: event.target.value })
      }}
      onClear={() => {
        secondaryModeRef.current = { active: false }
        onClear()
        fetchForAutocomplete({ search: "" })
      }}
      onSelect={handleSelect}
      renderOption={option => {
        if (option.entries !== null && option.entries > 1) {
          return (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={1}
            >
              <Text
                variant="sm-display"
                lineHeight={1}
                overflowEllipsis
                flex={1}
              >
                {option.text}
              </Text>
              <Text variant="xs" color="black60" ml={1} flexShrink={0}>
                + {option.entries} addresses
              </Text>
            </Flex>
          )
        }
        return (
          <Text variant="sm-display" lineHeight={1} p={2} overflowEllipsis>
            {option.text}
          </Text>
        )
      }}
      {...autocompleteProps}
    />
  )
}

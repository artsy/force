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
import addressFormatter from "@fragaria/address-formatter"
import { useFlag } from "@unleash/proxy-client-react"
import type { Address } from "Components/Address/utils"
import {
  ISO2_TO_ISO3,
  ISO3_TO_ISO2,
} from "Components/Address/utils/countryISO3Codes"
import { getENV } from "Utils/getENV"
import { throttle, uniqBy } from "lodash"
import { useCallback, useEffect, useReducer } from "react"
import { useTracking } from "react-tracking"

// NOTE: Due to the format of this key (a long string of numbers that cannot be parsed as json)
// This key must be set in the env as a json string like SMARTY_EMBEDDED_KEY_JSON={ "key": "xxxxxxxxxxxxxxxxxx" }
const { key: API_KEY } = getENV("SMARTY_EMBEDDED_KEY_JSON") || { key: "" }

const THROTTLE_DELAY = 500
const INTERNATIONAL_LICENSE = "international-autocomplete-v2-cloud"
const SMARTY_US_AUTOCOMPLETE_URL =
  "https://us-autocomplete-pro.api.smarty.com/lookup"
const SMARTY_INTL_AUTOCOMPLETE_URL =
  "https://international-autocomplete.api.smarty.com/v2/lookup"

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

// Response shape for the Smarty international autocomplete v2 cloud API.
// Both the initial search and the address_id drill-down return this shape.
type ProviderSuggestionInternational = {
  address_text: string
  address_id: string
  entries: number
}

// Structured components returned by GET /v2/lookup/{address_id}
type InternationalAddressComponents = {
  country_iso3: string
  administrative_area: string
  locality: string
  postal_code: string
  thoroughfare: string
  premise: string
}

interface AddressAutocompleteSuggestion extends AutocompleteInputOptionType {
  address: Omit<Address, "name">
  // null if secondary suggestions are not enabled; > 1 means drill-down required
  entries: number | null
  // address_id for fetching structured components on selection
  addressId?: string
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
  internationalProviderSuggestions: ProviderSuggestionInternational[]
}

const initialState: State = {
  loading: true,
  serviceAvailability: null,
  fetching: false,
  providerSuggestions: [],
  internationalProviderSuggestions: [],
}

type Action =
  | { type: "SET_AVAILABILITY"; serviceAvailability: ServiceAvailability }
  | { type: "FETCHING_STARTED" }
  | { type: "FETCHING_COMPLETE" }
  | { type: "SET_SUGGESTIONS"; providerSuggestions: ProviderSuggestion[] }
  | {
      type: "SET_INTERNATIONAL_SUGGESTIONS"
      internationalProviderSuggestions: ProviderSuggestionInternational[]
    }
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
    case "SET_INTERNATIONAL_SUGGESTIONS": {
      return {
        ...state,
        internationalProviderSuggestions:
          action.internationalProviderSuggestions,
      }
    }
    case "RESET_SUGGESTIONS": {
      return {
        ...initialState,
        loading: false,
        serviceAvailability: state.serviceAvailability,
        providerSuggestions: [],
        internationalProviderSuggestions: [],
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

  const {
    serviceAvailability,
    providerSuggestions,
    internationalProviderSuggestions,
  } = state
  const isUSAddress = address.country === "US"

  const isUSFeatureFlagEnabled = !!useFlag("address_autocomplete_us")
  const isInternationalFeatureFlagEnabled =
    true || !!useFlag("address_autocomplete_international")

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
      input: input,
      item: option.value,
    }

    trackEvent(event)
  }

  // Load service availability when country changes
  useEffect(() => {
    const isAPIKeyPresent = !!API_KEY
    const enabled =
      isAPIKeyPresent &&
      ((isUSFeatureFlagEnabled && isUSAddress) ||
        (isInternationalFeatureFlagEnabled && !isUSAddress))

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
    serviceAvailability,
  ])

  // reset suggestions when the country changes (not on initial mount)
  const previousCountry = usePrevious(address.country)
  useEffect(() => {
    if (previousCountry !== undefined && previousCountry !== address.country) {
      dispatch({ type: "RESET_SUGGESTIONS" })
    }
  }, [previousCountry, address.country])

  const fetchForAutocomplete = useCallback(
    async ({ search, selected }: { search: string; selected?: string }) => {
      if (!serviceAvailability?.enabled) return

      if (search.length < 3) {
        dispatch({ type: "RESET_SUGGESTIONS" })
        return
      }

      try {
        dispatch({ type: "FETCHING_STARTED" })

        if (isUSAddress) {
          const response = await fetchSuggestionsWithThrottle({
            search,
            selected,
            apiKey: serviceAvailability.apiKey,
          })

          dispatch({ type: "FETCHING_COMPLETE" })
          const finalSuggestions = filterSecondarySuggestions(
            response.suggestions,
          )

          dispatch({
            type: "SET_SUGGESTIONS",
            providerSuggestions: finalSuggestions.slice(0, 5),
          })
        } else {
          const iso3Country = ISO2_TO_ISO3[address.country]
          if (!iso3Country) {
            dispatch({ type: "FETCHING_COMPLETE" })
            return
          }

          const response = await fetchInternationalSuggestionsWithThrottle({
            search,
            country: iso3Country,
            apiKey: serviceAvailability.apiKey,
          })

          dispatch({ type: "FETCHING_COMPLETE" })
          dispatch({
            type: "SET_INTERNATIONAL_SUGGESTIONS",
            internationalProviderSuggestions: (response.candidates ?? []).slice(
              0,
              5,
            ),
          })
        }
      } catch (e) {
        console.error(e)
        // Clear suggestions but keep the autocomplete input focused
        dispatch({ type: "FETCHING_COMPLETE" })
        dispatch({ type: "RESET_SUGGESTIONS" })
      }
    },
    [serviceAvailability, isUSAddress, address.country],
  )

  const autocompleteOptions: AddressAutocompleteSuggestion[] = isUSAddress
    ? providerSuggestions.map(
        (suggestion: ProviderSuggestion): AddressAutocompleteSuggestion => {
          const text = buildUSAddressText(suggestion)

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
        },
      )
    : internationalProviderSuggestions.map(
        (
          suggestion: ProviderSuggestionInternational,
        ): AddressAutocompleteSuggestion => {
          return {
            text: suggestion.address_text,
            value: suggestion.address_text,
            entries: suggestion.entries,
            addressId: suggestion.address_id,
            // Populated with real components when the user selects this suggestion.
            // Until then, address_text serves as the addressLine1 fallback.
            address: {
              addressLine1: suggestion.address_text,
              addressLine2: "",
              city: "",
              region: "",
              postalCode: "",
              country: address.country,
            },
          }
        },
      )

  const definitelyDisabled =
    disableAutocomplete || (!state.loading && !serviceAvailability?.enabled)

  const previousOptions = usePrevious(autocompleteOptions)
  const serializedOptions = JSON.stringify(autocompleteOptions)
  const serializedPreviousOptions = JSON.stringify(previousOptions)

  const totalSuggestions = isUSAddress
    ? providerSuggestions.length
    : internationalProviderSuggestions.length

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      serviceAvailability?.enabled &&
      serializedOptions !== serializedPreviousOptions
    ) {
      trackReceivedAutocompleteResult(value as string, totalSuggestions)
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
      onSelect={async (option, index) => {
        if (!isUSAddress && option.addressId) {
          const iso3Country = ISO2_TO_ISO3[address.country]
          if (iso3Country && serviceAvailability?.enabled) {
            try {
              const response = await fetchInternationalAddressById({
                addressId: option.addressId,
                country: iso3Country,
                apiKey: serviceAvailability.apiKey,
              })
              const components = response.candidates?.[0]?.components
              if (components) {
                const iso2Country =
                  ISO3_TO_ISO2[components.country_iso3] || address.country
                const formattedStreetLines = addressFormatter.format(
                  {
                    road: components.thoroughfare,
                    houseNumber: components.premise,
                    countryCode: iso2Country,
                  },
                  { output: "array" },
                ) as string[]
                const addressLine1 =
                  formattedStreetLines[0] || option.address.addressLine1
                const enrichedOption = {
                  ...option,
                  address: {
                    addressLine1,
                    addressLine2: "",
                    city: components.locality,
                    region: components.administrative_area,
                    postalCode: components.postal_code,
                    country: iso2Country,
                  },
                }
                trackSelectedAutocompletedAddress(
                  enrichedOption,
                  value as string,
                )
                onSelect(enrichedOption, index)
                return
              }
            } catch (e) {
              console.error("Failed to fetch address components:", e)
            }
          }
        }
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
    const params: Record<string, string> = {
      key: apiKey,
      search: search,
    }

    if (selected) {
      params["selected"] = selected
    }

    const url = `${SMARTY_US_AUTOCOMPLETE_URL}?${new URLSearchParams(params).toString()}`

    const response = await fetch(url)
    const json = await response.json()
    return json
  },
  THROTTLE_DELAY,
  {
    leading: true,
    trailing: true,
  },
)

const fetchInternationalSuggestionsWithThrottle = throttle(
  async ({
    search,
    country,
    apiKey,
  }: {
    search: string
    country: string
    apiKey: string
  }) => {
    const params: Record<string, string> = {
      key: apiKey,
      search,
      country,
      max_results: "5",
      license: INTERNATIONAL_LICENSE,
    }

    const url = `${SMARTY_INTL_AUTOCOMPLETE_URL}?${new URLSearchParams(params).toString()}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `International autocomplete request failed: ${response.status}`,
      )
    }
    return response.json()
  },
  THROTTLE_DELAY,
  {
    leading: true,
    trailing: true,
  },
)

const fetchInternationalAddressById = async ({
  addressId,
  country,
  apiKey,
}: {
  addressId: string
  country: string
  apiKey: string
}): Promise<{
  candidates: Array<{
    components?: InternationalAddressComponents
  }>
}> => {
  const params = new URLSearchParams({
    key: apiKey,
    country,
    license: INTERNATIONAL_LICENSE,
  })
  const url = `${SMARTY_INTL_AUTOCOMPLETE_URL}/${encodeURIComponent(addressId)}?${params}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Address component lookup failed: ${response.status}`)
  }
  return response.json()
}

/**
 * Resets throttle state between tests so stale results from a previous test
 * don't bleed into the next one. Only call this from test setup code.
 */
export const _cancelThrottlesForTest = () => {
  fetchSuggestionsWithThrottle.cancel()
  fetchInternationalSuggestionsWithThrottle.cancel()
}

const buildUSAddressText = (suggestion: ProviderSuggestion): string => {
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
    buildUSAddressText(suggestion),
  )
}

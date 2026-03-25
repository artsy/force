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

/**
 * ISO-2 country codes supported by the Smarty international autocomplete v2 API.
 * Derived from the ISO-3 list at:
 * https://www.smarty.com/docs/cloud/international-address-autocomplete-api#supported-countries
 * US territories (GU, PR, VI, MP, AS, UM, MH) are absent — they are covered by the US API.
 */
// prettier-ignore
const SMARTY_SUPPORTED_ISO3_CODES = [
  "AFG","ALB","DZA","AND","AGO","AIA","ATA","ATG","ARG","ARM","ABW","AUS","AUT","AZE",
  "BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BES","BIH","BWA",
  "BVT","BRA","IOT","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD",
  "CHL","CHN","CXR","CCK","COL","COM","COG","COD","COK","CRI","HRV","CUB","CUW","CYP",
  "CZE","CIV","DNK","DJI","DMA","DOM","ECU","EGY","SLV","GNQ","ERI","EST","SWZ","ETH",
  "FLK","FRO","FJI","FIN","FRA","GUF","PYF","ATF","GAB","GMB","GEO","DEU","GHA","GIB",
  "GRC","GRL","GRD","GLP","GTM","GGY","GIN","GNB","GUY","HTI","HMD","VAT","HND","HKG",
  "HUN","ISL","IND","IDN","IRN","IRQ","IRL","IMN","ISR","ITA","JAM","JPN","JEY","JOR",
  "KAZ","KEN","KIR","PRK","KOR","XKX","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY",
  "LIE","LTU","LUX","MAC","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MTQ","MRT","MUS",
  "MYT","MEX","FSM","MDA","MCO","MNG","MNE","MSR","MAR","MOZ","MMR","NAM","NRU","NPL",
  "NLD","NCL","NZL","NIC","NER","NGA","NIU","NFK","NOR","OMN","PAK","PLW","PSE","PAN",
  "PNG","PRY","PER","PHL","PCN","POL","PRT","QAT","SSD","ROU","RUS","RWA","REU","BLM",
  "SHN","KNA","LCA","MAF","SPM","VCT","WSM","SMR","STP","SAU","SEN","SRB","SYC","SLE",
  "SGP","SXM","SVK","SVN","SLB","SOM","ZAF","SGS","ESP","LKA","SDN","SUR","SJM","SWE",
  "CHE","SYR","TWN","TJK","TZA","THA","TLS","TGO","TKL","TON","TTO","TUN","TUR","TKM",
  "TCA","TUV","UGA","UKR","ARE","GBR","URY","UZB","VUT","VEN","VNM","VGB","WLF","ESH",
  "YEM","ZMB","ZWE","ALA",
] as const

export const SUPPORTED_INTERNATIONAL_COUNTRY_CODES: Set<string> = new Set(
  SMARTY_SUPPORTED_ISO3_CODES.map(iso3 => ISO3_TO_ISO2[iso3]).filter(Boolean),
)

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
// Response shape for the Smarty US autocomplete API.
type ProviderSuggestionUS = {
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

// Structured components returned by GET /v2/lookup/{address_id} for a final (entries=1) address.
// When entries > 1, the same endpoint returns more ProviderSuggestionInternational sub-units instead.
type InternationalAddressComponents = {
  country_iso3: string
  administrative_area: string
  locality: string
  postal_code: string
  street: string // full street line including house number, pre-formatted by Smarty
}

interface AddressAutocompleteSuggestion extends AutocompleteInputOptionType {
  address: Omit<Address, "name">
  // null if secondary suggestions are not enabled; > 1 means drill-down required
  entries: number | null
  // address_id for fetching structured components on selection
  addressId?: string
  // Secondary descriptor type (e.g. "Apt", "Suite") for building the Pro secondary lookup `selected` param
  secondaryDescriptor?: string
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
  suggestions: ProviderSuggestionUS[] | ProviderSuggestionInternational[]
}

const initialState: State = {
  loading: true,
  serviceAvailability: null,
  fetching: false,
  suggestions: [],
}

type Action =
  | { type: "SET_AVAILABILITY"; serviceAvailability: ServiceAvailability }
  | { type: "FETCHING_STARTED" }
  | { type: "FETCHING_COMPLETE" }
  | {
      type: "SET_SUGGESTIONS"
      suggestions: ProviderSuggestionUS[] | ProviderSuggestionInternational[]
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
        suggestions: action.suggestions,
      }
    }
    case "RESET_SUGGESTIONS": {
      return {
        ...initialState,
        loading: false,
        serviceAvailability: state.serviceAvailability,
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
        (isInternationalFeatureFlagEnabled &&
          !isUSAddress &&
          SUPPORTED_INTERNATIONAL_COUNTRY_CODES.has(address.country)))

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
            suggestions: finalSuggestions.slice(0, 5),
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
            type: "SET_SUGGESTIONS",
            suggestions: (response.candidates ?? []).slice(0, 5),
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
    ? (suggestions as ProviderSuggestionUS[]).map(
        (suggestion): AddressAutocompleteSuggestion => {
          // For multi-unit buildings (entries > 1), secondary is a descriptor type like "Apt"
          // or "Suite" — exclude it from the display text but keep it for the secondary lookup.
          const displaySuggestion =
            suggestion.entries > 1
              ? { ...suggestion, secondary: "" }
              : suggestion
          const text = buildUSAddressText(displaySuggestion)

          return {
            text,
            value: text,
            entries: suggestion.entries,
            secondaryDescriptor:
              suggestion.entries > 1
                ? suggestion.secondary || undefined
                : undefined,
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
    : (suggestions as ProviderSuggestionInternational[]).map(
        (suggestion): AddressAutocompleteSuggestion => {
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

  const totalSuggestions = suggestions.length

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

  const handleSelect = (
    option: AddressAutocompleteSuggestion,
    index: number,
  ) => {
    // US multi-unit: fetch sub-units and keep dropdown open for user to pick one.
    // Pre-fill the form with the building-level data so the user sees city/state/zip
    // while they choose a specific unit from the dropdown.
    if (isUSAddress && option.entries !== null && option.entries > 1) {
      onSelect(option, index)
      if (serviceAvailability?.enabled) {
        const secondaryPart = option.secondaryDescriptor
          ? ` ${option.secondaryDescriptor}`
          : ""
        // TODO: May need to set input to addressLine1+secondaryPart for the Pro secondary lookup to work correctly for continued typing
        const selected = `${option.address.addressLine1}${secondaryPart} (${option.entries}) ${option.address.city} ${option.address.region} ${option.address.postalCode}`
        dispatch({ type: "FETCHING_STARTED" })
        // Cancel any pending throttled search so it can't overwrite secondary results
        fetchSuggestionsWithThrottle.cancel()
        fetchUSSecondarySuggestions({
          search: option.address.addressLine1,
          selected,
          apiKey: serviceAvailability.apiKey,
        })
          .then(response => {
            dispatch({ type: "FETCHING_COMPLETE" })
            if (response?.suggestions?.length > 0) {
              dispatch({
                type: "SET_SUGGESTIONS",
                suggestions: response.suggestions.slice(0, 5),
              })
            }
          })
          .catch(e => {
            dispatch({ type: "FETCHING_COMPLETE" })
            console.error("Failed to fetch US secondary suggestions:", e)
          })
      }
      return { keepOpen: true }
    }
    //us-autocomplete-pro.api.smarty.com/lookup?key=164965362009942753&search=3064+N+Central+Park+Ave&selected=3064+N+Central+Park+Ave++%283%29+Chicago+IL+60618
    if (!isUSAddress && option.addressId) {
      const iso3Country = ISO2_TO_ISO3[address.country]
      if (iso3Country && serviceAvailability?.enabled) {
        // International multi-unit: fetch sub-units and keep dropdown open
        if (option.entries !== null && option.entries > 1) {
          dispatch({ type: "FETCHING_STARTED" })
          fetchInternationalSubUnits({
            addressId: option.addressId,
            country: iso3Country,
            apiKey: serviceAvailability.apiKey,
          })
            .then(subUnits => {
              dispatch({ type: "FETCHING_COMPLETE" })
              if (subUnits && subUnits.length > 0) {
                dispatch({ type: "SET_SUGGESTIONS", suggestions: subUnits })
              }
            })
            .catch(e => {
              dispatch({ type: "FETCHING_COMPLETE" })
              console.error("Failed to fetch sub-units:", e)
            })
          return { keepOpen: true }
        }

        // International single entry: fetch components, then call onSelect
        fetchInternationalComponents({
          addressId: option.addressId,
          country: iso3Country,
          apiKey: serviceAvailability.apiKey,
        })
          .then(components => {
            if (components) {
              const iso2Country =
                ISO3_TO_ISO2[components.country_iso3] || address.country
              const enrichedOption = {
                ...option,
                address: {
                  addressLine1: components.street,
                  addressLine2: "",
                  city: components.locality,
                  region: components.administrative_area,
                  postalCode: components.postal_code,
                  country: iso2Country,
                },
              }
              trackSelectedAutocompletedAddress(enrichedOption, value as string)
              onSelect(enrichedOption, index)
            } else {
              trackSelectedAutocompletedAddress(option, value as string)
              onSelect(option, index)
            }
          })
          .catch(e => {
            // Component fetch failed — fall back to partial address so user can complete manually
            console.error("Failed to fetch address components:", e)
            trackSelectedAutocompletedAddress(option, value as string)
            onSelect(option, index)
          })
        return
      }
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
      onSelect={handleSelect}
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

/**
 * Unthrottled fetch for US secondary (unit) suggestions.
 * Used when a user selects a multi-unit building to drill down to individual units.
 * Not throttled because it's triggered by explicit selection, not by typing.
 */
const fetchUSSecondarySuggestions = async ({
  search,
  selected,
  apiKey,
}: {
  search: string
  selected: string
  apiKey: string
}) => {
  const params: Record<string, string> = {
    key: apiKey,
    search,
    selected,
  }
  const url = `${SMARTY_US_AUTOCOMPLETE_URL}?${new URLSearchParams(params).toString()}`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

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

/**
 * Fetches structured address components for an international address by address_id.
 *
 * Smarty's /v2/lookup/{address_id} endpoint has two modes:
 * - entries > 1 (multi-unit building): returns more ProviderSuggestionInternational sub-unit candidates
 * - entries === 1 (final address): returns flat InternationalAddressComponents
 *
 * This function handles both by performing up to two fetches: if the first result
 * looks like a sub-unit list, it fetches the first sub-unit's components.
 */
const fetchInternationalComponents = async ({
  addressId,
  country,
  apiKey,
}: {
  addressId: string
  country: string
  apiKey: string
}): Promise<InternationalAddressComponents | null> => {
  const doFetch = async (id: string) => {
    const params = new URLSearchParams({
      key: apiKey,
      country,
      license: INTERNATIONAL_LICENSE,
    })
    const url = `${SMARTY_INTL_AUTOCOMPLETE_URL}/${encodeURIComponent(id)}?${params}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Address component lookup failed: ${response.status}`)
    }
    return response.json() as Promise<{
      candidates: Array<
        InternationalAddressComponents | ProviderSuggestionInternational
      >
    }>
  }

  const first = await doFetch(addressId)
  const candidate = first.candidates?.[0]
  if (!candidate) return null

  // Structured component: has "street" field
  if ("street" in candidate) return candidate as InternationalAddressComponents

  // Sub-unit candidate: has "address_id" — fetch the first sub-unit
  if ("address_id" in candidate) {
    const second = await doFetch(candidate.address_id)
    const sub = second.candidates?.[0]
    if (sub && "street" in sub) return sub as InternationalAddressComponents
  }

  return null
}

/**
 * Fetches the list of sub-unit candidates for a multi-unit international address.
 * Used when a selected candidate has entries > 1 (e.g. an apartment building).
 * Returns the sub-unit ProviderSuggestionInternational candidates for user selection.
 */
const fetchInternationalSubUnits = async ({
  addressId,
  country,
  apiKey,
}: {
  addressId: string
  country: string
  apiKey: string
}): Promise<ProviderSuggestionInternational[] | null> => {
  const params = new URLSearchParams({
    key: apiKey,
    country,
    license: INTERNATIONAL_LICENSE,
  })
  const url = `${SMARTY_INTL_AUTOCOMPLETE_URL}/${encodeURIComponent(addressId)}?${params}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Sub-unit lookup failed: ${response.status}`)
  }
  const json = (await response.json()) as {
    candidates: Array<
      InternationalAddressComponents | ProviderSuggestionInternational
    >
  }
  return (json.candidates ?? []).filter(
    (c): c is ProviderSuggestionInternational => "address_id" in c,
  )
}

/**
 * Resets throttle state between tests so stale results from a previous test
 * don't bleed into the next one. Only call this from test setup code.
 */
export const _cancelThrottlesForTest = () => {
  fetchSuggestionsWithThrottle.cancel()
  fetchInternationalSuggestionsWithThrottle.cancel()
}

const buildUSAddressText = (suggestion: ProviderSuggestionUS): string => {
  let buildingAddress = suggestion.street_line
  if (suggestion.secondary) buildingAddress += ` ${suggestion.secondary}`

  return [
    `${buildingAddress}, ${suggestion.city}`,
    suggestion.state,
    suggestion.zipcode,
  ].join(" ")
}

const filterSecondarySuggestions = (suggestions: ProviderSuggestionUS[]) => {
  // Strip secondary from the address text for deduplication and display,
  // but preserve the secondary descriptor (e.g. "Apt", "Suite") on multi-unit
  // suggestions so it can be included in the Pro secondary lookup `selected` param.
  const noSecondaryData = suggestions.map(({ secondary, ...suggestion }) => ({
    ...suggestion,
    secondary: suggestion.entries > 1 ? secondary : "",
  }))
  return uniqBy(noSecondaryData, (suggestion: ProviderSuggestionUS) =>
    buildUSAddressText({ ...suggestion, secondary: "" }),
  )
}

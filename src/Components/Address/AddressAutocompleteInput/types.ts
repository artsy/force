import type { ContextModule, PageOwnerType } from "@artsy/cohesion"
import type {
  AutocompleteInputOptionType,
  AutocompleteInputProps,
} from "@artsy/palette"
import type { USProviderSuggestion } from "Components/Address/AddressAutocompleteInput/USAddressAutocomplete"
import type {
  IntlProviderAddress,
  IntlProviderSuggestion,
} from "Components/Address/AddressAutocompleteInput/internationalAddressAutocomplete"
import type { Address } from "Components/Address/utils"
import { getENV } from "Utils/getENV"

// NOTE: Due to the format of this key (a long string of numbers that cannot be parsed as json)
// This key must be set in the env as a json string like SMARTY_EMBEDDED_KEY_JSON={ "key": "xxxxxxxxxxxxxxxxxx" }
const { key: API_KEY_VALUE } = getENV("SMARTY_EMBEDDED_KEY_JSON") || { key: "" }
export const API_KEY: string = API_KEY_VALUE

export const THROTTLE_DELAY = 500

export const SMARTY_US_AUTOCOMPLETE_URL =
  "https://us-autocomplete-pro.api.smarty.com/lookup"

// ---------------------------------------------------------------------------
// Provider suggestion shapes
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Shared suggestion type
// ---------------------------------------------------------------------------

export interface AddressAutocompleteSuggestion
  extends AutocompleteInputOptionType {
  address: Omit<Address, "name">
  /** null if secondary suggestions are not enabled (US); > 1 means drill-down required (international) */
  entries: number | null
  /**
   * The raw provider suggestion that produced this entry. Typed as a union so
   * that address_id (international-only) remains inaccessible on US suggestions
   * without a type narrowing cast.
   */
  providerSuggestion:
    | USProviderSuggestion
    | IntlProviderSuggestion
    | IntlProviderAddress
}

// ---------------------------------------------------------------------------
// Component props
// ---------------------------------------------------------------------------

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
  /** The address (including at least a country) to use for autocomplete suggestions */
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

// ---------------------------------------------------------------------------
// State management
// ---------------------------------------------------------------------------

type ServiceAvailability =
  | { enabled: true; apiKey: string }
  | { enabled: false }

export interface State {
  loading: boolean
  fetching: boolean
  serviceAvailability: ServiceAvailability | null
  suggestions: AddressAutocompleteSuggestion[]
}

export const initialState: State = {
  loading: true,
  serviceAvailability: null,
  fetching: false,
  suggestions: [],
}

export type Action =
  | { type: "SET_AVAILABILITY"; serviceAvailability: ServiceAvailability }
  | { type: "FETCHING_STARTED" }
  | { type: "FETCHING_COMPLETE" }
  | { type: "SET_SUGGESTIONS"; suggestions: AddressAutocompleteSuggestion[] }
  | { type: "RESET_SUGGESTIONS" }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_AVAILABILITY": {
      return {
        ...state,
        loading: false,
        serviceAvailability: { ...action.serviceAvailability },
      }
    }
    case "FETCHING_STARTED": {
      return { ...state, fetching: true }
    }
    case "FETCHING_COMPLETE": {
      return { ...state, fetching: false }
    }
    case "SET_SUGGESTIONS": {
      return { ...state, suggestions: action.suggestions }
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

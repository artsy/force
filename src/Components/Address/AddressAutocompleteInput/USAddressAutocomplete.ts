import {
  type AddressAutocompleteSuggestion,
  SMARTY_US_AUTOCOMPLETE_URL,
  THROTTLE_DELAY,
} from "Components/Address/AddressAutocompleteInput/types"
import { throttle, uniqBy } from "lodash"

export const SUPPORTED_COUNTRIES: Set<string> = new Set(["US"])

/**
 * A candidate from the Smarty US Autocomplete Pro API (GET /lookup).
 *
 * `entries` indicates secondary-unit availability:
 *   - entries === 0 → complete, verified address with no additional units
 *   - entries > 1  → multiple secondary units exist (e.g. 108 apartments);
 *     re-query with the `selected` param to get unit-level candidates.
 *     When entries > 1, `secondary` contains only the type ("Apt", "Unit"),
 *     not a specific unit number.
 *
 * `secondary` holds the unit designation when present, e.g. "Apt A1", "Unit 101",
 * "Fl 3". Empty string when the address has no secondary.
 *
 * All address fields (street_line, city, state, zipcode) are returned in every
 * response — no drill-down is required to get structured components.
 */
export type USProviderSuggestion = {
  /** Street address excluding unit, e.g. "401 Broadway" */
  street_line: string
  /** Unit designation, e.g. "Apt A1" or "" if none. Just the type ("Apt") when entries > 1. */
  secondary: string
  city: string
  /** Two-letter state abbreviation, e.g. "NY" */
  state: string
  /** Five-digit ZIP code, e.g. "10013" */
  zipcode: string
  /** See JSDoc above for semantics */
  entries: number
  /** Only present when the `source` request param is used */
  source?: "postal" | "other"
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const buildAddressText = (suggestion: USProviderSuggestion): string => {
  let buildingAddress = suggestion.street_line
  if (suggestion.secondary) buildingAddress += ` ${suggestion.secondary}`
  return [
    `${buildingAddress}, ${suggestion.city}`,
    suggestion.state,
    suggestion.zipcode,
  ].join(" ")
}

const filterSecondarySuggestions = (
  suggestions: USProviderSuggestion[],
): USProviderSuggestion[] => {
  const noSecondaryData = suggestions.map(({ secondary, ...suggestion }) => ({
    ...suggestion,
    secondary: "",
  }))
  return uniqBy(noSecondaryData, buildAddressText)
}

const mapSuggestion = (
  suggestion: USProviderSuggestion,
): AddressAutocompleteSuggestion => {
  const text = buildAddressText(suggestion)
  return {
    text,
    value: text,
    entries: null,
    providerSuggestion: suggestion,
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

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/**
 * Throttled fetch for typing. Deduplicates multi-unit buildings into a single
 * suggestion (unit selection is handled separately). Returns up to 5 results.
 */
export const fetchSuggestions = throttle(
  async ({
    search,
    apiKey,
  }: {
    search: string
    apiKey: string
  }): Promise<AddressAutocompleteSuggestion[]> => {
    const params = new URLSearchParams({ key: apiKey, search })
    const response = await fetch(`${SMARTY_US_AUTOCOMPLETE_URL}?${params}`)
    const json = await response.json()
    return filterSecondarySuggestions(json.suggestions ?? [])
      .slice(0, 5)
      .map(mapSuggestion)
  },
  THROTTLE_DELAY,
  { leading: true, trailing: true },
)

import {
  type AddressAutocompleteSuggestion,
  THROTTLE_DELAY,
} from "Components/Address/AddressAutocompleteInput/types"
import {
  ISO2_TO_ISO3,
  ISO3_TO_ISO2,
} from "Components/Address/utils/countryISO3Codes"
import { throttle } from "lodash"

const INTERNATIONAL_LICENSE = "international-autocomplete-v2-cloud"
const SMARTY_INTL_AUTOCOMPLETE_URL =
  "https://international-autocomplete.api.smarty.com/v2/lookup"
// ISO-3 codes supported by the Smarty international autocomplete v2 API.
// Derived from https://www.smarty.com/docs/cloud/international-address-autocomplete-api#supported-countries
// US territories are excluded — they are covered by the US API.
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

export const SUPPORTED_COUNTRIES: Set<string> = new Set(
  SMARTY_SUPPORTED_ISO3_CODES.map(iso3 => ISO3_TO_ISO2[iso3]).filter(Boolean),
)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A candidate from the Smarty international autocomplete v2 search endpoint
 * (GET /v2/lookup) or from a drill-down on a multi-entry address_id.
 *
 * `entries` signals how to handle this candidate:
 *   - entries === 1 → single match; call GET /v2/lookup/{address_id} to get
 *     structured `IntlProviderAddress` fields (street, locality, postal_code, …)
 *   - entries > 1  → multiple sub-addresses share this address_id; call
 *     GET /v2/lookup/{address_id} to receive more IntlProviderSuggestion candidates
 *     to drill into (e.g. individual units within a building).
 *
 * `address_text` is a pre-formatted full address string (street + city +
 * admin area + postal code) suitable for display in dropdown lists.
 */
export type IntlProviderSuggestion = {
  /** Pre-formatted full address string, e.g. "10 Downing St London SW1A 2AA" */
  address_text: string
  /** Opaque identifier used to drill down via GET /v2/lookup/{address_id} */
  address_id: string
  /** Number of sub-addresses under this entry; see JSDoc above for semantics */
  entries: number
}

/**
 * Structured address components returned by GET /v2/lookup/{address_id} when
 * the candidate has entries === 1 (a single, resolved address).
 *
 * Note: when entries > 1, the same endpoint returns more IntlProviderSuggestion
 * candidates instead — this type is only for the final single-entry case.
 */
export type IntlProviderAddress = {
  /** Full street line including house number, pre-formatted by Smarty, e.g. "10 Ashwood Close" */
  street: string
  /** City or town, e.g. "Worthing" */
  locality: string
  /** Abbreviated administrative area, e.g. "NB" for New Brunswick */
  administrative_area: string
  /** Same as administrative_area — short form, e.g. "NB" */
  administrative_area_short: string
  /** Full administrative area name, e.g. "New Brunswick" */
  administrative_area_long: string
  /** Postal/ZIP code, e.g. "BN11 2AF" */
  postal_code: string
  /** ISO-3 country code, e.g. "GBR" */
  country_iso3: string
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Maps a search-result candidate to an AddressAutocompleteSuggestion.
 * Only called with IntlProviderSuggestion (search results and drill-down
 * candidates). IntlProviderAddress is handled separately in enrichSuggestion.
 */
const mapSuggestion = (
  suggestion: IntlProviderSuggestion,
  country: string,
): AddressAutocompleteSuggestion => ({
  text: suggestion.address_text,
  value: suggestion.address_text,
  entries: suggestion.entries,
  providerSuggestion: suggestion,
  // address_text is used as addressLine1 until enrichSuggestion fills in
  // the real structured components from the address_id lookup on selection.
  address: {
    addressLine1: suggestion.address_text,
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country,
  },
})

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/**
 * Throttled fetch for typing. Only includes suggestions with a single entry —
 * multiple entry suggestions require secondary address selection which is not
 * yet supported.
 */
export const fetchSuggestions = throttle(
  async ({
    search,
    apiKey,
    country,
  }: {
    search: string
    apiKey: string
    country: string
  }): Promise<AddressAutocompleteSuggestion[]> => {
    const iso3Country = ISO2_TO_ISO3[country]
    if (!iso3Country) return []

    const params = new URLSearchParams({
      key: apiKey,
      search,
      country: iso3Country,
      max_results: "5",
      license: INTERNATIONAL_LICENSE,
    })
    const response = await fetch(`${SMARTY_INTL_AUTOCOMPLETE_URL}?${params}`)
    if (!response.ok) {
      throw new Error(
        `International autocomplete request failed: ${response.status}`,
      )
    }
    const json = await response.json()

    return (json.candidates ?? [])
      .filter((c: IntlProviderSuggestion) => c.entries === 1)
      .slice(0, 5)
      .map((suggestion: IntlProviderSuggestion) =>
        mapSuggestion(suggestion, country),
      )
  },
  THROTTLE_DELAY,
  { leading: true, trailing: true },
)

/**
 * Fetches structured address components for a suggestion by its address_id,
 * and returns an enriched copy of the suggestion. Falls back to the original
 * (partial) suggestion if the lookup fails or returns no data.
 */
export const enrichSuggestion = async (
  option: AddressAutocompleteSuggestion,
  apiKey: string,
  country: string,
): Promise<AddressAutocompleteSuggestion> => {
  const { address_id: addressId } =
    option.providerSuggestion as IntlProviderSuggestion

  const iso3Country = ISO2_TO_ISO3[country]
  if (!addressId || !iso3Country) return option

  try {
    const params = new URLSearchParams({
      key: apiKey,
      country: iso3Country,
      license: INTERNATIONAL_LICENSE,
    })
    const url = `${SMARTY_INTL_AUTOCOMPLETE_URL}/${encodeURIComponent(addressId)}?${params}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Address component lookup failed: ${response.status}`)
    }
    const json = (await response.json()) as {
      candidates: IntlProviderAddress[]
    }
    const components = json.candidates?.[0]
    if (!components) return option

    const iso2Country = ISO3_TO_ISO2[components.country_iso3] || country
    return {
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
  } catch (e) {
    // Component fetch failed (e.g. network error, API key issue).
    // Fall back to the partial address so the user can complete the form manually.
    console.error("Failed to fetch address components:", e)
    return option
  }
}

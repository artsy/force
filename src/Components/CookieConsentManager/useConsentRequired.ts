import { CategoryPreferences } from "@segment/consent-manager/types/types"
import {
  DEFAULT_OPT_IN_PREFERENCES,
  DEFAULT_OPT_OUT_PREFERENCES,
} from "Components/CookieConsentManager/categories"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { getTimeZone } from "Utils/getTimeZone"
import qs from "qs"

/**
 * EU or UK: banner appears, visitors can opt-in to optional cookies, but are opted out by default
 * California or Brazil: banner appears, visitors can opt-out, but are opted in by default
 * Visitors geolocated to other regions see no banner and can't opt out
 *
 * Reference: https://github.com/segmentio/in-eu
 */
export const useConsentRequired = (): {
  isEU: boolean
  isCA: boolean
  isBR: boolean
  isOptOut: boolean
  isOptIn: boolean
  isDisplayable: boolean
  initialPreferences: CategoryPreferences
} => {
  const isMounted = useDidMount()

  if (!isMounted || typeof Intl === "undefined") {
    return RESTRICTIVE_DEFAULTS
  }

  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  })

  const timezone = getTimeZone()

  const isEU =
    !!timezone?.startsWith("Europe") ||
    AMBIGUOUS_TIMEZONES.includes(timezone) ||
    query.geo === "eu"
  const isCA = CALIFORNIA_TIMEZONES.includes(timezone) || query.geo === "ca"
  const isBR = BRAZIL_TIMEZONES.includes(timezone) || query.geo === "br"

  const isOptIn = isEU
  const isOptOut = isCA || isBR
  const isDisplayable = isOptIn || isOptOut

  const initialPreferences = (() => {
    if (isOptIn) return DEFAULT_OPT_IN_PREFERENCES
    if (isOptOut) return DEFAULT_OPT_OUT_PREFERENCES
    return DEFAULT_OPT_OUT_PREFERENCES
  })()

  return {
    isEU,
    isCA,
    isBR,
    isOptOut,
    isOptIn,
    isDisplayable,
    initialPreferences,
  }
}

const RESTRICTIVE_DEFAULTS = {
  isEU: true,
  isCA: false,
  isBR: false,
  isOptOut: true,
  isOptIn: false,
  isDisplayable: true,
  initialPreferences: DEFAULT_OPT_OUT_PREFERENCES,
} as const

const AMBIGUOUS_TIMEZONES = ["Etc/UTC", "Etc/GMT", "UTC"]

const CALIFORNIA_TIMEZONES = ["America/Los_Angeles"]

// https://en.wikipedia.org/wiki/Time_in_Brazil#IANA_time_zone_database
const BRAZIL_TIMEZONES = [
  "America/Araguaina",
  "America/Bahia",
  "America/Belem",
  "America/Boa_Vista",
  "America/Campo_Grande",
  "America/Cuiaba",
  "America/Eirunepe",
  "America/Fortaleza",
  "America/Maceio",
  "America/Manaus",
  "America/Noronha",
  "America/Porto_Velho",
  "America/Recife",
  "America/Rio_Branco",
  "America/Santarem",
  "America/Sao_Paulo",
]

import { getENV } from "Utils/getENV"

/**
 * Resolves the visitor's country from Cloudflare's CF-IPCountry header (injected
 * into the page as COUNTRY_CODE) to pick GDPR email-consent defaults. Reading a
 * CDN-provided header avoids an IPBase lookup on every signup/onboarding view.
 */
export const useCountryCode = () => {
  const countryCode: string = getENV("COUNTRY_CODE") || ""

  return {
    countryCode,
    isAutomaticallySubscribed: !requiresExplicitOptIn(countryCode),
  }
}

// Whether a visitor must explicitly opt in to marketing email. Unknown country —
// missing, Cloudflare's "XX", or Tor "T1" — fails safe to GDPR (explicit opt-in).
const requiresExplicitOptIn = (countryCode: string): boolean => {
  const code = countryCode.trim().toUpperCase()

  if (!code || code === "XX" || code === "T1") {
    return true
  }

  return GDPR_COUNTRY_CODES.includes(code)
}

export const GDPR_COUNTRY_CODES = [
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
]

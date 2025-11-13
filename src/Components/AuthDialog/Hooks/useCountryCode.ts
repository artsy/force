import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { useCountryCodeQuery } from "__generated__/useCountryCodeQuery.graphql"
import { graphql } from "react-relay"

const USE_COUNTRY_CODE_QUERY = graphql`
  query useCountryCodeQuery($ip: String!) {
    requestLocation(ip: $ip) {
      countryCode
    }
  }
`

export const useCountryCode = () => {
  const { isLoggedIn } = useSystemContext()

  const { data, loading, error } = useClientQuery<useCountryCodeQuery>({
    query: USE_COUNTRY_CODE_QUERY,
    variables: {
      ip: getENV("IP_ADDRESS") || "0.0.0.0",
    },
    cacheConfig: {
      networkCacheConfig: {
        force: false,
      },
    },
    // If the user is logged in, we don't need the country code
    skip: isLoggedIn,
  })

  const countryCode = data?.requestLocation?.countryCode

  const isAutomaticallySubscribed = !!(
    countryCode && !GDPR_COUNTRY_CODES.includes(countryCode)
  )

  return {
    countryCode,
    error,
    isAutomaticallySubscribed,
    loading,
  }
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

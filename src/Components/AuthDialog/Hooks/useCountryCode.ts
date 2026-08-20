import { useSystemContext } from "System/Hooks/useSystemContext"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { getENV } from "Utils/getENV"
import type { useCountryCodeQuery } from "__generated__/useCountryCodeQuery.graphql"
import { graphql } from "react-relay"

const USE_COUNTRY_CODE_QUERY = graphql`
  query useCountryCodeQuery($ip: String!) {
    requestLocation(ip: $ip) {
      countryCode
    }
  }
`

interface UseCountryCodeProps {
  // By default the query is skipped for logged-in users (the auth dialog only
  // needs it while signed out). Callers that need the country post-login — e.g.
  // the post-signup email opt-in modal — can override this.
  skip?: boolean
}

export const useCountryCode = ({ skip }: UseCountryCodeProps = {}) => {
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
    skip: skip ?? isLoggedIn,
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

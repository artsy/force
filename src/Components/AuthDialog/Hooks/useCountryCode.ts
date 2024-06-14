import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useCountryCodeQuery } from "__generated__/useCountryCodeQuery.graphql"

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
      fetchPolicy: "store-or-network",
    },
    // If the user is logged in, we don't need the country code
    skip: isLoggedIn,
  })

  return {
    countryCode: data?.requestLocation?.countryCode,
    loading,
    error,
  }
}

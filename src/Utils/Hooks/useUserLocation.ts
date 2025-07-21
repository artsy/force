import { useSystemContext } from "System/Hooks/useSystemContext"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { useUserLocationQuery } from "__generated__/useUserLocationQuery.graphql"
import { graphql } from "react-relay"

/**
 * Fetches the current user's location data from their profile.
 * Only queries when a user is logged in.
 *
 * @returns Object containing location data, loading state, and error state
 */

export const useUserLocation = () => {
  const { user } = useSystemContext()

  const { data, loading, error } = useClientQuery<useUserLocationQuery>({
    query: USER_LOCATION_QUERY,
    skip: !user,
  })

  return {
    location: data?.me?.location || null,
    loading,
    error,
    isLoggedIn: !!user,
  }
}

const USER_LOCATION_QUERY = graphql`
  query useUserLocationQuery {
    me {
      location {
        display
        city
        state
        postalCode
        country
      }
    }
  }
`

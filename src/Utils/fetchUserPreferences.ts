import { Environment, fetchQuery, graphql } from "relay-runtime"
import { fetchUserPreferencesQuery } from "__generated__/fetchUserPreferencesQuery.graphql"

export const fetchUserPreferences = (relayEnvironment: Environment) => {
  return fetchQuery<fetchUserPreferencesQuery>(
    relayEnvironment,
    USER_PREFERENCES_QUERY,
    {}
  )
}

const USER_PREFERENCES_QUERY = graphql`
  query fetchUserPreferencesQuery {
    me {
      lengthUnitPreference
    }
  }
`

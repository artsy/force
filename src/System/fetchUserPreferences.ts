import { fetchQuery, graphql } from "react-relay"
import { fetchUserPreferencesQuery } from "__generated__/fetchUserPreferencesQuery.graphql"
import { Environment } from "react-relay"

export const fetchUserPreferences = (relayEnvironment: Environment) => {
  return fetchQuery<fetchUserPreferencesQuery>(
    relayEnvironment,
    USER_PREFERENCES_QUERY,
    {}
  ).toPromise()
}

const USER_PREFERENCES_QUERY = graphql`
  query fetchUserPreferencesQuery {
    me {
      lengthUnitPreference
    }
  }
`

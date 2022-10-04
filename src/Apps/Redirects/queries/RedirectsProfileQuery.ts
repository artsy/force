import { graphql } from "react-relay"

export const REDIRECTS_PROFILE_QUERY = graphql`
  query RedirectsProfileQuery($id: String!) {
    profile(id: $id) {
      owner {
        __typename
        ... on Partner {
          slug
        }
        ... on Fair {
          slug
        }
        ... on FairOrganizer {
          slug
        }
      }
    }
  }
`

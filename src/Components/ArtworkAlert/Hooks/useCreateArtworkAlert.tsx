import { useCreateArtworkAlertMutation } from "__generated__/useCreateArtworkAlertMutation.graphql"
import { graphql } from "react-relay"

import { useMutation } from "Utils/Hooks/useMutation"

export const useCreateArtworkAlert = () => {
  return useMutation<useCreateArtworkAlertMutation>({
    mutation: graphql`
      mutation useCreateArtworkAlertMutation($input: CreateSavedSearchInput!) {
        createSavedSearch(input: $input) {
          me {
            counts {
              savedSearches
            }
          }
          savedSearchOrErrors {
            ... on SearchCriteria {
              internalID
            }
          }
        }
      }
    `,
  })
}

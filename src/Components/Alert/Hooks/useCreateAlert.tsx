import { useCreateAlertMutation } from "__generated__/useCreateAlertMutation.graphql"
import { graphql } from "react-relay"

import { useMutation } from "Utils/Hooks/useMutation"

export const useCreateAlert = () => {
  return useMutation<useCreateAlertMutation>({
    mutation: graphql`
      mutation useCreateAlertMutation($input: CreateSavedSearchInput!) {
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

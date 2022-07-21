import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteSavedSearchAlertMutation } from "__generated__/useDeleteSavedSearchAlertMutation.graphql"

export const useDeleteSavedSearchAlert = () => {
  return useMutation<useDeleteSavedSearchAlertMutation>({
    mutation: graphql`
      mutation useDeleteSavedSearchAlertMutation(
        $input: DisableSavedSearchInput!
      ) {
        disableSavedSearch(input: $input) {
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

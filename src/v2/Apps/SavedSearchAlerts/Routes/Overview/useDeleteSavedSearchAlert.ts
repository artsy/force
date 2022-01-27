import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteSavedSearchAlertMutation } from "v2/__generated__/useDeleteSavedSearchAlertMutation.graphql"

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

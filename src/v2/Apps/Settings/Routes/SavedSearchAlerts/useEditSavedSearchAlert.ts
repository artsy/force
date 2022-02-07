import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useEditSavedSearchAlertMutation } from "v2/__generated__/useEditSavedSearchAlertMutation.graphql"

export const useEditSavedSearchAlert = () => {
  return useMutation<useEditSavedSearchAlertMutation>({
    mutation: graphql`
      mutation useEditSavedSearchAlertMutation(
        $input: UpdateSavedSearchInput!
      ) {
        updateSavedSearch(input: $input) {
          savedSearchOrErrors {
            ... on SearchCriteria {
              internalID
              userAlertSettings {
                name
              }
            }
          }
        }
      }
    `,
  })
}

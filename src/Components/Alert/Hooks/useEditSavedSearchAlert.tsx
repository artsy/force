import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useEditSavedSearchAlertMutation } from "__generated__/useEditSavedSearchAlertMutation.graphql"

export const useEditSavedSearchAlert = () => {
  return useMutation<useEditSavedSearchAlertMutation>({
    mutation: graphql`
      mutation useEditSavedSearchAlertMutation($input: updateAlertInput!) {
        updateAlert(input: $input) {
          responseOrError {
            ... on UpdateAlertSuccess {
              alert {
                internalID
                settings {
                  name
                }
              }
            }
          }
        }
      }
    `,
  })
}

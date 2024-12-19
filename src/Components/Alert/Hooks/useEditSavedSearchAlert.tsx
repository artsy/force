import { useMutation } from "Utils/Hooks/useMutation"
import type { useEditSavedSearchAlertMutation } from "__generated__/useEditSavedSearchAlertMutation.graphql"
import { graphql } from "react-relay"

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

import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useUpdateAlertMutation } from "__generated__/useUpdateAlertMutation.graphql"

export const useUpdateAlert = () => {
  return useMutation<useUpdateAlertMutation>({
    mutation: graphql`
      mutation useUpdateAlertMutation($input: updateAlertInput!) {
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

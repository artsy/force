import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteAlertMutation } from "__generated__/useDeleteAlertMutation.graphql"

export const useDeleteAlert = () => {
  return useMutation<useDeleteAlertMutation>({
    mutation: graphql`
      mutation useDeleteAlertMutation($input: deleteAlertInput!) {
        deleteAlert(input: $input) {
          responseOrError {
            ... on DeleteAlertSuccess {
              alert {
                internalID
              }
            }
          }
        }
      }
    `,
  })
}

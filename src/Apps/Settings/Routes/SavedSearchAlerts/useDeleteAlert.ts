import { useMutation } from "Utils/Hooks/useMutation"
import type { useDeleteAlertMutation } from "__generated__/useDeleteAlertMutation.graphql"
import { graphql } from "react-relay"

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

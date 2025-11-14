import { useMutation } from "Utils/Hooks/useMutation"
import type { useCreateAlertMutation } from "__generated__/useCreateAlertMutation.graphql"
import { graphql } from "react-relay"

export const useCreateAlert = () => {
  return useMutation<useCreateAlertMutation>({
    mutation: graphql`
      mutation useCreateAlertMutation($input: createAlertInput!) {
        createAlert(input: $input) {
          responseOrError {
            ... on CreateAlertSuccess {
              alert {
                internalID
                searchCriteriaID
              }
              me {
                counts {
                  savedSearches
                }
              }
            }
          }
        }
      }
    `,
  })
}

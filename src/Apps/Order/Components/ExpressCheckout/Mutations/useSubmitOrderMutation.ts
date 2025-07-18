import { useMutation } from "Utils/Hooks/useMutation"
import type { useSubmitOrderMutation as useSubmitOrderMutationType } from "__generated__/useSubmitOrderMutation.graphql"
import { graphql } from "react-relay"

export const useSubmitOrderMutation = () => {
  return useMutation<useSubmitOrderMutationType>({
    mutation: graphql`
      mutation useSubmitOrderMutation($input: submitOrderInput!) {
        submitOrder(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                internalID
              }
            }
            ... on OrderMutationError {
              mutationError {
                message
              }
            }
            ... on OrderMutationActionRequired {
              actionData {
                clientSecret
              }
            }
          }
        }
      }
    `,
  })
}

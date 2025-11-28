import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SubmitOrderMutation as useOrder2SubmitOrderMutationType } from "__generated__/useOrder2SubmitOrderMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2SubmitOrderMutation = () => {
  return useMutation<useOrder2SubmitOrderMutationType>({
    mutation: graphql`
      mutation useOrder2SubmitOrderMutation($input: submitOrderInput!) {
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
                code
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

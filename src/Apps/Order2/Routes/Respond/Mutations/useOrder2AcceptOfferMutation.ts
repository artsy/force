import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2AcceptOfferMutation as useOrder2AcceptOfferMutationType } from "__generated__/useOrder2AcceptOfferMutation.graphql"

export const useOrder2AcceptOfferMutation = () => {
  return useMutation<useOrder2AcceptOfferMutationType>({
    mutation: graphql`
      mutation useOrder2AcceptOfferMutation($input: acceptSellerOfferInput!) {
        acceptSellerOffer(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationError {
              mutationError {
                code
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

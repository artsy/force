import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2DeclineOfferMutation as useOrder2DeclineOfferMutationType } from "__generated__/useOrder2DeclineOfferMutation.graphql"

export const useOrder2DeclineOfferMutation = () => {
  return useMutation<useOrder2DeclineOfferMutationType>({
    mutation: graphql`
      mutation useOrder2DeclineOfferMutation($input: rejectSellerOfferInput!) {
        rejectSellerOffer(input: $input) {
          orderOrError {
            ... on OrderMutationSuccess {
              __typename
            }
            ... on OrderMutationError {
              mutationError {
                code
                message
              }
            }
          }
        }
      }
    `,
  })
}

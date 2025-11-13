import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2AddInitialOfferMutation as useOrder2AddInitialOfferMutationType } from "__generated__/useOrder2AddInitialOfferMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2AddInitialOfferMutation = () => {
  return useMutation<useOrder2AddInitialOfferMutationType>({
    mutation: graphql`
      mutation useOrder2AddInitialOfferMutation(
        $input: createBuyerOfferInput!
      ) {
        createBuyerOffer(input: $input) {
          offerOrError {
            ... on OfferMutationSuccess {
              __typename
              offer {
                internalID
                order {
                  ...Order2CheckoutContext_order
                  ...Order2CheckoutApp_order
                }
              }
            }
            ... on OfferMutationError {
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

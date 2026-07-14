import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2CreateCounterOfferMutation as useOrder2CreateCounterOfferMutationType } from "__generated__/useOrder2CreateCounterOfferMutation.graphql"

export const useOrder2CreateCounterOfferMutation = () => {
  return useMutation<useOrder2CreateCounterOfferMutationType>({
    mutation: graphql`
      mutation useOrder2CreateCounterOfferMutation(
        $input: createBuyerOfferInput!
      ) {
        createBuyerOffer(input: $input) {
          offerOrError {
            ... on OfferMutationSuccess {
              __typename
              offer {
                internalID
                order {
                  id
                  ...Order2RespondSummary_order
                  ...Order2RespondForm_order
                  ...Order2RespondContext_order
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

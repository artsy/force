import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SubmitCounterOfferMutation as useOrder2SubmitCounterOfferMutationType } from "__generated__/useOrder2SubmitCounterOfferMutation.graphql"

export const useOrder2SubmitCounterOfferMutation = () => {
  return useMutation<useOrder2SubmitCounterOfferMutationType>({
    mutation: graphql`
      mutation useOrder2SubmitCounterOfferMutation(
        $input: submitBuyerOfferInput!
      ) {
        submitBuyerOffer(input: $input) {
          offerOrError {
            ... on OfferMutationSuccess {
              __typename
              offer {
                internalID
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

import { useMutation } from "Utils/Hooks/useMutation"
import type { useMakeInquiryOfferMutation } from "__generated__/useMakeInquiryOfferMutation.graphql"
import { graphql } from "react-relay"

export const useMakeInquiryOffer = () => {
  return useMutation<useMakeInquiryOfferMutation>({
    mutation: graphql`
      mutation useMakeInquiryOfferMutation(
        $input: CommerceCreateInquiryOfferOrderWithArtworkInput!
      ) {
        createInquiryOfferOrder(input: $input) {
          orderOrError {
            __typename
            ... on CommerceOrderWithMutationSuccess {
              order {
                internalID
                mode
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
  })
}

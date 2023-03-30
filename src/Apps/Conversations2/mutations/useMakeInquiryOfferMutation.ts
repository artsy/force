import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useMakeInquiryOfferMutation } from "__generated__/useMakeInquiryOfferMutation.graphql"

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

import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useMakeInquiryOrderMutation } from "__generated__/useMakeInquiryOrderMutation.graphql"

export const useMakeInquiryOrder = () => {
  return useMutation<useMakeInquiryOrderMutation>({
    mutation: graphql`
      mutation useMakeInquiryOrderMutation(
        $input: CommerceCreateInquiryOrderWithArtworkInput!
      ) {
        createInquiryOrder(input: $input) {
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

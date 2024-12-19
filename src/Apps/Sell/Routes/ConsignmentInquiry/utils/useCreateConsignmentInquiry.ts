import { useMutation } from "Utils/Hooks/useMutation"
import type { useCreateConsignmentInquiryMutation } from "__generated__/useCreateConsignmentInquiryMutation.graphql"
import { graphql } from "react-relay"

export const useCreateConsignmentInquiry = () => {
  return useMutation<useCreateConsignmentInquiryMutation>({
    mutation: graphql`
      mutation useCreateConsignmentInquiryMutation(
        $input: CreateConsignmentInquiryMutationInput!
      ) {
        createConsignmentInquiry(input: $input) {
          consignmentInquiryOrError {
            ... on ConsignmentInquiryMutationSuccess {
              consignmentInquiry {
                internalID
              }
            }
            ... on ConsignmentInquiryMutationFailure {
              mutationError {
                error
                message
                statusCode
              }
            }
          }
        }
      }
    `,
  })
}

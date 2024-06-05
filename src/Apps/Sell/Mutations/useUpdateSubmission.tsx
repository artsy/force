import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useUpdateSubmissionMutation } from "__generated__/useUpdateSubmissionMutation.graphql"

export const useUpdateSubmission = () => {
  return useMutation<useUpdateSubmissionMutation>({
    mutation: graphql`
      mutation useUpdateSubmissionMutation(
        $input: UpdateSubmissionMutationInput!
      ) {
        updateConsignmentSubmission(input: $input) {
          consignmentSubmission {
            externalId
          }
        }
      }
    `,
  })
}
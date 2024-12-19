import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateSubmissionMutation } from "__generated__/useUpdateSubmissionMutation.graphql"
import { graphql } from "react-relay"

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

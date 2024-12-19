import { useMutation } from "Utils/Hooks/useMutation"
import type { useCreateSubmissionMutation } from "__generated__/useCreateSubmissionMutation.graphql"
import { graphql } from "react-relay"

export const useCreateSubmission = () => {
  return useMutation<useCreateSubmissionMutation>({
    mutation: graphql`
      mutation useCreateSubmissionMutation(
        $input: CreateSubmissionMutationInput!
      ) {
        createConsignmentSubmission(input: $input) {
          consignmentSubmission {
            externalId
          }
        }
      }
    `,
  })
}

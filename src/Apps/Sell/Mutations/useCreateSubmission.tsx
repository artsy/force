import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useCreateSubmissionMutation } from "__generated__/useCreateSubmissionMutation.graphql"

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

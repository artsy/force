import { useMutation } from "Utils/Hooks/useMutation"
import type { useAssociateSubmissionMutation } from "__generated__/useAssociateSubmissionMutation.graphql"
import { graphql } from "react-relay"

export const useAssociateSubmission = () => {
  return useMutation<useAssociateSubmissionMutation>({
    mutation: graphql`
      mutation useAssociateSubmissionMutation(
        $input: AddUserToSubmissionMutationInput!
      ) {
        addUserToSubmission(input: $input) {
          clientMutationId
        }
      }
    `,
  })
}

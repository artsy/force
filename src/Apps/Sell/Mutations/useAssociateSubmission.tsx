import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useAssociateSubmissionMutation } from "__generated__/useAssociateSubmissionMutation.graphql"

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

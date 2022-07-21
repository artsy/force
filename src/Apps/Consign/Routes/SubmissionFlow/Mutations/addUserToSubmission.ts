import { addUserToSubmissionMutation } from "__generated__/addUserToSubmissionMutation.graphql"
import { graphql } from "relay-runtime"
import { useMutation } from "Utils/Hooks/useMutation"

export const useAddUserToSubmission = () => {
  return useMutation<addUserToSubmissionMutation>({
    mutation: graphql`
      mutation addUserToSubmissionMutation(
        $input: AddUserToSubmissionMutationInput!
      ) {
        addUserToSubmission(input: $input) {
          consignmentSubmission {
            internalID
          }
        }
      }
    `,
  })
}

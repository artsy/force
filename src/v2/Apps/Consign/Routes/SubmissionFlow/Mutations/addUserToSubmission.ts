import { addUserToSubmissionMutation } from "v2/__generated__/addUserToSubmissionMutation.graphql"
import { graphql } from "relay-runtime"
import { useMutation } from "v2/Utils/Hooks/useMutation"

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

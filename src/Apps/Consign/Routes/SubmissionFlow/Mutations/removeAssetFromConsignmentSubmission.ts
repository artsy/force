import { removeAssetFromConsignmentSubmissionMutation } from "__generated__/removeAssetFromConsignmentSubmissionMutation.graphql"
import { graphql } from "relay-runtime"
import { useMutation } from "Utils/Hooks/useMutation"

export const useRemoveAssetFromConsignmentSubmission = () => {
  return useMutation<removeAssetFromConsignmentSubmissionMutation>({
    mutation: graphql`
      mutation removeAssetFromConsignmentSubmissionMutation(
        $input: RemoveAssetFromConsignmentSubmissionInput!
      ) {
        removeAssetFromConsignmentSubmission(input: $input) {
          asset {
            id
          }
        }
      }
    `,
  })
}

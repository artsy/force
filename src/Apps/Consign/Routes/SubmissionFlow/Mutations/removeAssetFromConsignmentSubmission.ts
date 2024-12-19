import { useMutation } from "Utils/Hooks/useMutation"
import type { removeAssetFromConsignmentSubmissionMutation } from "__generated__/removeAssetFromConsignmentSubmissionMutation.graphql"
import { graphql } from "react-relay"

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

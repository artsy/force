import { useMutation } from "Utils/Hooks/useMutation"
import type { addAssetToConsignmentMutation } from "__generated__/addAssetToConsignmentMutation.graphql"
import { graphql } from "react-relay"

export const useAddAssetToConsignmentSubmission = () => {
  return useMutation<addAssetToConsignmentMutation>({
    mutation: graphql`
      mutation addAssetToConsignmentMutation(
        $input: AddAssetToConsignmentSubmissionInput!
      ) {
        addAssetToConsignmentSubmission(input: $input) {
          asset {
            id
          }
        }
      }
    `,
  })
}

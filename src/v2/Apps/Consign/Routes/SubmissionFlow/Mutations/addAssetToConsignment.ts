import { addAssetToConsignmentMutation } from "v2/__generated__/addAssetToConsignmentMutation.graphql"
import { graphql } from "relay-runtime"
import { useMutation } from "v2/Utils/Hooks/useMutation"

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

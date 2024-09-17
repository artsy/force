import { addAssetToConsignmentMutation } from "__generated__/addAssetToConsignmentMutation.graphql"
import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"

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

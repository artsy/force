import {
  removeAssetFromConsignmentSubmissionMutation,
  removeAssetFromConsignmentSubmissionMutationResponse,
  RemoveAssetFromConsignmentSubmissionInput,
} from "v2/__generated__/removeAssetFromConsignmentSubmissionMutation.graphql"
import { commitMutation, graphql } from "relay-runtime"

export const removeAssetFromConsignmentSubmission = (
  relayEnvironment,
  input: RemoveAssetFromConsignmentSubmissionInput
) => {
  return new Promise<removeAssetFromConsignmentSubmissionMutationResponse>(
    (resolve, reject) => {
      commitMutation<removeAssetFromConsignmentSubmissionMutation>(
        relayEnvironment,
        {
          mutation: graphql`
            mutation removeAssetFromConsignmentSubmissionMutation(
              $input: RemoveAssetFromConsignmentSubmissionInput!
            ) {
              removeAssetFromConsignmentSubmission(input: $input) {
                asset {
                  submissionID
                }
              }
            }
          `,
          variables: {
            input: {
              ...input,
              clientMutationId: Math.random().toString(8),
            },
          },
          onError: reject,
          onCompleted: (response, errors) => {
            if (errors && errors.length > 0) {
              reject(new Error(JSON.stringify(errors)))
            } else {
              resolve(response)
            }
          },
        }
      )
    }
  )
}

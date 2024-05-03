import {
  UpdateConsignSubmissionMutation,
  UpdateSubmissionMutationInput,
} from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const updateConsignSubmissionMutation = (
  relayEnvironment: Environment,
  input: UpdateSubmissionMutationInput
) => {
  return new Promise<string>((resolve, reject) => {
    commitMutation<UpdateConsignSubmissionMutation>(relayEnvironment, {
      mutation: graphql`
        mutation UpdateConsignSubmissionMutation(
          $input: UpdateSubmissionMutationInput!
        ) {
          updateConsignmentSubmission(input: $input) {
            consignmentSubmission {
              externalId
            }
          }
        }
      `,
      variables: {
        input,
      },
      onError: reject,
      onCompleted: async (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(
          res.updateConsignmentSubmission?.consignmentSubmission
            ?.externalId as string
        )
      },
    })
  })
}

import {
  CreateConsignSubmissionMutation,
  CreateSubmissionMutationInput,
} from "__generated__/CreateConsignSubmissionMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const createConsignSubmissionMutation = (
  relayEnvironment: Environment,
  input: CreateSubmissionMutationInput
) => {
  return new Promise<string>((resolve, reject) => {
    commitMutation<CreateConsignSubmissionMutation>(relayEnvironment, {
      mutation: graphql`
        mutation CreateConsignSubmissionMutation(
          $input: CreateSubmissionMutationInput!
        ) {
          createConsignmentSubmission(input: $input) {
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
          res.createConsignmentSubmission?.consignmentSubmission
            ?.externalId as string
        )
      },
    })
  })
}

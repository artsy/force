import { commitMutation, Environment, graphql } from "relay-runtime"

import {
  CreateSubmissionMutationInput,
  CreateConsignSubmissionMutation,
} from "v2/__generated__/CreateConsignSubmissionMutation.graphql"

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
          res.createConsignmentSubmission!.consignmentSubmission!.externalId!
        )
      },
    })
  })
}

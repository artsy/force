import { commitMutation, graphql } from "react-relay"
import { AuthIntentAssociateSubmissionMutation } from "__generated__/AuthIntentAssociateSubmissionMutation.graphql"
import { AuthIntentMutation } from "./types"
import { Environment } from "react-relay"

export const associateSubmissionMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentAssociateSubmissionMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(res)
      },
      mutation: graphql`
        mutation AuthIntentAssociateSubmissionMutation(
          $input: AddUserToSubmissionMutationInput!
        ) @raw_response_type {
          addUserToSubmission(input: $input) {
            consignmentSubmission {
              internalID
            }
          }
        }
      `,
      variables: { input: { id } },
    })
  })
}

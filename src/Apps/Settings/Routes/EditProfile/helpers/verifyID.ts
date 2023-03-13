import { verifyIDMutation } from "__generated__/verifyIDMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const verifyID = async (relayEnvironment: Environment) => {
  return new Promise<verifyIDMutation["response"]>((done, reject) => {
    commitMutation<verifyIDMutation>(relayEnvironment, {
      onCompleted: (data, errors) =>
        errors && errors.length ? reject(errors) : done(data),
      onError: error => reject(error),
      // we're not actually using any inputs atm, but pulling the user from the authenticated MP loader context
      mutation: graphql`
        mutation verifyIDMutation(
          $input: SendIdentityVerificationEmailMutationInput!
        ) {
          sendIdentityVerificationEmail(input: $input) {
            confirmationOrError {
              ... on IdentityVerificationEmailMutationSuccessType {
                identityVerificationEmail {
                  internalID
                  state
                  userID
                }
              }
              ... on IdentityVerificationEmailMutationFailureType {
                mutationError {
                  error
                  message
                }
              }
            }
          }
        }
      `,
      variables: { input: {} },
    })
  })
}

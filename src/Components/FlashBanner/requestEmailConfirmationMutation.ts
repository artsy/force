import { Environment, commitMutation, graphql } from "react-relay"
import { requestEmailConfirmationMutation$data } from "__generated__/requestEmailConfirmationMutation.graphql"

export const requestEmailConfirmation = (relayEnvironment: Environment) => {
  return new Promise<requestEmailConfirmationMutation$data>((done, reject) => {
    commitMutation(relayEnvironment, {
      onCompleted: (
        data: PromiseLike<requestEmailConfirmationMutation$data>,
        errors
      ) => {
        errors && errors.length ? reject(errors) : done(data)
      },
      onError: error => {
        reject(error)
      },
      variables: {},
      mutation: graphql`
        mutation requestEmailConfirmationMutation {
          sendConfirmationEmail(input: {}) {
            confirmationOrError {
              ... on SendConfirmationEmailMutationSuccess {
                unconfirmedEmail
              }
              ... on SendConfirmationEmailMutationFailure {
                mutationError {
                  error
                  message
                }
              }
            }
          }
        }
      `,
    })
  })
}

import type { requestEmailConfirmationMutation$data } from "__generated__/requestEmailConfirmationMutation.graphql"
import { commitMutation, type Environment, graphql } from "react-relay"

export const requestEmailConfirmation = (relayEnvironment: Environment) => {
  return new Promise<requestEmailConfirmationMutation$data>((done, reject) => {
    commitMutation(relayEnvironment, {
      onCompleted: (
        data: PromiseLike<requestEmailConfirmationMutation$data>,
        errors,
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

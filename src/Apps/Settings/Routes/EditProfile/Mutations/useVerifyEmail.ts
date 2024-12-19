import { useMutation } from "Utils/Hooks/useMutation"
import type { useVerifyEmailMutation } from "__generated__/useVerifyEmailMutation.graphql"
import { graphql } from "react-relay"

export const useVerifyEmail = () => {
  return useMutation<useVerifyEmailMutation>({
    mutation: graphql`
      mutation useVerifyEmailMutation(
        $input: SendConfirmationEmailMutationInput!
      ) {
        sendConfirmationEmail(input: $input) {
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
}

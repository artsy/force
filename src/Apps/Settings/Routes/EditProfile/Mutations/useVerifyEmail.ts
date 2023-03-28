import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useVerifyEmailMutation } from "__generated__/useVerifyEmailMutation.graphql"

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

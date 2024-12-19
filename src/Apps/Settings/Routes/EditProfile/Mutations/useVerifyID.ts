import { useMutation } from "Utils/Hooks/useMutation"
import type { useVerifyIDMutation } from "__generated__/useVerifyIDMutation.graphql"
import { graphql } from "react-relay"

export const useVerifyID = () => {
  return useMutation<useVerifyIDMutation>({
    mutation: graphql`
      mutation useVerifyIDMutation(
        $input: SendIdentityVerificationEmailMutationInput!
      ) {
        sendIdentityVerificationEmail(input: $input) {
          confirmationOrError {
            ... on IdentityVerificationEmailMutationSuccessType {
              identityVerification {
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
  })
}

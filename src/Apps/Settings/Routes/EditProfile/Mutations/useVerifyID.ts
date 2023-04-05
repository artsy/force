import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useVerifyIDMutation } from "__generated__/useVerifyIDMutation.graphql"

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

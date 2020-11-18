import { Environment, commitMutation, graphql } from "react-relay"
import { UpdateMyProfileInput, UpdateUserInformationMutation, UpdateUserInformationMutationResponse } from "v2/__generated__/UpdateUserInformationMutation.graphql"

export const UpdateUserInformation = (
  environment: Environment,
  input: UpdateMyProfileInput
) => {
  return new Promise<UpdateUserInformationMutationResponse>(
    async (resolve, reject) => {
      commitMutation<UpdateUserInformationMutation>(environment, {
        onCompleted: (data, errors) =>
          errors ? reject(errors) : resolve(data),
        onError: reject,
        mutation: graphql`
          mutation UpdateUserInformationMutation($input: UpdateMyProfileInput!)
            @raw_response_type {
            updateMyUserProfile(input: $input) {
              userOrError {
                ... on UpdateMyProfileMutationSuccess {
                  user {
                    internalID
                  }
                }
                ... on UpdateMyProfileMutationFailure {
                  mutationError {
                    type
                    message
                    detail
                  }
                }
              }
            }
          }
        `,
        variables: {
          input,
        },
      })
    }
  )
}

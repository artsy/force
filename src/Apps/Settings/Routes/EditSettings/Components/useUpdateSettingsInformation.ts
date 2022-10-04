import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateSettingsInformationMutation } from "__generated__/useUpdateSettingsInformationMutation.graphql"

export const useUpdateSettingsInformation = () => {
  return useMutation<useUpdateSettingsInformationMutation>({
    mutation: graphql`
      mutation useUpdateSettingsInformationMutation(
        $input: UpdateMyProfileInput!
      ) {
        updateMyUserProfile(input: $input) {
          me {
            ...SettingsEditSettingsInformation_me
            name
            email
            phone
          }
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
                error
                fieldErrors {
                  name
                  message
                }
              }
            }
          }
        }
      }
    `,
  })
}

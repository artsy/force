import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  useUpdateSettingsInformationMutation,
  UpdateMyProfileInput,
  useUpdateSettingsInformationMutationResponse,
} from "v2/__generated__/useUpdateSettingsInformationMutation.graphql"

export const useUpdateSettingsInformation = () => {
  const { relayEnvironment } = useSystemContext()

  const submitUpdateSettingsInformation = (
    input: UpdateMyProfileInput
  ): Promise<useUpdateSettingsInformationMutationResponse> => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateSettingsInformationMutation>(relayEnvironment!, {
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useUpdateSettingsInformationMutation(
            $input: UpdateMyProfileInput!
          ) {
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
        variables: { input },
      })
    })
  }

  return { submitUpdateSettingsInformation }
}

import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  useUpdateMyUserProfileMutation,
  UpdateMyProfileInput,
} from "v2/__generated__/useUpdateMyUserProfileMutation.graphql"

export const useUpdateMyUserProfile = () => {
  const { relayEnvironment } = useSystemContext()

  const submitUpdateMyUserProfile = (input: UpdateMyProfileInput = {}) => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateMyUserProfileMutation>(relayEnvironment!, {
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useUpdateMyUserProfileMutation(
            $input: UpdateMyProfileInput!
          ) {
            updateMyUserProfile(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: { input },
      })
    })
  }

  return { submitUpdateMyUserProfile }
}

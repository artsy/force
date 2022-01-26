import { commitMutation, graphql } from "relay-runtime"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { useSystemContext } from "v2/System"
import {
  useUpdateMyUserProfileMutation,
  UpdateMyProfileInput,
} from "v2/__generated__/useUpdateMyUserProfileMutation.graphql"

interface UseUpdateMyUserProfile {
  relayEnvironment?: RelayModernEnvironment | undefined
}

export const useUpdateMyUserProfile = ({
  relayEnvironment,
}: UseUpdateMyUserProfile = {}) => {
  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()

  const submitUpdateMyUserProfile = (input: UpdateMyProfileInput = {}) => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateMyUserProfileMutation>(
        (relayEnvironment ?? defaultRelayEnvironment)!,
        {
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
                me {
                  ...SettingsEditProfileYourGalleryIntro_me
                }
              }
            }
          `,
          variables: { input },
        }
      )
    })
  }

  return { submitUpdateMyUserProfile }
}

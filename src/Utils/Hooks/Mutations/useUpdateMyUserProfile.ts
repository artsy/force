import { Environment } from "react-relay"
import { commitMutation, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  useUpdateMyUserProfileMutation,
  UpdateMyProfileInput,
} from "__generated__/useUpdateMyUserProfileMutation.graphql"

interface UseUpdateMyUserProfile {
  relayEnvironment?: Environment
}

export const useUpdateMyUserProfile = ({
  relayEnvironment,
}: UseUpdateMyUserProfile = {}) => {
  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()

  const submitUpdateMyUserProfile = (input: UpdateMyProfileInput = {}) => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateMyUserProfileMutation>(
        relayEnvironment ?? defaultRelayEnvironment,
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

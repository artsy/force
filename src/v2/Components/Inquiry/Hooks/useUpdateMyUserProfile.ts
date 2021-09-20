import { commitMutation, graphql } from "relay-runtime"
import {
  useUpdateMyUserProfileMutation,
  UpdateMyProfileInput,
} from "v2/__generated__/useUpdateMyUserProfileMutation.graphql"
import { useInquiryContext } from "./useInquiryContext"

export const useUpdateMyUserProfile = () => {
  const { relayEnvironment } = useInquiryContext()

  const submitUpdateMyUserProfile = (input: UpdateMyProfileInput = {}) => {
    return new Promise((resolve, reject) => {
      commitMutation<useUpdateMyUserProfileMutation>(
        relayEnvironment.current!,
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
